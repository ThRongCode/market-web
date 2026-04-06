# ChoTot Marketplace — Complete UI/UX Design Brief

> **Purpose:** This document describes every screen, user flow, component, and interaction in the ChoTot Vietnamese multi-category marketplace web app. Use it as a reference to redesign the UI.

---

## 1. App Overview

**ChoTot** is a Vietnamese online marketplace (similar to Craigslist, OLX, or Cho Tot) where users can buy, sell, and rent items across **9 categories**. It supports **Vietnamese & English** languages and **light/dark/system themes**.

### Tech Stack
- Next.js 16 (App Router), React 19, TypeScript
- Material UI 7 (current design system)
- Leaflet maps
- Cloudinary image uploads

### 9 Categories
| # | Category | Vietnamese | Icon | Color |
|---|----------|-----------|------|-------|
| 1 | Real Estate | Bất động sản | 🏠 | #6366f1 (Indigo) |
| 2 | Vehicles | Xe cộ | 🚗 | #8b5cf6 (Purple) |
| 3 | Electronics | Điện tử | 📱 | #06b6d4 (Cyan) |
| 4 | Fashion | Thời trang | 👗 | #ec4899 (Pink) |
| 5 | Home & Garden | Nhà cửa & Vườn | 🏡 | #f59e0b (Amber) |
| 6 | Sports | Thể thao | ⚽ | #10b981 (Emerald) |
| 7 | Jobs | Việc làm | 💼 | #f43f5e (Rose) |
| 8 | Services | Dịch vụ | 🛠️ | #3b82f6 (Blue) |
| 9 | Other | Khác | 📦 | #64748b (Slate) |

### Listing Types
- **Bán** (Sale)
- **Cho thuê** (Rent)

### Item Conditions (non-real-estate)
- Mới (New), Như mới (Like New), Tốt (Good), Khá (Fair), Cũ (Poor)

### Property Types (real-estate only)
- Căn hộ (Apartment), Nhà riêng (House), Biệt thự (Villa), Đất nền (Land), Văn phòng (Office), Shophouse

---

## 2. Global Layout

Every page shares this structure:

```
┌──────────────────────────────────────────────┐
│                   HEADER                      │
│  Logo | Nav Links | Settings | Auth Buttons   │
├──────────────────────────────────────────────┤
│                                              │
│                 PAGE CONTENT                  │
│                                              │
├──────────────────────────────────────────────┤
│                   FOOTER                      │
│  Newsletter | Links | Social | Contact        │
└──────────────────────────────────────────────┘
```

---

## 3. Header (Sticky, all pages)

### Desktop (≥900px)
```
┌─────────────────────────────────────────────────────────────────┐
│ [ChoTot Logo]   Trang chủ  Tìm kiếm  Bản đồ   ⚙️   [Auth]    │
└─────────────────────────────────────────────────────────────────┘
```

**When logged OUT:** Right side shows `Đăng nhập` (outlined) + `Đăng ký` (filled) buttons

**When logged IN:** Right side shows:
- `+ Đăng tin` button (gradient, goes to /properties/new)
- Mail icon with unread badge → /messages
- Heart icon → /favorites
- Avatar dropdown menu:
  - Tài khoản (Account) → /profile
  - Tin đăng của tôi (My Listings) → /my-properties
  - ─── divider ───
  - Đăng xuất (Logout)

### Mobile (<900px)
- Hamburger icon on left → opens side drawer (300px)
- Logo centered
- Settings gear + avatar on right

**Mobile Drawer contents (top to bottom):**
1. Gradient header with ChoTot logo
2. User info (avatar, name, email) OR Login/Register buttons
3. `+ Đăng tin mới` (Post New Listing) CTA button
4. Navigation section: Trang chủ, Tìm kiếm, Bản đồ
5. User section (if logged in): Yêu thích, Tin nhắn, Tin đăng của tôi, Tài khoản
6. Settings section: Theme toggle (Light/Dark switch), Language toggle (🇻🇳/🇺🇸)
7. Logout button at bottom

