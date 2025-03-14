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
    items_left = models.PositiveIntegerField(default=0)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    def calculate_discount_percentage(self):

        if self.original_price and self.original_price > self.price:
            return round(((self.original_price - self.price) / self.original_price) * 100, 2)
        return 0

    def save(self, *args, **kwargs):

        self.percentage = self.calculate_discount_percentage()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} - Size {self.size} - Price: {self.price} (Original: {self.original_price}) - Discount: {self.percentage}%"

