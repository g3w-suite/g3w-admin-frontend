from django.urls import path
from .views import *

urlpatterns = [

    path('', FrontendView.as_view(), name='frontend'),
    path('jx/login/', LoginAjaxView.as_view(), name='frontend-ajax-login'),
]
