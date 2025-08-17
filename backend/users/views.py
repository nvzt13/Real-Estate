from listings.models import Listing

from .models import CustomUser, Message

from .serializers import CustomUserSerializer, MessageSerializer, MyTokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

import logging

logger = logging.getLogger(__name__)


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def toggle_favorite(self, request, pk=None):
        logger.debug(f"Request data: {request.data}")
        # logger.debug(f"Request body: {request.body}")  # Bu satır kaldırıldı, çünkü body ikinci kez okunamaz.

        user = self.get_object()
        listing_id = request.data.get('listing_id')

        if not listing_id:
            return Response({'error': 'listing_id gerekli.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            listing = Listing.objects.get(pk=listing_id)
        except Listing.DoesNotExist:
            return Response({'error': 'İlan bulunamadı.'}, status=status.HTTP_404_NOT_FOUND)

        if listing in user.favorites.all():
            user.favorites.remove(listing)
            return Response({'message': 'Favorilerden çıkarıldı.'})
        else:
            user.favorites.add(listing)
            return Response({'message': 'Favorilere eklendi.'})
            
            
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def favorites(self, request):
        user = request.user
        favorites = user.favorites.all()
        from listings.serializers import ListingSerializer
        serializer = ListingSerializer(favorites, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None
    ):
        user = self.get_object()
        messages = Message.objects.filter(sender=user) | Message.objects.filter(is_admin=True)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(sender=user) | Message.objects.filter(is_admin=True)
    
    def perform_create(self, serializer):
        is_admin = self.request.user.is_staff
        serializer.save(sender=self.request.user, is_admin=is_admin)
