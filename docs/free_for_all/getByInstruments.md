# Get by Instruments

Digunakan untuk mencari user siapa saja yang bisa alat-alat musik tertentu. Memberikan response berupa nama-nama user yang bisa alat-alat musik sesuai yang ingin dicari. Memiliki 2 tipe URL

**URL** : `/user/findByInstruments/:instruments`

**URL example**: `/user/findByInstruments/Bass-Drum-Vocal`

**URL** : `/user/findByInstruments/:instruments_binary`

**URL example**: `/user/findByInstruments/0101100`


**URL Parameters** : `instruments=[string]` dengan syarat hanya diperbolehkan huruf abjad dan tanda hubung '-'. Penulisan nama alat musik sesuai [aturan penulisan](https://kids.grid.id/read/472703918/penyebutan-nama-alat-musik-dalam-bahasa-inggris-beserta-artinya?page=all). `instruments_binary=[bool]` didapat dari [encode](instruments/encode.md)

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "ika1",
    "ika972",
    "tes123",
    "wildan"
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
