python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt


python manage.py makemigrations
python manage.py migrate
python manage.py seed_products productData.json

python manage.py createsuperuser

python manage.py runserver