from django.contrib import admin
from .models import UserProfile, Product, Categories

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'nickname', 'name', 'surname', 'email', 'phone', 'gender')
    search_fields = ('user__username', 'user__email', 'nickname', 'phone')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug' : ('name',)}

@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug' : ('name',)}