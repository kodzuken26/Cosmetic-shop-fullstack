from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Product, UserProfile, Categories

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'full_description', 'image', 'price', 'size', 'use', 'ingredients', 'category']

    # def validate_image(self, value):
    #     if value.size > 5 * 1024 * 1024:
    #         raise serializers.ValidationError("Размер изображения не должен превышать 5MB")
        
    #     import os
    #     ext = os.path.splitext(value.name)[1].lower()
    #     allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id', 'name', 'slug']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['nickname', 'name', 'phone']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'nickname', 'name', 'surname', 'email', 'phone', 'gender')
        read_only_fields = ('id',)

# class UserRegistrationSerializer(serializers.Serializer):
    
#     nickname = serializers.CharField(required=True, max_length=150)
#     name = serializers.CharField(required=True, max_length=150)
#     surname = serializers.CharField(required=True, max_length=150)
#     phone = serializers.CharField(write_only=True, required=True)
#     email = serializers.EmailField(required=True)
#     gender = serializers.ChoiceField(
#         choices=[('woman', 'Женский'), ('man', 'Мужской'), ('none-gender', 'Не указан')], 
#         required=True
#     )

#     def validate(self, attrs):
        
#         if User.objects.filter(email=attrs['email']).exists():
#             raise serializers.ValidationError({"email": "Пользователь с таким email уже существует"})
        
        
#         if UserProfile.objects.filter(nickname=attrs['nickname']).exists():
#             raise serializers.ValidationError({"nickname": "Пользователь с таким никнеймом уже существует"})
        
#         if UserProfile.objects.filter(phone=attrs['phone']).exists():
#             raise serializers.ValidationError({"phone": "Пользователь с таким телефоном уже существует"})
        
#         return attrs
    
#     def create(self, validated_data):
#         profile_data = {
#             'nickname': validated_data.pop('nickname'),
#             'phone': validated_data.pop('phone'),
#             'gender': validated_data.pop('gender'),
#         }
        
        
        
#         user = User.objects.create_user(
#             **validated_data
#         )
        
#         UserProfile.objects.create(user=user, **profile_data)
        
#         return user

# class UserLoginSerializer(serializers.Serializer):
#     nickname = serializers.CharField(required=True)
#     phone = serializers.CharField(write_only=True, required=True)

#     def validate(self, data):
#         nickname = data.get('nickname')
#         phone = data.get('phone')
        
#         user = authenticate(nickname=nickname, phone=phone)
        
#         if user and user.is_active:
#             return user
#         raise serializers.ValidationError("Неверное имя пользователя или телефон")

# class UserRegistrationSerializer(serializers.Serializer):
#     nickname = serializers.CharField(required=True, max_length=150)
#     name = serializers.CharField(required=True, max_length=150)
#     surname = serializers.CharField(required=True, max_length=150)
#     phone = serializers.CharField(required=True, max_length=20)
#     email = serializers.EmailField(required=True)
#     gender = serializers.ChoiceField(
#         choices=[('woman', 'Женский'), ('man', 'Мужской'), ('none-gender', 'Не указан')], 
#         required=True
#     )

#     def validate(self, attrs):
#         if UserProfile.objects.filter(email=attrs['email']).exists():
#             raise serializers.ValidationError({"email": "Пользователь с таким email уже существует"})
        
#         if UserProfile.objects.filter(nickname=attrs['nickname']).exists():
#             raise serializers.ValidationError({"nickname": "Пользователь с таким никнеймом уже существует"})
        
#         if UserProfile.objects.filter(phone=attrs['phone']).exists():
#             raise serializers.ValidationError({"phone": "Пользователь с таким телефоном уже существует"})
        
#         return attrs
    
#     def create(self, validated_data):
#         # Создаем только профиль, без пользователя Django
#         profile = UserProfile.objects.create(**validated_data)
#         return profile

# class UserRegistrationSerializer(serializers.Serializer):
#     nickname = serializers.CharField(required=True, max_length=50)
#     name = serializers.CharField(required=True, max_length=30)
#     surname = serializers.CharField(required=False, allow_null=True, allow_blank=True)
#     email = serializers.EmailField(required=True, max_length=40)
#     phone = serializers.CharField(required=True, max_length=20)
#     gender = serializers.ChoiceField(choices=[('woman', 'Женский'), ('man', 'Мужской'), ('none-gender', 'Не указан')])

#     def validate(self, attrs):
#         # Проверка email
#         if UserProfile.objects.filter(email=attrs['email']).exists():
#             raise serializers.ValidationError({"email": "Пользователь с таким email уже существует"})
        
#         # Проверка nickname
#         if UserProfile.objects.filter(nickname=attrs['nickname']).exists():
#             raise serializers.ValidationError({"nickname": "Пользователь с таким никнеймом уже существует"})
        
#         # Проверка phone
#         if UserProfile.objects.filter(phone=attrs['phone']).exists():
#             raise serializers.ValidationError({"phone": "Пользователь с таким телефоном уже существует"})
        
