# Notification Foundation

Provider-agnostic notification abstraction (`src/lib/enterprise-platform/notifications/`).

Supports channel kinds: email, SMS, push, in-app, webhook.

Includes templates, delivery status, retry (`maxAttempts`), preference hooks, Memory provider for tests, and `notification.*` events.

**Does not** wire Twilio/SendGrid/FCM — adapters only.
