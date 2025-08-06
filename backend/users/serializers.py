from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'lastName', 'email']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # İstersen token içine kullanıcı bilgisi ekleyebilirsin:
        token['name'] = user.name
        token['email'] = user.email
        return token

    def validate(self, attrs):
        # JWT default olarak "username" bekler, sen email kullanıyorsun
        attrs['username'] = attrs.get('email')
        return super().validate(attrs)
