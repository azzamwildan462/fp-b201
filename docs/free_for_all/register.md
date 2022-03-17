# Register

Digunakan untuk mendaftarkan user baru, yang nantinya user tersebut bisa mengganti seluruh data-data miliknya.

**URL** : `user/register`

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
    "password": "iLoveYouMayyyyy"
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "message": "Register success"
}
```
Selain itu juga ada token pada bagian header
```json
{
    "Authorization": "There is fucking secret token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndlbGxkb25lNzIiLCJpYXQiOjE2NDc1MDg3ODQsImV4cCI6MTY0NzUxMDU4NH0.i9UUJsgrzs4ME6DXm8mvGsgb6Y5fK3Fy3fQS29613lc"
}
```

## Error Response

**Kondisi** : Jika password kurang dari 8 karakter 

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Password too short"
}
```
> Atau

**Kondisi** : Jika password lebih dari 255 karakter 

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Password too long"
}
```

> Atau

**Kondisi** : Jika username tidak diberikan/kosong

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Insert Username!"
}
```

> Atau

**Kondisi** : Jika username berisi karakter selain abjad dan angka

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Invalid Username!"
}
```

> Atau

**Kondisi** : Jika username yang diberikan sudah ada di DB

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Username has been used"
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
