from rest_framework import serializers
from .models import Product, SecondaryImage, ProductSize

class SecondaryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecondaryImage
        fields = ["image_url"]


class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    secondary_images = SecondaryImageSerializer(many=True, read_only=True)
    sizes = ProductSizeSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = "__all__"
