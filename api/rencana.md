Rencana data para musisi

Tujuan:

- user A mencari beberapa user sesuai yang dia inginkan..

Skema:

```
 user:
	id: (unsigned int)(unik), ??, Kalo MongoDB udah otomatis
	nama: (str)(unik)
	alat: (array int)
	skill_level: (uint8_t)
	koordinat_x: (float) (ini dari map)
	koordinat_y: (float) (ini dari map)
	id_line: (str)
```

Func:

- POST create user
- PUT update user
- DELETE hapus user
- GET 1 user by nama
- GET beberapa user terdekat (iki penting)
- GET beberapa user dengan treshold skill level sekian.. (iki penting)
- GET beberapa user dengan alat ini ini ini.. (pentign juga)
- GET dengan custom filter (gabungan dari atas)

Rencana:

- PHP vs node js??
- MySQL vs MongoDB

Ctt:

- JWT ->
