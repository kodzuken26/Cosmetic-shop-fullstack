from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import (
    AnswerOption,
    BlogBlock,
    BlogPost,
    Cart,
    CartItem,
    Product,
    Question,
    SkinCareRecommendation,
    SkinType,
    UserProfile,
    Categories,
    ProductImage,
    Favorite,
    Order,
    OrderItem,
)


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "is_main", "order"]


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True) 
    main_image = serializers.SerializerMethodField()  

    class Meta:
        model = Product
        fields = "__all__"

    def get_main_image(self, obj):
        main = obj.images.filter(is_main=True).first()
        if main:
            return main.image.url
        first = obj.images.first()
        return first.image.url if first else None


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = "__all__"


class FavoriteSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Favorite
        fields = ["id", "product", "product_id", "created_at"]

    def create(self, validated_data):
        user = self.context["request"].user
        product_id = validated_data.pop("product_id")
        product = Product.objects.get(id=product_id)
        favorite, created = Favorite.objects.get_or_create(user=user, product=product)
        return favorite


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.CharField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):

        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({"password": "Пароли не совпадают"})

        if User.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError({"email": "Email уже существует"})

        if UserProfile.objects.filter(phone=data["phone"]).exists():
            raise serializers.ValidationError({"phone": "Телефон уже существует"})

        return data

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["name"],
        )

        UserProfile.objects.create(
            user=user,
            name=validated_data["name"],
            email=validated_data["email"],
            phone=validated_data["phone"],
        )

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):

        try:
            user_obj = User.objects.get(email=data["email"])
        except User.DoesNotExist:
            raise serializers.ValidationError("Неверный email или пароль")

        user = authenticate(username=user_obj.username, password=data["password"])

        if not user:
            raise serializers.ValidationError("Неверный email или пароль")

        return {"user": user}


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_price = serializers.DecimalField(
        source="product.price", read_only=True, max_digits=8, decimal_places=0
    )
    image_url = serializers.SerializerMethodField() 
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            "id",
            "product",
            "product_name",
            "product_price",
            "image_url",
            "quantity",
            "price",
            "total_price",
        ]
    def get_image_url(self, obj):
        if obj.product.image:
            return obj.product.image.url 
        return None

    def get_total_price(self, obj):
        item_price = obj.price if obj.price else obj.product.price
        return item_price * obj.quantity

  



class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    total_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "total_price", "total_items", "created_at", "updated_at"]

    def get_total_price(self, obj):
        total = 0
        for item in obj.items.all():
            if item.price == 0:
                continue
            item_price = item.price if item.price else item.product.price
            total += item_price * item.quantity
        return total

    def get_total_items(self, obj):
        return sum(item.quantity for item in obj.items.all())

class OrderItemSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'product_price', 'quantity', 'total_price']

    def get_total_price(self, obj):
        return obj.get_total_price()


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'created_at', 'status', 'total_price', 'items', 
                  'full_name', 'phone', 'city', 'street', 'house', 'apartment', 'postal_code']

class BlogBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogBlock
        fields = [
            "id",
            "block_type",
            "order",
            "text_content",
            "image",
            "image_alt",
            "video_url",
        ]


class BlogPostSerializer(serializers.ModelSerializer):
    blocks = BlogBlockSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            "id",
            "title",
            "slug",
            "author",
            "created_at",
            "updated_at",
            "is_published",
            "blocks",
        ]


class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerOption
        fields = ["id", "text", "value"]


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["id", "text", "order", "answers"]


class SkinTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkinType
        fields = ["id", "name", "slug", "description", "image"]


class SkinCareRecommendationSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = SkinCareRecommendation
        fields = ["id", "product", "order"]