#         return attrs
    
#     def create(self, validated_data):
#         print="🛠️ СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ И ПРОФИЛЯ"
        
#         # Создаем пользователя Django (с автоматическим username из email)
#         username = validated_data['email'].split('@')[0]  # часть email до @
        
#         # Генерируем уникальный username если занят
#         base_username = username
#         counter = 1
#         while User.objects.filter(username=username).exists():
#             username = f"{base_username}{counter}"
#             counter += 1
        
#         # Создаем пользователя со случайным паролем (он не будет использоваться)
#         import secrets
#         import string
#         alphabet = string.ascii_letters + string.digits
#         random_password = ''.join(secrets.choice(alphabet) for _ in range(12))
        
#         user = User.objects.create_user(
#             username=username,
#             email=validated_data['email'],
#             password=random_password,
#             first_name=validated_data['name'],
#             last_name=validated_data.get('surname', '')
#         )
#         print="✅ Пользователь создан:", user.username
        
#         # Создаем профиль, связанный с пользователем
#         profile = UserProfile.objects.create(
#             user=user,
#             nickname=validated_data['nickname'],
#             name=validated_data['name'],
#             surname=validated_data.get('surname', ''),
#             email=validated_data['email'],
#             phone=validated_data['phone'],
#             gender=validated_data['gender']
#         )
#         print="✅ Профиль создан:", profile.nickname
        
#         return profile


class UserRegistrationSerializer(serializers.Serializer):
    nickname = serializers.CharField(required=True, max_length=50)
    name = serializers.CharField(required=True, max_length=30)
    surname = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    email = serializers.EmailField(required=True, max_length=40)
    phone = serializers.CharField(required=True, max_length=20)
    gender = serializers.ChoiceField(choices=[('woman', 'Женский'), ('man', 'Мужской'), ('none-gender', 'Не указан')])

    def validate(self, attrs):
        print="="*50
        print="🔍 ВАЛИДАЦИЯ ДАННЫХ:"
        print=(attrs)
        
        # Проверка email
        if UserProfile.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Пользователь с таким email уже существует"})
        
        # Проверка nickname
        if UserProfile.objects.filter(nickname=attrs['nickname']).exists():
            raise serializers.ValidationError({"nickname": "Пользователь с таким никнеймом уже существует"})
        
        # Проверка phone
        if UserProfile.objects.filter(phone=attrs['phone']).exists():
            raise serializers.ValidationError({"phone": "Пользователь с таким телефоном уже существует"})
        
        print="✅ Валидация пройдена"
        return attrs
    
    def create(self, validated_data):
        print="="*50
        print="🛠️ НАЧАЛО СОЗДАНИЯ ПОЛЬЗОВАТЕЛЯ И ПРОФИЛЯ"
        print="📦 Данные для создания:", validated_data
        
        try:
            # ШАГ 1: Создаем username из email
            username = validated_data['email'].split('@')[0]
            print=f"1. Базовый username: {username}"
            
            # ШАГ 2: Проверяем уникальность username
            base_username = username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1
            print=f"2. Итоговый username: {username}"
            
            # ШАГ 3: Генерируем случайный пароль
            import secrets
            import string
            alphabet = string.ascii_letters + string.digits
            random_password = ''.join(secrets.choice(alphabet) for _ in range(12))
            print=f"3. Пароль сгенерирован"
            
            # ШАГ 4: Создаем пользователя
            print="4. Попытка создания пользователя..."
            user = User.objects.create_user(
                username=username,
                email=validated_data['email'],
                password=random_password,
                first_name=validated_data['name'],
                last_name=validated_data.get('surname', '')
            )
            print=f"✅ Пользователь создан! ID: {user.id}, Username: {user.username}"
            
            # ШАГ 5: Создаем профиль
            print="5. Попытка создания профиля..."
            profile = UserProfile.objects.create(
                user=user,
                nickname=validated_data['nickname'],
                name=validated_data['name'],
                surname=validated_data.get('surname', ''),
                email=validated_data['email'],
                phone=validated_data['phone'],
                gender=validated_data['gender']
            )
            print=f"✅ Профиль создан! ID: {profile.id}, Nickname: {profile.nickname}"
            
            print="="*50
            print="✅ РЕГИСТРАЦИЯ УСПЕШНО ЗАВЕРШЕНА"
            print="="*50
            
            return profile
            
        except Exception as e:
            print="❌❌❌ ОШИБКА В CREATE:"
            print(f"Тип ошибки: {type(e)}")
            print(f"Сообщение: {str(e)}")
            import traceback
            traceback.print_exc()
            print="="*50
            raise e

class UserLoginSerializer(serializers.Serializer):
    phone = serializers.CharField(required=True)

    def validate(self, data):
        phone = data.get('phone')
        
        try:
            profile = UserProfile.objects.get(phone=phone)
            return profile
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("Пользователь с таким телефоном не найден")