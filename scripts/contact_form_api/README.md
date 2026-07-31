# Zaina Contact Form API Client

Auto-generated Python API client from autonomous browser agent.

## Generated From

- **Run ID**: 73a71333-691e-488e-b271-fd168282eda7
- **HAR File**: `~/.reverse-api/runs/har/73a71333-691e-488e-b271-fd168282eda7/recording.har`
- **Date**: 2026-06-12
- **Task**: explore http://localhost:3000/ and capture API traffic
- **Base URL**: `http://localhost:3000`
- **Mode**: Agent (autonomous navigation)
- **Validation**: 100/100, 1/1 endpoints covered

## Installation

```bash
pip install requests
```

## Usage

```python
from api_client import ZainaContactClient, ValidationError, RateLimitError

client = ZainaContactClient()  # pass base_url for prod, e.g. "https://zainasolutions.com"

result = client.submit_contact(
    name="Jane Doe",
    email="jane@company.com",
    message="We need a marketing site for our new product.",
    company="Acme",                    # optional
    service="Website Development",     # optional, see SERVICES
)
print(result)  # {"ok": True, "message": "Thanks! ..."}
```

## Available Methods

- `post_contact(name, email, message, company=None, service=None)` — submit a lead via `POST /api/contact`.
- `submit_contact(...)` — alias of `post_contact`.

## Authentication

None — the endpoint is public, protected by a honeypot field and an
in-memory rate limit (5 requests/minute/IP → HTTP 429).

## Error Handling

- `ValidationError` (HTTP 422) — `.errors` maps field name → message.
- `RateLimitError` (HTTP 429) — more than 5 submissions/minute from one IP.
- `ContactApiError` — transport failures or unexpected status codes.

## Agent Navigation Path

1. Loaded homepage `/` (hero, about, model, services, stats, team, contact).
2. Visited `/work`, opened the "Nellissery Traders" project modal.
3. Returned to `/#contact`, filled and submitted the contact form.
4. Captured `POST /api/contact` → 200 OK.
5. Checked the 404 page (default Next.js, unstyled).

## Notes

- Server contract mirrored from `src/lib/contact.ts`: name ≤ 120 chars,
  valid email, message 10–4000 chars, company ≤ 160 chars.
- Never send the `website` honeypot field — any value flags the request as spam.
- Without `CONTACT_WEBHOOK_URL` set on the server, submissions are only
  logged to the server console, not delivered anywhere.
