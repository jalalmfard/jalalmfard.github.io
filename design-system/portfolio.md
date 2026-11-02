# Portfolio design system

Use UI UX Pro Max from `.github/skills/ui-ux-pro-max/`. Search: `python3 .github/skills/ui-ux-pro-max/scripts/search.py "architecture portfolio minimal gallery" --design-system`.

Use only the relevant layout and accessibility guidance from UI UX Pro Max. Its generic typography recommendation was rejected by the owner; it is not a brand direction. Retain the existing cool neutral identity instead of applying the generic industrial orange recommendation. This is an Angular 17 portfolio; do not apply newer Angular APIs without checking version compatibility.

- Palette: canvas #eceef0, surface #f3f4f5, ink #202226, secondary text #555b64.
- Layout: 1280px maximum shell; 20px phone gutters; consistent 16px image grid gaps.
- Typography is locked to the original Quicksand family with the original 300/400 source weights, thin headings, small spaced uppercase navigation and stronger selected titles. Preserve Tahoma for Persian and Arabic. Do not replace font families or enlarge titles as part of a UI upgrade.
- Images lead the experience. Subtle monochrome preview, natural color on hover and keyboard focus. Strong bottom scrim for white titles.
- Navigation: 44px targets, current-page state, visible focus, skip link, Escape closes the mobile menu. Collapsed links must not remain focusable.
- Slideshows: visible pause control, pause on hover/focus/hidden tab, honor reduced motion. Never replace a working image with a failed load.
- English is the default. Keep the minimal EN / فارسی / العربية picker and the existing RTL support.
- Preserve all projects, awards, contact details, private presentation routes and presentation content.
- Shared refinements live in src/portfolio-refinement.css. Component-specific layout lives in component styles.

Validation: production Angular build; browser checks of home, archive and project navigation, mobile menu, language switching, keyboard focus and reduced motion where available.

Upstream source and exact revision are recorded in .github/skills/ui-ux-pro-max/SOURCE.md; MIT attribution is retained. Design assistant files are development resources and not runtime dependencies.

Content constraint: preserve the existing content, project names, images and navigation labels. Do not add editorial headlines, introductions, concepts, or new content sections when refining design. Keep motion controls icon-based with accessible labels.

Publication constraint: restore the previous typography on the live site. Present any further visual redesign as a separate reviewable preview first; do not publish a new visual direction without the owner's selection. Preserve all content.
