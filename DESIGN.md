# Codmify UI design guide

## Purpose
Present Codmify as a digital solutions company with identifiable leadership,
clear services and credible client work. Use confident, straightforward language
that connects our work to business needs.

## Reference guides and how to use them
- [IBM Carbon: spacing](https://www.carbondesignsystem.com/building-blocks/foundations/spacing/overview)
  informs consistent spacing and the relationship between grouped content.
- [IBM Carbon: 2x Grid](https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview)
  informs alignment and responsive visual rhythm.
- [IBM Carbon: typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography/type-sets)
  is a reference for hierarchy and choosing type by content purpose.
- [Material Design: foundations](https://m3.material.io/foundations/)
  is a supporting reference for interaction and accessibility.

The values below are Codmify's own choices, adapted from these principles; they
are not an exact implementation of Carbon or Material. Keep our colours, DM Sans
and current MUI components. No additional UI library is required.

## Brand foundations
- Primary: deep blue `#121279`, sourced from the existing MUI `primary.main`.
  Use for major brand surfaces, headings and primary actions.
- Accent: blue `#008DE5` for restrained highlights and focus indicators.
- On deep blue: white headings and pale blue `#A9DFFF` labels.
- Surfaces: white and existing pale grey `#EDF2F7`.
- Body text on light surfaces: slate `#526573`.
- Borders on light surfaces: `#E0E8EF`.
- Typography: retain DM Sans from the existing theme. Use clear sentence case
  headings; reserve small uppercase labels for section introductions.

Prefer existing theme tokens where available. Accent colours support the brand;
they should not replace deep blue as the primary identity.

## Layout and hierarchy
Use the existing MUI large container and responsive spacing. Give each section
one clear heading, concise supporting text and a purposeful next action. Keep
comfortable mobile gutters and generous space between sections.

Leadership uses a left-aligned introduction on deep blue with white portrait
cards. Show four columns on desktop, two on tablet and one on mobile. Keep cards
equal in height, portraits square and text areas flexible so longer roles fit.
Use restrained 12px corner radii, subtle borders and no decorative card movement.

## Typography scale
Use rem values in implementation so text respects the user's font settings.
The pixel values below describe the visual target at the default 16px root size.

| Purpose | Mobile | Desktop | Weight | Line height |
| --- | --- | --- | --- | --- |
| Page heading | 36px | 56px | 700 | 1.1 |
| Section heading | 32px | 44px | 700 | 1.15 |
| Card heading | 20px | 24px | 700 | 1.3 |
| Introductory copy | 18px | 20px | 400 | 1.65 |
| Body copy | 16px | 16px | 400 | 1.7 |
| Supporting text | 14px | 14px | 400 | 1.6 |
| Section label | 12px | 13px | 700 | 1.5 |

Keep paragraphs around 60–70 characters wide. Use one h1 per page, h2 for
sections and h3 for cards within sections. Do not choose heading tags solely
for their visual size. Allow names, titles and buttons to wrap when needed.

## Spacing and responsive layout
Use a deliberate scale: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80 and 96px.
Use smaller gaps within a group and larger gaps between distinct groups.

| Relationship | Mobile | Desktop |
| --- | --- | --- |
| Page gutters | 24px | Existing centred large container |
| Section vertical padding | 48–64px | 80–96px |
| Section introduction to content | 32px | 40–48px |
| Grid gap | 24px | 24–32px |
| Card padding | 24px | 24–32px |
| Heading to description | 16px | 16px |
| Related text within a card | 8px | 8px |

Retain the existing MUI breakpoints: xs 0, sm 600px, md 900px, lg 1200px,
xl 1536px. Use content fit to decide column counts within those breakpoints.
Leadership uses 1 / 2 / 4 columns at xs / sm / md. Service and case-study grids
may use 1 / 2 / 3 when that gives their content sufficient room.

Use MUI Stack and Grid for predictable alignment. MUI numeric spacing values
use the theme's spacing multiplier; for example, with the current 8px default,
`p: 3` means 24px. Numeric border radii also use a theme multiplier; use explicit
`"12px"` when a fixed radius is intended, or check the theme before using a number.

## Buttons, links and forms
- Use one primary action per section. On white, use deep blue with white text;
  on deep blue, use a white action with deep blue text.
- Use outlined buttons for secondary actions and text links for supporting
  navigation. Keep the hierarchy clear when actions sit together.
- Target a 48px button height, 24px horizontal padding and an 8px radius.
  On small screens, stack paired actions when labels would be cramped.
- Labels should describe the next step: for example, "Discuss your project",
  "View case study" or "LinkedIn profile". Preserve existing action behaviour
  unless changing it is part of the task.
- Keep a visible focus outline with at least 2px thickness and 3px offset.
  Choose an outline colour that contrasts with its surrounding surface.
- Pair every input with a persistent label; placeholders supplement labels.
  Show errors alongside the affected field with text explaining how to resolve
  them. Keep entered data when submission fails.
- Show pending, success and failure states for submissions. Prevent accidental
  duplicate submissions while a request is pending.

## Brand atmosphere
Use the shared BrandBackdrop for low-contrast contour lines, dot patterns and
soft blue lighting behind section content. Hero and page introductions may use
slow orbital motion. Keep decorative elements non-interactive and hidden from
assistive technology. Place patterns behind content and verify text contrast.

Use Reveal for short, staggered section and card entrances. Project and portrait
images may gently zoom on hover; informational card containers stay in place.
Disable continuous animation and image transforms for reduced-motion users.
Keep all meaningful content available without motion.

## Cards, imagery and motion
Use a 12px card radius, subtle borders and consistent internal alignment.
Avoid adding shadows, badges or gradients to every card. Keep heights driven by
content; align actions across a row without truncating meaningful text.

Use real project imagery and existing founder portraits. Preserve image aspect
ratios, choose crops that keep faces visible and provide accurate alt text.
Portraits are square; project image ratios should be consistent within a grid.

Use brief 150–250ms transitions for interactive feedback. Avoid hover movement
on static informational cards. Honour reduced-motion preferences. Treat the
anniversary experience as a seasonal layer, with an accessible way to skip it;
it should not define the permanent company layout.

## Page composition
For a future homepage refinement, use this content order as a starting point:
company proposition, verified client proof, solutions, selected case studies,
delivery approach, leadership and contact. Omit empty proof sections rather
than filling them with invented claims.

Use left-aligned text for explanatory sections and case studies. Reserve centred
text for brief introductions where it improves focus. Alternate white, pale
grey and deep-blue surfaces with purpose, keeping deep blue as the strongest
brand anchor. Explain client problems and business outcomes before listing
technical implementation details.

## Leadership content
Each member has the same Co-founder designation, followed by their name and a
distinct business role. Keep the designation visible as text, separate from the
role. Use existing real portraits and LinkedIn destinations. Do not invent
biographies, credentials, customer endorsements or performance figures.

Current public role allocation:
- John Alafiatayo: Co-founder / Managing Director.
- Dominic Orefuwa: Co-founder / Director of Product & Innovation.
- Abdulmalik Ademola: Co-founder / Director of Business Development.
- Abiodun Olalude: Co-founder / Director of Operations & Client Services.

Maintain one shared leadership component for the homepage and About page.
Future personal profiles should use these same titles and verified experience.

## Accessibility and verification
Use semantic section and heading structure, meaningful link names, visible
keyboard focus and link targets at least 44px high. Check contrast before adding
new colour combinations. Avoid conveying roles or state through colour alone.
Verify desktop and mobile layouts with all four members, including the longest
role, and check for clipping or horizontal overflow. Check at 390px, 768px and
1440px, plus 320px and 200% browser zoom for content reflow. Check keyboard
navigation and ensure fixed navigation or seasonal overlays do not hide focused
controls or section headings.

Target at least 4.5:1 contrast for normal text and 3:1 for large text. Check
control boundaries and focus indicators against adjacent colours. Do not assume
that the bright blue accent is suitable for small text on white; verify each
pairing. Keep supporting slate text on light surfaces and pale labels on blue.

For implementation changes, run appropriate lint and production-build checks,
then inspect rendered screenshots. Documentation-only updates require a diff
and link review; they do not establish that the rest of the website already
conforms to this guide.

## Scope
This direction guides the leadership update and future company content. Keep
broader homepage campaigns, pricing and navigation changes separate unless
requested. Strengthen credibility with clear responsibilities and verified
work, rather than unsupported claims about company size.
