# User Data Schema

```json
{
  "username": "string a-zA-Z0-9",
  "instruments": "string 0-1",
  "skill_level": "integer 0-255",
  "x_coord": "float any",
  "y_coord": "float any",
  "contacts": {
    "whatsapp": "string 0-9",
    "id_line": "string a-zA-Z0-9",
    "instagram": "string a-zA-Z0-9"
  }
}
```

Instruments perlu di-encode seperti pada [ketentuan encode](../../free_for_all/instruments/encode.md)
