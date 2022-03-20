# Delete

Digunakan untuk menghapus user dan datanya

**URL** : `/user/:uname/update`

**Method** : `POST`

**Auth required** : YES

**Data constraints** :
Untuk Token bisa diletakkan pada header.

```json
{
  "Authorization": "There is fucking secret token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndlbGxkb25lNzIiLCJpYXQiOjE2NDc1MDg3ODQsImV4cCI6MTY0NzUxMDU4NH0.i9UUJsgrzs4ME6DXm8mvGsgb6Y5fK3Fy3fQS29613lc"
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

## Error Response

**Kondisi** : Jika Username tidak ada di database

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "message": "Username not Found"
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
