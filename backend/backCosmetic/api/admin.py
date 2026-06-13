from django.contrib import admin
from .models import (
    AnswerOption,
    BlogBlock,
    BlogPost,
    Cart,
    CartItem,
    Favorite,
    Question,
    SkinCareRecommendation,
    SkinType,
    SkinTypeRule,
    UserProfile,
    Product,
    Categories,
    ProductImage,
    Order,
    OrderItem,
)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "email",
        "phone",
    )


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3  # количество пустых полей для загрузки
    fields = ["image", "is_main", "order"]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "category")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductImageInline]


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ["product", "is_main", "order"]
    list_editable = ["is_main", "order"]  # можно менять прямо в списке


@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "get_total_items", "get_total_price", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["user__email", "user__username"]
    readonly_fields = ["created_at", "updated_at"]

    def get_total_items(self, obj):
        return obj.get_total_items()

    get_total_items.short_description = "Кол-во товаров"

    def get_total_price(self, obj):
        return obj.get_total_price()

    get_total_price.short_description = "Общая стоимость"


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ["id", "cart", "product", "quantity", "get_total_price"]
    list_filter = ["cart__user"]
    search_fields = ["product__name", "cart__user__email"]

    def get_total_price(self, obj):
        return obj.get_total_price()

    get_total_price.short_description = "Стоимость"


class OrderItemInline(admin.TabularInline):
    """Для отображения товаров внутри заказа"""

    model = OrderItem
    extra = 0
    readonly_fields = ["product_name", "product_price", "quantity"]
    can_delete = False
    verbose_name = "Товар в заказе"
    verbose_name_plural = "Товары в заказе"


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "status", "total_price", "created_at", "updated_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["user__email", "user__username", "full_name", "phone"]
    readonly_fields = ["created_at", "updated_at", "total_price"]
    inlines = [OrderItemInline]
    fieldsets = (
        (
            "Информация о заказе",
            {"fields": ("user", "status", "total_price", "created_at", "updated_at")},
        ),
        (
            "Адрес доставки",
            {
                "fields": (
                    "full_name",
                    "phone",
                    "city",
                    "street",
                    "house",
                    "apartment",
                    "postal_code",
                )
            },
        ),
    )

    def save_model(self, request, obj, form, change):
        """При сохранении заказа из админки обновляем дату изменения"""
        obj.save()

    actions = ["mark_as_processing", "mark_as_shipped", "mark_as_delivered"]

    def mark_as_processing(self, request, queryset):
        queryset.update(status="processing")

    mark_as_processing.short_description = 'Перевести в статус "Собирается"'

    def mark_as_shipped(self, request, queryset):
        queryset.update(status="shipped")

    mark_as_shipped.short_description = 'Перевести в статус "В пути"'

    def mark_as_delivered(self, request, queryset):
        queryset.update(status="delivered")

    mark_as_delivered.short_description = 'Перевести в статус "Доставлен"'


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "order",
        "product_name",
        "quantity",
        "product_price",
        "get_total_price",
    ]
    list_filter = ["order__status"]
    search_fields = ["product_name", "order__user__email"]
    readonly_fields = ["order", "product_name", "product_price", "quantity"]
    can_delete = False

    def get_total_price(self, obj):
        return obj.get_total_price()

    get_total_price.short_description = "Общая стоимость"


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "product", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["user__email", "user__username", "product__name"]
    readonly_fields = ["created_at"]


class BlogBlockInline(admin.TabularInline):
    model = BlogBlock
    extra = 3
    fields = ["block_type", "order", "text_content", "image", "image_alt", "video_url"]


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "created_at", "is_published"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [BlogBlockInline]


@admin.register(SkinType)
class SkinTypeAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name"]


class AnswerOptionInline(admin.TabularInline):
    model = AnswerOption
    extra = 4
    fields = ["text", "value"]


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ["text", "order"]
    list_editable = ["order"]
    search_fields = ["text"]
    inlines = [AnswerOptionInline]


@admin.register(AnswerOption)
class AnswerOptionAdmin(admin.ModelAdmin):
    list_display = ["question", "text", "value"]
    list_filter = ["question"]
    search_fields = ["text"]


@admin.register(SkinTypeRule)
class SkinTypeRuleAdmin(admin.ModelAdmin):
    list_display = ["skin_type", "min_score", "max_score"]
    list_editable = ["min_score", "max_score"]
    list_filter = ["skin_type"]


class SkinCareRecommendationInline(admin.TabularInline):
    model = SkinCareRecommendation
    extra = 5
    fields = ["product", "order"]


@admin.register(SkinCareRecommendation)
class SkinCareRecommendationAdmin(admin.ModelAdmin):
    list_display = ["skin_type", "product", "order"]
    list_editable = ["order"]
    list_filter = ["skin_type"]
    search_fields = ["product__name"]