### Settings Menu (gear icon ⚙️)
A dropdown with two sections:
- **Giao diện:** Sáng (Light ☀️) | Tối (Dark 🌙) | Hệ thống (System 💻) — radio selection
- **Ngôn ngữ:** 🇻🇳 Tiếng Việt | 🇺🇸 English — radio selection

---

## 4. Footer (all pages)

```
┌─────────────────────────────────────────────────────┐
│  📧 Newsletter Section (gradient background)         │
│  "Đăng ký nhận tin" + email input + Subscribe button │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [ChoTot Logo]        Khám phá      Hỗ trợ    Liên hệ│
│  Description text     BĐS           Giới thiệu  📞   │
│  Social icons:        Xe cộ         Liên hệ     📧   │
│  Facebook YouTube     Điện tử       Điều khoản  📍   │
│  Instagram            Bản đồ        Bảo mật          │
│                                                     │
├─────────────────────────────────────────────────────┤
│  © 2025 ChoTot. All rights reserved. | Privacy | Terms│
└─────────────────────────────────────────────────────┘
```

Contact info sourced from centralized config:
- Phone: 1900 1234
- Email: support@chotot.com
- Address: 123 Nguyễn Văn Linh, Quận 7, TP. HCM

---

## 5. SCREENS (Detailed)

---

### 5.1 Homepage — `/`

**Purpose:** Landing page. Showcase categories, search, and call-to-action.

**Sections (top to bottom):**

#### Section 1: Hero
- Full-width gradient background (animated, dark theme)
- Large heading: "Mua bán, trao đổi dễ dàng" (Buy, sell, trade easily)
- Subtitle: "Nền tảng mua bán trực tuyến hàng đầu Việt Nam với hàng ngàn sản phẩm đa dạng"
- **Search box:** Text input + Search button → navigates to /search?keyword=...
- **Trending chips** (below search): clickable quick searches like:
  - "Căn hộ Quận 7", "Nhà phố Thủ Đức", "Toyota Camry", "iPhone 15 Pro", "MacBook Pro M3", "Xe Wave Alpha"
  - Each chip navigates to /search?keyword=...

#### Section 2: Categories Grid
- Heading: "Danh mục" (Categories)
- 9 category cards in a responsive grid (5 columns desktop, 3 tablet, 2 mobile)
- Each card: icon (emoji) + Vietnamese label + "Xem thêm →" link
- Has gradient accent on the icon background using category color
- Click → /search?category=CATEGORY_VALUE

#### Section 3: Why Choose Us
- Heading: "Tại sao chọn ChoTot?"
- 3 feature cards side by side:
  1. ⚡ "Nhanh chóng" — "Đăng tin và tìm kiếm sản phẩm chỉ trong vài phút"
  2. 🛡️ "Uy tín" — "Hệ thống xác minh người dùng và đánh giá minh bạch"
  3. 💰 "Giá tốt nhất" — "So sánh giá từ hàng ngàn người bán trên toàn quốc"

#### Section 4: Popular Categories
- Heading: "Phổ biến nhất"
- First 6 categories as larger cards with icon, name, and "Khám phá →" link
- Click → /search?category=...

#### Section 5: CTA Banner
- Gradient background card
- "Sẵn sàng bắt đầu?" heading
- Two buttons: "Đăng tin ngay" → /properties/new | "Khám phá" → /search

#### Section 6: Stats Row
- 4 stat items in a row:
  - "9+" → "Danh mục" (Categories)
  - "Mua & Bán" → "Giao dịch" (Transactions)
  - "Toàn quốc" → "Phạm vi" (Coverage)
  - "24/7" → "Hỗ trợ" (Support)

---

### 5.2 Search — `/search`

**Purpose:** Browse and filter listings with paginated results.

