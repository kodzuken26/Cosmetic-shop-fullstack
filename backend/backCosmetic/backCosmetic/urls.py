from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from .views import serve_react_app

urlpatterns = [
    path('admin/', admin.site.urls),          # 1. Админка Django
    path('api/', include('api.urls')),        # 2. Твои API-эндпоинты
    path('api-auth/', include('rest_framework.urls')), # 3. Для DRF
]

# 4. Для медиа-файлов (картинки товаров)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# 5. ВСЕ остальные запросы отдаем React
urlpatterns += [
    re_path(r'^.*$', serve_react_app, name='react_app'),
]