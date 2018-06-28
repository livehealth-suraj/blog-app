from django.conf.urls import url, include
from rest_framework import routers

from blogs.views import CustomObtainAuthToken
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'blogs', views.BlogViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'auth/', CustomObtainAuthToken.as_view())
]
