# Software checks

Run npm test. It checks 14 JSON documents, builds both app artifacts, refreshes source-hashed review packets, then runs unit, browser regression, all-chapter traversal, targeted accessibility and visual tests. The test suite resolves local Playwright first and the installed Codex runtime second. On this machine the browser cache is C:/Users/lucky/AppData/Local/ms-playwright; set PLAYWRIGHT_BROWSERS_PATH if a restricted execution environment redirects its default cache. Browser tests need loopback access and permission to launch Chromium.

Results in artifacts/ describe software behavior, using encoded keys. They do not constitute independent biochemistry verification. Run npm run report only after complete current-source checks pass. The packet source signature includes curriculum, renderer, build/schema code, review prompts, packet tools and software tests.
