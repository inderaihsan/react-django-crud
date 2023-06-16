from django.shortcuts import render
from django.shortcuts import render
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from . models import books , library , available_books
from . serializers import book_serializer, available_book_serializer, library_serializer
# Create your views here.
@api_view(['GET'])
def init(request) : 
    return Response({
        'status' : 200, 
        'data' : 'hello world', 
        'message' : "this is an initial api apps"
    })  

@api_view(['GET'])
def read_books(request) : 
    all_books = books.objects.all() 
    serialized_books = book_serializer(all_books, many = True).data 
    return Response({'status' : 200, 
                     'data' : serialized_books,
                     'message' : 'data fetched!'})
    
@api_view(['GET'])
def get_books(request, book_id) : 
    exist = books.objects.filter(id = book_id).exists()
    if (exist == True) : 
        library_exist = available_books.objects.filter(books_id = book_id).exists() 
        available_library = []
        if (library_exist) : 
            available_library_id = list(available_books.objects.filter(books_id = book_id).values_list('library_id', flat=True))
            available_library = library.objects.filter(id__in=available_library_id) 
            available_library = library_serializer(available_library, many = True).data 
        fetched_books = books.objects.get(id = book_id) 
        serialized_book = book_serializer(fetched_books, many = False).data
        return Response({'status' : 200, 
                        'data' : serialized_book,
                        'library_data' : available_library,
                        'message' : 'data fetched!'}) 
    else :
         return Response({'status' : 404, 
                        'data' : [],
                        'message' : 'no matching query!'}) 
        
@api_view(['POST'])
def delete_books(request) : 
    book_id = request.data['book_id'] 
    books.objects.get(id = book_id).delete() 
    return Response({
        'message' : 'Done', 
        'status' : 200, 
        'data' : []
    }) 

@api_view(['POST']) 
def create_books(request) :    
    title = request.data["title"]
    author = request.data["author"]
    year = request.data["year"]
    price = request.data["price"] 
    new_instance = books(title = title, year = year, author = author, price = price)
    new_instance.save()
    return Response({
        'message' : 'Done', 
        'status' : 200, 
        'data' : []
    }) 
      
@api_view(['POST']) 
def update_book(request) :    
    book_id = request.data['book_id']
    title = request.data["title"]
    author = request.data["author"]
    year = request.data["year"]
    price = request.data["price"] 
    books.objects.filter(id = book_id).update(id = book_id, title = title, author = author, year = year, price = price) 
    
    # new_instance = library(title = title, year = year, author = author, price = price)
    # new_instance.save()
    return Response({
        'message' : 'Done', 
        'status' : 200, 
        'data' : []
    }) 
    


@api_view(['GET'])
def read_library(request) : 
    all_library = library.objects.all() 
    serialized_library = library_serializer(all_library, many = True).data 
    return Response({'status' : 200, 
                     'data' : serialized_library,
                     'message' : 'data fetched!'})
    
@api_view(['GET'])
def get_library(request, library_id) : 
    exist = library.objects.filter(id = library_id).exists()
    if (exist == True) : 
        fetched_library = library.objects.get(id = library_id) 
        serialized_library = library_serializer(fetched_library, many = False).data
        return Response({'status' : 200, 
                        'data' : serialized_library,
                        'message' : 'data fetched!'}) 
    else :
         return Response({'status' : 404, 
                        'data' : [],
                        'message' : 'no matching query!'}) 
        
@api_view(['POST'])
def delete_library(request) : 
    library_id = request.data['library_id'] 
    library.objects.get(id = library_id).delete() 
    return Response({
        'message' : 'Done', 
        'status' : 200, 
        'data' : []
    }) 

@api_view(['POST']) 
def create_library(request) :    
    name = request.data["name"]
    address = request.data["address"]
    phone_number = request.data["phone_number"]
    email = request.data["email"] 
    new_instance = library(name = name, address = address, phone_number = phone_number, email = email)
    new_instance.save()
    return Response({
        'message' : 'Done', 
        'status' : 200, 
        'data' : []
    }) 
      
@api_view(['POST']) 
def update_library(request) :    
    library_id = request.data['library_id']
    name = request.data["name"]
    address = request.data["address"]
    phone_number = request.data["phone_number"]
    email = request.data["email"] 
    library.objects.filter(id = library_id).update(id = library_id, name=name, address = address, phone_number = phone_number, email = email) 
    
    # new_instance = books(title = title, year = year, author = author, price = price)
    # new_instance.save()
    return Response({
        'message' : 'Done', 
        'status' : 200, 
        'data' : []
    }) 
    
@api_view(['POST']) 
def registerbookstolibrary(request) : 
    library_id = request.data['library_id']
    books_id = request.data['book_id'] 
    lib = library.objects.get(id = library_id) 
    book = books.objects.get(id = books_id) 
    is_exist = available_books.objects.filter(library = lib, books = book).exists()
    if(not is_exist) : 
        available_books.objects.create(
        library = lib, 
        books = book
        ) 
    else : 
        pass
    return Response({
        'message' : 'Done', 
        'status' : 200, 
        'data' : []
    }) 
    
