"""
Auto-generated API client for the Zaina Solutions contact form.
Generated from autonomous agent capture on 2026-06-12.

Task: explore http://localhost:3000/ and capture API traffic
Run ID: 73a71333-691e-488e-b271-fd168282eda7
HAR file: ~/.reverse-api/runs/har/73a71333-691e-488e-b271-fd168282eda7/recording.har

The API is a single public endpoint (no authentication):
    POST /api/contact

Server-side contract (mirrored from src/lib/contact.ts):
    - name: required, max 120 chars
    - email: required, must look like an email
    - message: required, 10-4000 chars
    - company: optional, max 160 chars
    - service: optional, one of SERVICES (defaults to "Not sure yet")
    - website: honeypot — must stay EMPTY; any value is rejected as spam

Responses:
    200 {"ok": true, "message": "..."}          accepted
    422 {"ok": false, "errors": {field: msg}}   validation failure
    429 {"ok": false, "message": "..."}         rate limited (5 req/min/IP)
    400 {"ok": false, "message": "..."}         malformed JSON body
"""

import logging
from typing import Any, Dict, Optional

import requests

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

SERVICES = (
    "Website Development",
    "App Development",
    "Branding",
    "UI/UX Design",
    "AI Automation",
    "MVP Development",
    "Not sure yet",
)


class ContactApiError(Exception):
    """Base error for contact API failures."""


class ValidationError(ContactApiError):
    """Server rejected the payload (HTTP 422). `errors` maps field -> message."""

    def __init__(self, errors: Dict[str, str]):
        super().__init__(f"Validation failed: {errors}")
        self.errors = errors


class RateLimitError(ContactApiError):
    """Too many submissions from this IP (HTTP 429, 5 per minute allowed)."""


class ZainaContactClient:
    """API client for the Zaina Solutions contact endpoint."""

    def __init__(
        self,
        base_url: str = "http://localhost:3000",
        session: Optional[requests.Session] = None,
        timeout: float = 15.0,
    ):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session = session or requests.Session()
        self.session.headers.update(
            {
                "User-Agent": "Mozilla/5.0 (compatible; ZainaContactClient/1.0)",
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        )

    def _request(self, method: str, endpoint: str, **kwargs: Any) -> requests.Response:
        """Make an HTTP request; raises ContactApiError on transport failure."""
        url = f"{self.base_url}{endpoint}"
        try:
            return self.session.request(method, url, timeout=self.timeout, **kwargs)
        except requests.exceptions.RequestException as exc:
            logger.error("Request failed: %s", exc)
            raise ContactApiError(f"Transport error calling {url}: {exc}") from exc

    def post_contact(
        self,
        name: str,
        email: str,
        message: str,
        company: Optional[str] = None,
        service: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Submit a lead through POST /api/contact.

        Args:
            name: Sender's name (required, <= 120 chars).
            email: Reply-to email (required, validated server-side).
            message: Project description (required, 10-4000 chars).
            company: Optional company name (<= 160 chars).
            service: Optional service; one of SERVICES. Server defaults
                to "Not sure yet" when omitted.

        Returns:
            JSON response data, e.g. {"ok": True, "message": "Thanks! ..."}.

        Raises:
            ValidationError: HTTP 422 with per-field error messages.
            RateLimitError: HTTP 429 after >5 submissions/minute from one IP.
            ContactApiError: transport errors or unexpected status codes.
        """
        if service is not None and service not in SERVICES:
            raise ValueError(f"service must be one of {SERVICES}, got {service!r}")

        payload: Dict[str, str] = {"name": name, "email": email, "message": message}
        if company is not None:
            payload["company"] = company
        if service is not None:
            payload["service"] = service
        # NOTE: never send the "website" honeypot field — a non-empty value
        # makes the server silently classify the submission as spam.

        response = self._request("POST", "/api/contact", json=payload)

        if response.status_code == 422:
            body = response.json()
            raise ValidationError(body.get("errors", {}))
        if response.status_code == 429:
            raise RateLimitError(response.json().get("message", "Rate limited."))

        try:
            response.raise_for_status()
        except requests.exceptions.HTTPError as exc:
            raise ContactApiError(f"Unexpected response {response.status_code}: {response.text}") from exc

        return response.json()

    # Friendlier alias for the same endpoint.
    submit_contact = post_contact


if __name__ == "__main__":
    client = ZainaContactClient()
    result = client.submit_contact(
        name="API Client Smoke Test",
        email="smoke-test@example.com",
        message="Automated smoke test from the generated API client. Please ignore.",
        company="QA",
        service="Website Development",
    )
    print(result)
