from django.db import models

class Listing(models.Model):
    CATEGORY_CHOICES = (
        ('araba', 'Araba'),
        ('ev', 'Ev'),
        ('arsa', 'Arsa'),
    )

    TYPE_CHOICES = (
        ('Satılık', 'Satılık'),
        ('Kiralık', 'Kiralık'),
    )

    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)  # 'araba', 'ev', 'arsa'
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)          # 'Satılık', 'Kiralık'

    title = models.CharField(max_length=200)                
    description = models.TextField()                        
    price = models.DecimalField(max_digits=12, decimal_places=2)  
    
    location = models.CharField(max_length=200, null=True, blank=True)     

    image_main = models.URLField(null=True, blank=True)                  
    images = models.JSONField(null=True, blank=True)                     

    coordinates = models.JSONField(null=True, blank=True)  # [longitude, latitude]
    specs = models.JSONField(null=True, blank=True)                      

    created_at = models.DateTimeField(auto_now_add=True)                
    updated_at = models.DateTimeField(auto_now=True)                    

    def __str__(self):
        return self.title