**Layout:**
```
┌─────────────────────────────────────────────┐
│  SearchFilters (horizontal variant)          │
│  [Keyword] [Category▼] [Type▼] [City▼] 🔍  │
│  ▼ Advanced: price slider, area, condition   │
├─────────────────────────────────────────────┤
│  "Kết quả (42 tin)" header  [Grid|List] toggle│
├─────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐                │
│  │Card 1│ │Card 2│ │Card 3│  ← 3 per row   │
│  └──────┘ └──────┘ └──────┘                │
│  ┌──────┐ ┌──────┐ ┌──────┐                │
│  │Card 4│ │Card 5│ │Card 6│                │
│  └──────┘ └──────┘ └──────┘                │
│  ...                                        │
│  [< 1 2 3 4 5 >] pagination                 │
└─────────────────────────────────────────────┘
```

**SearchFilters (horizontal variant):**
- Row 1: Keyword input | Category dropdown | Listing type dropdown (Bán/Cho thuê) | City dropdown | Search button | Toggle advanced button
- Row 2 (collapsible advanced):
  - Price range slider (category-aware ranges):
    - Real Estate: 0 → 20 tỷ VNĐ
    - Vehicles: 0 → 5 tỷ VNĐ
    - Electronics/Fashion/Sports/Home: 0 → 500 triệu VNĐ
    - Jobs/Services: 0 → 100 triệu VNĐ
  - **If Real Estate:** Area slider (0→500m²) + Bedrooms select (1-5+)
  - **If Non-Real-Estate:** Condition select (New/Like New/Good/Fair/Poor)
  - Property Type dropdown (only for Real Estate: Apartment/House/Villa/Land/Office/Shophouse)
  - Clear all button

**Results:**
- 12 items per page
- Grid view: 3 columns (PropertyCard grid variant)
- List view: 1 column (PropertyCard list variant)
- Toggle between grid/list icons

**Loading state:** 6 skeleton cards with shimmer animation

**Empty state:** "Không tìm thấy tin đăng nào" with suggestion to adjust filters

**URL sync:** All filter values sync to URL query params (shareable URLs)

---

### 5.3 Property Detail — `/properties/[id]`

