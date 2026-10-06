---
name: Codmify — An Idea Becomes a World
description: A cinematic, scroll-driven landing page blending a Nigerian city, a working studio, real products and readable editorial content.
colors:
  primary: "#121279"
  secondary: "#51C4FF"
  tertiary: "#E8CB89"
  neutral: "#FAFAFA"
  ink: "#10162F"
  muted: "#526573"
typography:
  display:
    fontFamily: Archia
    fontSize: 4rem
    fontWeight: 700
    lineHeight: 1.08
  heading:
    fontFamily: Archia
    fontSize: 2.75rem
    fontWeight: 600
    lineHeight: 1.15
  body:
    fontFamily: Archia
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: Archia
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: 0.08em
rounded:
  control: 12px
  panel: 20px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
---

## Status and scope

This is the design specification for the proposed full landing-page revamp. It records direction and acceptance criteria; it does not establish that the revamp or its visual verification is complete. Exact timing, models and scene framing must be tuned in rendered previews.

The permanent landing page becomes a connected 3D story with real HTML content. Existing service, project, pricing, contact and legal routes remain accessible. Keep FAQs, packages, contact details and footer content discoverable in normal document flow.

## Concept

**An idea becomes a world.** A visitor follows an idea through a Lagos-inspired city into Codmify's studio, sees how the team creates digital products, explores real work and arrives at an invitation to build something together.

The visual character is polished architectural animation: expressive silhouettes, warm materials, restrained detail and convincing depth. Nigeria is expressed through the coastal setting, varied architecture, palms, yellow buses, pedestrians and street activity. The imagined office must not imply a real business address.

The visitor should understand what Codmify offers from the opening screen and be able to start a project immediately.

## Composition: one scene, one clear message

3D imagery and text share a background, lighting palette and visual rhythm. Each chapter gets its own composition; there is no fixed text side or repeated mandatory split layout.

- Use a twelve-column desktop composition with comfortable outer margins. Text usually occupies four or five columns; the main scene subject occupies the remaining area.
- Alternate left, right, centred and sky placements when the subject and reading order justify it. Do not alternate mechanically.
- Reserve quiet areas in camera framing for text. Buildings, moving people, particles and bright lights must not cross reading areas or controls.
- Blend the scene into text through subtle gradients or atmospheric haze. If contrast cannot be guaranteed, use an intentional solid reading surface.
- Use one dominant headline, a short supporting paragraph and one primary action per chapter. A secondary action is optional.
- Keep body copy around 35–60 characters per line. Limit display headlines to roughly two or three lines.
- Use large, deliberate typography. Decorative labels must not carry information essential to understanding the page.
- Avoid making every section a bordered card or putting all copy in translucent panels.

## Storyboard

| Chapter | 3D direction | Text composition | Content and action |
| --- | --- | --- | --- |
| City opening | An elevated view of a coastal Nigerian city. The Codmify tower becomes the focal point as scrolling moves the camera closer. | Headline in quiet sky space, usually upper left or centre; tower offset below. | “Your next big idea starts here.” Explain that Codmify designs and builds websites and digital products. Primary: Start a project. Secondary: Explore our work. |
| The studio | Enter the transparent tower and settle beside the team workspace. | Copy beside an open workspace area, switching sides where needed. | “One team. From idea to launch.” Introduce services using verified current offerings and links to /services. |
| Ideas become products | A sketch becomes a structured interface, then a finished website or app. | A short centred transition followed by readable copy opposite the assembling interface. | Explain the actual process: understand, design, build, launch. Show outcomes rather than technical implementation details. |
| Our work | Real project screenshots appear in restrained 3D device frames or architectural displays. | Project description beside each device; layouts vary with its silhouette. | Use active portfolio entries and actual assets. Provide descriptive project links and /our-projects. Favvii remains excluded. |
| Built together | The camera settles into a welcoming collaboration space. Optional subtle connections converge into a shared structure. | A calm editorial layout with real quotes or concrete delivery principles. | Establish trust using approved facts. Do not invent client quotes, metrics, awards or timelines. |
| Your next chapter | The journey resolves into a studio desk, doorway or other composed invitation. Camera motion settles. | Prominent heading and CTA; pricing and contact continue in normal page sections. | “Let's build your next chapter.” Link to /hire-us and /pricing. Retain FAQs, contact and footer. |

All chapter copy above is proposed direction, not approved business claims.

## October anniversary interlude

The two-year celebration is a seasonal chapter within the story, not a blocking game or a second mandatory tour layered over the new landing page.

During October 2026, the office celebration can lead into the multiverse: independent orbital elements converge into the real Codmify logo, CELEBRATING, a sculpted gold 2, YEARS and “Together, we build what's next.” Scrolling controls both assembly and reversal. Keep the final statement legible long enough to read before moving onward.

Use the existing campaign window: October 1, 2026 at 00:00 through November 1, 2026 at 00:00, exclusive end, in Africa/Lagos. After expiry, omit the anniversary chapter and connect adjacent permanent chapters smoothly. No empty scroll space, leftover badge, particles or anniversary copy may remain.

The permanent story is available on every visit. The existing once-per-day overlay is a legacy implementation to replace when the new landing page ships; it must not open on top of the same story.

## Scroll and motion grammar

