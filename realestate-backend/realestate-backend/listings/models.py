from django.db import models

class Listing(models.Model):
    LISTING_TYPES = (
        ('car', 'Araba'),
        ('house', 'Ev'),
        ('land', 'Arsa'),
    )

    title = models.CharField(max_length=200)                # İlan başlığı
    description = models.TextField()                        # Açıklama
    price = models.DecimalField(max_digits=12, decimal_places=2)  # Fiyat
    listing_type = models.CharField(max_length=10, choices=LISTING_TYPES)  # Tür
    label = models.CharField(max_length=50, null=True, blank=True)         # Öne çıkan vs.
    location = models.CharField(max_length=200, null=True, blank=True)     # Konum metni
    latitude = models.FloatField(null=True, blank=True)                    # Enlem
    longitude = models.FloatField(null=True, blank=True)                  # Boylam
    image_main = models.URLField(null=True, blank=True)                  # Ana görsel (URL)
    images = models.JSONField(null=True, blank=True)                     # Diğer görseller (URL listesi)
    specs = models.JSONField(null=True, blank=True)                      # Özellikler JSON (oda, alan vs.)
    created_at = models.DateTimeField(auto_now_add=True)                # Oluşturma zamanı
    updated_at = models.DateTimeField(auto_now=True)                    # Güncellenme zamanı

    def __str__(self):
        return self.title
