# Login

Digunakan untuk mendapat token bagi user yang sudah registrasi

**URL** : `/user/login`

**Method** : `POST`

**Auth required** : NO

**Data constraints** :

```json
{
    "username": "[text and number ONLY]",
    "password": "[password in plain text]"
}
```

**Data example** :

```json
{
    "username": "welldone72",
    "password": "thisIsASecretPassword"
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "message": "Login success"
}
```
Selain itu juga ada token pada bagian header
```json
{
    "Authorization": "There is fucking secret token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndlbGxkb25lNzIiLCJpYXQiOjE2NDc1MDg3ODQsImV4cCI6MTY0NzUxMDU4NH0.i9UUJsgrzs4ME6DXm8mvGsgb6Y5fK3Fy3fQS29613lc"
}
```

## Error Response

**Kondisi** : Jika password yang dimasukkan tidak cocok dengan yang ada di database

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Invalid Password!"
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

> Atau

**Kondisi** : Jika body tidak berisi username dan password

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Insert Username!"
}
```

> Atau

**Kondisi** : JSON body yang diberikan tidak valid

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Insert Username!"
}
```
