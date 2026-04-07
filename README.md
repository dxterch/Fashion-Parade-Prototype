# Fashion Parade Singapore - Website Prototype

**SMU-X COR1301-G9 · Leadership and Team Building · Term 2, AY 2025-2026**

Instructor: Dr. Roger Low · Section: G9

---

## About This Prototype

This is a working website prototype built as part of the SMU COR1301-G9 Sustainability Strategies Proposal for **Fashion Parade Singapore** — a Gen Z community advocating for sustainable fashion through upcycling workshops, textile installations and educational programmes.

The prototype demonstrates the proposed **Q3/Q4 2026 Digital Centralisation** strategy outlined in the group's proposal: transitioning Fashion Parade's digital presence from a passive Wix page into a fully operational hub that handles volunteer recruitment, community membership, event management and impact reporting — all in one place.

It was built to support the group's recommendation that Fashion Parade relaunch its website as a central operational tool rather than a static brochure, replacing fragmented tools (Instagram DMs, Google Forms, Eventbrite) with a single owned platform.

---

## Running the Site

**Requirements:** Node.js 18 or above

```bash
npm install
node server.js
```

Open your browser at http://localhost:3000

**Admin dashboard:** http://localhost:3000/admin
Password: fashionparade2026

---

## Pages

| Route | What It Does |
|---|---|
| / | Homepage — hero section, live impact stats, photo gallery, upcoming events |
| /events | Workshop and event listings with category filters and registration |
| /volunteer | Volunteer landing page with role descriptions and 3-step application form |
| /membership | Community membership sign-up across three tiers (Free / $5 / $10 per year) |
| /impact | Public impact dashboard — live volunteer pipeline, member stats, milestone timeline |
| /resources | Volunteer Content Bank — brand templates, workshop runsheets, grants kit |
| /contact | Six-pathway partnership intake form |
| /admin | Password-protected EXCO dashboard — volunteers, members, events, registrations |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express |
| Templating | EJS |
| Styling | Custom CSS with CSS variables |
| Data storage | JSON flat files (no database required) |
| Images | 29 real Fashion Parade photos |
| Mobile | Fully responsive — tested at 390px (iPhone 13) |

---

## Project Context

This prototype was produced by Group 1 of COR1301-G9 as part of a Sustainability Strategies Proposal for Fashion Parade Singapore. The proposal identifies three strategic pillars — Financial Sustainability, Volunteer and Digital Management, and Scaling and Resources — with the website relaunch sitting within Pillar 2 as the primary digital centralisation deliverable.

The site is a functional prototype intended for demonstration purposes. All data submitted through forms is stored locally in JSON files and resets when the server restarts.

**Prepared by:** Adele Yap · Alisa Starkova · Dexter Chua Cheng Zuo · Durgeswari Jayan · Faith U Xin Hong · Harsimer Kaur Gill · Jovan Chua · Kylie Koh
