from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    BlogPostViewSet,
    CategoryViewSet,
    ProductViewSet,
    RegisterAPIView,
    LoginAPIView,
    CartAPIView,
    AddToCartAPIView,
    RemoveFromCartAPIView,
    RouletteProductsView,
    UpdateCartItemAPIView,
    FavoriteListAPIView,
    AddToFavoriteAPIView,
    RemoveFromFavoriteAPIView,
    QuestionListView,
    SubmitTestView,
    LatestProductsView,
    CreateOrderView,
    UserLogoutAPIView,
    UserOrdersView,
    UserProfileAPIView,
)

router = DefaultRouter()
router.register("products", ProductViewSet, basename="product")
router.register("categories", CategoryViewSet, basename="category")
router.register("blog", BlogPostViewSet, basename="blog")

urlpatterns = [
    path("products/latest/", LatestProductsView.as_view(), name="latest-products"),
    path("", include(router.urls)),
    path(
        "roulette/products/", RouletteProductsView.as_view(), name="roulette-products"
    ),
    path("auth/register/", RegisterAPIView.as_view()),
    path("auth/login/", LoginAPIView.as_view()),
    path("logout/", UserLogoutAPIView.as_view(), name="logout-user"),
    path("profile/", UserProfileAPIView.as_view(), name="user-profile"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("cart/", CartAPIView.as_view(), name="cart"),
    path("cart/add/", AddToCartAPIView.as_view(), name="add-to-cart"),
    path(
        "cart/remove/<int:item_id>/",
        RemoveFromCartAPIView.as_view(),
        name="remove-from-cart",
    ),
    path(
        "cart/update/<int:item_id>/",
        UpdateCartItemAPIView.as_view(),
        name="update-cart-item",
    ),
    path("favorites/", FavoriteListAPIView.as_view(), name="favorites"),
    path("favorites/add/", AddToFavoriteAPIView.as_view(), name="add-to-favorite"),
    path(
        "favorites/remove/<int:product_id>/",
        RemoveFromFavoriteAPIView.as_view(),
        name="remove-from-favorite",
    ),
    path("test/questions/", QuestionListView.as_view(), name="test-questions"),
    path("test/submit/", SubmitTestView.as_view(), name="test-submit"),
    path("order/create/", CreateOrderView.as_view(), name="create-order"),
    path("orders/", UserOrdersView.as_view(), name="user-orders"),
]