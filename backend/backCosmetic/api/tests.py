from django.test import TestCase

import pytest
from django.contrib.auth.models import User
from api.models import UserProfile

@pytest.mark.django_db 
def test_create_user_profile():
    user = User.objects.create_user(
        username="testuser",
        email="test@example.com",
        password="testpass123"
    )
    
    profile = UserProfile.objects.create(
        user=user,
        nickname="testnick",
        name="Тест",
        surname="Тестов",
        email="test@example.com",
        phone="89991234567",
        gender="woman"
    )
   
    assert profile.nickname == "testnick"
    assert profile.name == "Тест"
    assert profile.user.username == "testuser"
    assert str(profile) == "Тест (testnick)" 