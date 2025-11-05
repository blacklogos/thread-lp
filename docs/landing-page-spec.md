# Astro Landing Page Spec

## Overview
- Implement the new Threads to HTML landing page as `src/pages/index.astro`, using the shared `Layout.astro` for global head, navigation, and sticky CTA scaffolding.
- Store page copy, assets, and structured data in `src/content/landing.ts` (or `.json`) to keep components presentational and streamline future updates.
- Organize section components under `src/components/landing/` (e.g., `Hero.astro`, `ProblemGrid.astro`, `FeatureGrid.astro`, `HowItWorks.astro`, `FeatureTabs.astro`, `UseCases.astro`, `TechHighlights.astro`, `ComparisonTable.astro`, `Gallery.astro`, `SocialProof.astro`, `FAQ.astro`, `FinalCTA.astro`, `Footer.astro`).

## Visual & UX
- Threads-inspired gradient accents with neutral light background (#f7f8fa) and accent blue (#0095f6).
- Typography: Inter/SF Pro Display (or existing sans-serif) for headings, system font stack for body text, JetBrains Mono (or existing mono) for code snippets.
- Layout: max-width 1200px, fluid spacing, clamp-based typography, rounded 8px corners, subtle shadows, smooth hover and focus transitions, sticky navigation with CTA, smooth in-page scrolling.
- Responsive breakpoints at 768px (tablet) and 480px (mobile); ensure mobile single-column layout, touch targets ≥44px, optimized WebP images via Astro `<Image />`.

## Interactivity
- Use Astro Islands only where necessary: interactive testimonial carousel, FAQ accordion, feature tabs, comparison slider, sticky CTA behavior, and optional live preview/demo; leverage the framework already used in the project (React/Svelte/Vue).
- Primary CTA: "Add to Chrome – It's Free" (Chrome Web Store link) placed in hero, sticky header, comparison, and final CTA sections.
- Secondary CTAs: "See How It Works", "View Demo", "Star on GitHub", "Read Documentation" as appropriate per section.
- Implement optional newsletter/waitlist form with optimistic UI, validation, and privacy messaging.

## SEO & Accessibility
- Configure `Astro.head` with descriptive title, meta description, canonical URL, OpenGraph and Twitter cards, and custom `og:image` representing before/after transformation.
- Add JSON-LD for `SoftwareApplication` and FAQ schema when content is finalized.
- Ensure semantic sectioning (`main`, `section`, `nav`, `footer`), aria attributes for interactive elements, keyboard navigability, focus indicators, and WCAG contrast compliance.
- Target Lighthouse scores ≥90 for performance, accessibility, and SEO.

## Analytics & Validation
- Instrument analytics events for CTA clicks, video plays, section scroll depth, GitHub and Chrome Web Store link interactions.
- Testing workflow: run `npm run lint`, `npm run test`, `astro check`, and `npm run build` before delivery; perform Lighthouse audit via `npm run preview` to verify performance/accessibility targets.
