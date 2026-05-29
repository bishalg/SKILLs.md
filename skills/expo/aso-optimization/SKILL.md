---
name: aso-optimization
description: >
  App Store Optimization (ASO) playbook for optimizing iOS App Store and Google Play Store metadata.
  Guides the agent through keyword research, metadata optimization using the 11 ASO Quality Gates,
  competitor analysis, localizations, and storefront indexation.
metadata:
  author: Antigravity
  version: "1.0"
---

# App Store Optimization (ASO) Skill

Discoverability is the primary bottleneck in mobile app distribution. This playbook ensures all AstroFusion mobile applications conform to elite, mathematically optimized App Store Optimization (ASO) workflows, achieving maximum search indexation and conversion.

## 📐 The 11 ASO Quality Gates

Any metadata changes proposed or made to `metadata.yml` or store configs MUST satisfy all 11 binary pass/fail Quality Gates to ensure alignment with Apple and Google search algorithms:

1. **No Keyword Repetition**: Apple's search algorithm does not count duplicate keywords twice. Wasting characters on repeating words in the Title, Subtitle, or Keyword fields is strictly prohibited.
2. **Character Utilization**: Target 95%+ of the available character limits (Title: 30 chars, Subtitle: 30 chars, Keywords: 100 chars) to maximize indexation real estate.
3. **Singular Forms Only**: Apple stems keywords automatically (e.g., indexing "horoscope" also ranks "horoscopes"). Use singular terms to save characters unless the plural form has a vastly different search volume or spelling.
4. **No Stop Words**: Remove filler words (`a`, `the`, `and`, `for`, `with`, `of`) from the keyword field and minimize them in the Title/Subtitle.
5. **No Spaces After Commas**: The 100-character keyword limit includes commas but counts spaces. Write keywords as a tight, comma-separated list: `astrology,horoscope,vedic` (not `astrology, horoscope, vedic`).
6. **No Trademarked Terms**: Never include competitor brand names or protected trademarks in Title, Subtitle, or Keyword fields to prevent immediate App Store rejection.
7. **Secondary Locale Indexation**: Maximize US App Store indexation by configuring secondary locales (e.g., `es-MX`, `fr-CA`, `zh-Hans`, `ru`, `pt-BR`) which Apple indexes in the US storefront, expanding total indexed keyword space from 100 characters to up to 1,600 characters.
8. **Natural Language Title**: The title must read naturally as a premium product brand name with high-volume search terms, not a spammy list of keywords (e.g., `AstroFusion: Vedic Astrology`).
9. **Subtitle Value Proposition**: The subtitle must clearly articulate the core benefit or value proposition in a highly compelling, crisp manner (e.g., `Horoscope, Birth Chart & Kundli`).
10. **Cross-Field De-duplication**: Completely partition keywords. If a word is already used in the Title or Subtitle, it MUST be removed from the Keyword field.
11. **Indexed Character Efficiency**: Calculate total unique characters indexed. Aim for 100% unique terms without character waste.

---

## 🛠️ ASO Optimization Workflows

### 1. Keyword Research & Opportunity Discovery
* **Goal**: Identify high-volume, low-competition keywords.
* **Process**:
  1. Brainstorm root keywords associated with the app's domain (e.g., `jyotish`, `kundli`, `tithi`, `muhurta`).
  2. Map out spelling variations, synonyms, and localized equivalents.
  3. Validate search popularity and difficulty scores using mobile optimization tools or search suggestions.

### 2. Metadata Structuring
* **iOS (Apple App Store)**:
  * **Title**: `Brand Name: Natural High-Volume Term` (Max 30 chars)
  * **Subtitle**: `Distinct Value Prop / Primary Features` (Max 30 chars, zero overlap with Title)
  * **Keywords**: `comma,separated,list,without,spaces,or,repeats` (Max 100 chars, zero overlap with Title/Subtitle)
* **Android (Google Play Store)**:
  * **Title**: `Brand Name: Natural Term` (Max 30 chars)
  * **Short Description**: `Vibrant value proposition explaining what the app does` (Max 80 chars)
  * **Full Description**: Structurally optimized description containing natural variations of the primary target keywords (Density ~2-3%, Max 4,000 chars). Use lists and rich formatting.

