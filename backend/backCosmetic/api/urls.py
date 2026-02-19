from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
# from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register('products', ProductViewSet, basename='product')
router.register('categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(router.urls)),
    # path('register/', UserRegistrationAPIView.as_view(), name="register_user"),
    # path('login/', UserLoginAPIView.as_view(), name='login-user'),
    # path('logout/', UserLogoutAPIView.as_view(), name='logout-user'),
    # path('profile/', UserProfileAPIView.as_view(), name='user-profile'),
    # path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    # path('upload-image/', UploadImageView.as_view(), name='upload-image'),
]