---
name: "بن عسير — Asir Coffee"
description: "An Arabic coffee storefront grounded in supplied Asir artwork, warm paper, and restrained forest-green commerce controls."
colors:
  brown: "#4f2a17"
  lime: "#a5c611"
  forest: "#20392c"
  cream: "#f8f5ed"
  ink: "#322b23"
  muted: "#736453"
  line: "#ded7c9"
  paper: "#fffdfa"
  white: "#ffffff"
  product-surface: "#ede6d8"
  story-surface: "#eae5d7"
  focus: "#758c10"
  forest-hover: "#34513c"
  lime-hover: "#badb29"
  lime-ink: "#243321"
  outline-hover: "#eee6d6"
  filter-hover: "#eae4d7"
  badge-surface: "#fffdf6"
typography:
  display:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: 1.35
  headline:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "38px"
    fontWeight: 800
    lineHeight: 1.25
  title:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  navigation:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "16px"
    fontWeight: 500
  label:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "15px"
    fontWeight: 400
  button:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.4
rounded:
  badge: "3px"
  chip: "4px"
  button: "5px"
  field: "6px"
  toast: "8px"
  image: "10px"
  surface: "12px"
  dialog: "14px"
  circle: "50%"
spacing:
  filter-gap: "8px"
  control-gap: "12px"
  mobile-card-gap: "15px"
  card-gap: "24px"
  heading-bottom: "28px"
  card-row-gap: "34px"
  category-gap: "38px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "13px 25px"
  button-primary-hover:
    backgroundColor: "{colors.forest-hover}"
  button-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.lime-ink}"
    rounded: "{rounded.button}"
    padding: "13px 25px"
  button-lime-hover:
    backgroundColor: "{colors.lime-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.brown}"
    rounded: "{rounded.button}"
    padding: "13px 25px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "11px 14px"
  filter-selected:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    rounded: "{rounded.chip}"
    padding: "9px 17px"
  product-visual:
    backgroundColor: "{colors.product-surface}"
    rounded: "{rounded.surface}"
  product-badge:
    backgroundColor: "{colors.badge-surface}"
    textColor: "{colors.brown}"
    rounded: "{rounded.badge}"
    padding: "3px 10px"
  dialog:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
---

# Design System: بن عسير

## Overview

**Creative North Star: “The Asir Coffee Table.”** This descriptive name records the implemented direction under the user's delegation of design choices. Supplied mountain illustrations, packaging and association artwork establish the identity; warm surfaces and measured Arabic typography give the shopping controls a hospitable, grounded character.

The storefront is Arabic and right-to-left. Illustrations receive generous space, while catalog controls and product metadata are compact. Original branding stays intact, and demonstration disclosures remain legible alongside shopping actions.

**Key Characteristics:**
- Supplied artwork and real product cutouts lead the visual identity.
- Brown headings, forest controls and lime accents sit on warm cream.
- Flat catalog cards separate image, title and price without enclosing every item in a panel.
- Local Tajawal fonts support a consistent Arabic hierarchy.

## Colors

The frontmatter records normative values extracted from `styles.css`; original brown and lime remain the identity anchors.

### Primary
- **Coffee Brown (`brown`)**: headings, prices, outlined actions and editorial links.
- **Fresh Coffee Leaf (`lime`)**: hero action, selected text, quick-add hover and confirmation icon.

### Secondary
- **Mountain Forest (`forest`)**: announcement, footer, primary buttons, selected filters, cart count and toast.

### Neutral
- **Warm Cream (`cream`)** is the page canvas; **Paper (`paper`)** supports inputs and dialogs.
- **Ink (`ink`)** carries body text, **Muted (`muted`)** descriptions, and **Line (`line`)** fine dividers.
- Product imagery rests on `product-surface`; story content uses `story-surface`. These tonal changes provide separation without card shadows.

## Typography

Tajawal is bundled locally in 400, 500, 700 and 800 weights, with `sans-serif` fallback. The hero's original headline is embedded in supplied artwork; the HTML text hierarchy must not be mistaken for replacement artwork typography.

- Display: story heading, 44px/1.35 at 800; 35px on mobile.
- Headline: general section headings, 38px/1.25 at 800; principal mobile headings 30px.
- Product title: 20px/1.4 at 700, 18px below 1100px, 17px below 800px.
- Body: 17px/1.7 at 400; smaller supporting paragraphs use 15–16px.
- Navigation: 16px at 500, reducing to 14px below 1100px.
- Price: 20px at 800 with tabular numerals; Arabic Saudi number formatting and a smaller currency suffix.
- Metadata and disclosure text use 12–14px desktop, with selected mobile metadata at 10–11px.

