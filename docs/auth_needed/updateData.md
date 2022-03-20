# Update

Digunakan untuk mendapat token bagi user yang sudah registrasi

**URL** : `/user/:uname/update`

**Method** : `POST`

**Auth required** : YES

**Data constraints** :
Ketentuan data ada pada [data_schema](assets/dataSchema.md). Data-data nya boleh diisi boleh tidak. Untuk Token bisa diletakkan pada header.

```json
{
  "Authorization": "There is fucking secret token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndlbGxkb25lNzIiLCJpYXQiOjE2NDc1MDg3ODQsImV4cCI6MTY0NzUxMDU4NH0.i9UUJsgrzs4ME6DXm8mvGsgb6Y5fK3Fy3fQS29613lc"
}
```

**Data example** :

```json
{
  "username": "myg",
  "instruments": "1101010",
  "skill_level": "255",
  "x_coord": "123.12",
  "y_coord": "234.34",
  "contacts": {
    "whatsapp": "085273928310",
    "id_line": "loveyou",
    "instagram": "imfuckingloveyou"
  }
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
  "contacts": {
    "id_line": "genjih",
    "whatsapp": "08221233289"
  },
  "_id": "6236a84e4fd88fe523dd2aa8",
  "skill_level": 123,
  "username": "lagi",
  "__v": 0,
  "instruments": "10011011",
  "x_coord": 345.1,
  "y_coord": 23
}
```

## Error Response

**Kondisi** : Jika Username telah diganti namun lupa belum re-log

**Code** : `403 UNAUTHORIZED`

**Content** :

```json
{
  "message": "Update data failed, maybe username has changed?"
}
```

> Atau

**Kondisi** : Jika salah token

**Code** : `403 UNAUTHORIZED`

**Content** :

```json
{
  "message": "There is an error, maybe invalid token??"
}
```

> Atau

**Kondisi** : Jika format body value tidak memenuhi ketentuan seperti tersebut diatas, maka akan muncul pesan kesalahan argument yang salah. Contoh ketika salah format instruments

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "message": "Invalid Instruments format!"
}
```