**Purpose:** View full listing details, contact seller, save favorite, report.

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  ┌─────────────────────────────┐ ┌────────────────┐ │
│  │                             │ │ Contact Card    │ │
│  │    Main Image               │ │                │ │
│  │    (click to open lightbox) │ │ [Avatar]       │ │
│  │                             │ │ Seller Name    │ │
│  ├─────────────────────────────┤ │                │ │
│  │ [thumb1] [thumb2] [thumb3]  │ │ [📞 Gọi điện] │ │
│  ├─────────────────────────────┤ │ [💬 Gửi tin]  │ │
│  │                             │ │ [⚠️ Báo cáo]  │ │
│  │ Title                       │ └────────────────┘ │
│  │ 📍 Address                  │                    │
│  │ [❤️ Favorite] [📤 Share]    │                    │
│  ├─────────────────────────────┤                    │
│  │ Price Card                  │                    │
│  │ ₫15,000,000,000            │                    │
│  │ Key info chips:             │                    │
│  │ RE: 120m² | 3PN | 2WC     │                    │
│  │ Non-RE: Condition | Brand   │                    │
│  ├─────────────────────────────┤                    │
│  │ Description                 │                    │
│  │ Full text content...        │                    │
│  ├─────────────────────────────┤                    │
│  │ Listing Info                │                    │
│  │ Posted: 2 days ago          │                    │
│  │ ID: abc123                  │                    │
│  │ Category chip + Type chip   │                    │
│  └─────────────────────────────┘                    │
└─────────────────────────────────────────────────────┘
```

**Image Gallery:**
- Main image (large, 500px height)
- Thumbnail strip below (scrollable horizontal)
- Click main image → opens fullscreen lightbox dialog with prev/next arrows
- If no images: gradient placeholder with category icon

**Category-specific info display:**
- **Real Estate:** Area (m²), Bedrooms (PN), Bathrooms (WC), Property Type chip
- **Non-Real-Estate:** Condition badge, Brand, Model, Year Made

**Contact Card (sidebar on desktop, below on mobile):**
- Seller avatar + name
- "Gọi điện" (Call) button → tel: link
- "Gửi tin nhắn" (Send Message) button → opens Contact Dialog (requires login)
- "Báo cáo" (Report) text button → opens Report Dialog (requires login)

**Contact Dialog (modal):**
- Form fields: Content (multiline), Phone, Email
- Validated with Zod schema
- Sends POST /api/messages

**Report Dialog (modal):**
- Reason dropdown: Tin giả/lừa đảo, Nội dung không phù hợp, Spam, Sai thông tin, Khác
- Details textarea (optional)
- Sends POST /api/reports

**Favorite toggle:**
- Heart icon button (outlined=not saved, filled red=saved)
- Requires login
- Optimistic UI (instant toggle, API in background)

---

### 5.4 Create Listing — `/properties/new` 🔒

**Purpose:** Post a new listing. Requires authentication.

**Layout:** Single column centered form (max-width ~800px)

```
┌─────────────────────────────────────┐
│  "Đăng tin mới" heading             │
├─────────────────────────────────────┤
│  📋 Thông tin cơ bản                │
│  ├ Title (text input)               │
│  ├ Description (multiline, 4 rows)  │
│  ├ Category (dropdown, 9 options)   │
│  ├ Listing Type (Bán / Cho thuê)    │
│  └ Property Type (RE only dropdown) │
├─────────────────────────────────────┤
│  💰 Giá & Chi tiết                  │
│  ├ Price (number input, VNĐ)        │
│  │                                  │
│  │ IF Real Estate:                  │
│  │ ├ Area (m²)                      │
│  │ ├ Bedrooms (number)              │
│  │ └ Bathrooms (number)             │
│  │                                  │
│  │ IF Non-Real-Estate:              │
│  │ ├ Condition (dropdown)           │
│  │ ├ Brand (text)                   │
│  │ └ Model (text)                   │
├─────────────────────────────────────┤
│  📍 Vị trí                          │
│  ├ City (dropdown, 10 cities)       │
│  ├ District (text input)            │
│  ├ Ward (text input)                │
│  ├ Address (text input)             │
│  ├ Latitude (number, optional)      │
│  └ Longitude (number, optional)     │
├─────────────────────────────────────┤
│  📷 Hình ảnh                        │
│  ├ Cloudinary upload widget          │
│  │ (up to 10 images)                │
│  └ Preview grid of uploaded images   │
├─────────────────────────────────────┤
│  [Đăng tin] submit button            │
└─────────────────────────────────────┘
```

**Validation:** All fields validated with Zod. Category is required (no default). Title min 10 chars, description min 20 chars.

**On success:** Redirects to the new listing's detail page.

---

### 5.5 Edit Listing — `/properties/[id]/edit` 🔒

**Purpose:** Edit an existing listing. Must be the owner.

**Identical to Create form** except:
- Pre-populated with existing listing data
- Title: "Chỉnh sửa tin đăng"
- Submit sends PUT instead of POST
- Shows "Không có quyền" error if not the listing owner

---

### 5.6 Login — `/auth/login`

**Layout:**
```
┌─────────────────────────────────────┐
│  "Đăng nhập" heading                │
│  "Chào mừng bạn quay lại ChoTot"    │
├─────────────────────────────────────┤
│  [Test User Chips - dev only]        │
│  nguyen.van.a | tran.thi.b | le.van.c│
├─────────────────────────────────────┤
│  Email input                         │
│  Password input (show/hide toggle)   │
│  "Quên mật khẩu?" link (right-aligned)│
│  [Đăng nhập] button (full width)     │
├─────────────────────────────────────┤
│  ──── hoặc ────                      │
│  [G Google đăng nhập] button         │
├─────────────────────────────────────┤
│  "Chưa có tài khoản? Đăng ký"       │
└─────────────────────────────────────┘
```

**Test user chips** (development only): Click to auto-fill email/password.

---

### 5.7 Register — `/auth/register`

**Layout:**
```
┌─────────────────────────────────────┐
│  "Đăng ký tài khoản" heading        │
│  "Tham gia ChoTot ngay hôm nay"     │
├─────────────────────────────────────┤
│  Name input                          │
│  Email input                         │
│  Phone input (optional)              │
│  Password input                      │
│  Confirm Password input              │
│  [Đăng ký] button (full width)       │
├─────────────────────────────────────┤
│  "Đã có tài khoản? Đăng nhập"       │
└─────────────────────────────────────┘
```

---

### 5.8 Forgot Password — `/auth/forgot-password`

```
┌─────────────────────────────────────┐
│  "Quên mật khẩu" heading            │
│  "Nhập email để nhận link đặt lại"   │
├─────────────────────────────────────┤
│  Email input                         │
│  [Gửi link đặt lại] button          │
├─────────────────────────────────────┤
│  [← Quay lại đăng nhập]             │
└─────────────────────────────────────┘
```

On success: Shows green alert "Nếu email tồn tại, bạn sẽ nhận được link đặt lại mật khẩu"

---

### 5.9 Reset Password — `/auth/reset-password?token=xxx`

```
┌─────────────────────────────────────┐
│  "Đặt lại mật khẩu" heading         │
├─────────────────────────────────────┤
│  New Password input                  │
│  Confirm Password input              │
│  [Đặt lại mật khẩu] button          │
└─────────────────────────────────────┘
```

If no token in URL: Shows error + link to Forgot Password page.

---

### 5.10 Profile — `/profile` 🔒

```
┌─────────────────────────────────────┐
│  "Tài khoản" heading                │
├─────────────────────────────────────┤
│  [Large Avatar]                      │
│  Name (bold, large)                  │
│  email@example.com                   │
├─────────────────────────────────────┤
│  📝 Edit Form                        │
│  Name input (pre-filled)             │
│  Phone input (pre-filled)            │
│  [Cập nhật] button                   │
├─────────────────────────────────────┤
│  🔴 Danger Zone (red border)         │
│  "Xoá tài khoản"                    │
│  Warning text about permanent delete │
│  [Xoá tài khoản] red button         │
│  → Confirm dialog → DELETE + logout  │
└─────────────────────────────────────┘
```

---

### 5.11 My Properties — `/my-properties` 🔒

**Purpose:** Manage your own listings.

```
┌─────────────────────────────────────────────┐
│  "Tin đăng của tôi" + [+ Đăng tin mới] btn  │
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐│
│  │ [Image] Title                     [⋮]   ││
│  │         ₫15,000,000,000                 ││
│  │         📍 Quận 7, TP.HCM              ││
│  │         [ACTIVE] [BÁN] 2 ngày trước    ││
│  └─────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────┐│
│  │ [Image] Title                     [⋮]   ││
│  │         ...                             ││
│  └─────────────────────────────────────────┘│
│  ...                                        │
└─────────────────────────────────────────────┘
```

**3-dot menu per item:**
- 👁️ Xem (View) → /properties/[id]
- ✏️ Chỉnh sửa (Edit) → /properties/[id]/edit
- 🗑️ Xoá (Delete) → Confirmation dialog → DELETE API

**Status chips:** ACTIVE (green), SOLD (orange), RENTED (blue), PENDING (yellow), INACTIVE (gray)

**Empty state:** "Bạn chưa có tin đăng nào" + "Đăng tin ngay" button

---

### 5.12 Favorites — `/favorites` 🔒

**Purpose:** View saved/favorited listings.

```
┌─────────────────────────────────────────────┐
│  "Tin đăng yêu thích" heading                │
├─────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐                │
│  │Card 1│ │Card 2│ │Card 3│  ← PropertyCard │
│  └──────┘ └──────┘ └──────┘    grid variant │
│  ...                                        │
└─────────────────────────────────────────────┘
```

**Empty state:** Large heart icon + "Chưa có tin đăng yêu thích" + "Khám phá ngay" → /search

---

### 5.13 Messages — `/messages` 🔒

**Purpose:** Inbox of received messages from other users about your listings.

```
┌─────────────────────────────────────────────┐
│  "Tin nhắn" heading                          │
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐│
│  │ [Avatar] Nguyen Van A    [Mới] 2h ago   ││
│  │ ┌──────────────────────────────────┐    ││
│  │ │ [PropertyThumb] Căn hộ Vinhomes │    ││
│  │ └──────────────────────────────────┘    ││
│  │ "Tôi muốn hỏi thêm về căn hộ này..." ││
│  └─────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────┐│
│  │ [Avatar] Tran Thi B           5 ngày    ││
│  │ (dimmer - already read)                 ││
│  │ ...                                     ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

