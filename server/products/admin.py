from django.contrib import admin
from .models import Product, SecondaryImage, ProductSize

class SecondaryImageInline(admin.TabularInline):
    model = SecondaryImage
    extra = 1  # Allows adding multiple secondary images inline

class ProductSizeInline(admin.TabularInline):
    model = ProductSize
    extra = 1  # Allows adding multiple sizes inline

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "brand", "gender", "color", "is_in_inventory", "items_left")
    search_fields = ("name", "brand", "color")
    list_filter = ("brand", "gender", "is_in_inventory")
    inlines = [SecondaryImageInline, ProductSizeInline]

@admin.register(SecondaryImage)
class SecondaryImageAdmin(admin.ModelAdmin):
    list_display = ("product", "image_url")
    search_fields = ("product__name",)

@admin.register(ProductSize)
class ProductSizeAdmin(admin.ModelAdmin):
    list_display = ("product", "size", "price", "items_left")
    search_fields = ("product__name",)
    list_filter = ("size",)

