# nc-project-backend

Backend for the NorthCoders final project

Note (BC 03/05/2019) - Available photo properties from camera:
height, width, type, fileName, path, longitude, latitude, filesize, uri, isVertical, originalRotation, timestamp

# API

https://site-seeing.herokuapp.com/api

## Users

### Endpoint

https://site-seeing.herokuapp.com/api/users

#### GET | Select users | Accepted queries:

- username
- name
- email
- sort_by=
  - user_id
  - username
  - name
  - email
- order=
  - asc
  - desc

#### GET | Select user | Required parameter:

- /:user_id e.g. https://site-seeing.herokuapp.com/api/users/1

#### POST | Add new user | Required body properties:

- username
- name
- email
- photo_uri

#### DELETE | Remove user | Required parameter:

- /:user_id e.g. https://site-seeing.herokuapp.com/api/users/1

## Sites

### Endpoint

https://site-seeing.herokuapp.com/api/sites

#### GET | Select sites | Accepted queries:

- site_name
- min_latitude
- min_longitude
- min_altitude
- max_latitude
- max_longitude
- max_altitude
- sort_by=
  - site_id
  - site_name
  - latitude_min
  - longitude_min
  - altitude_min
  - latitude_max
  - longitude_max
  - altitude_max
- order=
  - asc
  - desc

#### GET | Select site | Required parameter:

- /:site_id e.g. https://site-seeing.herokuapp.com/api/sites/1

#### POST | Add new site | Required body properties:

- site_name
- latitude_min
- longitude_min
- altitude_min
- latitude_max
- longitude_max
- altitude_max

#### DELETE | Remove site | Required parameter:

- /:site_id e.g. https://site-seeing.herokuapp.com/api/sites/1

## Pins

### Endpoint

https://site-seeing.herokuapp.com/api/pins

#### GET | Select pins | Accepted queries:

- username
- email
- site_name
- min_date
- max_date
- min_latitude
- max_latitude
- min_longitude
- max_longitude
- min_altitude
- max_altitude
- sort_by=
  - pin_id
  - timestamp
  - latitude
  - longitude
  - altitude
  - creator
  - email
  - site_name
- order=
  - asc
  - desc

#### GET | Select pin | Required parameter:

- /:pin_id e.g. https://site-seeing.herokuapp.com/api/pins/1

#### POST | Add new pin | Required body properties:

- user_id
- site_id
- timestamp
- latitude
- longitude
- altitude
- photo_uri
- note

#### DELETE | Remove pin | Required parameter:

- /:pin_id e.g. https://site-seeing.herokuapp.com/api/pins/1
