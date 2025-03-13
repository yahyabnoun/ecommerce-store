import json
from django.core.management.base import BaseCommand
from products.models import Product, SecondaryImage, ProductSize

class Command(BaseCommand):
    help = 'Seeds the database with product data from a JSON file'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='Path to the JSON file containing product data')

    def handle(self, *args, **options):
        file_path = options['json_file']
        
        try:
            with open(file_path, 'r') as file:
                products_data = json.load(file)
            
            # Check if products_data is a list, if not, make it a list
            if not isinstance(products_data, list):
                products_data = [products_data]
                
            self.stdout.write(self.style.SUCCESS(f'Found {len(products_data)} products in JSON file'))
            
            for product_data in products_data:
                # Handle the case where "Color" might be capitalized in JSON but lowercase in model
                color = product_data.get('Color') or product_data.get('color', '')
                
                # Create or update the product
                product, created = Product.objects.update_or_create(
                    id=product_data.get('id'),
                    defaults={
                        'name': product_data.get('name', ''),
                        'brand': product_data.get('brand', ''),
                        'gender': product_data.get('gender', ''),
                        'color': color,
                        'main_image': product_data.get('mainImage', ''),
                        'is_in_inventory': product_data.get('is_in_inventory', False),
                        'items_left': product_data.get('items_left', 0),
                    }
                )
                
                status = 'Created' if created else 'Updated'
                self.stdout.write(f"{status} product: {product.name}")
                
                # Add secondary images
                if 'secondaryImages' in product_data:
                    # Clear existing secondary images to avoid duplicates
                    SecondaryImage.objects.filter(product=product).delete()
                    
                    for image_url in product_data['secondaryImages']:
                        SecondaryImage.objects.create(
                            product=product,
                            image_url=image_url
                        )
                    
                    self.stdout.write(f"Added {len(product_data['secondaryImages'])} secondary images")
                
                # Add sizes
                if 'sizes' in product_data:
                    # Clear existing sizes to avoid duplicates
                    ProductSize.objects.filter(product=product).delete()
                    
                    for size_data in product_data['sizes']:
                        ProductSize.objects.create(
                            product=product,
                            size=size_data.get('size', 0),
                            price=size_data.get('price', 0),
                            items_left=size_data.get('items_left', 0)
                        )
                    
                    self.stdout.write(f"Added {len(product_data['sizes'])} sizes")
            
            self.stdout.write(self.style.SUCCESS('Successfully seeded the database!'))
            
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File not found: {file_path}'))
        except json.JSONDecodeError:
            self.stdout.write(self.style.ERROR(f'Invalid JSON in file: {file_path}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error seeding database: {str(e)}'))