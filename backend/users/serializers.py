from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'lastName', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)  # 🔹 şifreyi hashle
        user.save()
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'  # Doğrudan string olarak yaz

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
    