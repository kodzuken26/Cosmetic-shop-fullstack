import sys
import traceback
import secrets

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

from .serializers import CategorySerializer, ProductSerializer, UserProfileSerializer, UserSerializer, UserRegistrationSerializer, UserLoginSerializer
from .models import Categories, Product, UserProfile

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def get_ViewProduct(self):
        return Product.objects.all()
        
class CategoryViewSet(viewsets.ModelViewSet):
    
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer

# class UserRegistrationAPIView(GenericAPIView):
#     permission_classes = (AllowAny,)
#     serializer_class = UserRegistrationSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
        
#         if serializer.is_valid():
#             user = serializer.save()
#             token = RefreshToken.for_user(user)
            
            
#             profile = UserProfile.objects.get(user=user)
            
#             user_data = {
#                 'id': user.id,
#                 'email': user.email,
#                 'nickname': profile.nickname,
#                 'name': profile.name,
#                 'surname': profile.surname,
#                 'phone': profile.phone,
#                 'gender': profile.gender,
#                 'tokens': {
#                     'refresh': str(token),
#                     'access': str(token.access_token)
#                 }
#             }
#             return Response(user_data, status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserLoginAPIView(GenericAPIView):
#     permission_classes = (AllowAny,)
#     serializer_class = UserLoginSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
        
#         if serializer.is_valid():
#             user = serializer.validated_data
#             profile = UserProfile.objects.get(user=user)
#             token = RefreshToken.for_user(user)
            
#             user_data = {
#                 'id': user.id,
#                 'email': user.email,
#                 'nickname': profile.nickname,
#                 'name': profile.name,
#                 'surname': profile.surname,
#                 'phone': profile.phone,
#                 'gender': profile.gender,
#                 'tokens': {
#                     'refresh': str(token),
#                     'access': str(token.access_token)
#                 }
#             }
#             return Response(user_data, status=status.HTTP_200_OK)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserRegistrationAPIView(GenericAPIView):
#     permission_classes = (AllowAny,)
#     serializer_class = UserRegistrationSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
        
#         if serializer.is_valid():
#             profile = serializer.save()
            
#             # Создаем кастомный токен (можно использовать JWT или простой токен)
#             # Генерируем простой токен для примера
#             token = secrets.token_hex(16)
            
#             # Сохраняем токен в сессии или отдельной модели (упрощенно)
#             request.session['user_id'] = profile.id
            
#             user_data = {
#                 'id': profile.id,
#                 'email': profile.email,
#                 'nickname': profile.nickname,
#                 'name': profile.name,
#                 'surname': profile.surname,
#                 'phone': profile.phone,
#                 'gender': profile.gender,
#                 'token': token
#             }
#             return Response(user_data, status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        print="="*50
        print=(" ПОЛУЧЕН ЗАПРОС НА РЕГИСТРАЦИЮ")
        print=(" Данные:", request.data)
        print="="*50
        
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            try:
                # Сохраняем - создаст и пользователя, и профиль
                profile = serializer.save()
                
                # Формируем ответ
                user_data = {
                    'id': profile.id,
                    'nickname': profile.nickname,
                    'name': profile.name,
                    'surname': profile.surname,
                    'email': profile.email,
                    'phone': profile.phone,
                    'gender': profile.gender,
                }
                
                print=" Регистрация успешна:", user_data
                return Response(user_data, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                print=" Ошибка при сохранении:", str(e)
                import traceback
                traceback.print_exc()
                return Response(
                    {"error": f"Ошибка сервера: {str(e)}"}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        print=" Ошибки валидации:", serializer.errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']  # должен возвращать user
            
            refresh = RefreshToken.for_user(user)
            
            user_data = {
                'id': user.id,
                'email': user.email,
                'nickname': user.profile.nickname,
                'name': user.profile.name,
                'surname': user.profile.surname,
                'phone': user.profile.phone,
                'gender': user.profile.gender,
                'token': str(refresh.access_token),
                'refresh': str(refresh),
            }
            return Response(user_data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class UserLogoutAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response(
                    {"error": "Refresh token is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(
                {"message": "Successfully logged out"},
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class UserProfileAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        profile = UserProfile.objects.get(user=user)
        
        user_data = {
            'id': user.id,
            'email': user.email,
            'nickname': profile.nickname,
            'name': profile.name,
            'surname': profile.surname,
            'phone': profile.phone,
            'gender': profile.gender,
        }
        return Response(user_data)