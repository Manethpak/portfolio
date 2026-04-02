---
title: "KHQR SDK"
description: "TypeScript SDK for generating, decoding, and validating Cambodia's Bakong KHQR payment codes following the EMV QR Code specification."
year: 2025
category: "sdk"
url: "https://www.npmjs.com/package/@manethpak/khqr-sdk"
githubUrl: "https://github.com/Manethpak/khqr-sdk"
tags: ["TypeScript", "SDK", "EMV", "QR Code", "Bakong", "Fintech"]
featured: true
thumbnail: "https://khqr-sdk.vercel.app/preview.png"
gallery: []
order: 2
---

A community-maintained TypeScript SDK for working with Cambodia's KHQR payment system. Supports generating static and dynamic QR codes, decoding existing QR strings, and validating CRC integrity -- all following the EMV QR Code specification.

## Features

- **QR Generation** -- Create static (user-entered amount) and dynamic (fixed amount) KHQR codes for both individual and merchant accounts.
- **QR Decoding & Validation** -- Parse any KHQR string into structured data and verify its CRC integrity.
- **Bakong API Integration** -- Type-safe wrappers for all Bakong endpoints including deeplink generation, transaction checks, and account verification.
- **Bilingual Support** -- Alternate language fields for Khmer/English QR codes.

## Design

The SDK uses a `Result<T>` pattern instead of throwing exceptions, making error handling explicit. Subpath exports (`/constants`, `/helper`, `/types`) allow importing only what you need to minimize bundle size.

Published on npm as `@manethpak/khqr-sdk` with ESM and CommonJS support. Currently at 6 GitHub stars.