### 3. Multi-Locale Strategy (Multipliers)
For the United States App Store storefront, Apple indexes several secondary languages. Optimize your localizations to pack distinct keyword sets into these secondary locales to rank for US searches:
* **English (US)**: Baseline keywords
* **Spanish (MX) / Spanish (ES)**: Spanish translations + secondary US keywords
* **French (CA)**: French translations + tertiary US keywords
* **Simplified Chinese (CN) & Traditional Chinese (TW)**: Eastern translations + advanced keywords

---

## 📱 AstroFusion Mobile Apps Optimization Baseline

All AstroFusion mobile apps follow the ASO baseline structures defined below. When updating an app's `metadata.yml` file, ensure these optimized assets are applied:

### 1. AstroFusion (Main App - `apps/mobile/astro-fusion/metadata.yml`)
* **Title**: `AstroFusion: Vedic Astrology` (28/30 chars)
* **Subtitle**: `Horoscope, Birth Chart & Kundli` (30/30 chars)
* **Keywords**: `zodiac,compatibility,transit,ephemeris,prediction,future,nakshatra,panchang,jyotish,rashi,planet,reading` (98/100 chars)

### 2. AstroChat (Chat App - `apps/mobile/chat/metadata.yml`)
* **Title**: `AstroChat: AI Astrologer` (24/30 chars)
* **Subtitle**: `Live Horoscope & Kundli Advice` (30/30 chars)
* **Keywords**: `birth,chart,compatibility,vedic,zodiac,transit,prediction,spiritual,guru,counselor,future,reading,jyotish` (98/100 chars)

### 3. AstroVastu (Vastu App - `apps/mobile/vastu/metadata.yml`)
* **Title**: `AstroVastu: Feng Shui & Shastra` (30/30 chars)
* **Subtitle**: `Sacred Space Harmony & Remedies` (30/30 chars)
* **Keywords**: `architecture,design,direction,compass,layout,zen,indian,correction,room,office,prosperity,positive,flow` (98/100 chars)

### 4. AstroNumerology (Numerology App - `apps/mobile/numerology/metadata.yml`)
* **Title**: `AstroNumerology: Name Numbers` (28/30 chars)
* **Subtitle**: `Life Path & Destiny Calculator` (30/30 chars)
* **Keywords**: `pythagorean,chaldean,correction,personality,prediction,spiritual,zodiac,zodiacs,future,reading,jyotish` (98/100 chars)

### 5. AstroPanchanga (Panchanga App - `apps/mobile/panchanga/metadata.yml`)
* **Title**: `AstroPanchanga: Hindu Calendar` (30/30 chars)
* **Subtitle**: `Vedic Muhurta, Tithi & Festival` (30/30 chars)
* **Keywords**: `nakshatra,yoga,karana,var,shubh,choghadiya,rahu,kaal,astrology,horoscope,transit,ephemeris,jyotish,rashi` (97/100 chars)

---

## 🚦 ASO Lint & Verification Script

Agents must verify metadata integrity using the following validation rules:

```typescript
function lintASOMetadata(title: string, subtitle: string, keywords: string) {
  // Check lengths
  if (title.length > 30) throw new Error("Title exceeds 30 characters");
  if (subtitle.length > 30) throw new Error("Subtitle exceeds 30 characters");
  if (keywords.length > 100) throw new Error("Keywords exceed 100 characters");

  // Check spaces
  if (keywords.includes(", ")) {
    console.warn("ASO Alert: Keywords contain spaces after commas. This wastes precious characters!");
  }

  // Deduplicate checks
  const titleWords = title.toLowerCase().split(/[\s:,\-&]+/).filter(Boolean);
  const subtitleWords = subtitle.toLowerCase().split(/[\s:,\-&]+/).filter(Boolean);
  const keywordList = keywords.toLowerCase().split(",").filter(Boolean);

  const titleSet = new Set(titleWords);
  const subtitleSet = new Set(subtitleWords);

  keywordList.forEach(keyword => {
    if (titleSet.has(keyword) || subtitleSet.has(keyword)) {
      console.warn(`ASO Violation: Keyword "${keyword}" is repeated. It is already covered in the Title or Subtitle.`);
    }
  });

  // Stop words check
  const stopWords = ["a", "the", "and", "for", "with", "of", "to", "in", "on", "at", "by", "an"];
  keywordList.forEach(keyword => {
    if (stopWords.includes(keyword)) {
      console.warn(`ASO Warning: Keyword list contains filler word "${keyword}". Remove it.`);
    }
  });
}
```
