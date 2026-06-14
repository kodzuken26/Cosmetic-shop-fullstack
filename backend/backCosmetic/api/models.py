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
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0, verbose_name='Рейтинг (0-5)')
    full_description = models.TextField(blank=True, null=True, verbose_name='Описание')
    price = models.DecimalField(default=0, max_digits=8, decimal_places=0, verbose_name='Цена')
    image = models.ImageField(upload_to='products_images', verbose_name='Главная картинка')
    use = models.TextField(blank=True, null=True, verbose_name='Применение')
    ingredients = models.TextField(blank=True, null=True, verbose_name='Состав')
    size = models.DecimalField(default= 0, max_digits=8, decimal_places=0, verbose_name='Объем')
    category = models.ForeignKey(to=Categories, on_delete=models.CASCADE, verbose_name='Категория')
    stock = models.PositiveIntegerField(default=0, verbose_name='Количество на складе')

    class Meta:
        db_table = 'product'
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'
        ordering = ("id", )

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images', verbose_name='Товар')
    image = models.ImageField(upload_to='products_images/gallery', verbose_name='Изображение')
    is_main = models.BooleanField(default=False, verbose_name='Главное изображение')
    order = models.PositiveIntegerField(default=0, verbose_name='Порядок')
    
    class Meta:
        db_table = 'product_images'
        verbose_name = 'Изображение товара'
        verbose_name_plural = 'Изображения товара'
        ordering = ['order', 'id']
    
    def __str__(self):
        return f"Изображение для {self.product.name}"

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart', verbose_name='Пользователь')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')
    
    class Meta:
        db_table = 'carts'
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'
    
    def __str__(self):
        return f"Корзина пользователя {self.user.username}"
    
    def get_total_price(self):
        total = 0
        for item in self.items.all():
            item_price = item.price if item.price else item.product.price
            total += item_price * item.quantity
        return total
    
    def get_total_items(self):
        return sum(item.quantity for item in self.items.all())

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items', verbose_name='Корзина')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart_items', verbose_name='Товар')
    quantity = models.PositiveIntegerField(default=1, verbose_name='Количество')
    price = models.DecimalField(max_digits=10, decimal_places=0, default=0)
    
    class Meta:
        db_table = 'cart_items'
        verbose_name = 'Товар в корзине'
        verbose_name_plural = 'Товары в корзине'
        unique_together = ('cart', 'product')  
    
    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
    
    def get_total_price(self):
        item_price = self.price if self.price else self.product.price
        return item_price * self.quantity
    
    def check_stock(self):
        return self.quantity <= self.product.stock
    

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'В обработке'),
        ('processing', 'Собирается'),
        ('shipped', 'В пути'),
        ('delivered', 'Доставлен'),
        ('cancelled', 'Отменён'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', verbose_name='Пользователь')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name='Статус заказа')
    total_price = models.DecimalField(max_digits=10, decimal_places=0, default=0, verbose_name='Общая сумма')
    
    full_name = models.CharField(max_length=100, verbose_name='ФИО')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    city = models.CharField(max_length=100, verbose_name='Город')
    street = models.CharField(max_length=200, verbose_name='Улица')
    house = models.CharField(max_length=20, verbose_name='Дом')
    apartment = models.CharField(max_length=20, blank=True, null=True, verbose_name='Квартира')
    postal_code = models.CharField(max_length=20, blank=True, null=True, verbose_name='Индекс')

    class Meta:
        db_table = 'orders'
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ['-created_at']

    def __str__(self):
        return f"Заказ #{self.id} — {self.user.email}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items', verbose_name='Заказ')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
    product_name = models.CharField(max_length=200, verbose_name='Название товара (на момент заказа)')
    product_price = models.DecimalField(max_digits=10, decimal_places=0, verbose_name='Цена на момент заказа')
    quantity = models.PositiveIntegerField(default=1, verbose_name='Количество')

    class Meta:
        db_table = 'order_items'
        verbose_name = 'Товар в заказе'
        verbose_name_plural = 'Товары в заказе'

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"

    def get_total_price(self):
        return self.product_price * self.quantity
    
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='favorited_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')  
        verbose_name = 'Избранное'
        verbose_name_plural = 'Избранное'

    def __str__(self):
        return f"{self.user.email} -> {self.product.name}"
    

