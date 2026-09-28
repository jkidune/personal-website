# Contact inbox setup

The website stores contact enquiries in Cloudflare D1 and uses Resend only as an optional notification channel.

## 1. Create the D1 database

From Cloudflare Dashboard:

1. Workers & Pages → D1.
2. Create a database named `personal-website-contact`.
3. Copy its database ID.

Or with Wrangler:

```bash
npx wrangler d1 create personal-website-contact
```

## 2. Bind it to the Worker

Add this to `wrangler.jsonc` after replacing the database ID:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "personal-website-contact",
    "database_id": "YOUR_DATABASE_ID"
  }
]
```

The binding name must stay `DB`.

## 3. Apply the schema

```bash
npx wrangler d1 migrations apply personal-website-contact --remote
```

This applies `migrations/0001_contact_messages.sql`.

## 4. Configure admin secrets

Add these Worker secrets in Cloudflare:

- `ADMIN_PASSWORD`: the password used at `/admin/login`
- `ADMIN_SESSION_SECRET`: a long random secret, preferably 32+ random bytes

Example secret generation:

```bash
openssl rand -hex 32
```

Optional notification settings:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`

If Resend is not configured, enquiries are still stored successfully in D1.

## 5. Admin inbox

Visit:

```text
https://josephmasonda.qzz.io/admin/login
```

After signing in, `/admin/messages` shows all enquiries and lets you mark each one New, Contacted, or Closed.

## Contact delivery behavior

1. Validate input and reject oversized or malformed requests.
2. Ignore the hidden honeypot field when bots fill it.
3. Save the enquiry to D1.
4. Attempt a Resend notification only if an API key is configured.
5. A notification failure never deletes or loses the D1 submission.

Until D1 is bound, the endpoint can still fall back to Resend if Resend is configured, preserving the existing contact flow during setup.
