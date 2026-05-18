# Antigravity Build Prompt — ShipTrust Frontend

> Copy everything below into Antigravity as your project brief.
> The prompt is structured so an agentic IDE can produce a complete, navigable frontend with static mock data.

---

## 0. Project Identity

**Product name:** ShipTrust (working name — feel free to use this throughout the UI)

**One-line positioning:** "The shipping platform that never silently deducts from your wallet."

**What you're building:** A complete, production-quality React frontend for a next-generation Indian e-commerce shipping aggregator. It competes with Shiprocket, NimbusPost, and Shyplite by winning on transparency, fair billing, fast dispute resolution, and seller-first economics — not on feature count.

This is **frontend only with static mock data**. No backend. All data is hardcoded in TypeScript files under `/src/mocks/`. The app must look and feel real — like a product that has 50,000 sellers using it today.

---

## 1. Tech Stack — Use Exactly This

- **Framework:** Next.js 14+ (App Router, TypeScript strict mode)
- **Styling:** Tailwind CSS + shadcn/ui components (install via `npx shadcn-ui@latest init`)
- **Icons:** lucide-react
- **Charts:** Recharts
- **State:** Zustand for client-side state, React Query (TanStack Query) wired up against mock async functions so a future backend swap is trivial
- **Forms:** react-hook-form + zod
- **Tables:** TanStack Table v8
- **Date utils:** date-fns
- **Animations:** framer-motion (use sparingly — refined micro-interactions, not flashy)
- **Fonts:** Inter for UI, JetBrains Mono for code/numeric data, Fraunces (display serif) for marketing hero sections only
- **Linting:** ESLint + Prettier with sensible defaults
- **Node:** v20+

Project structure:
```
/src
  /app                    # Next.js App Router pages
  /components
    /ui                   # shadcn primitives
    /layout               # Sidebar, Topbar, Shell
    /dashboard            # Dashboard-specific blocks
    /shipments            # Shipments domain components
    /disputes             # Disputes domain
    /billing              # Wallet/billing domain
    /analytics            # Analytics charts
  /mocks                  # All static data here
  /lib                    # utils, formatters
  /hooks                  # custom hooks
  /types                  # TypeScript types/interfaces
  /stores                 # Zustand stores
```

---

## 2. Design Direction — Read Carefully

This is the most important section. Most AI-generated dashboards look identical: white background, purple gradient, generic Inter font, rounded cards floating in space. **Do not build that.** Be opinionated.

### Visual language

- **Dark-first interface** for the seller dashboard (sellers stare at this 8 hours a day; dark reduces fatigue). Provide a light mode toggle but design dark mode first.
- **Color palette (dark mode):**
  - Background: `#0E1116` (near-black, slight blue tint)
  - Surface: `#161B22`
  - Card: `#1A2029`
  - Border: `#2A323D`
  - Text primary: `#E8ECF1`
  - Text dim: `#9AA4B2`
  - Text muted: `#6B7585`
  - **Accent (signature):** `#FF6B35` (warm orange — used very sparingly for primary actions, active states, brand)
  - Success: `#4ADE80`
  - Warning: `#F2C14E`
  - Danger: `#FF5C5C`
  - Info: `#5EA9FF`
- **Light mode palette:** off-white background `#FAFAF7`, ink-black text `#0E1116`, same accent. No pure white anywhere.
- **Typography rules:**
  - Numeric data (amounts, AWB numbers, weights, percentages) ALWAYS in JetBrains Mono — this gives the dashboard a "professional logistics ops console" feel
  - Headers in Inter with negative letter-spacing
  - Hero / marketing landing uses Fraunces serif for emotional impact
