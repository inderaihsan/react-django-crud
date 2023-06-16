from django.urls import path
from . import views
urlpatterns = [
    path("init", views.init),
    path("read_books", views.read_books),
    path("get_books/<str:book_id>", views.get_books),
    path("delete_books", views.delete_books),
    path("create_books", views.create_books),
    path("update_book", views.update_book),
     path("read_library", views.read_library),
    path("get_library/<str:library_id>", views.get_library),
    path("delete_library", views.delete_library),
    path("create_library", views.create_library),
    path("update_library", views.update_library),
    path("registerbookstolibrary", views.registerbookstolibrary),

]
