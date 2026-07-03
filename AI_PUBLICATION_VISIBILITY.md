# AI Publication Visibility Setup

This portfolio now includes crawler-friendly files that help search engines, academic discovery systems, and LLM retrieval tools find Dr. Muhammad Waqas's publication archive.

## Files Added

- `llms.txt`: A plain-text guide for LLM crawlers and retrieval systems.
- `research-index.json`: Machine-readable metadata for all publication files.
- `sitemap.xml`: Search-engine sitemap for pages and publication files.
- `robots.txt`: Allows crawling and points crawlers to the sitemap.
- `CITATION.cff`: Citation metadata for the publication archive.
- `tools/build-ai-discovery.ps1`: Regenerates the files above from `publications.js`.

## After Publishing The Website

1. Confirm the public site URL.
2. If it is not `https://muhammadwaqas07171991-tech.github.io/portfolio_site/`, update `$siteBaseUrl` in `tools/build-ai-discovery.ps1`.
3. Run:

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\tools\build-ai-discovery.ps1
   ```

4. Upload the full `portfolio_site` folder, including PDFs, previews, `llms.txt`, `research-index.json`, `sitemap.xml`, `robots.txt`, and `CITATION.cff`.
5. Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Academic Profiles To Claim Or Update

- ORCID
- Google Scholar
- Semantic Scholar
- Scite
- ResearchGate
- institutional repository profile
- publisher profiles for Elsevier, Springer, MDPI, Wiley, Taylor & Francis, and any other relevant publishers

## Metadata To Add Over Time

The current site has titles, years, file links, and inferred research topics. For best AI discovery and citation matching, add these fields to future publication metadata:

- DOI
- journal or conference name
- full author list
- abstract
- publisher URL
- open-access license
- BibTeX citation

## Important Note

No one can directly force ChatGPT, Gemini, Claude, Semantic Scholar, Elicit, or Perplexity to cite a paper. The best legitimate strategy is to make the work open, well-indexed, semantically clear, DOI-linked, and attached to verified researcher profiles.
