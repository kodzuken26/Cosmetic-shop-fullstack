
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
import random

from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import serializers
from .serializers import (
    BlogPostSerializer,
    CartSerializer,
    FavoriteSerializer,
    ProductSerializer,
    CategorySerializer,
    QuestionSerializer,
    RegisterSerializer,
    LoginSerializer,
    ProductImageSerializer,
    SkinCareRecommendationSerializer,
    SkinTypeSerializer,
    OrderItemSerializer,
    OrderSerializer,
)

from .models import (
    BlogPost,
    Cart,
    CartItem,
    Favorite,
    Order,
    OrderItem,
    Product,
    Categories,
    Question,
    SkinCareRecommendation,
    SkinTypeRule,
    UserProfile,
    ProductImage,
)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

    def perform_create(self, serializer):
        # При создании проверяем, если is_main=True, сбрасываем флаг у других
        if serializer.validated_data.get("is_main"):
            product = serializer.validated_data["product"]
            product.images.filter(is_main=True).update(is_main=False)
        serializer.save()


class LatestProductsView(APIView):
    """Возвращает последние 5 добавленных товаров"""

    permission_classes = [AllowAny]

    def get(self, request):
        latest_products = Product.objects.all().order_by("-id")[:4]  # последние 5 по id
        serializer = ProductSerializer(
            latest_products, many=True, context={"request": request}
        )
        return Response(serializer.data)


class RouletteProductsView(APIView):
    """Возвращает 10 случайных товаров (можно из новинок)"""

    permission_classes = [AllowAny]

    def get(self, request):
        # Берём 10 случайных товаров (можно заменить на последние 20)
        products = Product.objects.all().order_by("?")[:10]
        serializer = ProductSerializer(
            products, many=True, context={"request": request}
        )
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            profile = user.profile

            return Response(
                {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user": {
                        "id": user.id,
                        "name": profile.name,
                        "email": profile.email,
                        "phone": profile.phone,
                    },
                },
                status=201,
            )

        return Response(serializer.errors, status=400)


class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.validated_data["user"]

            refresh = RefreshToken.for_user(user)

            profile = user.profile

            return Response(
                {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user": {
                        "id": user.id,
                        "name": profile.name,
                        "email": profile.email,
                        "phone": profile.phone,
                    },
                }
            )

        return Response(serializer.errors, status=400)


class UserLogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            refresh_token = request.data.get("refresh")

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message": "Logout successful"})

        except Exception as e:
            return Response({"error": str(e)}, status=400)


class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        profile = request.user.profile

        return Response(
            {
                "id": request.user.id,
                "name": profile.name,
                "email": profile.email,
                "phone": profile.phone,
            }
        )


class FavoriteListAPIView(APIView):
    """Список избранных товаров текущего пользователя"""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = Favorite.objects.filter(user=request.user).select_related("product")
        serializer = FavoriteSerializer(
            favorites, many=True, context={"request": request}
        )
        return Response(serializer.data)


