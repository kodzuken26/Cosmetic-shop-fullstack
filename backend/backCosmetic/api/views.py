from django.shortcuts import render
from rest_framework import viewsets, status

from .serializers import CategorySerializer, ProductSerializer
from .models import Categories, Product

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def get_ViewProduct(self):
        return Product.objects.all()
        
class CategoryViewSet(viewsets.ModelViewSet):
    
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer