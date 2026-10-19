# Biochemistry Field Notes

Open `Biochemistry-Field-Notes-offline.html` directly, or serve `dist/` with `npm run serve`. The standalone file works without an internet connection. Use Learn & Explore for step-linked concept diagrams and teaching cards, or Guided Practice for staged questions. The same Field Notes palette and interaction model are used by the Orgo and Biology apps.

This first complete outline pass contains 12 chapters, 61 concise lessons, 244 walkthrough steps, 61 workshops, 183 practice stages and 244 teaching cards. The original qualitative diagrams use stable concept entities; they are explicitly not atom-resolved molecular structures or experimental data. Thirteen process views have optional motion. Both themes, keyboard operation, reduced motion and independent/assisted progress tracking are supported. Progress is isolated under the biochemistry identity.

## Development

- `npm install` and `npx playwright install chromium` on a new machine.
- `python -m pip install -r testing/requirements.txt` for JSON Schema validation.
- `npm test` validates schemas, builds static/offline artifacts, creates source-hashed blind/keyed packets, and runs unit, browser, full-course, accessibility and visual checks.
- `npm run packets:check` checks existing packets without regenerating them.
- `npm run report` requires all current-source software results to pass first.

Canonical curriculum is in `dev/chapters/`; shared behavior and original SVG artwork are in `dev/src/`. `project-layout.json` documents dev/testing/review conventions. Edit canonical chapter JSON directly; development scripts build and validate those sources.

## Scientific scope

This is condensed original MCAT teaching material organized by the locally inspected textbook outline. Independent scientific review is pending. Passing software checks and answer-key traversal do not prove that explanations or keys are scientifically correct. Four inspected introductory OpenStax sections support selected foundations, not full-course verification. See `SCIENCE_REVIEW.md` for the review backlog and `dev/references/sources.json` for source records.

The private book stays in its original sibling directory. No textbook prose, illustrations, questions, answer keys, EPUB resources or external fonts are required by either app artifact. No live deployment or external model review is claimed.
