# Formularz kontaktowy — agencja-copywriterska.pl

## Architektura

```
[Przeglądarka] 
    │
    ├──POST /presign──→ [API Gateway] → [Lambda: presign] → Generuje presigned URL
    │                                                            │
    ├──PUT (plik)─────→ [S3: agencja-copywriterska-attachments] ←┘
    │
    └──POST /contact──→ [API Gateway] → [Lambda: contact] → [SES: email]
                                              │                    │
                                              └── Generuje linki ──┘
                                                  do pobrania z S3
                                                  (ważne 7 dni)
```

## Zawartość

```
├── astro-page/
│   └── kontakt.astro          ← Strona kontaktowa → src/pages/kontakt.astro
├── aws-lambdas/
│   ├── presign-upload/        ← Lambda generująca presigned URL
│   │   ├── index.mjs
│   │   └── package.json
│   └── contact-form/          ← Lambda obsługująca formularz + SES
│       ├── index.mjs
│       └── package.json
├── setup-aws.sh               ← Jednorazowy setup całej infrastruktury
├── update-lambdas.sh          ← Szybka aktualizacja kodu Lambda
└── README.md
```

## Deployment krok po kroku

### 1. Uruchom setup AWS

```bash
chmod +x setup-aws.sh
./setup-aws.sh
```

Skrypt stworzy: S3 bucket, IAM role, 2 Lambdy, API Gateway, weryfikację SES.

### 2. Skonfiguruj DNS (SES)

Skrypt wyświetli rekordy DNS do dodania:
- **TXT** — weryfikacja domeny SES
- **3x CNAME** — DKIM
- **MX + TXT** — MAIL FROM (opcjonalne)

### 3. Wyjdź z SES sandbox

W konsoli AWS SES → Account Dashboard → Request production access.
Dopóki jesteś w sandbox, możesz wysyłać maile TYLKO na zweryfikowane adresy.

### 4. Skopiuj API URL

Skrypt wyświetli URL API Gateway, np:
```
https://abc123xyz.execute-api.eu-north-1.amazonaws.com
```

### 5. Zaktualizuj kontakt.astro

W pliku `kontakt.astro` zmień:
```javascript
const API_URL = 'https://TWOJE_API_ID.execute-api.eu-north-1.amazonaws.com';
```

### 6. Skopiuj stronę do projektu

```bash
cp astro-page/kontakt.astro /path/to/agencja-copywriterska/src/pages/kontakt.astro
```

### 7. Build & deploy

```bash
npm run build
```

## Aktualizacja kodu Lambda

Po zmianach w kodzie Lambda:
```bash
./update-lambdas.sh all       # obie
./update-lambdas.sh presign   # tylko presign
./update-lambdas.sh contact   # tylko contact
```

## Koszty

Przy ~100 zapytań/mies:
- **Lambda**: ~$0 (free tier: 1M requestów)
- **S3**: ~$0.01 (przechowywanie + transfery)
- **API Gateway**: ~$0 (free tier: 1M requestów)
- **SES**: ~$0 (free tier: 62k emaili/mies z EC2, poza EC2 = $0.10/1000)

**Szacowany koszt: <$1/miesiąc**

## Bezpieczeństwo

- S3 bucket: Block Public Access włączony
- Pliki dostępne TYLKO przez presigned URLs (ważne 7 dni)
- Automatyczne usuwanie plików po 30 dniach (Lifecycle)
- CORS ograniczony do domeny agencja-copywriterska.pl
- Walidacja typów plików (Lambda + frontend)
- Limit rozmiaru: 10 MB/plik, max 5 plików
- HTML escaping w emailach (ochrona przed XSS)
