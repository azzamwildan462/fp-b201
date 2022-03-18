# Get by Level

Digunakan untuk mencari beberapa user dengan treshold level tertentu. Memberi response berupa username mana aja yang levelnya masuk range treshold

**URL** : `/user/minLevel/:min_level/maxLevel/:max_level`

**URL example** : `/user/minLevel/69/maxLevel/169`

**URL Parameters** : `min_level=[integer]` `max_level=[integer]` dengan syarat keduanya berada di range 0 <= x <= 255

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

> Atau

**Kondisi** : Jika min_level treshold lebih dari max_level treshold

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "min_level must lower than max_level"
}
```

> Atau

**Kondisi** : Jika min_level atau max_level berada di luar 0 - 255

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "min_level and max level must be at 0 - 255"
}
```
