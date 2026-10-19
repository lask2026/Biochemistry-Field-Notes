# Biochemistry build progress

## Direct full-outline implementation — 2026-10-19

The user requested Biochemistry in the Orgo/Biology format with no pilot checkpoint. Inspected both existing app structures and the private biochemistry TOC. Reused generic Biology UI, validation, storage, build and test infrastructure; authored new curriculum for all 61 sections. The book, Orgo app and Biology app remain separate.

Implemented all 12 chapters with 61 lessons, 244 steps, 61 three-stage workshops, 183 stages and 244 native teaching-card accordions. Added original biochemical concept-symbol SVGs with stable entity IDs and explicitly declared process relationships. Thirteen views include pausable/replayable qualitative process motion. Practice and blind diagrams stay static. Created independent subject storage/import identity, static/offline outputs and source-hashed chapter/course blind/keyed packets.

Initial checks caught a test treating the ordinary word “focusing” as a focus CSS class; narrowed it to actual class attributes. Browser execution required the existing user Playwright cache and access to a loopback server outside the sandbox. No validators or scientific status were weakened. Final current-source npm test passed: 14 JSON documents, 27 Node tests, all 12 chapters / 244 walkthrough steps / 183 practice stages, storage/export regression, wrong-answer rejection, active-practice concealment, chapter-isolated persistence, both themes at 320/375/768/1280 pixels, blocked storage and downloaded offline use. Targeted text contrast exceeds 4.5:1; all 244 teaching-card keyboard interactions, 61 workshop links, 13 process animations, pause/replay, label bounds, pointer selection and reduced motion pass. Screenshots were inspected. Packet hashes and generated reports match current sources. These establish software behavior only.

Content scope is condensed, with concept symbols rather than atom-resolved molecular structures. Independent scientific review, more structural/data/quantitative depth and manual assistive-technology checks remain pending. See SCIENCE_REVIEW.md and PROJECT_PLAN.md.

The final pass adds 61 specific memory cues and eight free-response numerical stages. Diagram edges now live in canonical asset JSON. Screenshot review caught reduced-motion CSS removing SVG layout transforms; the fix and a regression check preserve both static positioning and motion suppression. Test-source files are included in evidence fingerprints.
