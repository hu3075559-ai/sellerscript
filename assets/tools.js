/* SellerScript engines: pure template/rule logic. No network, no AI API.
   Works in the browser (window.SSEngines) and in Node for smoke tests. */
(function () {
  'use strict';

  /* ---------------- shared data ---------------- */

  var CATEGORIES = {
    beauty: {
      label: 'Beauty & Skincare',
      pains: [
        'dealing with dull, tired-looking skin every morning',
        'wasting money on products that promise a glow and deliver nothing',
        'a 10-step routine you never have time to finish'
      ],
      painShort: 'are tired of dull skin',
      demos: [
        'watch the texture — I apply it once and you can see the finish change in seconds',
        'here is my skin before, and here it is right after one use, no filter',
        'I use it morning and night, it layers under makeup with zero pilling'
      ],
      tagsMid: ['#skincare', '#skincareroutine', '#beautyfinds', '#glowup', '#skintok'],
      tagsNiche: ['#skincareover30', '#sensitiveskincare', '#skincarehacks', '#morningroutine', '#beautytok']
    },
    fashion: {
      label: 'Fashion & Apparel',
      pains: [
        'ordering clothes online that look nothing like the photos',
        'a closet full of clothes and nothing that actually fits right',
        'paying boutique prices for basics you wear twice'
      ],
      painShort: 'are done with bad online fits',
      demos: [
        'I am 5\'4 and wearing a size M — here is the real fit, front, side and back',
        'the fabric up close: no see-through, no cheap shine, and it survives the wash',
        'three ways to style it — work, weekend and going out'
      ],
      tagsMid: ['#ootd', '#fashionfinds', '#outfitideas', '#styletok', '#fashiontiktok'],
      tagsNiche: ['#petitefashion', '#affordablestyle', '#wardrobebasics', '#tryonhaul', '#outfitcheck']
    },
    home: {
      label: 'Home & Living',
      pains: [
        'a kitchen drawer so messy you cannot find anything',
        'cleaning the same corner every week because nothing stays organised',
        'a small space that always looks cluttered no matter what'
      ],
      painShort: 'want a home that stays tidy',
      demos: [
        'before and after in one shot — this took me under two minutes',
        'it fits in a standard drawer, watch me load everything back in',
        'day 7 update: still in place, still making my mornings easier'
      ],
      tagsMid: ['#homefinds', '#homeorganization', '#cleaninghacks', '#hometok', '#smallspaceliving'],
      tagsNiche: ['#kitchenorganization', '#tidyhome', '#homehacks', '#rentfriendly', '#organizedhome']
    },
    electronics: {
      label: 'Electronics & Gadgets',
      pains: [
        'cables everywhere and never the right charger when you need it',
        'cheap gadgets that die within a month',
        'paying flagship prices for features you actually use every day'
      ],
      painShort: 'are tired of junk gadgets',
      demos: [
        'real test, no cuts — watch the speed compared to my old one',
        'battery check: unboxed at 9am, still going at the end of my workday',
        'the build up close: metal hinge, solid click, nothing rattles'
      ],
      tagsMid: ['#gadgets', '#techtok', '#techfinds', '#gadgetreview', '#coolgadgets'],
      tagsNiche: ['#desksetup', '#edcgear', '#techunboxing', '#budgettech', '#workfromhometools']
    },
    fitness: {
      label: 'Fitness & Outdoors',
      pains: [
        'paying for a gym membership you barely use',
        'workouts that eat an hour you do not have',
        'gear that takes up half your living room'
      ],
      painShort: 'want results without the gym',
      demos: [
        'my full 15-minute routine, real time, no equipment swaps',
        'it folds flat under the bed — setup takes ten seconds',
        'week 3 check-in: same workout, noticeably easier than day one'
      ],
      tagsMid: ['#fitnessathome', '#homeworkout', '#fitnesstok', '#workoutgear', '#fitnessfinds'],
      tagsNiche: ['#apartmentworkout', '#15minuteworkout', '#beginnerfitness', '#nogymnoproblem', '#dailyworkout']
    },
    food: {
      label: 'Food & Snacks',
      pains: [
        'snacks that taste like cardboard in the name of being healthy',
        'running out of ideas for quick weekday meals',
        'import snacks priced like luxury goods at your local store'
      ],
      painShort: 'want snacks that actually taste good',
      demos: [
        'sound on for the crunch test — that is the real texture',
        'ingredients list up close, nothing you cannot pronounce',
        'three packs, three flavours, my honest ranking at the end'
      ],
      tagsMid: ['#foodtok', '#snackreview', '#foodfinds', '#tastetest', '#snacktok'],
      tagsNiche: ['#healthysnacks', '#snackhaul', '#musttrysnacks', '#officesnacks', '#snacktime']
    },
    pets: {
      label: 'Pet Supplies',
      pains: [
        'pet hair on every surface no matter how much you clean',
        'a picky pet who ignores every toy after day one',
        'messes that take longer to clean than to make'
      ],
      painShort: 'want an easier life with your pet',
      demos: [
        'my cat ignored every toy this year — watch her reaction to this one',
        'one pass over the sofa, look at what came off',
        'two weeks later: still the first thing she runs to in the morning'
      ],
      tagsMid: ['#petfinds', '#pettok', '#dogsoftiktok', '#catsoftiktok', '#petproducts'],
      tagsNiche: ['#pethacks', '#indoordog', '#catmomlife', '#petcleaning', '#happypet']
    },
    jewelry: {
      label: 'Jewellery & Accessories',
      pains: [
        'fashion jewellery that turns green after a week',
        'gift shopping at the last minute with no good ideas',
        'pieces that look great in photos and cheap in person'
      ],
      painShort: 'want jewellery that lasts',
      demos: [
        'water test on camera — showered in it for a week, still shining',
        'macro shot of the clasp and finish, this is the detail that matters',
        'three outfits, one piece — watch how it changes each look'
      ],
      tagsMid: ['#jewelrytok', '#accessories', '#jewelryfinds', '#giftideas', '#everydayjewelry'],
      tagsNiche: ['#tarnishfree', '#daintyjewelry', '#jewelryhaul', '#giftforher', '#layerednecklace']
    },
    baby: {
      label: 'Baby & Kids',
      pains: [
        'baby gear that gets outgrown in a month',
        'messy mealtimes that end with food everywhere except the mouth',
        'toys that entertain for exactly five minutes'
      ],
      painShort: 'want baby gear that actually helps',
      demos: [
        'real mealtime with my toddler — watch where the food lands now',
        'one-hand fold test while holding the baby, because that is real life',
        'wash test: five washes in and the colours still look new'
      ],
      tagsMid: ['#momtok', '#babyfinds', '#toddlerlife', '#parentinghacks', '#babyproducts'],
      tagsNiche: ['#newmomfinds', '#toddlermom', '#babyessentials', '#momlifehacks', '#firsttimemom']
    },
    general: {
      label: 'General / Other',
      pains: [
        'buying the cheap version twice because the first one broke',
        'solving the same small problem every single day',
        'products that look great in ads and disappoint in real life'
      ],
      painShort: 'want things that just work',
      demos: [
        'no cuts, no tricks — here it is working in real time',
        'close-up on the details the product photos never show',
        'I have used it daily for two weeks, here is my honest update'
      ],
      tagsMid: ['#tiktokshopfinds', '#musthave', '#lifehacks', '#productreview', '#usefultools'],
      tagsNiche: ['#everydaycarry', '#problemSolved', '#honestReview', '#dailyessentials', '#smartbuy']
    }
  };

  var BROAD_TAGS = ['#tiktokmademebuyit', '#tiktokshop', '#tiktokshopfinds', '#fyp', '#viral'];

  /* ---------------- helpers ---------------- */

  function pick(arr, seed) { return arr[Math.abs(seed) % arr.length]; }

  function fill(tpl, vars) {
    return tpl.replace(/\{(\w+)\}/g, function (m, k) {
      return vars[k] !== undefined && vars[k] !== '' ? vars[k] : m;
    });
  }

  function wordCount(text) {
    var t = text.trim();
    return t ? t.split(/\s+/).length : 0;
  }

  function estSeconds(words) { return Math.round(words / 2.5); } // ~150 wpm spoken

  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  /* ---------------- 1. script generator ---------------- */

  var HOOKS = [
    'Stop scrolling — if you {painShort}, you need to see this.',
    'I was not going to post this, but this {product} honestly changed my routine.',
    'POV: you finally found a {product} that actually does what it promises.',
    'Three reasons everyone is switching to this {product} right now.',
    'If you are still {painGerund}, this is your sign to upgrade.',
    'Watch what happens the first time I try this {product}.',
    'Nobody talks about this, but {benefitLower} is a game changer.',
    'This is the {product} all over your FYP — here is my honest take.',
    'I bought this so you do not have to guess — real review, no filter.',
    'You are using the wrong product. Let me show you this {product} instead.'
  ];

  var PAIN_LINES = [
    'You know the struggle: {pain}.',
    'If you are {pain}, you are not alone — I was too.',
    'Here is my problem before this: {pain}.',
    'Raise your hand if you are sick of {pain}.'
  ];

  var PROOF_LINES = [
    'And it is not just me — this keeps selling out for a reason.',
    'The reviews are full of people saying the same thing.',
    'I checked the details before posting: this is the real deal, not a dupe.',
    'It has become the one thing I reach for every single day.'
  ];

  var CTAS = [
    'It is {price} right now{offerClause}. Tap the link below before it sells out.',
    'Link is right there — {price}{offerClause}. Grab yours while stock lasts.',
    'Check the product link under this video. {price}{offerClause}, and it ships fast.',
    'Do not wait on this one: {price}{offerClause}. Link below, go.'
  ];

  var CTA_SHORT = [
    'Tap the link — {price}{offerClause}, today only on TikTok Shop.',
    'Link below. {price}{offerClause}. You will thank me later.',
    'Get it through the link under this video — {price}{offerClause}.'
  ];

  function scriptGenerate(input, variant) {
    var cat = CATEGORIES[input.category] || CATEGORIES.general;
    var v = {
      product: input.product || 'product',
      benefit: input.benefit || '',
      benefitLower: (input.benefit || 'this').replace(/^./, function (c) { return c.toLowerCase(); }),
      price: input.price || 'on sale now',
      audience: input.audience || '',
      pain: pick(cat.pains, variant),
      painShort: cat.painShort,
      painGerund: cat.pains[variant % cat.pains.length].replace(/^[^a-zA-Z]*/, ''),
      demo: pick(cat.demos, variant + 1),
      offerClause: input.offer ? ' — ' + input.offer : ''
    };
    var segs = [];
    var hook = fill(pick(HOOKS, variant * 3 + 1), v);
    var benefitSentence = '';
    if (v.benefit) {
      benefitSentence = ' ' + cap(v.benefit) + '.';
      if (input.duration === '15' && wordCount(v.benefit) > 8) benefitSentence = '';
    }
    if (input.duration === '15') {
      segs.push({ label: 'Hook · 0–3s', text: hook });
      segs.push({ label: 'Demo · 3–10s', text: cap(fill('So {demo}.', v)) + benefitSentence });
      segs.push({ label: 'Offer + CTA · 10–15s', text: fill(pick(CTA_SHORT, variant), v) });
    } else {
      segs.push({ label: 'Hook · 0–3s', text: hook });
      segs.push({ label: 'Pain · 3–8s', text: fill(pick(PAIN_LINES, variant), v) });
      segs.push({ label: 'Demo · 8–20s', text: cap(fill('So {demo}.', v)) + benefitSentence });
      segs.push({ label: 'Proof · 20–25s', text: fill(pick(PROOF_LINES, variant + 2), v) + (v.audience ? ' If you are ' + v.audience + ', this was made for you.' : '') });
      segs.push({ label: 'Offer + CTA · 25–30s', text: fill(pick(CTAS, variant), v) });
    }
    var full = segs.map(function (s) { return s.text; }).join(' ');
    return { segments: segs, fullText: full, words: wordCount(full), seconds: estSeconds(wordCount(full)) };
  }

  /* ---------------- 2. title optimizer ---------------- */

  function titleGenerate(input) {
    var core = (input.core || '').trim();
    var attr = (input.attribute || '').trim();
    var benefit = (input.benefit || '').trim();
    var scenario = (input.scenario || '').trim();
    var audience = (input.audience || '').trim();
    var brand = (input.brand || '').trim();
    var must = (input.keywords || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);

    function join(parts) { return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim(); }

    var variants = [
      { name: 'Keyword-first', title: join([brand, cap(core), attr, scenario ? 'for ' + scenario : '', audience ? '– for ' + audience : '']) },
      { name: 'Benefit-first', title: join([brand, benefit ? cap(benefit) : '', core, attr, audience ? 'for ' + audience : '']) },
      { name: 'Long-tail max', title: join([brand, cap(core), attr, benefit, scenario ? 'for ' + scenario : '', audience ? 'for ' + audience : '', must.filter(function (k) { return k.toLowerCase() !== core.toLowerCase(); }).join(' ')]) }
    ];

    var allChecks = [core].concat(must).filter(Boolean);
    variants.forEach(function (vr) {
      var lower = vr.title.toLowerCase();
      vr.chars = vr.title.length;
      vr.coverage = allChecks.map(function (k) {
        return { keyword: k, hit: lower.indexOf(k.toLowerCase()) !== -1 };
      });
      vr.warnings = [];
      if (vr.chars > 255) vr.warnings.push('Over 255 characters — TikTok Shop may truncate it.');
      if (vr.chars < 60) vr.warnings.push('Short title — you have room for more searchable keywords.');
      var STOPWORDS = { 'for': 1, 'and': 1, 'the': 1, 'with': 1, 'your': 1, 'you': 1, 'our': 1, 'are': 1, 'this': 1, 'that': 1, 'from': 1 };
      var words = lower.split(/\s+/);
      var seen = {};
      words.forEach(function (w) { if (w.length > 2 && !STOPWORDS[w]) seen[w] = (seen[w] || 0) + 1; });
      Object.keys(seen).forEach(function (w) {
        if (seen[w] > 2) vr.warnings.push('"' + w + '" repeats ' + seen[w] + ' times — keyword stuffing can hurt ranking.');
      });
      if (/[A-Z]{4,}/.test(vr.title.replace(core.toUpperCase(), ''))) vr.warnings.push('Long ALL-CAPS runs look spammy — use normal case.');
      var bang = (vr.title.match(/!/g) || []).length;
      if (bang > 1) vr.warnings.push('Multiple exclamation marks — keep it to one at most.');
    });
    return variants;
  }

  /* ---------------- 3. hashtag generator ---------------- */

  function hashtagGenerate(input) {
    var cat = CATEGORIES[input.category] || CATEGORIES.general;
    var kw = (input.keyword || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    var compact = kw.replace(/\s+/g, '');
    var niche = cat.tagsNiche.slice();
    var generated = [];
    if (compact) {
      generated = ['#' + compact, '#' + compact + 'review', '#' + compact + 'finds', '#' + compact + 'tok', '#' + compact + 'hack'];
    }
    var mid = cat.tagsMid.slice();
    var broad = BROAD_TAGS.slice(0, 3);
    var all = broad.concat(mid, niche.slice(0, 5), generated);
    // dedupe, keep order
    var seen = {}, out = [];
    all.forEach(function (t) { var k = t.toLowerCase(); if (!seen[k]) { seen[k] = 1; out.push(t); } });
    return { broad: broad, mid: mid, niche: niche.slice(0, 5), generated: generated, all: out, block: out.join(' ') };
  }

  /* ---------------- 4. banned words checker ---------------- */
  /* Reference list based on common TikTok Shop / advertising policy themes.
     Guidance only — not a compliance guarantee. */

  var BANNED_RULES = [
    { re: /\bguarantee(d|s)?\b/gi, term: 'guaranteed', cat: 'Unverifiable promises', why: 'Outcome guarantees are treated as deceptive claims on most marketplaces.', alt: 'Describe what the product does, not a promised result.' },
    { re: /\b100%\s?(effective|safe|natural|guaranteed|works)\b/gi, term: '100% …', cat: 'Unverifiable promises', why: 'Absolute percentage claims cannot be substantiated.', alt: 'Use a specific, checkable fact instead.' },
    { re: /\bmiracle\b/gi, term: 'miracle', cat: 'Exaggerated claims', why: 'Miracle claims are a classic flagged pattern in ad review.', alt: 'Say what changed, in plain measurable terms.' },
    { re: /\b(best|cheapest|lowest price|number one|#1|no\.?\s?1)\b/gi, term: 'best / cheapest / #1', cat: 'Superlatives', why: 'Unranked superlatives ("best", "cheapest") need proof you likely cannot attach.', alt: 'Use a concrete differentiator: size, material, speed, bundle.' },
    { re: /\bperfect(ion)?\b|\bflawless\b/gi, term: 'perfect / flawless', cat: 'Superlatives', why: 'Perfection claims overstate results and trigger manual review.', alt: 'Show a close-up demo and let viewers judge.' },
    { re: /\bcure(s|d)?\b|\bheal(s|ed|ing)?\b|\btreat(s|ing)?\s+(acne|eczema|pain|disease)/gi, term: 'cure / heal / treat', cat: 'Medical claims', why: 'Non-drug products cannot claim to cure, heal or treat conditions.', alt: 'Talk about routine and feel, not treatment.' },
    { re: /\blose\s+\d+\s?(lbs|kg|pounds|kilos)\b|\bweight\s?loss\s+guarantee/gi, term: 'lose X lbs', cat: 'Medical claims', why: 'Specific weight-loss promises are prohibited for most product types.', alt: 'Share your routine, not a promised number.' },
    { re: /\banti-?aging\s+guarantee|\berase\s+wrinkles|\bwrinkle-?free\s+skin\b/gi, term: 'erase wrinkles', cat: 'Medical claims', why: 'Reversal claims for cosmetics are treated as drug claims.', alt: 'Use appearance language: "skin looks smoother".' },
    { re: /\bclinically\s+proven\b|\bdoctor\s+recommended\b|\bdermatologist\s+approved\b/gi, term: 'clinically proven / doctor recommended', cat: 'Unverifiable proof', why: 'Only usable with real studies/endorsements you can produce on request.', alt: 'Name the actual test or ingredient standard instead.' },
    { re: /\bfree\b(?!\s+shipping)/gi, term: 'free (not shipping)', cat: 'Misleading pricing', why: '"Free" on a paid product reads as a pricing trick and draws complaints.', alt: 'Say exactly what is included: "bonus X included".' },
    { re: /\bonly\s+today\b|\blast\s+chance\b|\bends\s+tonight\b|\bact\s+now\b/gi, term: 'only today / last chance', cat: 'Fake urgency', why: 'If the offer does not really end, countdown pressure counts as deceptive.', alt: 'Use the real promotion end date, or drop the urgency.' },
    { re: /\bselling\s+out\s+fast\b|\balmost\s+gone\b|\blimited\s+stock\b/gi, term: 'selling out fast', cat: 'Fake urgency', why: 'Scarcity claims must match real inventory.', alt: 'Show real stock or restock info if you mention it at all.' },
    { re: /\bget\s+rich\b|\bmake\s+money\s+fast\b|\bpassive\s+income\s+guarantee|\bfinancial\s+freedom\s+in\b/gi, term: 'get rich / make money fast', cat: 'Income claims', why: 'Income promises are banned in marketplace ads, full stop.', alt: 'Sell the tool or the process, never the income.' },
    { re: /\byou\s+won'?t\s+believe\b|\bshocking\b|\bsecret\s+(hack|trick)\s+(brands|they)\b/gi, term: 'you won\'t believe / shocking', cat: 'Clickbait', why: 'Clickbait phrasing lowers trust scores and can limit reach.', alt: 'Lead with the actual result or demo.' },
    { re: /\bbefore\s+and\s+after\b/gi, term: 'before and after', cat: 'Sensitive comparisons', why: 'Before/after presentations are restricted for beauty, weight and health products.', alt: 'Show your own routine-in-progress instead of a comparison.' },
    { re: /\bpermanent(ly)?\b|\bforever\b/gi, term: 'permanent / forever', cat: 'Unverifiable promises', why: 'Permanence claims are almost never substantiable for consumer goods.', alt: 'State the tested duration: "lasted through 30 washes".' },
    { re: /\binstant(ly)?\s+(results|cure|relief)\b|\bovernight\s+results\b/gi, term: 'instant results', cat: 'Exaggerated claims', why: 'Instant-result promises are a top rejection reason in ad review.', alt: 'Give a realistic timeframe from your own use.' },
    { re: /\bsafe\s+for\s+everyone\b|\bno\s+side\s+effects\b/gi, term: 'no side effects', cat: 'Medical claims', why: 'Safety absolutes for anything applied to the body are high-risk.', alt: 'List ingredients/materials and who it is designed for.' },
    { re: /\bapproved\s+by\b|\bofficial\b/gi, term: 'approved by / official', cat: 'False authority', why: 'Implying platform or regulator endorsement you do not have is deceptive.', alt: 'Remove, or name the real certification with its scope.' },
    { re: /\bdiscount\s+up\s+to\s+\d+%/gi, term: 'discount up to X%', cat: 'Misleading pricing', why: '"Up to" discounts must apply to a real share of the range.', alt: 'State the exact discount on this product.' }
  ];

  function bannedCheck(text) {
    var findings = [];
    BANNED_RULES.forEach(function (rule) {
      var m, hits = [];
      rule.re.lastIndex = 0;
      while ((m = rule.re.exec(text)) !== null) {
        hits.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
        if (hits.length >= 20) break;
      }
      if (hits.length) {
        findings.push({ term: rule.term, cat: rule.cat, why: rule.why, alt: rule.alt, hits: hits });
      }
    });
    var total = findings.reduce(function (n, f) { return n + f.hits.length; }, 0);
    return { findings: findings, total: total };
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function bannedHighlight(text, result) {
    var spans = [];
    result.findings.forEach(function (f) {
      f.hits.forEach(function (h) { spans.push(h); });
    });
    spans.sort(function (a, b) { return a.start - b.start; });
    var out = '', pos = 0;
    spans.forEach(function (h) {
      if (h.start < pos) return; // skip overlaps
      out += escapeHtml(text.slice(pos, h.start));
      out += '<mark>' + escapeHtml(text.slice(h.start, h.end)) + '</mark>';
      pos = h.end;
    });
    out += escapeHtml(text.slice(pos));
    return out;
  }

  var api = {
    CATEGORIES: CATEGORIES,
    scriptGenerate: scriptGenerate,
    titleGenerate: titleGenerate,
    hashtagGenerate: hashtagGenerate,
    bannedCheck: bannedCheck,
    bannedHighlight: bannedHighlight,
    wordCount: wordCount
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.SSEngines = api;
})();
