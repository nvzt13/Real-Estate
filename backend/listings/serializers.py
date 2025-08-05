from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        required=True,
        allow_blank=False,
        error_messages={
            "blank": "Başlık boş bırakılamaz.",
            "required": "Başlık alanı zorunludur."
        }
    )

    price = serializers.DecimalField(
        max_digits=12,
        decimal_places=2,
        required=True,
        error_messages={
            "blank": "Fiyat boş bırakılamaz.",
            "required": "Fiyat zorunludur.",
            "invalid": "Geçerli bir fiyat giriniz."
        }
    )

    category = serializers.ChoiceField(
        choices=Listing.CATEGORY_CHOICES,
        required=True,
        error_messages={
            "required": "Kategori zorunludur.",
            "invalid_choice": "Geçerli bir kategori seçiniz."
        }
    )

    type = serializers.ChoiceField(
        choices=Listing.TYPE_CHOICES,
        required=True,
        error_messages={
            "required": "İlan tipi zorunludur.",
            "invalid_choice": "Geçerli bir ilan tipi seçiniz."
        }
    )

    location = serializers.CharField(
        required=False,
        allow_blank=True,
        error_messages={
            "invalid": "Geçerli bir konum giriniz."
        }
    )

    image = serializers.URLField(
        required=False,
        allow_blank=True,
        error_messages={
            "invalid": "Geçerli bir resim URL’si giriniz."
        }
    )

    images = serializers.JSONField(
        required=False,
        error_messages={
            "invalid": "Görseller JSON formatında sağlanmalıdır."
        }
    )

    coordinates = serializers.JSONField(
        required=False,
        error_messages={
            "invalid": "Koordinatlar JSON formatında olmalıdır."
        }
    )

    specs = serializers.JSONField(
        required=False,
        error_messages={
            "invalid": "Özellikler JSON formatında bir sözlük olmalıdır."
        }
    )

    class Meta:
        model = Listing
        fields = '__all__'

    # Özel alan doğrulamaları
    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Fiyat pozitif bir değer olmalıdır.")
        return value

    def validate_title(self, value):
        if len(value.strip()) < 4:
            raise serializers.ValidationError("Başlık en az 10 karakter olmalıdır.")
        return value

    def validate_coordinates(self, value):
        if value is not None:
            if not isinstance(value, list) or len(value) != 2:
                raise serializers.ValidationError("Koordinatlar [longitude, latitude] şeklinde bir liste olmalıdır.")
        return value

    def validate_images(self, value):
        if value is not None:
            if not isinstance(value, list) or not all(isinstance(img, str) for img in value):
                raise serializers.ValidationError("Görseller bir liste olarak sağlanmalı ve her öğe bir URL olmalıdır.")
        return value

    def validate_specs(self, value):
        if value is not None and not isinstance(value, dict):
            raise serializers.ValidationError("Özellikler bir sözlük (dict) olarak sağlanmalıdır.")
        return value
