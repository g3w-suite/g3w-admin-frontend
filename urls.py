from django.conf.urls import url
from .views import *

urlpatterns = [

    url(r'^$', FrontendView.as_view(), name='frontend'),
    url(r'^jx/login/$', LoginAjaxView.as_view(), name='frontend-ajax-login'),
]
