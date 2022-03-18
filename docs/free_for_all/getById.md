# Get by Username

Digunakan untuk mendapatkan informasi seorang user. Memberi response berupa informasi yang dimiliki oleh seorang user

**URL** : `/user/:uname`

**URL example**: `/user/welldone72`

**URL Parameters** : `uname=[string]` dengan syarat hanya diperbolehkan huruf abjad dan angka

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "_id": "62299ec796e446c72ac2b618",
    "skill_level": 100,
    "username": "serius",
    "__v": 0,
    "instruments": "Vocal, ",
    "x_coord": 100,
    "y_coord": 123
}
```

## Error Response

**Kondisi** : Ketika user belum meng-update datanya

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "message": "This user has not update his data"
}
```

> Atau

**Kondisi** : Jika user tidak ada di database

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "message": "Username not found"
}
```
