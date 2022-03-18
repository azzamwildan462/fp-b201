# Get with Many Parameters

Digunakan untuk mencari user dengan beberapa parameter sekaligus. Pencarian disini menggunakan logika OR. Memberikan response berupa semua hasilnya. 

**URL** : `/user/:uname/findNearby/:treshold/findByInstruments/:instruments/minLevel/:min_level/maxLevel/:max_level`

**URL example** : `/user/wildan/findNearby/12345/findByInstruments/Bass-drum/minLevel/12/maxLevel/123`

**URL Parameters** : `uname=[string]` dengan syarat harus huruf abjad atau angka. `treshold=[integer]` radius pencarian. `instruments=[string]` berdasarkan hasil dari [encode](instruments/encode.md). `min_level, max_level = [integer]` berada pada range 0 - 255

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    [
        "ika1",
        "ika972",
        "serius123",
        "tes123",
        "wildan"
    ],
    [
        "ika1",
        "ika972",
        "tes123",
        "wildan"
    ],
    [
        "serius",
        "serius123"
    ]
}
```

## Error Response

Semua error response sama dengan yang ada pada [getNearby](getNearby.md), [getByInstruments](getByInstruments.md), dan [getByLevel](getByLevel.md)
