from listings.models import Listing
from .models import CustomUser
from .serializers import CustomUserSerializer
from .serializers import MyTokenObtainPairSerializer
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
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def favorites(self, request, pk=None):
        user = self.get_object()
        favorites = user.favorites.all()  # ManyToMany ilişkisi üzerinden favoriler
        from listings.serializers import ListingSerializer
        serializer = ListingSerializer(favorites, many=True)
        return Response(serializer.data)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
