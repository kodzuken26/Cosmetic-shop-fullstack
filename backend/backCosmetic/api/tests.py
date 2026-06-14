import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Product, Categories, UserProfile, Cart, CartItem, Favorite


@pytest.mark.django_db
class TestModels:
    
    def test_create_category(self):
        category = Categories.objects.create(
            name='Уход за лицом',
            slug='uhod-za-licom'
        )
        assert category.name == 'Уход за лицом'
        assert str(category) == 'Уход за лицом'
    
    def test_create_product(self):
        category = Categories.objects.create(name='Уход за лицом', slug='uhod')
        product = Product.objects.create(
            name='Тестовый товар',
            slug='test-product',
            price=1500,
            stock=10,
            category=category
        )
        assert product.name == 'Тестовый товар'
        assert product.price == 1500
        assert product.stock == 10
        assert str(product) == 'Тестовый товар'
    
    def test_create_user_profile(self):
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        profile = UserProfile.objects.create(
            user=user,
            name='Тест',
            email='test@example.com',
            phone='89991234567'
        )
        assert profile.name == 'Тест'
        assert str(profile) == 'test@example.com'
    
    def test_add_to_cart(self):
        user = User.objects.create_user(username='testuser', password='123')
        category = Categories.objects.create(name='Тестовая', slug='test-cat')
        product = Product.objects.create(
            name='Тест', 
            slug='test', 
            price=100, 
            stock=5,
            category=category
        )
        
        cart, _ = Cart.objects.get_or_create(user=user)
        cart_item = CartItem.objects.create(
            cart=cart,
            product=product,
            quantity=2
        )
        
        assert cart_item.quantity == 2
        assert cart_item.get_total_price() == 200
        assert cart.get_total_items() == 2
        assert cart.get_total_price() == 200
    
    def test_add_to_favorites(self):
        user = User.objects.create_user(username='testuser', password='123')
        category = Categories.objects.create(name='Тестовая', slug='test-cat')
        product = Product.objects.create(
            name='Тест', 
            slug='test', 
            price=100,
            category=category
        )
        
        favorite = Favorite.objects.create(user=user, product=product)
        
        assert favorite.product.name == 'Тест'
        assert str(favorite) == f"{user.email} -> {product.name}"


@pytest.mark.django_db
class TestAPI:
    
    def setup_method(self):
        self.client = APIClient()
    
    def test_get_products(self):
        response = self.client.get('/api/products/')
        assert response.status_code == status.HTTP_200_OK
        assert isinstance(response.data, list)
    
    def test_get_categories(self):
        response = self.client.get('/api/categories/')
        assert response.status_code == status.HTTP_200_OK
    
    def test_register_user(self):
        data = {
            'name': 'Тест',
            'email': 'test@example.com',
            'phone': '89991234567',
            'password': 'testpass123',
            'confirm_password': 'testpass123'
        }
        response = self.client.post('/api/auth/register/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert 'access' in response.data
        assert response.data['user']['email'] == 'test@example.com'
    
    def test_register_user_duplicate_email(self):
        user = User.objects.create_user(username='existing', email='existing@test.com', password='123')
        UserProfile.objects.create(
            user=user,
            name='Существующий',
            email='existing@test.com',
            phone='89991111111'
        )
        
        data = {
            'name': 'Тест',
            'email': 'existing@test.com',
            'phone': '89991234567',
            'password': '123',
            'confirm_password': '123'
        }
        response = self.client.post('/api/auth/register/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_login_success(self):
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        UserProfile.objects.create(
            user=user,
            name='Тест',
            email='test@example.com',
            phone='89991234567'
        )
        
        data = {
            'email': 'test@example.com',
            'password': 'testpass123'
        }
        response = self.client.post('/api/auth/login/', data)
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.data
    
    def test_login_wrong_password(self):
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='correctpass'
        )
        UserProfile.objects.create(
            user=user,
            name='Тест',
            email='test@example.com',
            phone='89991234567'
        )
        
        data = {
            'email': 'test@example.com',
            'password': 'wrongpass'
        }
        response = self.client.post('/api/auth/login/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_get_profile_unauthorized(self):
        response = self.client.get('/api/profile/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_get_profile_authorized(self):
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        UserProfile.objects.create(
            user=user,
            name='Тест',
            email='test@example.com',
            phone='89991234567'
        )
        
        login_data = {'email': 'test@example.com', 'password': 'testpass123'}
        login_resp = self.client.post('/api/auth/login/', login_data)
        token = login_resp.data['access']
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get('/api/profile/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == 'Тест'
    
    def test_add_to_cart(self):
        user = User.objects.create_user(username='cartuser', email='cart@test.com', password='123')
        UserProfile.objects.create(
            user=user,
            name='Cart User',
            email='cart@test.com',
            phone='89991111111'
        )
        
        category = Categories.objects.create(name='Тестовая', slug='test-cat')
        product = Product.objects.create(
            name='Тест', 
            slug='test', 
            price=100, 
            stock=10,
            category=category
        )
        
        login_data = {'email': 'cart@test.com', 'password': '123'}
        login_resp = self.client.post('/api/auth/login/', login_data)
        token = login_resp.data['access']
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post('/api/cart/add/', {'product_id': product.id, 'quantity': 2})
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['items']) == 1
        assert response.data['items'][0]['quantity'] == 2
    
    def test_add_to_favorites(self):
        user = User.objects.create_user(username='favuser', email='fav@test.com', password='123')
        UserProfile.objects.create(
            user=user,
            name='Fav User',
            email='fav@test.com',
            phone='89992222222'
        )
        
        category = Categories.objects.create(name='Тестовая', slug='test-cat')
        product = Product.objects.create(
            name='Тест', 
            slug='test', 
            price=100,
            category=category
        )
        
        login_data = {'email': 'fav@test.com', 'password': '123'}
        login_resp = self.client.post('/api/auth/login/', login_data)
        token = login_resp.data['access']
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post('/api/favorites/add/', {'product_id': product.id})
        
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['product']['id'] == product.id
    
    def test_get_blog_posts(self):
        response = self.client.get('/api/blog/')
        assert response.status_code == status.HTTP_200_OK
    
    def test_get_skin_test_questions(self):
        response = self.client.get('/api/test/questions/')
        assert response.status_code == status.HTTP_200_OK
    
    def test_submit_skin_test(self):
        data = {'answers': [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]}
        response = self.client.post('/api/test/submit/', data, format='json')
        assert response.status_code in [status.HTTP_200_OK, status.HTTP_400_BAD_REQUEST]
    
    def test_get_latest_products(self):
        response = self.client.get('/api/products/latest/')
        assert response.status_code == status.HTTP_200_OK