class AddToFavoriteAPIView(APIView):
    """Добавить товар в избранное"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product_id")
        if not product_id:
            return Response({"error": "product_id обязателен"}, status=400)

        try:
            product = Product.objects.get(id=product_id)
            favorite, created = Favorite.objects.get_or_create(
                user=request.user, product=product
            )
            serializer = FavoriteSerializer(favorite, context={"request": request})
            return Response(serializer.data, status=201)
        except Product.DoesNotExist:
            return Response({"error": "Товар не найден"}, status=404)


class RemoveFromFavoriteAPIView(APIView):
    """Удалить товар из избранного"""

    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        try:
            favorite = Favorite.objects.get(user=request.user, product_id=product_id)
            favorite.delete()
            return Response(status=204)
        except Favorite.DoesNotExist:
            return Response({"error": "Товар не в избранном"}, status=404)


# class CartAPIView(APIView):
#     """Получение корзины текущего пользователя"""

#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         cart, created = Cart.objects.get_or_create(user=request.user)
#         serializer = CartSerializer(cart)
#         return Response(serializer.data, status=status.HTTP_200_OK)
class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(f"🔍 Пользователь: {request.user.email}")
        cart, created = Cart.objects.get_or_create(user=request.user)
        print(f"🔍 Корзина: id={cart.id}, created={created}")
        print(f"🔍 Количество товаров в корзине: {cart.items.count()}")
        
        for item in cart.items.all():
            print(f"   - {item.product.name} x {item.quantity}")
        
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data, status=200)

class AddToCartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity", 1)
        price = request.data.get('price')

        if not product_id:
            return Response({"error": "product_id обязателен"}, status=400)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Товар не найден"}, status=404)

        cart, _ = Cart.objects.get_or_create(user=request.user)

        # Определяем цену для сохранения
        item_price = price if price is not None else product.price

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"quantity": quantity, "price": item_price}
        )

        if not created:
            cart_item.quantity += quantity
            if price == 0 and cart_item.price != 0:
                cart_item.price = 0
            cart_item.save()

        if price != 0:
            product.stock -= quantity
            product.save()

        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data, status=200)

        # ❌ НИЧЕГО НЕ ПИШИ ПОСЛЕ ЭТОГО RETURN!

class RemoveFromCartAPIView(APIView):
    """Удаление товара из корзины"""

    permission_classes = [IsAuthenticated]

    def delete(self, request, item_id):
        try:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
            cart_item.delete()
            cart = Cart.objects.get(user=request.user)
            serializer = CartSerializer(cart)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response(
                {"error": "Товар не найден в корзине"}, status=status.HTTP_404_NOT_FOUND
            )


class UpdateCartItemAPIView(APIView):
    """Обновление количества товара в корзине"""

    permission_classes = [IsAuthenticated]

    def patch(self, request, item_id):
        quantity = request.data.get("quantity")

        if not quantity or quantity < 1:
            return Response(
                {"error": "Количество должно быть не менее 1"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)

            if cart_item.product.stock < quantity:
                return Response(
                    {
                        "error": f"Недостаточно товара на складе. Доступно: {cart_item.product.stock}"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            cart_item.quantity = quantity
            cart_item.save()

            cart = Cart.objects.get(user=request.user)
            serializer = CartSerializer(cart)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except CartItem.DoesNotExist:
            return Response(
                {"error": "Товар не найден в корзине"}, status=status.HTTP_404_NOT_FOUND
            )


class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        cart = Cart.objects.get(user=user)
        cart_items = cart.items.all()

        if not cart_items:
            return Response({'error': 'Корзина пуста'}, status=400)

        address_data = request.data.get('address', {})
        if not address_data:
            return Response({'error': 'Не указан адрес доставки'}, status=400)

        # Проверяем остатки и уменьшаем количество товара на складе
        for item in cart_items:
            product = item.product
            if product.stock < item.quantity:
                return Response({
                    'error': f'Недостаточно товара "{product.name}" на складе. Доступно: {product.stock}'
                }, status=400)
            # Уменьшаем остаток ТОЛЬКО для платных товаров (price != 0)
            if item.price != 0:
                product.stock -= item.quantity
                product.save()

        # Рассчитываем общую сумму заказа (без бонусных товаров)
        total_price = 0
        for item in cart_items:
            # Если цена в CartItem = 0 (бонус) — не добавляем в сумму
            if item.price != 0:
                item_price = item.price if item.price else item.product.price
                total_price += item_price * item.quantity

        # Создаём заказ
        order = Order.objects.create(
            user=user,
            total_price=total_price,  # ← только платные товары
            full_name=address_data.get('full_name'),
            phone=address_data.get('phone'),
            city=address_data.get('city'),
            street=address_data.get('street'),
            house=address_data.get('house'),
            apartment=address_data.get('apartment', ''),
            postal_code=address_data.get('postal_code', '')
        )

        # Переносим товары из корзины в заказ
        for item in cart_items:
            item_price = item.price if item.price else item.product.price
            OrderItem.objects.create(
                order=order,
                product=item.product,
                product_name=item.product.name,
                product_price=item_price,
                quantity=item.quantity
            )

        # Очищаем корзину
        cart_items.delete()

        return Response({
            'message': 'Заказ успешно оформлен',
            'order_id': order.id
        }, status=201)


class UserOrdersView(APIView):
    """Получение списка заказов текущего пользователя"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """Только чтение: список статей и детальная страница"""

    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]


class QuestionListView(APIView):
    """Список всех вопросов для теста"""

    permission_classes = [AllowAny]

    def get(self, request):
        questions = Question.objects.all().prefetch_related("answers")
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)


class SubmitTestView(APIView):
    """Отправка ответов, определение типа кожи и получение рекомендаций"""

    permission_classes = [AllowAny]

    def post(self, request):
        answers = request.data.get("answers", [])  # список из 10 значений (value)

        if len(answers) != 10:
            return Response({"error": "Нужно ответить на все 10 вопросов"}, status=400)

        total_score = sum(answers)
        # print("✅ Запрос дошел до сервера!")
        # print("📦 Данные от клиента:", request.data)
        # return Response({'message': 'OK', 'answers': request.data.get('answers', [])})

        # Определяем тип кожи по сумме баллов
        try:
            rule = SkinTypeRule.objects.filter(
                min_score__lte=total_score, max_score__gte=total_score
            ).first()
            if not rule:
                return Response({"error": "Не удалось определить тип кожи"}, status=400)
            skin_type = rule.skin_type
        except SkinTypeRule.DoesNotExist:
            return Response({"error": "Не удалось определить тип кожи"}, status=400)

        # Получаем рекомендации товаров для этого типа кожи
        recommendations = SkinCareRecommendation.objects.filter(
            skin_type=skin_type
        ).select_related("product")
        rec_serializer = SkinCareRecommendationSerializer(recommendations, many=True)

        # Сериализуем тип кожи
        skin_type_serializer = SkinTypeSerializer(skin_type)

        return Response(
            {
                "skin_type": skin_type_serializer.data,
                "recommendations": rec_serializer.data,
                "total_score": total_score,
            }
        )