**Unread messages:** Highlighted background, left blue accent border, "Mới" chip
**Empty state:** Mailbox icon + "Chưa có tin nhắn nào"

---

### 5.14 Map — `/map`

**Purpose:** Explore listings on an interactive map.

```
┌──────────────────────────────────────────────────────┐
│  ┌──────────────┐ ┌──────────────────────────────────┐│
│  │ SIDEBAR      │ │                                  ││
│  │ (350px)      │ │         LEAFLET MAP              ││
│  │              │ │                                  ││
│  │ SearchFilters│ │    📍    📍                       ││
│  │ (vertical)   │ │        📍    📍                   ││
│  │              │ │                    📍             ││
│  │ "42 kết quả" │ │   📍        📍                   ││
│  │              │ │                                  ││
│  └──────────────┘ └──────────────────────────────────┘│
└──────────────────────────────────────────────────────┘
```

**SearchFilters (vertical variant in sidebar):**
- Stacked layout: Keyword → Category → Listing Type → Property Type (RE) or Condition (non-RE) → City → Price slider → Area + Bedrooms (RE) → Search + Clear buttons

**Map markers:** Each listing with lat/lng gets a pin. Click pin → popup with:
- Title
- Formatted price
- Location text
- "Xem chi tiết →" link

**Mobile:** Sidebar becomes a slide-out drawer (toggle via hamburger button)

