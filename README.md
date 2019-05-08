# nc-project-backend

Backend for the NorthCoders final project

Note (BC 03/05/2019) - Available photo properties from camera:
height, width, type, fileName, path, longitude, latitude, filesize, uri, isVertical, originalRotation, timestamp

# API

https://site-seeing.herokuapp.com/api

## Users

#### Endpoint

https://site-seeing.herokuapp.com/api/users

#### Accepted Queries

* username
* name
* email
* sort_by=
  * user_id
  * username
  * name
  * email
* order=
  * asc
  * desc

## Sites

#### Endpoint

https://site-seeing.herokuapp.com/api/sites

#### Accepted Queries

* site_name
* min_latitude
* min_longitude
* min_altitude
* max_latitude
* max_longitude
* max_altitude
* sort_by=
  * site_id
  * site_name
  * latitude_min
  * longitude_min
  * altitude_min
  * latitude_max
  * longitude_max
  * altitude_max
* order=
  * asc
  * desc

## Pins

#### Endpoint

https://site-seeing.herokuapp.com/api/pins

#### Accepted Queries

* creator
* email
* site_name
* min_date
* max_date
* min_latitude
* max_latitude
* min_longitude
* max_longitude
* min_altitude
* max_altitude
* sort_by=
  * pin_id
  * timestamp
  * latitude
  * longitude
  * altitude
  * creator
  * email
  * site_name
* order=
  * asc
  * desc