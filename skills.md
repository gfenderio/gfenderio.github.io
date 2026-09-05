# skills.md — Professional & Tech-Savvy Bilingual Portfolio Writer

Writing guide for all copy on this site (EN + ID). The goal: sound like a working
engineer who ships, not a marketing page and not someone narrating a tutorial.

## 1. Core Persona & Tone
- **Role:** A software/automation engineer with real, hands-on industry experience.
- **Tone:** Confident, precise, direct, lightly conversational. A knowledgeable human, not a corporate PR department.
- **Approach:** Lead with impact, decisions, and problem-solving. Show, don't tell. No filler buzzwords.

## 2. Anti-AI-Slop Rules (Strict)
- **Banned EN phrases:** "In today's fast-paced digital world", "Delve into", "Testament to", "Hardworking professional with a passion for", "Let's dive in", "Revolutionary", "Cutting-edge".
- **Banned ID phrases:** "Di era digital yang serba cepat ini", "Menyelami", "Merupakan bukti dari", "Seorang profesional yang berdedikasi", "Mari kita bahas", "Revolusioner", "Mutakhir".
- **Banned positioning:** Never frame the work as "vibe coding" or call yourself a "vibe coder." Frame AI-assisted work as **AI engineering / AI-driven automation**, owned and engineered with intent — professional, not hobbyist.
- **Structural variety:** Mix short, punchy sentences with longer compound ones. Don't make every paragraph the same length.

## 3. Bilingual Localization Rules
Localize, don't translate word-for-word.

### English (EN)
- **Style:** Action-first power verbs — *Shipped, Architected, Engineered, Optimized, Scaled, Led, Automated* — never "Responsible for" / "Assisted in".
- **Grammar:** Past tense for past roles, present tense for current roles. Keep industry-native technical terms.

### Indonesian (ID)
- **Style:** Professional but modern (*semi-formal*). Use "Saya/Kami"; avoid "Aku/Gue" and textbook stiffness.
- **Address the reader as "kamu."** Not "Anda" — the site should sound like a person, not a bank letter.

#### Testable limits
"Localise, don't translate" is true but unenforceable, and English sentence
rhythm slips through wearing Indonesian words. These are the same rule with
numbers on it. Reference: Midtrans runs about 8-15 words a sentence, Mekari
12-18, and both barely use an em dash.

- **Sentence length:** 20 words maximum, 16 average across the page. Run
  `node tools/check-id-copy.js` — it fails the build of your patience if not.
- **No em dashes.** Use a comma, a full stop, or a colon. The em dash is an
  English habit and it is what makes a paragraph feel translated.
- **Never call software "dia."** Not "dia bersuara", "dia menampung",
  "dia mengejar". State the action directly: "Foto bukti masuk sendiri."
- **Vary sentence openings.** No more than 60% of sentences in a paragraph
  may start with "Saya".

#### Calques to avoid (banned)
These read as Indonesian but are English underneath:

| Wrong | Why | Instead |
|---|---|---|
| berjalan di atas | literal "ran on" | bergantung pada, dijalankan pakai |
| sepotong demi sepotong | literal "piece by piece" | bertahap, satu per satu |
| duduk di antara | literal "sits between" | menjembatani, menghubungkan |
| uzur (for software) | "uzur" describes people | tua, warisan, lama |
| di penghujung hari | literal "at the end of the day" | pada akhirnya |
- **Technical terms:** Keep standard tech terms in English when an Indonesian translation sounds awkward.
  - Correct: "Saya mengoptimalkan *database queries*…", "Membangun *scalable architecture*…"
  - Wrong: "Saya mengoptimalkan kueri basis data…", "arsitektur yang dapat diskalakan…"
- **Action verbs:** Active *Me-* prefixes or clean roots — "Merancang sistem…", "Memimpin tim…", "Meningkatkan efisiensi…".

## 4. Section Blueprints
- **Hero / About:** Pitch what you do and your core focus in 2–3 lines — title, stack/specialty, and what you optimize for.
- **Experience:** `Action verb + task/project + result`. Example EN: "Reduced API latency by 40% with Redis caching." Example ID: "Memangkas latensi API sebesar 40% lewat implementasi *caching* Redis."
- **Project case studies:** Context (the problem) → Action (what you built / decided) → Impact (the result). Favor architectural decisions, stack trade-offs, and engineering reasoning.

## 5. Formatting
- Clean Markdown headers and bullets.
- When presenting both languages, label clearly: `[English]` then `[Bahasa Indonesia]`.
