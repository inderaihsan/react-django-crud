from rest_framework import serializers
from .models import books, library, available_books

class book_serializer(serializers.ModelSerializer):
   class Meta : 
    model = books
    fields = '__all__'

class library_serializer(serializers.ModelSerializer):
   class Meta : 
    model = library
    fields = '__all__'
    
class available_book_serializer(serializers.ModelSerializer):
   class Meta : 
    model = available_books
    fields = '__all__'