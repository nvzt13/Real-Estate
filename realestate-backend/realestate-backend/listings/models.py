from django.db import models

# Create your models here.

class Listing(models.Model):
    LISTING_TYPES = (
        ('car', 'Araba'),
        ('house', 'Ev'),
        ('land', 'Arsa'),
    )

    title = models.CharField(max_length=200)                # İlan başlığı
    description = models.TextField()                        # Açıklama
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Fiyat
    listing_type = models.CharField(max_length=10, choices=LISTING_TYPES)  # Tür seçimi
    created_at = models.DateTimeField(auto_now_add=True)    # Oluşturulma zamanı
    updated_at = models.DateTimeField(auto_now=True)        # Güncellenme zamanı
    image = models.ImageField(upload_to='listings/', null=True, blank=True)  # Resim

    def __str__(self):
        return self.title