**Default center:** Vietnam [16.0544, 108.2022], zoom 6

---

### 5.15 About — `/about`
- Intro paragraph about ChoTot marketplace
- 3 feature cards (Fast, Trustworthy, Free)
- Contact info section (phone, email, address from site config)

### 5.16 Contact — `/contact`
- Left: Contact info (phone, email, address)
- Right: Contact form (name, email, phone, message content)
- Form currently simulates submission (no backend API yet)

### 5.17 Privacy Policy — `/privacy`
- Static Vietnamese legal text with 5 sections about data collection, purpose, security, cookies, user rights

### 5.18 Terms of Service — `/terms`
- Static Vietnamese legal text with 5 sections about acceptance, accounts, content policy, liability, amendments

### 5.19 404 Page
- Large "404" number, "Trang không tồn tại" text, "Về trang chủ" button

### 5.20 Error Page
- "Đã có lỗi xảy ra" title, error message in alert box, "Thử lại" button

---

## 6. PropertyCard Component (used everywhere)

### Grid Variant (used in Search, Favorites)
```
┌────────────────────────┐
│ [Image, 220px height]  │
│ ┌────┐          ❤️     │
│ │ BÁN│                 │
│ └────┘                 │
│  hover: "Xem chi tiết" │
├────────────────────────┤
│ Title (2 lines max)    │
│ ₫15,000,000,000        │
│ 📍 Quận 7, TP.HCM     │
│ [120m²] [3PN] [2WC]   │ ← RE
│ OR [📱Điện tử] [Mới]  │ ← Non-RE
│ 2 ngày trước           │
└────────────────────────┘
```

### List Variant (used in Search)
```
┌──────────────────────────────────────────┐
│ [Image     ] Title (1 line)              │
│ [280×200px ] ₫15,000,000,000            │
│ [           ] 📍 Quận 7, TP.HCM         │
│ [           ] [120m²] [3PN] [BÁN]       │
│ [           ] 2 ngày trước          ❤️   │
└──────────────────────────────────────────┘
```

**Favorite heart:** Outlined = not saved, Filled red = saved. Click toggles (optimistic UI). Requires login.

