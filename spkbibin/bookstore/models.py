from django.db import models
from django.utils.timezone import now

class books(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    year = models.CharField(max_length=100)
    price = models.CharField(max_length=100) 
    
    class Meta : 
        db_table = 'books'
        
class library(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    email = models.CharField(max_length=100) 
    
    class Meta : 
        db_table = 'library' 

class available_books(models.Model) : 
    books = models.ForeignKey(books, on_delete=models.CASCADE)
    library = models.ForeignKey(library, on_delete=models.CASCADE) 
    created_date = models.DateField(default=now) 
    class Meta : 
        db_table = 'registration' 

