# Test delivery status

The v0.2 site is ready for local testing with START-GAMEFORGE.cmd and http://127.0.0.1:4173. See TESTING.md.

A private Sites project was registered, but no source version was uploaded or deployed. Automatic approval review rejected supplying the publishing credential to the helper because this session cannot request command-level sandbox approval. The credential was not written into project files. The local .openai/hosting.json records the project identity for a future authorized retry and must not be used to create a duplicate Site.

The bundled Git runtime also lacks its HTTPS remote helper, so GitHub synchronization uses the connected GitHub API. GitHub remains the source of truth. No GitHub Pages or other public deployment was enabled.

Static publishing assets can be generated with node build.mjs. Before hosting elsewhere, verify headers and the absence of write/upload endpoints on that host. The generated meta CSP is a fallback, not verification of host security headers.
