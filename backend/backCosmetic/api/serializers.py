from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, UserProfile, Categories

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'full_description', 'image', 'price', 'size', 'use', 'ingredients', 'category']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id', 'name', 'slug']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model: UserProfile
        fields = ['nickname', 'name', 'phone']

class UserSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile')
        read_only_fields = ('id',)