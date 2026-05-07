from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterAPIView, LoginAPIView


router = DefaultRouter()
router.register('products', ProductViewSet, basename='product')
router.register('categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(router.urls)),
    path("auth/register/", RegisterAPIView.as_view()),
    path("auth/login/", LoginAPIView.as_view()),
    path('logout/', UserLogoutAPIView.as_view(), name='logout-user'),
    path('profile/', UserProfileAPIView.as_view(), name='user-profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
]