from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    ProductSerializer,
    CategorySerializer,
    RegisterSerializer,
    LoginSerializer
)

from .models import Product, Categories, UserProfile


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


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

            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),

                "user": {
                    "id": user.id,
                    "name": profile.name,
                    "email": profile.email,
                    "phone": profile.phone,
                }
            }, status=201)

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

            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),

                "user": {
                    "id": user.id,
                    "name": profile.name,
                    "email": profile.email,
                    "phone": profile.phone,
                }
            })

        return Response(serializer.errors, status=400)


class UserLogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            refresh_token = request.data.get("refresh")

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({
                "message": "Logout successful"
            })

        except Exception as e:
            return Response({
                "error": str(e)
            }, status=400)


class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        profile = request.user.profile

        return Response({
            "id": request.user.id,
            "name": profile.name,
            "email": profile.email,
            "phone": profile.phone,
        })