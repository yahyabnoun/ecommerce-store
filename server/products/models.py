from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    color = models.CharField(max_length=50)
    main_image = models.URLField()
    is_in_inventory = models.BooleanField(default=False)
    items_left = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

class SecondaryImage(models.Model):
    product = models.ForeignKey(Product, related_name="secondary_images", on_delete=models.CASCADE)
    image_url = models.URLField()

class ProductSize(models.Model):
    product = models.ForeignKey(Product, related_name="sizes", on_delete=models.CASCADE)
    size = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    items_left = models.PositiveIntegerField(default=0)
