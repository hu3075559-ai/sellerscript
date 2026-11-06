# SellerScript

Free tools for TikTok Shop sellers — v1 (2026-11-06).

- Site: https://sellerscript.pages.dev (Cloudflare Pages, GitHub repo `hu3075559-ai/sellerscript`, push to `main` auto-deploys)
- Tools (all client-side template/rule engines in `assets/tools.js`, zero LLM/API cost):
  1. `/script-generator/` — hook → pain → demo → offer scripts, 15s/30s
  2. `/title-optimizer/` — title formula variants + length/coverage/stuffing checks
  3. `/hashtag-generator/` — tiered hashtag sets from a per-category library
  4. `/banned-words-checker/` — risky-claim scanner (guidance only, not compliance advice)
- Lead capture: every page carries a Pro waitlist form posting to the shared
  leads-api (`https://lunasign.me/api/leads`) with `site: "sellerscript"`.
- No revenue in v1 by design; Pro tier is the planned monetization.
