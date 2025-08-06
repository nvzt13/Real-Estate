from .models import CustomUser
from .serializers import CustomUserSerializer
from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def toggle_favorite(self, request, pk=None):
        user = self.get_object()  # Bu kullanıcı pk ile eşleşen user olur
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
            
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
