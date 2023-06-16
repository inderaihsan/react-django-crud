# Generated by Django 4.2.1 on 2023-06-15 14:53

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("bookstore", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="library",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=30)),
                ("address", models.CharField(max_length=30)),
                ("phone_number", models.CharField(max_length=30)),
                ("email", models.CharField(max_length=30)),
            ],
            options={"db_table": "library",},
        ),
        migrations.CreateModel(
            name="available_books",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_date", models.DateField(default=django.utils.timezone.now)),
                (
                    "books",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="bookstore.books",
                    ),
                ),
                (
                    "library",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="bookstore.library",
                    ),
                ),
            ],
            options={"db_table": "registration",},
        ),
    ]
