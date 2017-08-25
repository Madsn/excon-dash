from django.conf.urls import url

from rest_framework.authtoken import views as drf_views
from rest_framework.authtoken.views import obtain_auth_token


app_name = 'excon_service_rest'
urlpatterns = [
    url(r'^auth$', drf_views.obtain_auth_token, name='auth'),
    url(r'^obtain-auth-token/$', obtain_auth_token)
]
