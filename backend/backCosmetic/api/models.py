from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=30, verbose_name='Имя')
    email = models.EmailField(max_length=40, unique=True, )
    phone = models.CharField(max_length=20, unique=True, verbose_name='Телефон')

    class Meta:
        db_table = 'Profile'
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

    def __str__(self):
        return self.email


class Categories(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='Название')
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')

    class Meta:
        db_table = 'category'
        verbose_name = 'Категорию'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    slug = models.SlugField(max_length=100, unique=True, verbose_name='URL')
    description = models.TextField(blank=True, null=True, verbose_name='Краткое описание')
    full_description = models.TextField(blank=True, null=True, verbose_name='Описание')
    price = models.DecimalField(default=0, max_digits=8, decimal_places=0, verbose_name='Цена')
    image = models.ImageField(upload_to='products_images', verbose_name='Картинка')
    use = models.TextField(blank=True, null=True, verbose_name='Применение')
    ingredients = models.TextField(blank=True, null=True, verbose_name='Состав')
    size = models.DecimalField(default= 0, max_digits=8, decimal_places=0, verbose_name='Объем')
    category = models.ForeignKey(to=Categories, on_delete=models.CASCADE, verbose_name='Категория')

    class Meta:
        db_table = 'product'
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'
        ordering = ("id", )

    def __str__(self):
        return self.name