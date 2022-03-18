# Get by Level

Digunakan untuk mencari beberapa user terdekat. Memiliki 2 parameter yaitu user target dan treshold jaraknya. Memberikan response berupa nama-nama user yang berada di dalam treshold tersebut.

**URL** : `/user/:uname/findNearby/:treshold`

**URL example** : `/user/user123/findNearby/10`

**URL Parameters** : `uname=[string]` dengan syarat harus huruf abjad atau angka. `treshold=[integer]` radius pencarian 

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "serius",
    "serius123",
    "tes123",
    "wildan"
}
```

## Error Response

**Kondisi** : Jika tidak ada user yang berada di range treshold

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "message": "There is no users on that treshold"
}
```
