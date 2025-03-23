from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import UserSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        tokens = {
            'access': data['access'],
            'refresh': data['refresh'],
        }

        user = self.user
        user_serializer = UserSerializer(user)
        return {
            'tokens': tokens,
            'user': user_serializer.data,
        }


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
