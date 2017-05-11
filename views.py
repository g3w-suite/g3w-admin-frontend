from django.views.generic import TemplateView
from django.views.generic.edit import BaseFormView
from django.http import JsonResponse
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login as auth_login
from guardian.shortcuts import get_objects_for_user
from core.models import Group, GeneralSuiteData
from core.mixins.views import AjaxableFormResponseMixin
from .configs import home_images
import random


class LoginAjaxView(BaseFormView):

    form_class = AuthenticationForm

    def form_invalid(self, form):
        return JsonResponse({'status': 'error', 'errors_form': form.errors})

    def form_valid(self, form):
        auth_login(self.request, form.get_user())
        return JsonResponse({'status': 'ok', 'message': 'Login'})


'''
def _login(request):
    """
    View to do ajax login.
    """
    if request.method == 'POST':
        login_form = AuthenticationForm(request, request.POST)
        response_data = {}
        if login_form.is_valid():
            response_data['result'] = 'Success!'
            response_data['message'] = 'You"re logged in'
        else:
            response_data['result'] = 'failed'
            response_data['message'] = 'You messed up'

       return JsonResponse
'''


class FrontendView(TemplateView):

    template_name = 'frontend/index.html'

    def get(self, request, *args, **kwargs):
        self.request = request
        return TemplateView.get(self, request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        cdata = super(FrontendView, self).get_context_data(**kwargs)

        # add anonimous user to the context data
        # we get groups with base on permissions
        cdata['anonimoususer'] = AnonymousUser()
        cdata['groups'] = get_objects_for_user(self.request.user, 'core.view_group', Group).order_by('name') \
                 | get_objects_for_user(cdata['anonimoususer'], 'core.view_group', Group).order_by('name')
        '''
        for group in groups:
            groupObj = dict()
            groupObj['group'] = group
            projects_viewable = get_objects_for_user(self.request.user, 'projects.view_project', Project).order_by(
                'name') | get_objects_for_user(cdata['anonimoususer'], 'projects.view_project', Project).order_by(
                'name')
            if projects_viewable.count() > 0:
                groupObj['group_view'] = True
            else:
                groupObj['group_view'] = False
            groupObj['projects'] = group.project_set.all()
            cdata['groups'].append(groupObj)
        '''

        # get data from generaldata
        cdata['generaldata'] = GeneralSuiteData.objects.get()

        # get home images data
        cdata['home_image'] = random.choice(home_images)

        return cdata