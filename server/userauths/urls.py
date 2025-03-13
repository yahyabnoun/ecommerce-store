from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .jwt_views import CustomTokenObtainPairView
from .views import UserViewSet

urlpatterns = [
    path('register/', UserViewSet.as_view({'post': 'register'}), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]