- Use native document scrolling. Scroll position drives camera progress and chapter transitions. No automatic camera advance, scroll locking or mandatory participation.
- Ambient movement can continue while scrolling is stopped: walking, traffic, birds and subtle office activity. Camera movement stops after a brief smoothing settle.
- Scrolling backwards reverses transitions and assembly. Avoid replay triggers tied only to entering a section.
- Give each chapter an arrival, reading hold and departure. Start with approximately 20%, 60%, 20% of its scroll interval, then tune by reading length and device size.
- Keep readable content visible through a generous hold. Do not make visitors chase text moving with the camera.
- UI fades and small translates typically use 200–350ms. Scene changes follow scroll distance rather than a forced duration.
- Avoid abrupt field-of-view changes, camera roll, aggressive acceleration and large continuous rotations near text.
- Links and buttons react immediately. Animation never delays navigation or form submission.
- Decorative fireworks use restrained bursts, not bright full-screen flashes. Celebration effects stay away from reading zones.

## Typography, brand and materials

Retain Archia as the initial typography direction and use the existing Codmify logo assets. Revisit font loading during implementation so content remains visible while fonts load.

Deep blue is the brand anchor; cyan signals energy and interaction. Champagne gold is concentrated on anniversary moments and selected focal details. Use neutral daylight and warmer office materials so the entire story does not become a uniform dark-blue canvas.

Use glass sparingly, with enough opacity and structure to read architecture. Keep characters stylised and professional. A consistent model language matters more than adding many small props.

Scene lighting may follow the visitor's device-local morning, afternoon, evening or night. Content contrast must pass in every lighting state. The anniversary schedule continues to use Lagos time, independently of scene lighting.

## Navigation and content

Keep persistent, unobtrusive navigation and a visible project-start action. Chapter links should move directly to the appropriate content and scene position without forcing traversal of preceding chapters. Preserve existing standalone route destinations.

Main copy, project details, links, forms and pricing remain semantic HTML. Use one page h1 and a logical heading hierarchy. Canvas text is for decoration and in-world signage; it must not be the only source of essential information.

## Mobile and accessible modes

Design mobile compositions independently. Usually place the scene above or behind the heading and copy, with a quieter background beneath text. Do not shrink the desktop arrangement wholesale.

Use at least 16px body text, comfortable line height and approximately 24px horizontal content padding. Controls should provide at least 44×44px targets. Avoid tiny in-world interaction requirements.

Reduced-motion mode uses stable scene views or poster images alongside the complete HTML content. Disable camera flights, orbital movement and particle effects. Keyboard navigation, visible focus and reading order must work without the canvas.

If WebGL is unavailable, loading fails or the device cannot sustain the scene, provide a visually coherent static page with all content and actions. Do not leave a loader or overlay blocking the site.

## Rendering and delivery targets

Use a shared scene renderer for the story where practical. Load later chapter assets on demand, cap device pixel ratio, instance repeated elements and batch static geometry. Pause rendering in hidden tabs and when the scene is outside the viewport. Dispose textures, materials, geometry and event listeners on teardown.

Proposed targets: 60fps on a representative desktop and at least 30fps on a representative mid-range phone. Evaluate Core Web Vitals against LCP ≤2.5s, INP ≤200ms and CLS ≤0.1; these are targets requiring measurement, not current verified results.

Avoid adding scene libraries until the existing Three.js setup has a demonstrated need. Content and primary actions should render before the full 3D world loads.

## Implementation sequence

1. Establish scene assets, camera framing and text compositions for city → studio → services.
2. Verify that vertical slice on desktop and mobile, including reduced motion and static fallback.
3. Extend the visual language through process, projects and contact chapters.
4. Integrate the October interlude and verify the expiry transition.
5. Replace the legacy welcome overlay, measure performance and verify all content/routes before release.

## Acceptance criteria

- Fresh screenshots show desktop and mobile compositions for every chapter, including light and night states.
- Scroll slowly, quickly and backwards; resize and rotate the device; navigate directly to chapters. Text remains readable and controls remain usable.
- Test keyboard focus, reduced motion, unsupported WebGL, failed assets, background/resume and route changes.
- Verify all active projects, pricing, service links, forms, FAQs and footer content against their existing contracts.
- Verify dates immediately before and after October boundaries, with no broken camera path or blank chapter after expiry.
- Run appropriate lint, TypeScript and production-build checks. Record baseline failures separately.
- Distinguish implementation, rendered verification, commits, pushes, PRs and deployment in delivery reports.

## Reference material

These references inform the document structure and selected principles. Codmify's storyboard, brand and cinematic compositions are specific to this project.

- [Google Labs DESIGN.md format](https://github.com/google-labs-code/design.md): tokens plus human-readable design rationale.
- [Oxide design system](https://github.com/oxidecomputer/design-system/blob/master/design.md): typography hierarchy, consistent tokens and purposeful motion. Its product aesthetic is not adopted wholesale.
- [Happier DESIGN.md](https://github.com/happier-dev/happier/blob/dev/DESIGN.md): direct manipulation, reversible motion and continuity.
- [Modern design.md collection](https://github.com/Shuvam-Banerji-Seal/modern-design.md): community-authored website design references, for exploration rather than authoritative copies of those brands.
