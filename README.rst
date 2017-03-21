=================
G3W-ADMIN-FRONTEND
=================

G3W-ADMIN-FRONTEND fronted portal for g3wsuite.

Installation
------------

Add like git submodule from main g3w-admin directory

::

     git submodule add -f https://<user>@bitbucket.org/gis3w/g3w-admin-frontend.git g3w-admin/frontend


Add 'notes' module to G3W_LOCAL_MORE_APPS config value inside local_settings.py:

::

    G3WADMIN_LOCAL_MORE_APPS = [
        ...
        'frontend'
        ...
    ]



Apply migrations:

To build 'notes' database:

::

    ./manage.py migrate frontend


To activate 'frontend' module and to set the forntend in to local_settings.py:

::

    FRONTEND = True
    FRONTEND_APP = 'frontend'

