from django.views.generic import TemplateView
from django.contrib.auth.models import AnonymousUser
from guardian.shortcuts import get_objects_for_user
from core.models import Group


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
        return cdata