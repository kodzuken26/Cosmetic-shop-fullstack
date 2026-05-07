from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Product, UserProfile, Categories


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.CharField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):

        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({
                "password": "Пароли не совпадают"
            })

        if User.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError({
                "email": "Email уже существует"
            })

        if UserProfile.objects.filter(phone=data["phone"]).exists():
            raise serializers.ValidationError({
                "phone": "Телефон уже существует"
            })

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

        user = authenticate(
            username=data["email"],
            password=data["password"]
        )

        if not user:
            raise serializers.ValidationError(
                "Неверный email или пароль"
            )

        return {
            "user": user
        }