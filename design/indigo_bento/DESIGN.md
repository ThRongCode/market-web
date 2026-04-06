# Design System Specification: The Curated Marketplace

## 1. Overview & Creative North Star: "The Digital Curator"
This design system moves away from the cluttered, utility-first nature of traditional marketplaces and toward a "Digital Curator" aesthetic. The goal is to make second-hand commerce feel like a high-end editorial experience.

**The Creative North Star** is defined by **Structured Fluidity**. We achieve this by breaking the rigid, repetitive grids of standard e-commerce. By utilizing **Bento Grids** (asymmetric, interlocking containers) and a **Side Navigation Rail**, we reclaim vertical breathing room. The interface should feel like a premium magazine where every listing is a featured story, utilizing intentional white space, overlapping tonal layers, and a sophisticated Indigo-based palette to build trust and authority.

---

## 2. Color System & Tonal Architecture
We utilize a dynamic MD3 palette seeded by **Indigo (#6366F1)**. However, the application is strictly governed by the "No-Line" Rule to maintain a premium, seamless feel.

### The "No-Line" Rule
**Explicit Prohibition:** 1px solid borders (`#CCCCCC` or similar) are forbidden for sectioning. 
Boundaries must be defined through:
1.  **Background Color Shifts:** A `surface-container-low` section sitting on a `surface` background.
2.  **Tonal Transitions:** Using `surface-container-highest` to spotlight a featured category against a `surface-container` backdrop.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. Use the following hierarchy to define depth:
*   **Base Layer:** `surface` (#fcf8ff) - The canvas.
*   **Low Priority/Backgrounds:** `surface-container-low` (#f5f2fe) - For grouping minor content.
*   **Standard Cards/Sections:** `surface-container` (#efecf8) - The default container color.
*   **High Emphasis/Featured:** `surface-container-high` (#e9e6f3) - For active states or callouts.

### The "Glass & Gradient" Rule
To elevate the experience beyond flat Material defaults:
*   **Glassmorphism:** For Top Bars and hovering overlays, use `surface` at 80% opacity with a `20px` backdrop blur.
*   **Signature Textures:** For primary CTAs and Hero Bento cells, use a subtle linear gradient: `primary` (#4648d4) to `primary-container` (#6063ee) at a 135-degree angle. This adds "soul" and prevents the UI from looking clinically flat.

---

## 3. Typography: Be Vietnam Pro
The choice of **Be Vietnam Pro** provides a tech-forward yet humanist tone. Hierarchy is used editorially to lead the eye.

*   **Display (Display-lg/md):** Use sparingly for marketing moments or high-level category entrances. Tighten letter spacing (-0.02em) to feel authoritative.
*   **Headlines (Headline-sm/md):** Your primary tool for Bento Grid titles. Use `on-surface` color to ensure high contrast and readability.
*   **Body (Body-lg/md):** Optimized for listing descriptions. Use `on-surface-variant` (#464554) for long-form text to reduce eye strain.
*   **Labels (Label-md/sm):** For metadata (price, location, time). Always uppercase with +0.05em tracking when used for category tags to create a "tag" aesthetic without needing heavy boxes.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are replaced by **Tonal Lift**. We perceive depth through color value rather than dark drop shadows.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f5f2fe) background. The subtle shift in hex value creates a natural, soft lift.
*   **Ambient Shadows:** For floating elements like the FAB or specific Modal overlays, use a "Tinted Shadow": 
    *   *Blur:* 32px | *Opacity:* 6% | *Color:* `on-surface` (#1b1b23). This mimics natural light.
*   **The "Ghost Border" Fallback:** If a divider is mandatory for accessibility, use `outline-variant` (#c7c4d7) at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Bento Layouts

### The Bento Grid
Avoid equal-height rows. Mix spans (1x1, 2x1, 2x2) to create a visual rhythm. 
*   **Corner Radius:** Containers must use **xl (1.5rem)**. This softness is essential to the "Premium" tone.

### Buttons & FABs
*   **Primary Button:** Medium (0.75rem) rounded corners. Use the "Signature Gradient" (Primary to Primary-Container).
*   **FAB (Post Listing):** The "Post Listing" action uses an MD3 Large FAB. Position it at the bottom right of the Side Rail or floating in the bottom-right viewport. Use `tertiary-container` (#b55d00) to provide a sophisticated "pop" against the indigo theme.

### Cards & Lists
*   **No Dividers:** Lists are separated by **Spacing Scale 3 (1rem)** vertical gaps or subtle background shifts between `surface-container` and `surface`.
*   **Interaction:** On hover, a card should transition from `surface-container` to `surface-container-high` and scale by 1.02x. No heavy shadows.

### Side Navigation Rail
*   **Structure:** Persistent 80px - 96px width rail.
*   **Active State:** Use a "Pill" indicator behind the icon using `secondary-container` (#bdbefe). Icons should be sleek, 2pt weight.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins. A larger margin on the left of a Bento header creates an editorial, "offset" look.
*   **Do** use `tertiary` (#904900) for "Urgent" or "Featured" labels—it’s a sophisticated gold-orange that complements Indigo perfectly.
*   **Do** lean into white space. If you think there’s enough room between items, add **Spacing Scale 1.5 (0.5rem)** more.

### Don't
*   **Don't** use pure black (#000000) for text. Use `on-surface` (#1b1b23) to keep the palette soft.
*   **Don't** use 1px dividers to separate items in a list. Use vertical space or a background color tint.
*   **Don't** use standard "Sharp" corners. Everything in this system is rounded (min 0.25rem, max 1.5rem) to maintain the friendly, premium approachable feel.