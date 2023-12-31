# Generated by Django 4.2.1 on 2023-06-15 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bookstore", "0002_library_available_books"),
    ]

    operations = [
        migrations.AlterField(
            model_name="books", name="author", field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="books", name="price", field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="books", name="title", field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="books", name="year", field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="library",
            name="address",
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="library", name="email", field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="library", name="name", field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="library",
            name="phone_number",
            field=models.CharField(max_length=100),
        ),
    ]
