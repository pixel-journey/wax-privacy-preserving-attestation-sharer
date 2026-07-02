# wax-privacy-preserving-attestation-sharer — Privacy-Preserving Attestation Sharer

> **Status:** 🔒 Private (In Development) | Target Public Release: July 2026  
> **Category:** Privacy Tools & Selective Disclosure (New Innovative Direction)  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**One-sentence goal:** A client-side tool for creating and sharing privacy-preserving attestations and selective disclosure of on-chain data, reputation, and credentials on WAX without revealing unnecessary information.

---

## 1. Overview & Goal

This blueprint delivers a clean, user-friendly interface for generating attestations about on-chain activity, holdings, or reputation while allowing selective disclosure. Users can prove certain facts (e.g., "I hold X assets" or "My reputation score is above Y") without revealing the full underlying data.

**Why it matters for WAX/Antelope:**
- Privacy is increasingly important as on-chain data becomes more public and valuable.
- Pure client-side using standard cryptographic techniques (no heavy ZK required for basic cases, with room for future ZK integration).
- Enables better reputation systems, credential sharing, and private data markets.
- Builds on existing reputation and attestation work with a privacy-first layer.

**Target users:**
- Users who want to share reputation or credentials privately
- DAOs and projects with privacy-sensitive processes
- Developers building private reputation or credential systems
- Anyone concerned about data exposure on public blockchains

**Success metrics:**
- Generate and share a privacy-preserving attestation in < 10 seconds
- Clear, intuitive selective disclosure UI
- 95+ Lighthouse scores
- High trust in the privacy guarantees

---

## 2. Concepts & Inspiration

### Core Blockchain Concepts
- **Attestations from on-chain data**: Using Hyperion history, AtomicAssets holdings, and mutable data as the source of truth for claims.
- **Selective disclosure**: Allowing users to reveal only specific parts of an attestation (e.g., only the score, not the full history).
- **Client-side cryptography**: Using standard web crypto or libraries for signing and verification without backend.
- **Future ZK integration**: The architecture is designed to support lightweight zero-knowledge proofs for stronger privacy guarantees.

### User Pain Points Addressed
- Sharing reputation or credentials often requires revealing too much data.
- No easy tools for private, verifiable claims on WAX.
- Existing reputation tools are public by default.

### Inspirations
- Traditional: Privacy-preserving identity systems, selective disclosure in digital credentials (e.g., verifiable credentials with selective disclosure).
- Web3: Privacy-focused reputation systems, ZK-based attestations, and private data sharing protocols.
- Design: Clean, trust-building interfaces like password managers or privacy dashboards.

**Related Blueprints (synergy):**
- Builds directly on `wax-on-chain-reputation-attestation-exporter` and `wax-reputation-scorecard-social-radar`.
- Complements the new ZK attestation interface.
- Pairs with education credential tools for private learning proofs.

---

## 3. Design Specifications (Pixel Journey Standards)

### 3.1 Visual & Interaction Design
- **Overall layout**: Clean dashboard with "Create Attestation" flow. Main area shows available claims from on-chain data. Sidebar for selecting what to disclose and previewing the final attestation. Bottom bar for sharing options (link, QR, signed export).
- **Color palette**: Professional indigo with green for verified/private indicators and clear trust signals.
- **Micro-interactions**: Smooth selection of disclosure fields, live preview of the final attestation, satisfying "Generate & Share" flow.
- **Responsive**: Excellent desktop for detailed selection; mobile-friendly quick share flows.

### 3.2 Key Views / Components
- `ClaimSelector.tsx` — List of available on-chain claims with toggle for inclusion.
- `DisclosurePreview.tsx` — Live preview of what the recipient will see.
- `AttestationGenerator.tsx` — Core logic for creating the signed attestation.
- `SharingOptions.tsx` — Options for how to share (link, QR code, direct export, on-chain anchoring).
- `VerificationView.tsx` — Simple interface for recipients to verify the attestation.

### 3.3 Accessibility (A11y) & Inclusive Design
- WCAG 2.2 AA: Clear labels, high-contrast modes, keyboard navigation for selection.
- Screen reader friendly: Announcements of selected claims and privacy level.

### 3.4 Performance & Optimization Targets
- Lighthouse 95+
- Fast generation even with many claims
- Smooth interactive preview

---

## 4. Technical Architecture

