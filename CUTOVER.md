# Pointing www.urbanmorph.com at the Worker

Today: GitHub Pages serves the old site from `master`; DNS is at GoDaddy (ns77/ns78.domaincontrol.com).
Target: this site, deployed as the `urbanmorph` Worker on the UrbanMorph Cloudflare account.

## 1. Add the zone on Cloudflare

Dashboard: Add a site → `urbanmorph.com` → Free plan. Cloudflare assigns two nameservers
(the account's other zones use `dan.ns.cloudflare.com` and `fish.ns.cloudflare.com`; use the pair shown for this zone).

## 2. Recreate DNS records before switching nameservers

Records visible publicly on 12 Sep 2026 (check GoDaddy for anything private, e.g. DKIM or DMARC):

| Type | Name | Value | Notes |
|---|---|---|---|
| MX | @ | 1 aspmx.l.google.com | Google Workspace mail |
| MX | @ | 5 alt1.aspmx.l.google.com | |
| MX | @ | 5 alt2.aspmx.l.google.com | |
| MX | @ | 10 alt3.aspmx.l.google.com | |
| MX | @ | 10 alt4.aspmx.l.google.com | |
| TXT | @ | v=spf1 include:_spf.google.com ~all | |
| TXT | @ | google-site-verification=wSxKXcZ-ft-fqCWtmZ70_hrD0EBKLfPtvL_BPaVAie0 | |
| TXT | @ | google-site-verification=LLUQUctj_5DE0vB4JqrdZvzapziY6i3u0_ggb9YFN2s | |
| A | reliefriders | 15.197.142.173 | host does not respond today; keep or drop |

Do NOT recreate the GitHub Pages records (A 185.199.108-111.153 on @, CNAME www → urbanmorph.github.io).
The Worker custom domains in step 4 create the records for @ and www.

## 3. Switch nameservers at GoDaddy

Domain settings → Nameservers → change to the two Cloudflare nameservers. Propagation is usually under an hour.
The old site keeps serving from GitHub until resolvers pick up the change, so there is no gap.

## 4. Attach the domain to the Worker

Once the zone shows "Active" in Cloudflare, uncomment the `routes` block in `wrangler.jsonc` and deploy:

```
npm run build && npx wrangler deploy
```

That registers `www.urbanmorph.com` as the Worker's custom domain (DNS + certificate handled by Cloudflare). The apex keeps a placeholder proxied A record (192.0.2.1) so the redirect rule in step 5 can answer.

## 5. Redirect apex to www

Already configured through the API on 12 Sep 2026: a dynamic redirect rule sends `urbanmorph.com/*` to `https://www.urbanmorph.com/*` with a 301.

## 6. Afterwards

- Google Search Console: the property stays the same domain; resubmit `https://www.urbanmorph.com/sitemap-index.xml`.
- GitHub: master can keep the old site as an archive, or the astro branch becomes master.
- Remove the `CNAME` file from the old repo only if GitHub Pages is being retired.
