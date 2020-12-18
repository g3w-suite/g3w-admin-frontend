# G3W-ADMIN-FRONTEND

G3W-ADMIN fronted portal for G3W-SUITE.

![Portal GUI](frontend.png)

## Installation

* Clone the [g3w-suite-docker repository](https://github.com/g3w-suite/g3w-suite-docker)

* Follow the instructions specified in the repo for running the containers i.e `docker-compose up -d` 

* Exec into the running `g3w-suite` container. 

```
docker-compose exec g3w-suite bash
```


**NB:** The g3w-suite container already sets the working directory as `/code`


* Add the frontend app using  git submodule.

```bash
git submodule add -f https://github.com/g3w-suite/g3w-admin-frontend.git  g3w-admin/frontend

```

* Modify the settings_docker.py in your local repository to Add `frontend` module to G3W_LOCAL_MORE_APPS config value. The path to setting file is [local_settings.py](https://github.com/g3w-suite/g3w-suite-docker/blob/dev/config/g3w-suite/settings_docker.py):

**NB:** Since local_settings.py is host mounted as a volume the changes are read instantly.

```
G3WADMIN_LOCAL_MORE_APPS = [
    ...
    'frontend'
    ...
]
```

* Whilst inside the running container of  `g3w-suite` container makemigrations, migrate and collect static

In order to run the management command you need to set the display. Run the following

```
export DISPLAY=:99
```
then run the following

```bash
python3 manage.py makemigrations frontend
python3 manage.py migrate frontend
python3 manage.py collectstatic --noinput
```


* Modify the settings_docker.py in your local repository to activate `frontend` module. The path to setting file is [local_settings.py](https://github.com/g3w-suite/g3w-suite-docker/blob/dev/config/g3w-suite/settings_docker.py):

```python
...
FRONTEND = True
FRONTEND_APP = 'frontend'
...
```

* Logout of the running g3w-suite container. 

* Navigate to the URL specified by the docker-compose: 
http://localhost:8080
