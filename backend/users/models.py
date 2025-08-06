from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, name, lastName, password=None):
        if not email:
            raise ValueError("Kullanıcıların bir e-posta adresi olmalı.")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, lastName=lastName)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, lastName, password):
        user = self.create_user(email, name, lastName, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    favorites = models.ManyToManyField('listings.Listing', related_name='favorited_by', blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'lastName']

    def __str__(self):
        return f"{self.name} {self.lastName}"


class Message(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)  # True ise mesaj admin'den gelmiştir

    def __str__(self):
        return f"{'Admin' if self.is_admin else self.sender.email}: {self.content[:20]}"
