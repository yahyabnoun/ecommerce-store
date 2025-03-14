import django_filters
from .models import Product, ProductSize

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="sizes__price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="sizes__price", lookup_expr='lte')
    brand = django_filters.CharFilter(field_name="brand", lookup_expr='icontains')
    gender = django_filters.CharFilter(field_name="gender", lookup_expr='icontains')
    color = django_filters.CharFilter(field_name="color", lookup_expr='icontains')
    size = django_filters.NumberFilter(field_name="sizes__size", lookup_expr='exact')

    class Meta:
        model = Product
        fields = ["brand", "gender", "color", "size", "min_price", "max_price"]
