---
name: Codmify — Inside the Building
description: A scroll-driven architectural tour from reception through six floors, with centrally composed content and clickable room exhibits.
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

This specification covers the complete landing-page revamp. The permanent journey now starts inside reception and connects seven content rooms across six floors. It supersedes the previous city-to-studio opening and side-by-side text layouts. Rendered verification and performance measurement remain outstanding; camera framing must be assessed in desktop and mobile previews.

The page retains real HTML content and native scrolling. Existing services, projects, pricing, FAQ, testimonials, contact controls and standalone routes remain accessible. The building is an imagined brand environment, not a claim about Codmify's physical business address.

## Concept

**Step inside Codmify.** Begin at the ground-floor reception. Visitors see a branded reception desk, seated guests, walking staff, plants, warm stone, timber and a glazed frontage. Scroll to the elevator, travel upstairs, explore one or two rooms, and repeat until the whole landing page has been covered.

The architecture has consistent floor heights, structural slabs, columns, window mullions, ceiling lighting and an open elevator shaft. Rounded furniture, planted corners, framed project exhibits and restrained metal details make the rooms feel inhabited. The visitor can start a project immediately from reception.

## Composition: content belongs to the room

Main content sits centrally in the page, composed as readable room displays rather than copy beside a separate 3D image. Furniture and staff occupy the surrounding space. The scene and content share warm materials, blue branding and gold details.

- Centre headlines, supporting copy and primary actions; give services and project details a readable internal alignment.
- Keep essential copy in semantic HTML. Canvas signs use the actual logo and active portfolio assets, but do not replace accessible text or controls.
- Use quiet, light reading surfaces so daylight, evening and night cannot reduce text contrast.
- Let wide package and contact surfaces use the space they need. Reuse their existing interactive components.
- Reserve visible space around the content for reception guests, studio desks and room architecture. Avoid bright lights or walking paths behind controls.
- Use large typography and approximately 35–60 characters per body-copy line. Decorative floor labels supplement real headings.
- Provide HTML links equivalent to clickable 3D exhibits and elevator destinations.

## Storyboard

| Floor / room         | 3D direction                                                                                                                     | Page content and actions                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| G / Reception        | Enter inside the building at eye level. Branded reception, couches, seated visitors and walking staff surround the reading area. | Hero heading and business introduction; Start a project, Explore our work and an upstairs link.                        |
| 01 / Studio          | Exit the elevator into a furnished workspace with desks and monitors.                                                            | Team introduction and Meet Codmify.                                                                                    |
| 01 / Capabilities    | Walk across the same floor into the adjacent room; do not take the elevator between these rooms.                                 | All current service links. Selected 3D service displays are clickable.                                                 |
| 02 / Project gallery | Take the elevator to framed exhibits using actual project images.                                                                | Current portfolio previews, project destinations and View all projects. Favvii remains excluded.                       |
| 03 / Planning        | Arrive beside timber presentation plinths and planning displays.                                                                 | Existing packages, pricing, currency selection and WhatsApp actions.                                                   |
| 04 / Answer library  | Bookshelves and lounge seating form a quieter room.                                                                              | Existing FAQ accordions and their full answers.                                                                        |
| 05 / Meeting floor   | End in a collaboration room with a meeting table and invitation display.                                                         | Project-start action, existing contact form, contact details and testimonials. Footer remains in normal document flow. |

Room links in the floor directory work independently of the 3D renderer. In-world clicks navigate to existing destinations. Camera transitions follow scroll and reverse when the visitor scrolls backwards.

## October anniversary interlude

The permanent building tour includes October-only reception signage and balloons. The existing multiverse celebration remains available through explicit replay; it does not automatically interrupt the permanent tour.

During October 2026, the office celebration can lead into the multiverse: independent orbital elements converge into the real Codmify logo, CELEBRATING, a sculpted gold 2, YEARS and “Together, we build what's next.” Scrolling controls both assembly and reversal. Keep the final statement legible long enough to read before moving onward.

Use the existing campaign window: October 1, 2026 at 00:00 through November 1, 2026 at 00:00, exclusive end, in Africa/Lagos. After expiry, omit the celebration decorations and replay. Keep every permanent room and its scroll range. No leftover badge, confetti or anniversary copy may remain.

The permanent building story is available on every visit. The daily automatic overlay has been removed; explicit replay is the only way to open the separate celebration.

## Scroll and motion grammar

- Use native document scrolling. Scroll position drives camera progress and chapter transitions. No automatic camera advance, scroll locking or mandatory participation.
- Ambient movement can continue while scrolling is stopped: walking visitors and subtle office activity. Camera movement stops after a brief smoothing settle.
- Scrolling backwards reverses transitions and assembly. Avoid replay triggers tied only to entering a section.
- Hold each room through the first 58% of its scroll interval. Between floors, approach the lift, close the doors, travel vertically, open the doors and settle into the next room. Between rooms on floor 01, use a horizontal walk instead. Tune travel distances after rendered inspection.
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

1. Build the connected interior, reception furniture, people and elevator shaft.
2. Map all seven content rooms to native scroll positions and existing controls.
3. Add clickable exhibits and floor navigation with accessible HTML equivalents.
4. Verify camera continuity, same-floor travel, lighting, reduced motion and production compilation.
5. Inspect rendered desktop/mobile layouts and measure performance before visual acceptance.

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
