# Dokumentasi REST API

API dibuat menggunakan NodeJS [https server](https://nodejs.org/api/https.html). Hanya menerima request dan response berupa [JSON](https://www.json.org/json-en.html).

**IP**: `13.70.25.101`

## Endpoint terbuka

Endpoint ini tidak memerlukan Autentikasi

- [Login](free_for_all/login.md) : `POST /user/login`
- [Register](free_for_all/register.md) : `POST /user/register`
- [Get User Info](free_for_all/getById.md) : `GET /user/:uname`
- [Get Nearby Users](free_for_all/getNearby.md) : `GET /user/:uname/findNearby/:treshold`
- [Get Users by Level](free_for_all/getByLevel.md) : `GET /user/minLevel/:min_level/maxLevel/:max_level`
- [Get Users by Instruments](free_for_all/getByInstruments.md) : `GET /user/findByInstruments/:instruments_binary`
- [Get Users with Many Parameters](free_for_all/getWithManyParams.md) : `GET /user/:uname/findNearby/:treshold/findByInstruments/:instruments/minLevel/:min_level/maxLevel/:max_level`

## Endpoint yang memerlukan autentikasi

Endpoint ini memerlukan token yang valid yang diletakkan pada header dari request. Token didapatkan dari endpoint login atau endpoint register. Token yang digunakan adalah JWT.

- [Update User Data](user/patch.md) : `PUT /user/:uname/update`
- [Delete User](user/delete.md) : `DELETE /user/:uname/update`

## Penggunaan Docker

[Docker](./docker/docker.md)