- **No purple gradients. No glassmorphism. No floating 3D illustrations.** This is a serious tool for serious business owners.
- **Density:** information-dense but breathable. Think Linear, Stripe Dashboard, Vercel — not Bootstrap admin templates.
- **Borders over shadows:** prefer 1px borders for separation; reserve shadows only for floating elements (dropdowns, modals).
- **Radius:** consistent — use `rounded-xl` (12px) for cards, `rounded-md` (6px) for inputs and small chips.
- **Spacing scale:** stick to Tailwind's defaults but be generous with vertical rhythm.

### Motion

- Page transitions: subtle fade + 4px upward translate, 200ms ease-out
- Sidebar collapse: spring animation
- Number changes (wallet balance, KPIs): count-up animation on first load
- Toast notifications: slide in from top-right
- **Never** animate things just because you can

### Empty states

- Every empty state must have a small illustration (use lucide icons creatively, NOT generic stock illustrations), a one-line headline, and a clear next action button. Empty states are a brand surface.

---

## 3. Information Architecture — Pages to Build

### Public / Pre-auth

1. **Landing page** (`/`) — marketing homepage with hero, problem statement, feature highlights, pricing, footer
2. **Login** (`/login`) — email + password, with "Sign in with Google" stub
3. **Signup** (`/signup`) — multi-step: account → business details → KYC stub
4. **Pricing** (`/pricing`) — three plans
5. **Terms / Privacy** (`/legal/*`) — stubbed pages

### Authenticated app (under `/app/`)

6. **Dashboard** (`/app`) — landing for logged-in sellers
7. **Orders** (`/app/orders`) — list with filters, search, bulk actions
8. **Order detail** (`/app/orders/[id]`) — full lifecycle view
9. **Create shipment** (`/app/orders/new`) — multi-step form
10. **Shipments** (`/app/shipments`) — same data as orders but filtered to "shipped" state with tracking focus
11. **Shipment detail / tracking** (`/app/shipments/[awb]`) — timeline + evidence
12. **NDR / Returns** (`/app/returns`)
13. **Disputes** (`/app/disputes`) — list + detail with photo evidence viewer (the showcase feature)
14. **Dispute detail** (`/app/disputes/[id]`) — evidence carousel, conversation thread, SLA countdown
15. **Wallet** (`/app/wallet`) — balance, transactions, top-up modal, line-item transparency
16. **COD remittance** (`/app/cod`) — D+2 calendar view, payouts log
17. **Analytics** (`/app/analytics`) — multi-tab: Overview, RTO, Courier Performance, Pincode Performance, Cost-per-Delivered-Order
18. **Couriers** (`/app/couriers`) — performance matrix
19. **Settings** (`/app/settings`) — profile, business, pickup addresses, API keys, webhooks, team, billing details, integrations
20. **Public tracking page** (`/track/[awb]`) — buyer-facing, branded, accessible without login

---

## 4. Hero Pages — Build These to Showcase Quality

These are the pages that must look exceptional. They're the demo screens.

### 4.1 Dashboard (`/app`)