---

## 7. User Flows

### Flow 1: Browse → Buy/Contact
```
Homepage → Click category "Xe cộ"
  → Search page (filtered by VEHICLES)
  → Adjust filters (price, condition)
  → Click a listing card
  → Property Detail page
  → Click "Gửi tin nhắn"
  → (Login if needed)
  → Fill contact form → Send
  → Message appears in seller's /messages inbox
```

### Flow 2: Post a Listing
```
Homepage → Click "Đăng tin" (or header button)
  → (Login if needed)
  → /properties/new
  → Select category (e.g., ELECTRONICS)
  → Form adapts: shows condition/brand/model fields
  → Fill all fields + upload images
  → Submit
  → Redirect to new listing's detail page
```

### Flow 3: Manage Listings
```
Header avatar → "Tin đăng của tôi"
  → /my-properties (list of your listings)
  → Click ⋮ → Edit → /properties/[id]/edit (pre-filled form)
  → Update → saves via PUT
  OR
  → Click ⋮ → Delete → Confirm dialog → removes listing
```

### Flow 4: Save & Review Favorites
```
Search/Detail → Click ❤️ heart (must be logged in)
  → Heart fills red (instant, optimistic)
  → API saves in background
  → Header → Heart icon → /favorites
  → See all saved listings
```

### Flow 5: Map Exploration
```
Header → "Bản đồ"
  → /map
  → Left sidebar: adjust filters
  → Map shows pins for matching listings
  → Click pin → popup with title, price
  → Click "Xem chi tiết" → Detail page
```

### Flow 6: Authentication
```
Register: /auth/register → fill form → POST /api/auth/register → redirect to login
Login: /auth/login → email/password OR Google → NextAuth session created
Forgot: /auth/forgot-password → email → sends token (no email service yet)
Reset: /auth/reset-password?token=xxx → new password → updated
```

### Flow 7: Profile & Account
```
Header avatar → "Tài khoản" → /profile
  → Update name/phone → PUT /api/user/profile
  → OR Delete account → confirm → DELETE /api/user/delete
    → All user's listings deactivated → account anonymized → logout
```

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile | <600px | 1 column grids, hamburger menu, full-width cards, map drawer as overlay |
| Tablet | 600-900px | 2 column grids, still mobile header |
| Desktop | >900px | 3+ column grids, full header nav, map with persistent sidebar |

---

## 9. Theme & Branding

### Colors
- **Primary gradient:** #6366f1 (Indigo) → #8b5cf6 (Purple)
- **Each category has its own accent color** (see category table above)
- **Light theme:** White backgrounds, dark text
- **Dark theme:** Dark gray backgrounds (#121212), light text

### Typography
- Headings: Bold, large
- Body: Regular weight
- Vietnamese text throughout (with English toggle)

### Brand Identity
- Name: **ChoTot**
- Logo: Text-based with gradient coloring
- Tagline (vi): "Mua bán, trao đổi dễ dàng"
- Tagline (en): "Buy, sell, trade easily"

---

## 10. Data & API Summary

| Data | Source | Caching |
|------|--------|---------|
| Listings | PostgreSQL via Prisma → /api/properties | React Query with stale time |
| Favorites | /api/favorites + Zustand local store | Optimistic UI |
| Messages | /api/messages | React Query |
| User profile | NextAuth session + /api/user/profile | Session-based |
| Search filters | URL params + Zustand store | Persisted to localStorage |
| Theme/Language | Zustand | Persisted to localStorage |
| Images | Cloudinary CDN | Browser cache |

---

## 11. Vietnamese Cities Supported

| Code | Name |
|------|------|
| HN | Hà Nội |
| HCM | TP. Hồ Chí Minh |
| DN | Đà Nẵng |
| HP | Hải Phòng |
| CT | Cần Thơ |
| BD | Bình Dương |
| DNA | Đồng Nai |
| KH | Khánh Hòa |
| QN | Quảng Ninh |
| TTH | Thừa Thiên Huế |
