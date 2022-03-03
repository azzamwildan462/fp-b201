# Jawaban dan How to Solve

Solved -> 12  
Total point -> 915

1. Obedient Cat **5 pts**

```
- cat flag
```

2. Mod 26 **10 pts**

```
- decrpyt ROT13
```

3. Lets Warm Up **50 pts**

```
- Lihat ASCII tabel dengan hexa 70
- Masukkan ke flag -> picoCFT{p}
```

4. what's a net cat? **100 pts**

```
- nc jupiter.challenges.picoctf.org 64287
- Flag -> picoCTF{nEtCat_Mast3ry_284be8f7}
```

5. First Grep **100 pts**

```
- cat file | grep pico
- Flag -> picoCTF{grep_is_good_to_find_things_dba08a45}
```

6. strings it **100 pts**

```
- strings -a strings | grep pico
- flag -> picoCTF{5tRIng5_1T_827aee91}
```

7. Insp3ct0r **50 pts**

```
- Inspect element agar bisa melihat html dan script js nya
- Untuk css nya tinggal akses melalui /mycss.css
- Lalu urutkan HTML -> CSS -> JS menjadi picoCTF{tru3_d3t3ct1ve_0r_ju5t_lucky?832b0699}
```

8. Glitch Cat **100 pts**

```
- nc saturn.picoctf.net 52680 >> temp.py
- masukkan ke perintah 'print()'
- flag -> picoCTF{gl17ch_m3_n07_bda68f75}
```

9. PW Crack 1 **100 pts**

```
- Melihat source code level1.py pada fungsi level_1_pw_check()
- Masukkan password nya
- flag -> picoCTF{545h_r1ng1ng_ccbfafcb}
```

10. PW Crack 2 **100 pts**

```
- Melihat source code level2.py
- Pada fungsi level_2_pw_check(), dicocokkan antara user input dengan yang ada di source code
- print password dari source code melalui python
- flag -> picoCTF{tr45h_51ng1ng_a3e28409}
```

11. PW Crack 5 **100 pts**

```
- Melihat source code level5.py
- Bruteforece password dengan kemungkinan password yang ada di dictionary.txt
- flag -> picoCTF{h45h_sl1ng1ng_492b0b61}
```

12. Serpentine **100 pts**

```
- micro serpentine.py
- print_flag(); return
- flag -> picoCTF{7h3_r04d_l355_7r4v3l3d_ae0b80bd}
```

13. asdasd

```
- Pertama saya mencoba beberapa flag dari perintah
tshark -nr shark2.pcapng -Y 'frame contains "picoCTF"' -T fields -e text | awk -F, '{print $4}'
ternyata tidak ada yang bisa
- Lalu saya cari lagi
```