Top of page:
- Welcome row: "Good morning, {Name}" + a small "Trust Score: 98/100" badge (gimmick metric showing dispute win rate, transparency index — invent it, it's our differentiator)
- 4 KPI cards in a row: Today's Shipments (with sparkline), Pending Pickups, RTO Risk Flags (with red/amber pulse if > 0), Wallet Balance (mono font, prominent)

Middle section, two-column:
- Left (2/3 width): "Shipments Today" — a stacked area chart (Recharts) showing pickups vs. in-transit vs. delivered over the last 7 days
- Right (1/3 width): "Action Required" — vertical list with:
  - "3 weight discrepancies awaiting your confirmation" (orange dot)
  - "1 NDR needs reply"
  - "₹12,400 COD remittance arriving tomorrow"
  - "2 high-RTO-risk COD orders flagged"

Bottom section:
- "Recent Shipments" table — 8 rows, mono font for AWB and weights, courier logos as small chips, status pills
- Below table: "Pincode Heatmap" — India map placeholder (use a simple grid or SVG, don't pull a heavy map library) showing top 10 delivery pincodes with success-rate color coding

### 4.2 Disputes List + Detail (the showcase)

**Disputes list:**
- Each dispute card shows: AWB, courier, declared weight vs. scanned weight (both in mono, with the delta highlighted), amount in dispute, SLA countdown timer (live ticking, "23h 14m remaining" — color shifts amber → red as it approaches zero), status pill
- Filter chips at top: All / Open / Awaiting Evidence / Resolved-Won / Resolved-Lost
- "48-hour SLA — public scorecard" link in the page header

**Dispute detail:**
- Left column (60%): Photo/video evidence carousel — show 3-4 placeholder images of "warehouse scan" with overlay metadata (timestamp, scale ID, dimensions read). Use Unsplash photos of cardboard boxes on warehouse conveyors as placeholders. Below the carousel, a conversation thread (seller messages, ops messages, system events) styled like a refined Slack thread.
- Right column (40%): Sticky panel with the dispute facts (declared vs scanned, charge amount, courier, AWB, date), big SLA countdown, action buttons: "Submit Evidence", "Accept Charge", "Escalate". Below buttons: a small "Resolution rate this month: 87% in seller favor" honesty badge.

### 4.3 Wallet & Billing Transparency

- Top: huge wallet balance in mono font, with a transaction velocity sparkline next to it
- Below: "Recharge" button, "Auto top-up" toggle
- Main: transaction list — every single row must show: timestamp, amount, type (debit/credit), AWB if applicable (clickable), reason (one-line plain English), evidence link if applicable, dispute button if applicable
- **The aesthetic point:** every row is dense with information but breathable. No "miscellaneous charges" allowed. If a row exists, it has a reason.
- Right sidebar: monthly summary breakdown — shipping charges, weight adjustments, COD fees, refunds, net spend. With download buttons (CSV, PDF, Tally, Zoho — all stubbed).

### 4.4 Analytics — Cost-per-Delivered-Order

This is the wedge feature that no incumbent has. Make it look impressive.

- Top filters: date range, channel, courier, pincode zone
- Main chart: a scatter plot — X axis is order value, Y axis is cost-per-delivered-order, dots colored by RTO outcome (green = delivered, red = RTO'd). Each dot hoverable with order details.
- Below: a sortable table — Pincode | Orders | RTO % | Avg Cost | Profit Margin | Recommendation (e.g. "Disable COD" badge on rows with > 40% RTO)
- "Recommended Actions" panel with 3-4 specific suggestions like: "Disable COD for Bhagalpur (PIN 812001) — your RTO rate is 52% vs. ₹1,840 avg recovery cost"

### 4.5 Landing Page (Public `/`)

- Hero with Fraunces display font: "Stop paying for weight you never shipped." Sub: "ShipTrust is India's transparency-first shipping platform. Every charge explained. Every dispute resolved in 48 hours. Or it's reversed."
- Below hero: a 3-up "How we're different" — 48-hour dispute SLA, D+2 COD remittance, Photo evidence on every scan
- Comparison table: ShipTrust vs Shiprocket vs NimbusPost — checkmarks/x marks across the trust dimensions
- Testimonial section with 3 placeholder seller quotes (invent realistic Indian D2C founder names + brands)
- Trust strip: courier partner logos (Delhivery, XpressBees, DTDC, Ecom Express, Shadowfax — use simple text logos or stubbed SVGs)
- Pricing teaser → link to /pricing
- Footer with site map, social, compliance badges

---

## 5. Mock Data — Structure & Volume

Create realistic Indian data. No "John Doe" or "Acme Corp" — use authentic D2C brand and seller names.

### Files under `/src/mocks/`

**`sellers.ts`** — current seller profile
```typescript
export const currentSeller = {
  id: "seller_8f3k2m",
  name: "Aarav Kapoor",
  email: "aarav@kashika-co.in",
  phone: "+91 98765 43210",
  business: {
    name: "Kashika & Co",
    category: "Apparel & Accessories",
    gstin: "07AABCK1234F1Z5",
    pan: "AABCK1234F",
    address: "Plot 14, Sector 63, Noida, UP 201307",
  },
  walletBalance: 47820.50,
  trustScore: 98,
  joinedAt: "2024-08-12",
  plan: "Growth",
};
```

**`couriers.ts`** — 8 couriers with realistic performance data
- Delhivery, XpressBees, DTDC, Ecom Express, Shadowfax, BlueDart, India Post, Amazon Shipping
- For each: id, name, slug, logo (use initials in colored circle), serviceability (pincodes covered), avg TAT, success rate, RTO rate, damage rate, current SLA performance

**`orders.ts`** — 150 mock orders across states (new, label_generated, picked, in_transit, out_for_delivery, delivered, rto_initiated, rto_delivered, lost, damaged). Distribute realistically — most delivered, some in-transit, a handful in dispute.

Each order: id, awb, channel (Shopify/WooCommerce/Amazon/Flipkart/Manual), buyer (name, phone, address with real Indian pincodes spanning metros and tier-2/3), product (name, SKU, value, declared weight, declared dimensions), shipping (courier, mode, charges, scanned weight if available), payment (COD/Prepaid, amount), createdAt, statusHistory[].

Use real Indian cities: Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Chennai, Kolkata, Ahmedabad, Jaipur, Lucknow, Indore, Bhopal, Patna, Bhubaneswar, Coimbatore, plus tier-3 like Bhagalpur, Muzaffarpur, Gorakhpur, Hisar.

**`disputes.ts`** — 12 disputes in varying states
- 4 open (with SLA timers), 3 awaiting evidence, 3 resolved-won, 2 resolved-lost
- Each with declared vs scanned weight delta, evidence file references, conversation thread (3-6 messages), SLA timestamps

**`walletTransactions.ts`** — 80 transactions
- Mix of: shipping charge, weight adjustment, refund (auto-credit), top-up, COD remittance, dispute reversal, GST
- Every row has a clear reason and AWB link where applicable

**`codRemittances.ts`** — 30 remittance entries with D+2 schedule

**`analytics.ts`** — pre-computed aggregates for charts
- Daily shipment volumes (last 30 days)
- RTO rate by pincode (top 50 pincodes)
- Courier performance matrix
- Cost-per-delivered-order distribution

**`ndrs.ts`** — 18 NDR cases with reasons (customer not available, wrong address, refused, etc.)

**Mock API layer** — under `/src/lib/api.ts`, create async functions that return mock data with realistic latency (200-600ms `setTimeout`). Use these with React Query so the swap to a real API later is just changing the URL.

```typescript
export async function getOrders(filters?: OrderFilters): Promise<Order[]> {
  await delay(300);
  return filterOrders(mockOrders, filters);
}
```

---

## 6. Components — Build a Real Design System

Don't just slap shadcn defaults everywhere. Build these custom components:

- `<StatusPill>` — pill with semantic colors per shipment status, dot indicator, tooltip
- `<CourierChip>` — courier logo + name, used in tables and cards
- `<AwbCode>` — mono-font AWB number with click-to-copy
- `<MoneyAmount>` — ₹ symbol, mono font, with optional delta arrow
- `<SlaCountdown>` — live ticking timer, color shifts amber → red
- `<EvidenceCard>` — photo/video thumbnail with metadata overlay
- `<KpiCard>` — title, big value, sparkline, optional delta indicator
- `<EmptyState>` — icon, headline, body, action button
- `<DataTable>` — TanStack Table wrapper with sort, filter, pagination, bulk-select, density toggle, column-visibility menu, export
- `<PincodeBadge>` — pincode with city tooltip
- `<TrustScoreBadge>` — radial mini gauge
- `<RiskIndicator>` — for RTO risk levels (low/medium/high) with icon and color

Storybook is optional but recommended.

---

## 7. Layout

**Authenticated shell:**
- **Left sidebar:** collapsible (250px expanded → 64px collapsed). Logo on top. Nav items: Dashboard, Orders, Shipments, Returns, Disputes (with a red badge for open count), Wallet, COD, Analytics, Couriers, Settings. Bottom of sidebar: support shortcut, user profile mini-card.
- **Topbar:** breadcrumbs, global search (CMD+K palette wired up), notifications bell (with mock notifications), wallet balance pill (always visible — sellers obsess over this), profile menu.
- **Main content:** max-width 1400px, generous padding, never edge-to-edge on big screens.

**Public shell:**
- Slim top nav with logo, Pricing, Docs, Login, "Get Started" CTA in accent color
- Footer with multiple columns

---

## 8. Interactions & Behavior

- **Command palette** (CMD+K): jump to any order by AWB, any seller setting, any page
- **Bulk actions** on orders table: select multiple → "Generate Labels", "Schedule Pickup", "Export CSV"
- **Filters persist** in URL query params (use Next.js searchParams)
- **Toasts** for every action (use sonner)
- **Confirmation modals** for destructive actions
- **Optimistic updates** where it makes sense (marking notifications as read, etc.)
- **Skeleton loaders** instead of spinners — feels faster
- **Keyboard shortcuts** documented in a "?" help overlay
- All tables: sortable columns, sticky header on scroll, density toggle
- Forms: real-time validation with zod, inline error messages, disabled submit until valid

---

## 9. Accessibility

- All interactive elements keyboard-navigable
- Focus rings visible (don't ship `outline: none`)
- Proper ARIA labels on icon-only buttons
- Color contrast WCAG AA minimum
- `prefers-reduced-motion` respected
- Semantic HTML throughout

---

## 10. Performance

- Images: `next/image` everywhere, lazy by default
- Code-split heavy routes (analytics, especially)
- Bundle analyzer wired up in scripts
- Lighthouse score target: 90+ on Performance, 100 on Accessibility

---

## 11. Deliverables Checklist

By the end, the app should:

- [ ] Run with `npm install && npm run dev` with zero errors
- [ ] Type-check cleanly (`npm run type-check`)
- [ ] Lint cleanly
- [ ] Have all 20 pages listed in section 3, navigable and functional with mock data
- [ ] Display realistic Indian seller and shipping data
- [ ] Look distinctive and intentional — not generic admin-template aesthetic
- [ ] Work flawlessly in dark mode (default) and light mode
- [ ] Be responsive down to tablet (1024px); mobile is a stretch goal but ensure the landing page is mobile-perfect
- [ ] Include a README explaining architecture, mock data structure, and how to swap mocks for a real API later

---

## 12. Tone & Copy Voice

Every piece of UI copy should sound like a thoughtful product team wrote it, not marketing fluff:

- Direct, plain English
- Numbers and specifics over adjectives ("48-hour SLA" not "fast resolution")
- Honest about limits ("This week: 87% disputes resolved in seller favor") not boastful
- No exclamation marks anywhere except in error states
- Indian English conventions: ₹ symbol, lakhs/crores formatting where appropriate, but stick to standard numerals (47,820.50) for clarity

Microcopy examples:
- Empty disputes list: "No open disputes. When weight discrepancies happen, you'll see them here with 48 hours to respond."
- Loading state: "Pulling the latest shipment events…"
- Error state: "Something didn't load. We're already looking into it — try again in a moment."

---

## 13. Final Note to the Agent

Build this with the care of a senior product engineer who genuinely likes their craft. Choose intentional defaults. Sweat the details — alignment, spacing, font weights, hover states, the way numbers right-align in tables, the way the sidebar feels when it collapses. The point of this frontend isn't to demo features — it's to demonstrate, on first glance, that this product is built by people who give a damn.

Start by scaffolding the project, then build the design system, then the layout shell, then the dashboard, then disputes, then the rest. Show progress as you go.