class BlogPost(models.Model):
    title = models.CharField(max_length=200, verbose_name='Заголовок статьи')
    slug = models.SlugField(max_length=200, unique=True, verbose_name='URL')
    author = models.CharField(max_length=100, verbose_name='Автор')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')
    is_published = models.BooleanField(default=True, verbose_name='Опубликовано')

    class Meta:
        db_table = 'blog_posts'
        verbose_name = 'Статья блога'
        verbose_name_plural = 'Статьи блога'
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class BlogBlock(models.Model):
    BLOCK_TYPES = [
        ('text', 'Текст'),
        ('image', 'Изображение'),
        ('video', 'Видео'),
        ('quote', 'Цитата'),
    ]

    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='blocks', verbose_name='Статья')
    block_type = models.CharField(max_length=20, choices=BLOCK_TYPES, verbose_name='Тип блока')
    order = models.PositiveIntegerField(default=0, verbose_name='Порядок')
   
    text_content = models.TextField(blank=True, null=True, verbose_name='Текст')
    
    image = models.ImageField(upload_to='blog_images', blank=True, null=True, verbose_name='Изображение')
    image_alt = models.CharField(max_length=200, blank=True, null=True, verbose_name='Alt для изображения')
    
    video_url = models.URLField(blank=True, null=True, verbose_name='Ссылка на видео (YouTube, Vimeo)')
    
    class Meta:
        db_table = 'blog_blocks'
        verbose_name = 'Блок статьи'
        verbose_name_plural = 'Блоки статей'
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.post.title} — {self.block_type}"
    

class SkinType(models.Model):
    """Тип кожи"""
    name = models.CharField(max_length=100, verbose_name='Название')
    slug = models.SlugField(unique=True, verbose_name='Slug')
    description = models.TextField(verbose_name='Описание типа кожи')
    image = models.ImageField(upload_to='skin_types/', blank=True, null=True)

    class Meta:
        verbose_name = 'Тип кожи'
        verbose_name_plural = 'Типы кожи'

    def __str__(self):
        return self.name


class Question(models.Model):
    text = models.TextField(verbose_name='Текст вопроса')
    order = models.PositiveIntegerField(default=0, verbose_name='Порядок')

    class Meta:
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'
        ordering = ['order']

    def __str__(self):
        return self.text[:50]


class AnswerOption(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    text = models.CharField(max_length=255, verbose_name='Текст ответа')
    value = models.IntegerField(verbose_name='Числовое значение (вес)')

    class Meta:
        verbose_name = 'Вариант ответа'
        verbose_name_plural = 'Варианты ответов'

    def __str__(self):
        return f"{self.question.text[:30]} -> {self.text}"


class SkinTypeRule(models.Model):
    skin_type = models.ForeignKey(SkinType, on_delete=models.CASCADE, related_name='rules')
    min_score = models.IntegerField(verbose_name='Минимальный балл')
    max_score = models.IntegerField(verbose_name='Максимальный балл')

    class Meta:
        verbose_name = 'Правило определения'
        verbose_name_plural = 'Правила определения'

    def __str__(self):
        return f"{self.skin_type.name}: {self.min_score}–{self.max_score}"


class SkinCareRecommendation(models.Model):
    skin_type = models.ForeignKey(SkinType, on_delete=models.CASCADE, related_name='recommendations')
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='skin_recommendations')
    order = models.PositiveIntegerField(default=0, verbose_name='Порядок')

    class Meta:
        verbose_name = 'Рекомендация товара'
        verbose_name_plural = 'Рекомендации товаров'
        ordering = ['order']

    def __str__(self):
        return f"{self.skin_type.name} -> {self.product.name}"