### 4.1 Core Tech Stack (Standardized)
- **Framework:** Next.js 15 (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui + framer-motion
- **State & Data:** @tanstack/react-query + zod + Jotai
- **Wallet & Signing:** @wharfkit/session (for signing attestations)
- **Blockchain Data:** Hyperion for history + AtomicAssets for holdings and mutable data
- **Cryptography:** Client-side signing and verification (standard web crypto or libsodium)
- **Utilities:** date-fns, lucide-react, sonner

### 4.2 Data Flow Diagram
```
Connect wallet
    ↓
Fetch on-chain data (Hyperion + Atomic)
    ↓
Select claims to include and what to disclose
    ↓
Generate signed attestation client-side
    ↓
Preview and share (link, QR, export)
    ↓
Recipient verifies independently
```

### 4.3 Folder Structure
```
app/
├── (privacy)/
│   └── page.tsx                 # Main privacy attestation tool
├── components/
│   ├── privacy/
│   │   ├── ClaimSelector.tsx
│   │   ├── DisclosurePreview.tsx
│   │   ├── AttestationGenerator.tsx
│   │   └── SharingOptions.tsx
├── hooks/
│   ├── useOnChainData.ts
│   └── useWharfkitSession.ts
├── lib/
│   ├── wax/
│   │   ├── claim-extractor.ts
│   │   └── attestation-builder.ts
│   └── crypto/
│       └── selective-disclosure.ts
├── types/
│   └── privacy.ts
public/
└── mock-data/                   # Sample attestation scenarios for demo
```

### 4.4 Security & Privacy Notes
- All data processing is client-side
- Users explicitly control what is disclosed
- Clear explanations of what is revealed vs hidden
- Future-proof architecture for ZK enhancements

---

## 5. Implementation Examples & Code Snippets

### 1. Claim extraction
```ts
// lib/wax/claim-extractor.ts
export function extractClaims(accountData) {
  return {
    reputationScore: calculateScore(accountData),
    assetCount: accountData.assets.length,
    // ... other claims
  };
}
```

### 2. Selective disclosure logic
```ts
// lib/crypto/selective-disclosure.ts
export function createSelectiveAttestation(claims, disclosedFields) {
  // Create signed attestation revealing only selected fields
}
```

---

## 6. Demo & Testing Strategy

- **Live Demo Toggle:** Mock data ↔ Live wallet
- **Storybook** for selectors, previews, generators
- **Playwright** e2e: connect → select claims → generate → share
- **Vitest** for crypto and claim logic
- Vercel previews

---

## 7. Roadmap & Development Phases

**Phase 0 — Scaffold (1 day)**
- Next.js + Tailwind + data fetching + basic attestation flow

**Phase 1 — Core Logic (3–4 days)**
- Claim extraction, selective disclosure, signing and verification

**Phase 2 — Core UI (3–4 days)**
- Claim selector, live preview, sharing options, verification view

**Phase 3 — Polish (2 days)**
- a11y, performance, responsive, clear privacy explanations

**Phase 4 — Documentation & Release (2 days)**
- Full README, screenshots, AI prompt pack, make public

**Future Enhancements**
- Integration with the new ZK attestation interface for stronger privacy
- Support for more complex claims and predicates
- On-chain anchoring options for long-lived attestations
- Community templates for common attestation types

---

## 8. Visual References & Mockups

**Key Screen:**
Clean interface with a list of available claims on the left (with toggles for inclusion and disclosure level). Center shows a live preview of the final attestation the recipient will see. Right sidebar has sharing options and a clear "What is revealed vs hidden" explanation. Trust-building design with privacy icons and clear language.

> *Feels like a premium privacy tool meets calm Web3 credential interface — trustworthy and empowering.*

**ASCII Sketch:**
```
Available Claims          Preview of Shared Attestation
[✓] Reputation Score > 80   "This user has a reputation
[ ] Full History             score above 80."
[✓] Holds PixelPunks        

[ Generate & Share ]       [ What is hidden: Full history ]
```

---

## 9. Related Blueprints & Ecosystem Fit

- Builds on `wax-on-chain-reputation-attestation-exporter` and `wax-reputation-scorecard-social-radar` with privacy layer.
- Direct companion to `wax-client-side-zk-attestation-interface`.
- Complements education credential tools for private proofs.

---

## 10. License, Contributing & Credits

- MIT License
- Built with ❤️ for privacy-respecting on-chain interactions on WAX
- Uses client-side cryptography and public data
- Pixel Journey Design System for clear, trustworthy interfaces
- Special thanks to the push for new innovative directions including privacy tools

**This blueprint makes it easy to share on-chain facts without oversharing.**

*Pixel Journey — Beautiful interfaces for public blockchain data.*

---

*Last updated: July 02, 2026*