## Layout

The main container is `min(1280px,90%)`, centered with logical inline margins. Desktop catalog is four equal columns, with 34px row and 24px column gaps. The 1100px breakpoint reduces column gaps to 18px. At 800px it becomes two columns with 27px row and 15px column gaps.

Desktop header is 112px tall; mobile is 86px. The hero preserves its natural image ratio without a maximum-height cap, including wide desktops. Below 800px, desktop navigation gives way to a menu, the category rail scrolls horizontally with 130px snap targets, and the hero image uses `object-fit:contain` with actions placed in a separate flow row beneath it. Desktop hero actions overlay the supplied image; positioning adjusts again above 1600px. The supporting hero story link has a solid forest background, 4px 10px padding and 3px corners to keep its light text legible over artwork.

Story, FAQ and preparation layouts collapse to single columns at 800px. The product dialog changes from two columns to one. The cart is a right-edge drawer, `min(470px,100vw)`, using the full viewport width only when the viewport is narrower than 470px. Story paragraphs stop at 50ch; expanded FAQ copy at 65ch.

## Elevation & Depth

Most surfaces are flat, separated by warm background tones and 1px rules. Elevation is reserved for overlays: dialog shadow `0 15px 60px #10261740`, toast shadow `0 5px 20px #10261730`, and dialog backdrop `#11201799`. Product cards have no drop shadow.

Motion is small and purposeful: buttons lift 2px, category links lift 6px, product images scale to 1.06, and the drawer enters from the right over .35s. The shared ease is `cubic-bezier(.16,1,.3,1)`. CSS reduced-motion mode disables transitions and animation and restores automatic document scrolling.

## Shapes

Image wells and major artwork containers use 12px corners; dialogs use 14px, inputs 6px and actions 5px. Small rectangular badges use 3px; filter chips use 4px. Icon actions, quick-add and cart counters are circles. The cart drawer has square corners. Borders are subtle and warm; product images retain their natural proportions inside square wells.

## Components

### Buttons
Forest-filled primary actions are confident and compact, with 13px 25px padding, 48px minimum height and 700 weight. The hero uses a lime variant with dark text. Outline actions use a brown stroke and transparent background. Hover colors are recorded in tokens; all interactive controls receive a 3px focus outline in `focus`, offset 4px. Disabled buttons use .5 opacity and a not-allowed cursor.

### Fields and filters
Inputs and selects use a 1px `line` border and paper background. Labels remain visible above checkout and variant controls. Filter buttons use the selected forest fill and `aria-pressed`; unselected filters are transparent and gain a warm hover background. Mobile filters scroll rather than wrap.

### Product cards
The square image well uses `product-surface` with a 12px radius. A small badge sits top-right; a circular quick-add control sits bottom-left. Metadata, title, brown price and weight appear below the well. Clicking image or title opens details; quick-add uses the first available variant. Detail controls expose weight and grind before adding an explicit selection.

### Navigation
Desktop links use brown text and a lime underline for hover or active state. Header tools use 44px circular hit areas. Mobile navigation opens beneath the header, and search opens as an inline panel with visible label.

### Category rail
The original illustrated category graphics act as navigation. Coffee categories filter and scroll to the collection; business and origin graphics link to their corresponding sections. Preserve those images rather than recreating their embedded typography.

### Dialogs and feedback
Native dialogs cover product details, cart, demo checkout and informational policies. Product photos use contained sizing and optional thumbnail choices. The toast uses a forest background and live status semantics. Checkout confirmation uses a lime circular check and a cream receipt panel; all purchase language clearly identifies the demonstration.

## Do's and Don'ts

- **Do** preserve supplied logos, product imagery and brand artwork.
- **Do** keep Arabic RTL layout, local Tajawal and visible keyboard focus.
- **Do** derive future color choices from the named tokens and preserve original brown and lime.
- **Do** keep the catalog flat, with tonal image wells and clear price hierarchy.
- **Do** retain demonstration disclosures near catalog and checkout decisions.
- **Don't** crop the mobile hero or obscure the artwork's embedded headline.
- **Don't** substitute speculative testimonials, delivery guarantees or commercial proof for supplied content.
- **Don't** introduce decorative card shadows across the catalog; the incumbent elevation vocabulary is for overlays.
