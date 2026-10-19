# Scientific review status

Independent expert review: **pending for all chapters**. No reviewer model was called and no human scientific sign-off is claimed. Original author checks are not independent evidence. Software tests can follow a wrong encoded key successfully.

Only the local TOC headings were used from the private book; no book prose, art or answer material was copied. The inspected OpenStax sections on proteins, enzymes, glycolysis and oxidative phosphorylation support selected introductory foundations. They are recorded in dev/references/sources.json and are not a complete source audit.

## Diagram scope

All 61 current visuals are original concept-symbol schematics. They do not encode molecular graphs, molecular formulas, exact atomic stereochemistry, observed spectra or measured rates. Arrows show explicitly authored qualitative relationships; moving tracers do not establish speed or concentration. Static blind SVGs carry neutral author titles and omit teaching focus. Structural and mechanistic depth remains a documented extension, not completed coverage.

## Chapter review queue

- chapter-01 — Amino Acids, Peptides, and Proteins: Amino-acid charge and pI assumptions; L/R/S distinctions; peptide planarity and denaturation wording; side-chain exceptions.
- chapter-02 — Enzymes: Initial-rate and Michaelis–Menten assumptions; Km versus binding affinity; pure noncompetitive versus mixed inhibition; cofactor/catalytic mechanisms.
- chapter-03 — Nonenzymatic Protein Function and Protein Analysis: Hemoglobin versus myoglobin curves; tissue-specific signaling; ion-exchange naming and charge; reducing/nonreducing gel interpretation.
- chapter-04 — Carbohydrate Structure and Function: D/L and anomer conventions; epimer carbon numbering; ketose reducing assays; glycosidic connectivity and reducing ends.
- chapter-05 — Lipid Structure and Function: Lipid classification; temperature-dependent cholesterol effects; lipid signaling receptor diversity; storage and fuel-density statements.
- chapter-06 — DNA and Biotechnology: Strand direction and reverse complements; chromatin qualifications; repair category boundaries; ideal versus real PCR doubling.
- chapter-07 — RNA and the Genetic Code: Code exceptions; template/coding direction; initiation versus elongation; lac two-input regulation; RNA/protein stability alternatives.
- chapter-08 — Biological Membranes: Leaflet asymmetry and accessibility; electrochemical versus concentration driving force; effective osmoles; specialized membrane permeability.
- chapter-09 — Carbohydrate Metabolism I: Glycolysis, Glycogen, Gluconeogenesis, and the Pentose Phosphate Pathway: GLUT4 tissue context; glycolytic net accounting; fructose and galactose pathways; PDH direction/cofactors; glycogen tissue specificity; gluconeogenic energy accounting; PPP redox roles.
- chapter-10 — Carbohydrate Metabolism II: Aerobic Respiration: No net glucose from acetyl-CoA in humans; cycle carbon tracing; complex II distinction; oxygen terminal acceptance; uncoupler versus ATP-synthase inhibition; ATP-yield assumptions.
- chapter-11 — Lipid and Amino Acid Metabolism: Micelle versus chylomicron route; human adipose hormonal qualifications; lipoprotein functions; cholesterol versus ketogenesis compartments; beta-oxidation counts; ketone tissue exclusions; nitrogen/urea pathways.
- chapter-12 — Bioenergetics and Regulation of Metabolism: Free-energy standard states and activities; actual versus standard direction; ATP bond-energy explanation; redox sign conventions; fasting timeline qualifications; tissue hormonal specificity; Cori/alanine cycle costs.

## Evidence handling

review/packets contains chapter-sized blind.json, keyed-audit.json and clearly labeled combined convenience files, plus full-course uploads and SHA-256 manifests. A truly blind pass must use only blind input in a fresh context, freeze answers, then audit keys separately. Combined files contain solutions and cannot guarantee blindness. Source-hash checks detect stale source and changed payload bytes. Context-limited reviews must report partial coverage with exact remaining item IDs. Never execute reviewer commands, automatically rewrite curriculum, close findings or infer scientific verification from agreement.

## Remaining limitations

Coverage is one concise lesson and one three-stage workshop per supplied section, not exhaustive textbook or MCAT coverage. Mapping stages assess concept identification; application questions are mostly multiple choice, including arithmetic checks. The card stack condenses and reuses walkthrough explanations. Independent structural/visual review, broader data interpretation and more generative problem solving remain valuable. Manual assistive-technology review, Firefox/Safari and additional physical devices have not been certified.
