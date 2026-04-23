from django.shortcuts import render
from django.views.decorators.cache import never_cache

@never_cache
def serve_react_app(request):
    return render(request, 'index.html')