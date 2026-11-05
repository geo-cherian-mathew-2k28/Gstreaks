# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

Security is a paramount concern for GeoStreak as an image generator embedded in thousands of READMEs.

If you discover a security issue or vulnerability (such as SVG injection, SSRF, XSS, or token leakage):
1. **Do not create a public GitHub issue.**
2. Send an email to `geocherianmathew2000@gmail.com` with the details and reproduction steps.
3. We will acknowledge receipt within 24 hours and issue a fix promptly.

## Security Practices in GeoStreak

- **SVG Sanitization:** All user-provided text values are escaped via XML entity encoding (`&`, `<`, `>`, `"`, `'`).
- **Color Validation:** Custom color parameters are strictly matched against hex and safe RGB patterns.
- **GitHub Token Confidentiality:** Server-side tokens are never exposed in responses or client bundles.
- **Rate Limiting:** IP and username throttling prevents upstream GitHub GraphQL exhaustion.
