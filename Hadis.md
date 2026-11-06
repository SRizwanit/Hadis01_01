# 📖 Hadis.md — হাদিস ২D অ্যানিমেশন ভিডিও কিট (Remotion + React + GitHub Actions)

> **প্রজেক্ট:** ইসলামী বিশ্বকোষ ও আল হাদিস **S2** — "আজকের হাদিস"
> **হাদিস:** সহিহ বুখারী, হাদিস নং: ০১ (ইন্নামাল আ'মালু বিন-নিয়্যাত)
> **টেক স্ট্যাক:** React + Remotion + GitHub Actions (`render.yml`)
> **আউটপুট:** ১৬:৯ ও ৯:১৬ — HD ও 4K (মোট ৪টি MP4)
> **নিয়ম:** `render.yml` ছাড়া **সব ফাইল রুট ফোল্ডারে (কোনো সাব-ফোল্ডার নেই)**

---

## 0. এই ফাইল কীভাবে ব্যবহার করবেন

কাজটি অনেক বড়, তাই প্রতিটি **একক ফাইল = একটি ধাপ**। এক সেশনে ১–৩টি ধাপ করালেই লিমিট নিরাপদ থাকে।

**প্রতিটি সেশনে AI-কে এই প্রম্পট দিন:**

```
Hadis.md পড়ো। "হ্যান্ডঅফ" অংশ দেখে পরের অসম্পূর্ণ ধাপ (যেমন S2.1) করো।
কাজ শেষে: ১) ফাইলটি দাও  ২) Hadis.md-তে [ ] → [x] করো  ৩) "বিবরণ" লিখো
৪) "হ্যান্ডঅফ" ও "কাজের লগ" আপডেট করে নতুন Hadis.md দাও।
```

**টিক নিয়ম (AI পালন করবে):**
- শেষ হলে `- [ ]` → `- [x]` এবং ধাপের নিচে `**✅ বিবরণ:**` অংশে কী করা হলো, কোন ফাইল তৈরি/পরিবর্তন হলো, কী টেস্ট হলো — লিখতে হবে।
- ধাপ অসম্পূর্ণ থাকলে টিক দেওয়া যাবে না; কারণ `**⚠️ বাধা:**` এ লিখতে হবে।
- প্রতিটি ধাপ নিজের "ইনপুট" ফাইলগুলো থেকেই করা যাবে — আগের চ্যাট মনে রাখার দরকার নেই।
- **SVG ফেজের ধাপ-আইডি `svg1`, `svg2` … `svg18`** (ফেজ SVG, ফেজ ৭-এর পর ও ফেজ ৮-এর আগে) — প্রম্পটে "পরের অসম্পূর্ণ ধাপ" বলতে এগুলোও বোঝায়; যেমন: "Hadis.md পড়ো, `svg1` করো"।

---

## 1. হ্যান্ডঅফ (প্রতি সেশনে আপডেট হবে)

| বিষয় | অবস্থা |
|---|---|
| সর্বশেষ সম্পন্ন ধাপ | **svg2** (`SvgKit.tsx` — `SceneFrame` (পূর্ণ-পর্দা `<svg>` + ক্যাপশন-ব্যান্ডে ম্লান করার SVG `<mask>`/লিনিয়ার গ্রেডিয়েন্ট; `idPrefix`/`guides`/`featherPx`/`bandOpacity`/`opacity`), `SVG_LOOK`, অঞ্চল-জ্যামিতি (`artZone`, `skyZone`, `groundZone`/`stripZone`, `captionBand`, `popupZone`, `chromeEdges`, `zonesOf`, `artPoint`, `px`), বিশুদ্ধ গণিত (`clamp`, `lerp`, `smoothstep`, `easeOutCubic`, `easeInOutCubic`, `rangeProgress`, `localClamp`, `drawOn`, `popIn`, `popOpacity`, `pulse`, `wave`, `svgId`, `bandMaskStops`), `Glow` (radialGradient), `Sparkles` (`mulberry32`), `SvgGuides` (শুধু QA); `SceneProps` টাইপ; `tsc --strict` এরর ০; Node-টেস্ট ৩৪/৩৪ ও Chromium পিক্সেল-টেস্ট ৫০/৫০ পাস (১৬:৯ ও ৯:১৬, ১× ও 4K ২×); `npm run check` PASS) — ফেজ SVG-র **২/১৮**। ⚠️ আসল `remotion` রেন্ডার এখনো চালানো হয়নি (স্টাব-`remotion`/`react`-টাইপে টেস্ট); দৃশ্য-কম্পোনেন্ট এখনো নেই, তাই আসল দৃশ্যের চেহারা যাচাই হয়নি (svg4 থেকে)। *(পূর্ববর্তী ধাপের বিবরণ নিচে অপরিবর্তিত:)* **svg1** (`svg-data.ts` — ১০টি দৃশ্য `SCENES` (৯ `main` + ১ `overlay` = `duniyaNari`), ১০টি কীওয়ার্ড `KEYWORDS` (৭টি চালু, ৩টি ঐচ্ছিক বন্ধ), `SVG_TIMING`, জানালা/ক্রসফেড/পপ-আপের বিশুদ্ধ ফাংশন (`sceneWindow`, `sceneBoundaries`, `sceneOpacityAt`, `activeScenes`, `popupWindows`, `popupAt`) ও `validateSvgData()` (লোডের সময়ও চলে); সময় সব `WORDS` থেকে; `tsc --strict` এরর ০; Node-টেস্ট ১০৬/১০৬ পাস; `npm run check` PASS) — ফেজ SVG-র **১/১৮**। ⚠️ কম্পোনেন্ট এখনো নেই, তাই চেহারা/আসল Remotion রেন্ডার যাচাই হয়নি (স্টিল svg4 থেকে)। (পূর্ববর্তী: **S7.2** (`.github/workflows/render.yml`-এ জব `render` যোগ — `needs: [check, prepare]`, `if: has_video == 'true'`, ম্যাট্রিক্স `fromJSON(needs.prepare.outputs.matrix)` (`fail-fast: false`), `timeout-minutes: 90`; ফ্লো: checkout → Node 22 → npm ক্যাশ → ffprobe আছে কি → `npm install` → Chrome-লাইব্রেরি + `browser ensure` → `remotion render … --scale --codec=h264 --crf --pixel-format=yuv420p --audio-codec=aac --audio-bitrate=192k --concurrency=4 --timeout=120000` → **`ffprobe` যাচাই** (কোডেক h264, রেজোলিউশন `matrix.w`×`matrix.h`, `yuv420p`, অডিও স্ট্রিম aac, দৈর্ঘ্য ৪৩.৩৩ ± ০.৫ সে.; ফেইলে জব ফেইল) → `upload-artifact@v4` `hadis0101-${{ matrix.id }}`, ১৪ দিন) — ফেজ ৭ **সম্পূর্ণ** (২/২)। ⚠️ GitHub-এ এখনো চালানো হয়নি; আসল `remotion render` এখানে চালানো যায়নি। (পূর্ববর্তী: **S7.1** (`.github/workflows/render.yml` — জব `check` (ffmpeg → `npm install` → `npm run check` → `tsc` → Chrome → `remotion compositions`), `prepare` (ইনপুট → ম্যাট্রিক্স, শুধু bash), `preview` (২২টি স্টিল + আর্টিফ্যাক্ট); ট্রিগার শুধু `workflow_dispatch`) — ফেজ ৭-এর **১/২**। ⚠️ GitHub-এ এখনো চালানো হয়নি। (পূর্ববর্তী: **S6.3** (একীভূত টাইপ/বিল্ড চেক — স্টাব-টাইপে পূর্ণ `tsc --strict` সব ১৫ ফাইলে এরর ০; আগের সব টেস্ট পুনরায় পাস; `npm run check` PASS; ইম্পোর্ট/নির্ভরতা যাচাই) — ফেজ ৬ **সম্পূর্ণ**। ⚠️ আসল `tsc`/`remotion compositions` CI-তে (S7.1)। (পূর্ববর্তী: **S6.2** (`Root.tsx` — `RemotionRoot` এক্সপোর্ট; দুটি `<Composition>` `Hadis-16x9`/`Hadis-9x16`; `calculateMetadata` আসল অডিও-দৈর্ঘ্য পড়ে `durationInFrames` (১৩০০) ও `props.audioSec` সেট করে, ব্যর্থ হলে ফলব্যাক ৩৮.৩২) — ফেজ ৬-এর **২/৩** সম্পন্ন। (পূর্ববর্তী: **S6.1** (`HadisVideo.tsx` — মূল কম্পোজিশন: `Audio` + `Background → Header → ArabicBlock → Karaoke → ProgressBar` + `<Sequence from={audioEnd}><Outro/></Sequence>`; আগের চার স্তরে `previousLayersOpacity`; শুরুর ৫ ফ্রেম ফেড-ইন; `format`/`audioSec` প্রপ) — ফেজ ৬-এর **১/৩** সম্পন্ন। (পূর্ববর্তী: **S5.7** (সিঙ্ক যাচাই; `timing.ts`-এ `audioSecAt` যোগ) — ফেজ ১–৫ **সম্পূর্ণ**। (পূর্ববর্তী: **S5.6** `Outro.tsx` — লোগো ↵ "আজই প্লে স্টোর থেকে ডাউনলোড করুন:" ↵ "ইসলামী বিশ্বকোষ ও আল হাদিস S2 অ্যাপ।" ↵ অ্যানিমেটেড Google Play badge; `OUTRO_SECONDS` ১.৫ → ৫.০, মোট ১৩০০ ফ্রেম; S5.4-এ Hind Siliguri বাদ — সব ছোট বাংলা লেবেল Anek Bangla))))))) |
| পরের ধাপ | **নতুন (SVG ফেজ যোগ, 2026-11-06):** সিনভিত্তিক SVG দৃশ্য + কীওয়ার্ড আইকন + শিক্ষার ডায়াগ্রামের জন্য নতুন **ফেজ SVG (`svg1 – svg18`)** যোগ হয়েছে (পরিকল্পনা ✅, কোড: **`svg1` ✅, `svg2` ✅ সম্পন্ন** (`svg-data.ts`, `SvgKit.tsx`), `svg3–svg18` ⬜) — পরের কোড-ধাপ **`svg3`** (`SvgShapes.tsx`)। নিচের GitHub-প্রিভিউ-রান ও S8.1–S8.4 আগের মতোই বাকি; প্রস্তাবিত ক্রম: চাইলে এখনই একবার `preview` চালিয়ে বর্তমান বেস যাচাই → `svg1…svg18` → আবার `preview` (SVG-সহ) → S8.1–S8.4। **আগের নির্দেশ (অপরিবর্তিত):** **প্রথমে (আপনার কাজ):** GitHub-এ কিট পুশ করে Actions → `render` → *Run workflow* → **`formats = preview`** চালান (এতে `check` জবে আসল `npm install`/`tsc`/`remotion compositions` প্রথম চলবে ও ২২টি স্টিল আসবে); ফেইল করলে ব্যর্থ ধাপের লগ দিন। তারপর **S8.1** — প্রিভিউ স্টিল পর্যালোচনা (আর্টিফ্যাক্ট `hadis0101-preview` ডাউনলোড করে চেকলিস্ট মেলানো; আসল Anek Bangla/Noto Serif Bengali/Amiri ফন্ট লোড হয়েছে কি দেখা)। এরপর S8.2 (`formats = 16x9-HD` ও `9x16-HD` — প্রথম ভিডিও রেন্ডার; সিঙ্ক দেখা) → S8.3 (4K) → S8.4 (বিতরণ)। ⚠️ **`all` চালানোর আগে HD একটি দিয়ে সময়/মিনিট মেপে নিন** (প্রাইভেট রিপোতে ফ্রি প্ল্যানে মাসে ২০০০ মিনিট; ৪টি জব সমান্তরালে চলে ও প্রতিটির মিনিট আলাদা গোনা হয়) |
| SVG ফেজ (নতুন) | ফেজ SVG: `svg1 – svg18` — পরিকল্পনা ✅ (দৃশ্য-মানচিত্র ১০টি, কীওয়ার্ড-তালিকা, জ্যামিতি, নিয়ম — ফেজ SVG-র শুরুর টেবিলে); কোড ধাপ: **`svg1` ✅** (`svg-data.ts` তৈরি), **`svg2` ✅** (`SvgKit.tsx` তৈরি), `svg3–svg18` ⬜। **নতুন ফাইল (বাকি, পরিকল্পিত, রুটে):** `SvgShapes.tsx`, `SceneSanad.tsx`, `SceneMinbar.tsx`, `SceneMadina.tsx`, `SceneNiyyah.tsx`, `SceneAmal.tsx`, `SceneFruit.tsx`, `SceneHijra.tsx`, `SceneDuniyaNari.tsx`, `SceneLesson.tsx`, `SceneNajat.tsx`, `KeywordIcons.tsx`, `KeywordPopup.tsx`, `SvgLayer.tsx`; **পরিবর্তন হবে (svg17):** `HadisVideo.tsx`, `config.ts`; **svg18:** `.github/workflows/render.yml`-এর প্রিভিউ-ফ্রেম। |
| svg2 সম্পন্ন — svg3 থেকে পরের ধাপের জন্য তথ্য | **`SvgKit.tsx` এক্সপোর্ট (৫২৬ লাইন):** ধ্রুবক `SVG_LOOK` {`captionBandOpacity` = `svg-data`-এর `DEFAULT_BAND_OPACITY` (0.28), `featherPx` 60, `glow` {soft 0.3, normal 0.5, strong 0.78}, `lineWidth` {hair 1.5, thin 2.5, base 4, bold 6}, `pop` {from 0.6, overshoot 0.08, durationSec 0.35, peakAt 0.55, fadeInSec 0.12}, `sparkle` {sizeMin 5, sizeMax 13, periodMin 1.6, periodMax 3.6, sharpness 2}, `guides` (QA-রঙ)}, `SVG_GEOMETRY`, `LESSON_SIZE_FACTOR` (0.92); টাইপ `Zone`, `ZoneSet`, `SceneProps`, `PopOptions`, `MaskStop`, `SceneFrameProps`, `GlowProps`, `Sparkle`, `SparkleField`, `SparklesProps`; ফাংশন/কম্পোনেন্ট নিচে। **(ক) `SceneProps` — svg4–svg13 প্রতিটি দৃশ্য-কম্পোনেন্ট এটি নেবে:** `{localSec, sec, width, height, idPrefix?}` — `localSec` = দৃশ্য-জানালা-শুরু থেকে সেকেন্ড (**ক্রসফেডে ঢোকার সময় ঋণাত্মক ≥ −০.২৫ — `localClamp(localSec)` দিয়ে ক্ল্যাম্প**), `sec` = গ্লোবাল অডিও-সেকেন্ড (শব্দ-সময়ে মেলানো অ্যানিমেশনের জন্য; শব্দের সময় `WORDS[i].startSec` থেকে — হাতে-লেখা সেকেন্ড নয়), `idPrefix` = দৃশ্য-আইডি (SvgLayer `SceneFrame`-এ ও ভেতরের `Glow`-এ দেবে)। দৃশ্য-কম্পোনেন্ট **নিজে `<svg>` আঁকবে না** — `SvgLayer` (svg16) `<SceneFrame width height opacity bandOpacity={sceneBandOpacity(id)} idPrefix={id}>` র‍্যাপারে বসাবে, তাই দৃশ্য শুধু `<g>…</g>` ফেরত দেবে (স্টিল/টেস্টের সময় নিজে `SceneFrame`-এ মুড়ে নিন)। **(খ) `SceneFrame`:** প্রপস `width`, `height`, `opacity` (≤ ০ হলে `null`; হুকের পরে চেক), `bandOpacity` (ডিফল্ট 0.28; `≥ ১` হলে মাস্ক বাদ), `featherPx` (60), `idPrefix` (ডিফল্ট `'sf'`; **একসাথে দৃশ্যমান দুই দৃশ্যে আলাদা হতে হবে** — মাস্ক `${idPrefix}-band-mask`, গ্রেডিয়েন্ট `${idPrefix}-band-grad`), `guides` (QA-গাইড, ডিফল্ট `false`), `children`। আউটপুট: `<svg data-part="scene-frame" data-scene viewBox="0 0 W H" style="position:absolute;left:0;top:0;opacity;pointer-events:none;overflow:hidden">` → `<g mask=url(#…-band-mask)>children</g>`; মাস্ক `maskUnits=userSpaceOnUse` (bbox-কাটা এড়াতে), গ্রে-গ্রেডিয়েন্ট ৬টি স্টপ (`bandMaskStops`)। **ম্লান কেবল ব্যান্ডের ভেতরে ধ্রুব `bandOpacity`; `featherPx` ব্যান্ডের বাইরে** (উপরে/নিচে ৬০px-এ পূর্ণ থেকে নামে) — তাই শিল্প-অঞ্চলের বাকি অংশ পূর্ণ উজ্জ্বল। **(গ) জ্যামিতি (ডিজাইন px, `getUnit` দিয়ে স্কেল; সত্যিই চালিয়ে মাপা):** ১৬:৯ — `artZone` y 380–1010 · `skyZone` 380–588.8 · `captionBand` 588.8–851.2 · `stripZone`/`groundZone` 860–1010 · `popupZone` 392–560 · `chromeEdges` headerBottom 359, প্রগ্রেস বার 1032–1040; ৯:১৬ — `artZone` 650–1620 · `skyZone` 650–936 · `captionBand` 936–1324 · `stripZone` 1340–1620 · `popupZone` 665–900 · headerBottom 633, প্রগ্রেস বার 1650–1660 (শিল্প-অঞ্চলের নিচ 1620 ≤ সেফ-জোন 1670)। সব `Zone` = `{left, top, right, bottom, width, height, cx, cy}`, পূর্ণ প্রস্থ। **কম্পোজিশন-নিয়ম:** আকাশ (চাঁদ/আলো/রশ্মি) `skyZone`-এ, সিলুয়েট/মাটি `groundZone`-এ, ক্যাপশন-ব্যান্ড মাঝে — ১৬:৯-এ আকাশ মাত্র ≈২০৯px উঁচু, মাটি ≈১৫০px (৯:১৬-তে ২৮৬ / ২৮০); `artPoint(zone, fx, fy)` দিয়ে ভগ্নাংশ-স্থানাঙ্কে বসান। `captionBand` = লেসন-কার্ডের স্থির আকার (`centerY ± (maxLines × size × 0.92 × 1.55 + ২ × padding)/২`)। **(ঘ) অ্যানিমেশন-হেলপার (সব বিশুদ্ধ, `sec`-ভিত্তিক):** `drawOn(length, p)` → `{strokeDasharray, strokeDashoffset, strokeOpacity}` (পাথে `pathLength={1}` দিয়ে `drawOn(1, p)` লিখলে দৈর্ঘ্য মাপতে হয় না; `p ≤ 0` → `strokeOpacity: 0`); `popIn(sec, startSec, {durationSec?, from?, overshoot?})` → স্কেল (**`sec < startSec` → ০**, শুরুতে 0.6, শিখর ≈1.08 ~০.৫৫·দৈর্ঘ্যে, দৈর্ঘ্যের শেষে ঠিক ১.০) — **`popOpacity(sec, startSec, 0.12)` সাথে দিন**; `pulse(sec, period, phase=0)` ০..১ (`sec=0`-তে ০); `wave` −১..১; `rangeProgress(sec, start, end)` রৈখিক ০..১; `smoothstep(e0, e1, x)`; `easeOutCubic`/`easeInOutCubic`; `lerp`/`clamp`/`clamp01`। **(ঙ) `Glow`:** `{id (অনন্য!), cx, cy, r, ratio=1, color=COLORS.gold, intensity=SVG_LOOK.glow.normal, opacity=1}` — তিন-স্টপ `radialGradient` + `<ellipse>`; `intensity`/`opacity`/`r` ≤ ০ → `null`; **`id` দৃশ্যে অনন্য রাখুন** (`svgId(idPrefix, 'moon-glow')`)। **`Sparkles`:** `{seed, count, zone, sec, color=goldSoft, opacity, riseSpeed=0, sizeMin/Max, periodMin/Max}` — ৪-কোনা তারা (`starPath`), `mulberry32(seed)`, ফ্রেম-ক্রম-নিরপেক্ষ; `makeSparkles()`/`sparkleAlpha()` আলাদা টেস্টযোগ্য। **(চ) `SvgGuides`** (শুধু QA — `SceneFrame guides` বা সরাসরি): শিল্প (সবুজ), ক্যাপশন-ব্যান্ড (কমলা), পপ-আপ (আকাশি), স্ট্রিপ (গোলাপি), হেডারের নিচ/প্রগ্রেসের ওপর (সাদা রেখা) — svg16/svg18-এ স্টিলে জ্যামিতি মেলাতে; **ভিডিওতে ডিফল্টে বন্ধ**। **(ছ) ⚠️ হাতে-মেলানো মান:** `LESSON_SIZE_FACTOR` 0.92 (= `Karaoke.tsx`-এর `KARAOKE_LOOK.sizeFactor.lesson`; টেস্ট সোর্স-লাইন মেলায় — Karaoke বদলালে এখানেও বদলান) ও `SVG_GEOMETRY.*.headerBottom` 359/633 (S5.2-এ নকল-ফন্টে মাপা; আসল Noto Serif Bengali/Anek Bangla-য় svg18/S8.1 স্টিলে `guides` দিয়ে মিলিয়ে দেখুন)। **(জ) svg3 `SvgShapes.tsx`-এর জন্য:** আকৃতি-কম্পোনেন্ট `SvgKit`-এর `drawOn`/`popIn`/`pulse`/`Glow`/`svgId` ব্যবহার করবে; প্রতিটি আকৃতির `id` (গ্রেডিয়েন্ট/মাস্ক) `svgId(idPrefix, name)` দিয়ে (প্রপ `idPrefix`); রঙ শুধু `COLORS`; লাইন-পুরুত্ব `SVG_LOOK.lineWidth.*` × `getUnit`; `useCurrentFrame()`/`remotion` ইম্পোর্ট নয়। |
| svg1 সম্পন্ন — svg2 থেকে পরের ধাপের জন্য তথ্য | **`svg-data.ts` এক্সপোর্ট:** টাইপ `SceneId`, `SceneLayer`, `SceneDef`, `KeywordIconName`, `KeywordId`, `KeywordDef`, `SceneWindow`, `SceneBoundary`, `ActiveScene`, `PopupWindow`, `PopupState`; ধ্রুবক `SCENES`, `KEYWORDS`, `KEYWORD_ICON_NAMES` (৮টি), `SVG_TIMING`, `DEFAULT_BAND_OPACITY` (0.28), `ARABIC_ZONE`, `SCENE_WINDOWS`; ফাংশন `computeSceneWindows`, `sceneWindow(id)`, `getScene(id)`, `sceneBandOpacity(id)`, `sceneBoundaries()`, `sceneOpacityAt(id, sec)`, `activeScenes(sec)`, `computePopupWindows`, `popupWindows()`, `getKeyword(id)`, `popupAt(sec)`, `validateSvgData(scenes?, keywords?, words?)`। শুধু `./hadis-data` import করে (`config.ts` নয়)। **(ক) `SvgLayer` (svg16) ব্যবহার:** `activeScenes(sec)` → `[{id, layer, opacity, localSec}]` — আগে `main` (টাইমলাইন-ক্রমে; ক্রসফেডে ≤ ২টি), শেষে `overlay` (সবার ওপরে); `opacity > 0` শুধু। `sec` = গ্লোবাল অডিও-সেকেন্ড (`audioSecAt`, S5.7)। `localSec = sec − sceneWindow(id).startSec` — ক্রসফেডে ঢোকার সময় **ঋণাত্মক (≥ −০.২৫)** হতে পারে, দৃশ্য-কম্পোনেন্টকে তা সামলাতে হবে (`max(0, …)` বা `smoothstep` ক্ল্যাম্প)। **(খ) দৃশ্য-জানালা (সে., `WORDS` থেকে মাপা; `startSec`→`endSec` = সীমানা; দৃশ্যমান = ±০.২৫):** `sanad` 0.000→6.300 · `minbar` 6.300→12.111 · `madina` 12.111→15.548 · `niyyah` 15.548→17.804 · `amal` 17.804→20.489 · `fruit` 20.489→23.712 · `hijra` 23.712→31.078 · `lesson` 31.078→35.882 · `najat` 35.882→38.320 (এরপর আউটরোতেও ১ — ফেড `SvgLayer`-এর `opacity` দিয়ে)। আসল সীমানা (৮টি): 6.2995 · 12.1115 · 15.5480 · 17.8040 · 20.4890 · 23.7120 · 31.0785 · 35.8820 (Hadis.md SVG-২-র টেবিলের মান ২ দশমিকে আনুমানিক, তফাত ≤ 0.0035)। **(গ) `duniyaNari` ওভারলে:** `parent: 'hijra'`; জানালা 25.044→31.078 (প্রথম শব্দ "দুনিয়া" 25.344 − `overlayLeadSec` 0.3); অপাসিটি = নিজের ফেড-ইন (`overlayInSec` 0.4) **×** `hijra`-র অপাসিটি ⇒ `hijra` যখন `lesson`-এ ক্রসফেড হয় এটিও মিলিয়ে যায় (≤ মূল দৃশ্য — টেস্ট করা)। `SceneDuniyaNari` (svg11) শুধু নিজের স্তর আঁকবে, `SceneHijra` অপরিবর্তিত; তীর/কাফেলা-অবস্থানের জন্য `SceneHijra`-র `x(sec)` এক্সপোর্ট করা থাকলে ব্যবহার। **(ঘ) ব্যান্ড-ম্লানতা:** `sceneBandOpacity(id)` — `niyyah` 0.45, বাকি সব 0.28 (`SceneFrame`-এর `bandOpacity` প্রপে svg2/svg16 পাস করবে)। **(ঙ) পপ-আপ (svg15):** `popupAt(sec)` → `{keywordId, localSec, durationSec, opacity} | null` (একসাথে ≤ ১টি; জানালা `[start, end)`); `opacity` = ফেড-ইন (`popupFadeInSec` 0.12) × ফেড-আউট (`popupOutSec` 0.25, জানালার শেষে) — **আবার গুণ করবেন না**; স্প্রিং-পপের স্কেল `localSec` ও `SVG_TIMING.popupInSec` (0.35) থেকে আঁকুন। জানালা (সে.): `niyyah` 18.846→20.146 · `hijra` 24.431→25.264 (০.৮৩) · `duniya` 25.264→26.564 · `nari` 26.836→28.136 · `amal` 32.118→33.418 · `allah` 34.505→35.805 · `akhirahNajat` 36.632→38.132 (১.৫ সে.; অডিও-শেষ 38.32-এর আগে)। **(চ) ⚠️ svg14/svg15-এর জন্য — পরিকল্পনা থেকে পরিবর্তন:** কীওয়ার্ডে `icon`/`label` একবচন নয় — **`icons: KeywordIconName[]` ও `labels: string[]`** (১–২টি, সমান সংখ্যা; যুগ্ম পপ-আপ `akhirahNajat` = ২ আইকন পাশাপাশি); শব্দ-ইনডেক্স শুধু `wordIndices[]`। আইকনের নাম (`KEYWORD_ICON_NAMES`): `niyyah`, `hijra`, `duniya`, `nari`, `amal`, `allah`, `akhirah`, `najat` — svg14 `KEYWORD_ICONS`-এ হুবহু এই ৮টি কী লাগবে; `validateKeywordIcons()` এই তালিকা দিয়ে মেলাবে। লেবেল: নিয়্যাত · হিজরত · দুনিয়া · নারী · আমল · আল্লাহ · আখিরাত · নাজাত (বদলাতে চাইলে `KEYWORDS`-এর `labels`)। **(ছ) ঐচ্ছিক পপ-আপ:** `niyyah2` (শব্দ ৪৫), `niyyah3` (৭৩), `hijratei` (৬৫) — `enabled: false`; তিনটিই চালু করলেও `validateSvgData()` ফাঁকা (১০টি পপ-আপ; টেস্ট করা)। **(জ) `validateSvgData()`** ফাইল লোডের সময় চলে ও ভুলে throw করে (`hadis-data.ts`-এর ধারা): main দৃশ্য ফাঁকহীন (০–৮২), ওভারলে মূল দৃশ্যের ভেতরে, ০ থেকে অডিও-শেষ+৫ সে. জুড়ে প্রতি ফ্রেমে ১–২ main দৃশ্য ও যোগফল ১, পপ-আপ ≥ ০.৭ সে./অডিওর ভেতরে/ওভারল্যাপহীন/আরবি জানালার (`ARABIC_ZONE`) বাইরে। **`ARABIC_ZONE` (lead 0.25, tail 0.9) হাতে-মেলানো মান** — `ArabicBlock.tsx`-এর `ARABIC_TIMING` (leadIn 0.25, outDelay 0.1 + out 0.8) বদলালে এখানেও বদলান। **(ঝ)** শব্দ-ইনডেক্স হাতে লেখা (`SCENES`/`KEYWORDS`), সময় নয় — synced JSON আবার সংশোধন হলে ইনডেক্স ঠিক থাকলে কিছু বদলাতে হয় না; নতুন হাদিসে (S8.4) ইনডেক্স মেলাতে হবে। |
| svg1 থেকে পরের ধাপের জন্য তথ্য | **(ক)** স্তর-ক্রম: `Background → SvgLayer → Header → ArabicBlock → Karaoke → ProgressBar → KeywordPopup → Outro`। **(খ)** দৃশ্য ও কীওয়ার্ডের সময় সবসময় `hadis-data.ts`-এর `WORDS` (শব্দ-ইনডেক্স) থেকে — হাতে-লেখা সেকেন্ড নয়; দৃশ্য-সীমানা = পাশের দুই দৃশ্যের ফাঁকের মাঝ, ক্রসফেড ০.৫ সে.। **(গ)** মূল সংখ্যা (synced JSON): `sanad` 0–13 (0.00–6.07), `minbar` 14–24 (6.53–11.84), `madina` 25–33 (12.39–15.30), `niyyah` 34–36 (15.79–17.54), `amal` 37–41 (18.06–20.49), `fruit` 42–48 (20.49–23.56), `hijra` 49–66 (23.86–30.89), `duniyaNari` 53–66 (25.34–30.89), `lesson` 67–77 (31.26–35.88), `najat` 78–82 (35.88–38.32)। **(ঘ)** জ্যামিতি (S5.2–S5.5 থেকে): হেডারের নিচ ১৬:৯ 359 / ৯:১৬ 633; আরবি ব্লক ১৬:৯ y 392–574 / ৯:১৬ y 675–879 (শুধু ১৫.৫৭–১৮.৪০ সে.); ক্যাপশন-ব্যান্ড ১৬:৯ y ≈ 589–851 / ৯:১৬ y ≈ 936–1324; প্রগ্রেস বার ১৬:৯ y 1032–1040 / ৯:১৬ y 1650–1660; ৯:১৬ সেফ-জোন উপর ১৫০ / নিচ ২৫০। **(ঙ)** `mulberry32` `Background.tsx` থেকে ইম্পোর্ট; `audioSecAt` `timing.ts` থেকে; `previousLayersOpacity` `Outro.tsx` থেকে। **(চ)** কোনো মানুষ/নবী/সাহাবীর অবয়ব নয় (D20); লেখা শুধু ডায়াগ্রাম ("নিয়্যাত ঠিক = আমল কবুল") ও পপ-আপ লেবেলে, ফন্ট Anek Bangla। |
| সিঙ্ক অবস্থা | ✅ `hadis0101.synced.json` PASS (−35 ও −40 dB); মূল JSON FAIL (C2 −1.32 সে.)। ⚠️ ৩টি অ্যাঙ্কর ভিডিও দেখে নিশ্চিত করতে হবে (#16 "উমর" 7.11, #37 17.54, #49 23.56) — S8.2 |
| ভিডিওতে ব্যবহার্য JSON | **`hadis0101.synced.json`** (মূলটি নয়) |
| অ্যাসেট মাপ | WAV 38.32 সে. (44.1kHz মনো 16-bit); JSON ৮৩ শব্দ, শেষ 37.00 সে.; লোগো 720×720; **Play badge 1600×474 (স্বচ্ছ PNG, ≈৯৬ KB; আপনার ৫০০০×৫০০০ ছবি থেকে ব্যাজের অংশ ক্রপ)** |
| বর্তমান ফাইল (zip-এ) | `Hadis.md`, **`SvgKit.tsx`** *(svg2 — নতুন)*, **`svg-data.ts`** *(svg1)*, `package.json`, `tsconfig.json`, `remotion.config.ts`, `.gitignore`, `index.ts`, `global.d.ts`, `hadis0101.json`, `hadis0101.wav`, `logo.jpg`, `check-sync.mjs`, `sync-fix.mjs`, `hadis0101.synced.json`, `sync-report.json`, `sync-fix-report.json`, `config.ts`, `theme.ts` *(S5.3-এ আরবি `top`; **S5.4-এ Hind Siliguri বাদ, Anek Bangla ৫০০/৬০০/৭০০/৮০০**)*, `hadis-data.ts`, `timing.ts`, `Background.tsx`, `Header.tsx`, `ArabicBlock.tsx`, `Karaoke.tsx`, `ProgressBar.tsx`, **`Outro.tsx`**, **`HadisVideo.tsx`** *(S6.1 — নতুন)*, **`Root.tsx`** *(S6.2 — নতুন)*, **`.github/workflows/render.yml`** *(S7.1 — নতুন; **S7.2-তে `render` জব যোগ, এখন ৪টি জব**; একমাত্র সাব-ফোল্ডারের ফাইল)*, `.gitignore` *(S7.1-এ `preview/`, `compositions.log` যোগ)*, **`google-play-badge.png`** *(S5.6-এ বদলেছে: `theme.ts` outro টোকেন, `config.ts` `OUTRO_SECONDS`, `hadis-data.ts` আউটরো টেক্সট, `.gitignore` badge-ব্যতিক্রম)* |
| চলমান বাধা | নেই |
| S7.2 থেকে পরের ধাপের জন্য তথ্য | **`render.yml` এখন ৪ জব:** `check` → `prepare` → `preview` (শুধু `formats=preview`) / `render` (বাকি সব `formats`; দুটি কখনো একসাথে চলে না — `has_video`/`run_preview` পরস্পর বিপরীত)। **`render` জব:** ম্যাট্রিক্স `{id, comp, scale, crf, out, w, h}` (S7.1-এর `prepare` থেকে, অপরিবর্তিত); জবের নাম `render (<id>)`; জব-স্তরের `env.EXPECTED_SEC='43.33'` ও `DURATION_TOLERANCE='0.5'` — **অডিও (`hadis0101.wav`) বা `OUTRO_SECONDS` বদলালে `EXPECTED_SEC` = অডিও সেকেন্ড + আউটরো করতে হবে** (পরবর্তী হাদিসের জন্য S8.4-এ মনে রাখুন), নইলে ffprobe-যাচাই ফেইল করবে। ম্যাট্রিক্স মান (`comp`, `out`, `scale`, `crf`) `run`-এ সরাসরি `${{ }}` নয়, `env` (`COMP`/`OUT`/`SCALE`/`CRF`/`EXPECT_W`/`EXPECT_H`) দিয়ে যায়। **আর্টিফ্যাক্ট:** `hadis0101-16x9-HD`, `hadis0101-16x9-4K`, `hadis0101-9x16-HD`, `hadis0101-9x16-4K` — প্রতিটিতে একটি MP4; `compression-level: 0` (MP4 আবার সংকোচনে লাভ নেই; ডাউনলোডে GitHub তবু একটি `.zip` দেয়)। **`ffprobe` যাচাই** (`bash -e`): ফাইল আছে ও ফাঁকা নয়; ভিডিও `h264`/মাপ/`yuv420p`; অডিও স্ট্রিম থাকতে ও `aac` হতে হবে; `format=duration` `43.33 ± 0.5`; পাস করলে `$GITHUB_STEP_SUMMARY`-তে কোডেক/মাপ/দৈর্ঘ্য/MB। **রিলিজ (ঐচ্ছিক `softprops/action-gh-release`) যোগ করা হয়নি** — এর জন্য `permissions: contents: write` (এখন `read`) ও ট্যাগ-ট্রিগার লাগে; S8.4-এ দরকার হলে। **সময়-আন্দাজ (মাপা হয়নি):** HD ≈ ৫–১২ মিনিট, 4K ≈ ১৫–৪০ মিনিট প্রতি জব; ৯০ মিনিটে না কুলালে `--concurrency` কমান (সমস্যা-সমাধান সারি)। **প্রথম রানে যা দেখার:** (ক) `--scale=2`-এ 4K মাপ ঠিক 3840×2160/2160×3840 আসে কি (`ffprobe` ধাপ ধরবে); (খ) Chrome-এ ফন্ট লোড (S8.1); (গ) `--concurrency=4` GitHub-রানারে মেমরি-সমস্যা করে কি |
| S7.1 থেকে পরের ধাপের জন্য তথ্য | **`render.yml` কাঠামো:** `on: workflow_dispatch` (ইনপুট `formats`, `type: choice`: `preview` ডিফল্ট | `16x9-HD` | `16x9-4K` | `9x16-HD` | `9x16-4K` | `all`); `permissions: contents: read`; ওয়ার্কফ্লো-স্তরের `env.CHROME_LIBS` (spec-এর ১৪টি লাইব্রেরি, `libasound2t64` — `ubuntu-latest` = 24.04) — **S7.2 `render` জবে `sudo apt-get install -y $CHROME_LIBS` হুবহু একই ভাবে ব্যবহার করুন**। **`prepare` আউটপুট:** `matrix` (`{"include":[…]}`; প্রতিটি এন্ট্রি `{id, comp, scale, crf, out, w, h}` — `config.ts`-এর `RENDER_TARGETS`-এর সাথে হুবহু মিলিয়ে টেস্ট করা, `w/h` = ফাইনাল পিক্সেল: 1920×1080, 3840×2160, 1080×1920, 2160×3840), `has_video` (`true`/`false`), `run_preview` (`true` শুধু `formats=preview`-এ)। `formats=preview`-এ ম্যাট্রিক্স খালি (`include: []`) — তাই `render` জবে **`if: has_video == 'true'` বাধ্যতামূলক** (খালি ম্যাট্রিক্সে জব ব্যর্থ হয়)। **ক্যাশ:** রুটে `package-lock.json` নেই ⇒ `setup-node`-এর `cache: npm` ব্যবহার করা যায় না (লকফাইল না পেলে ধাপ ব্যর্থ); তাই `actions/cache@v4`-এ `~/.npm`, কী `npm-${{ runner.os }}-${{ hashFiles('package.json') }}`। (লকফাইল যোগ করলে `cache: npm`-এ ফেরা যায়।) **`check` জব:** Chrome ও `browser ensure` এখানেও আছে (কারণ `remotion compositions` নিজেও Chrome চালায়); `compositions.log`-এ `Hadis-16x9` ও `Hadis-9x16` না থাকলে জব ফেইল, `১৩০০` না থাকলে শুধু `::warning::`। `ffmpeg` না থাকলে `apt-get install`। **`ffprobe` `ffmpeg` প্যাকেজের সাথেই আসে** — S7.2-এর যাচাই-ধাপে `ffmpeg` আছে কি দেখে নিন। **`preview` জব:** ফ্রেম `0 60 300 480 560 700 1000 1160 1190 1250 1299` × দুই কম্পোজিশন = ২২টি PNG (`preview/Hadis-16x9-f0000.png` …) → আর্টিফ্যাক্ট `hadis0101-preview` (১৪ দিন); প্রতিটি `remotion still` আলাদা বান্ডল করে (ধীর হলে পরে `remotion bundle` একবার + serve-url পদ্ধতিতে নেওয়া যায়)। |
| S6.3 থেকে পরের ধাপের জন্য তথ্য | **S7.1-এর `check` জবের জন্য:** (ক) `npm run check` (= `node check-sync.mjs --file hadis0101.synced.json`) এখানে **PASS** (−৩৫ dB, ৮/৮ সাইলেন্স মিল, পার্থক্য ০) এবং `sync-report.json` বাইট-একই থাকে; এটি **`ffmpeg` ব্যবহার করে** — CI রানারে `ffmpeg` আছে কি নিশ্চিত নয়, তাই `ffmpeg -version` দিয়ে যাচাই বা ইনস্টল ধাপ রাখুন; (খ) `package.json` স্ক্রিপ্ট আছে: `check`, `typecheck` (`tsc --noEmit`), `compositions` (`remotion compositions index.ts`), `dev`; (গ) রুট `tsconfig.json` `include: ["*.ts","*.tsx"]` — `strict` চালু, `noUnusedLocals/Parameters` **চালু নয়** (আমি অতিরিক্ত হিসেবে চালিয়ে ০ পেয়েছি); (ঘ) নির্ভরতা সব `package.json`-এ আছে ও exact pin (`remotion`/`@remotion/*` 4.0.340, `react`/`react-dom` 18.3.1, `@types/react` 18.3.12, `typescript` 5.8.3); `Root.tsx`-এর `satisfies` TS ≥ ৪.৯ চায় — ৫.৮.৩ ঠিক আছে; (ঙ) **আসল Remotion-এ প্রথম রানে যা দেখার:** ফন্ট-মডিউল নাম/সাবসেট (`NotoSerifBengali`, `AnekBangla`, `Amiri` — সমস্যা-সমাধান সারি দেখুন), `.wav` ইম্পোর্ট ও `getAudioDurationInSeconds`, `Audio`-র `volume`; (চ) প্রিভিউ স্টিলের ফ্রেম ≤ ১২৯৯ (মোট ১৩০০)। |
| S6.2 থেকে পরের ধাপের জন্য তথ্য | **`Root.tsx` এক্সপোর্ট:** `RemotionRoot` (`index.ts`-এর প্রত্যাশিত নাম), `calculateHadisMetadata` (`CalculateMetadataFunction<HadisVideoProps>`), বিশুদ্ধ ফাংশন `metadataFor(audioSec, props, fps?)` → `{durationInFrames, props:{…props, audioSec}}` ও `sanitizeAudioSec(x)` (সসীম ও >০ নয় এমন মান → ৩৮.৩২)। **কম্পোজিশন:** আইডি/মাপ `FORMATS` থেকে (`Hadis-16x9` 1920×1080, `Hadis-9x16` 1080×1920), `fps = FPS` (৩০), `defaultProps = {format, audioSec: ৩৮.৩২}`, স্ট্যাটিক `durationInFrames` = ফলব্যাক **১৩০০** (Studio/লিস্টিংয়ে `calculateMetadata`-এর আগের মান)। `calculateMetadata`: `getAudioDurationInSeconds(wav)` → `calcDurationInFrames(audioSec)` = `ceil((অডিও+৫)×৩০)`; **পড়া ব্যর্থ বা অবৈধ মান হলে ফলব্যাক ৩৮.৩২ (১৩০০ ফ্রেম) — রেন্ডার থামে না**। **CI-র জন্য:** `remotion still/render` সরাসরি `calculateMetadata` চালায়, তাই ফ্রেম-সংখ্যা অডিও-ফাইলের আসল দৈর্ঘ্য থেকেই আসে; `--frame=N` যেন `durationInFrames − 1` (বর্তমানে ১২৯৯)-এর বেশি না হয় (S7.1-এর ফ্রেম-তালিকা ≤ ১২৯৯ ✓)। `@remotion/media-utils` `package.json`-এ আগে থেকেই 4.0.340 পিন করা। |
| S6.1 থেকে পরের ধাপের জন্য তথ্য | **`HadisVideo.tsx` এক্সপোর্ট:** `HadisVideo` (`FC<HadisVideoProps>`), `HadisVideoProps = {format: FormatKey; audioSec?: number}`, `HADIS_VIDEO` (`introFadeFrames` 5, `audioVolume` 1), বিশুদ্ধ ফাংশন `introOpacity(frame, fadeFrames?)` ও `outroTiming(audioSec, durationInFrames, fps)` → `{audioEnd, outroFrames}`। **S6.2-এর জন্য:** (ক) `component={HadisVideo}` ও `defaultProps={{format: '16x9' | '9x16'}}`; (খ) `format` ≠ কম্পোজিশনের অভিযোজন (`orientationOf(width,height)`) হলে বা অজানা মান হলে **`HadisVideo` স্পষ্ট ত্রুটি ছোড়ে** — `Hadis-16x9`-তে `'16x9'`, `Hadis-9x16`-তে `'9x16'` দিন; 4K (`--scale 2`) মাপ বদলায় না, তাই সমস্যা নেই; (গ) **`audioSec`** — `calculateMetadata`-তে আসল অডিও-দৈর্ঘ্য পড়ে `props`-এ ফেরত দিন; না দিলে ফলব্যাক `AUDIO_SECONDS_FALLBACK` (৩৮.৩২), বর্তমান অডিওতে ফল একই; (ঘ) আউটরো শুরু = `audioEndFrame(audioSec)` = **ফ্রেম ১১৫০**, `outroFrames = durationInFrames − ১১৫০` (১৩০০ ফ্রেমে ১৫০ = ৫.০ সে.); কম্পোজিশন ১১৫০ বা তার কম হলে আউটরো আঁকা হয় না (ক্র্যাশ নেই); (ঙ) **স্তর-ক্রম:** `Audio` → `Background` → [কনটেন্ট-র‍্যাপার: `Header`, `ArabicBlock`, `Karaoke`, `ProgressBar`] → `Sequence(Outro)`; **ফেড-ইন শুধু কনটেন্ট-র‍্যাপারে** (ফ্রেম ০ → ০, ফ্রেম ৫ → ১), `Background` সবসময় পূর্ণ — প্রথম ফ্রেম কালো নয়; (চ) আগের চার স্তরের `opacity = previousLayersOpacity(frame/fps − audioSec)`: ফ্রেম ১১৪৯.৬ (৩৮.৩২ সে.) থেকে ১৮ ফ্রেমে ১→০, **ফ্রেম ১১৬৮-এ ক্যাপশন/হেডার/বার সম্পূর্ণ অদৃশ্য**; (ছ) `Audio` Sequence-এর বাইরে ⇒ ফ্রেম ০ থেকে, ভলিউম ১.০; `.wav` `import` করা (`global.d.ts`-এর `*.wav` ডিক্লারেশন কাজ করে)। |
| S5.7 থেকে পরের ধাপের জন্য তথ্য | **`timing.ts`-এ নতুন `audioSecAt(frame, fps, offsetSec=0)`** = `frame/fps + offset`, ১e-৬-এ গোল। `Karaoke`, `ProgressBar`, `ArabicBlock`, `Outro` চারটিই এখন এটি ব্যবহার করে (আগে প্রথম তিনটি `frameToSec(...)+offset`, `Outro` সরাসরি `frame / fps` ছিল)। `<Sequence from={N}>`-এর ভেতরে `timeOffsetSec = N/fps` দিলে ফলাফল **গ্লোবাল ফ্রেমের সাথে হুবহু একই HTML** (যাচাইকৃত); আউটরোর জন্য `Sequence from={audioEnd}` ভেতরে অফসেট ০। `Header` ও `Background` অডিও-সময় ব্যবহার করে না (শুধু নিজস্ব এন্ট্রান্স/লুপ) — ওদের Sequence-এর বাইরে ফ্রেম ০ থেকে রাখুন (Sequence-এ রাখলে এন্ট্রান্স ওখান থেকে শুরু)। |
| S5.6 থেকে পরের ধাপের জন্য তথ্য | `Outro.tsx` প্রপস: `opacity` (০–১, ডিফল্ট ১), `durationSec` (ডিফল্ট `OUTRO_SECONDS` = ৫), `timeOffsetSec` (ডিফল্ট ০ — **`<Sequence from={audioEndFrame}>`-এর ভেতরে স্থানীয় ফ্রেম ০ = অডিও শেষ**, তাই ০; Sequence-এর বাইরে গ্লোবাল ফ্রেমে রাখলে `-audioEndSec`)। জানালার আগে (`rawSec < 0`) `null`। **এক্সপোর্ট:** `Outro`, `OutroProps`, `OUTRO_TIMING` (scrim 0–0.6, logo 0.15 +0.9, line1 0.55–1.15, line2 0.85–1.45, badge 1.5 +0.9, শ্বাস ±১.৮% / ২.৪ সে., shine প্রথম 2.4 সে. → প্রতি 2.4 সে., ঝলক 0.9 সে., `prevFadeSec` 0.6, `fullSec` 3.2), `OUTRO_LOOK`, `BADGE_ASPECT`, বিশুদ্ধ ফাংশন `previousLayersOpacity(secSinceAudioEnd)` (১→০ ০.৬ সে.-এ — **S6.1 এটি `Header`/`ArabicBlock`/`Karaoke`/`ProgressBar`-এর `opacity`-তে দেবে**), `compressFactor()`, `shineAt()`, `getOutroParticles()`/`particleAt()`। **জ্যামিতি (নকল-ফন্টে মাপা, আনুমানিক):** ১৬:৯ — লোগো y 183–503, লাইন-১ 533–590, লাইন-২ 596–692 (x 518–1402), badge 727–892 (প্রস্থ ≈560); ৯:১৬ — লোগো 491–851, লাইন-১ 891–957, লাইন-২ 965–1058 (x 112–968), badge 1105–1328 (প্রস্থ ≈760) — ৯:১৬-এর পুরো কনটেন্ট সেফ-জোনের (১৫০–১৬৭০) ভেতরে। `ProgressBar` অডিও শেষের পর ১০০% ধরা থাকে; আউটরোতে সেটিও `previousLayersOpacity`-তে ফেড-আউট। **`theme.ts` বদলেছে:** `outro` টোকেন এখন `{logoHeight, titleSize, captionSize, badgeWidth, gap}` — ১৬:৯ `{320, 64, 38, 560, 30}`, ৯:১৬ `{360, 62, 44, 760, 40}` |
| S5.5 থেকে পরের ধাপের জন্য তথ্য | `ProgressBar` প্রপস: `opacity` (০–১), `timeOffsetSec` (ডিফল্ট ০), `audioSec` (ডিফল্ট ৩৮.৩২)। এক্সপোর্ট `ProgressBar`, `PROGRESS_LOOK`, `progressAt()`। বার ১৬:৯ y 1032–1040, ৯:১৬ y **1650–1660**; আউটরো (S5.6/S6.1)-র কনটেন্ট এর সাথে ওভারল্যাপ করলে `opacity` ফেড-আউট দিন। S6.1-এ `Karaoke`/`ProgressBar` উভয়ই Sequence-এর বাইরে (ফ্রেম ০ থেকে) রাখলে `timeOffsetSec` লাগে না |
| S5.4 থেকে পরের ধাপের জন্য তথ্য | `Karaoke.tsx` প্রপস: ঐচ্ছিক `opacity` (০–১, ডিফল্ট ১), `timeOffsetSec` (ডিফল্ট ০ — `<Sequence from={N}>`-এর ভেতরে `N/fps`), `holdLastPage` (ডিফল্ট **true**: অডিও শেষের (৩৮.৩২ সে. ≈ ফ্রেম ১১৫০) পরও শেষ পেজ ধরা থাকে — **S6.1-এ আউটরোতে `<Karaoke opacity={…}/>` দিয়ে ফেড-আউট করতে হবে**, নইলে ক্যাপশন শেষ পর্যন্ত থেকে যাবে)। **এক্সপোর্ট:** `Karaoke`, `KaraokeProps`, `KARAOKE_LOOK` (টিউনিং-মান), `computeWordVisual()`/`WordVisual` (বিশুদ্ধ ফাংশন), `popScaleAt()`, `mixUpcomingToWord()`, `getKaraokePages(maxWords)`। **অবস্থান:** `theme.ts`-এর `karaoke.centerY` (১৬:৯ = 720, ৯:১৬ = 1130) কেন্দ্রে; ১৬:৯-তে ১ লাইন ≈ y 676–764 (২ লাইন ≈ ৬১৬–৮২৪), ৯:১৬-তে ১ লাইন ≈ 1081–1179, ২ লাইন ≈ 1018–1242। **লেসন-কার্ড (সেকশন D) স্থির আকারে:** ১৬:৯ y 589–851, ৯:১৬ y 936–1324 (ফিক্সড উচ্চতা = `maxLines` × লাইন — পেজ বদলালে কার্ড নড়ে না; বাস্তব ফন্টে বেশি ফাঁকা দেখালে `theme.ts`-এ `maxLines` বা `lesson.padding` কমান)। **S6.1 স্তর-ক্রম:** `Background → Header → ArabicBlock → Karaoke → ProgressBar → Outro`। **ওজন:** সব শব্দ ৭০০ (সক্রিয়-শব্দে ৮০০ দিলে প্রস্থ বদলে লাইন নড়ত); ৮০০ শুধু "শিক্ষা" লেবেলে। `theme.ts`-এর `CAPTION.pill.padYEm` এখন অব্যবহৃত (পিলের উচ্চতা `KARAOKE_LOOK.pillInsetYEm` থেকে) |
| S5.3 থেকে পরের ধাপের জন্য তথ্য | `ArabicBlock.tsx` প্রপস: ঐচ্ছিক `opacity` (০–১, ডিফল্ট ১) ও `timeOffsetSec` (ডিফল্ট ০ — `<Sequence from={N}>`-এর ভেতরে রাখলে `N/fps` দিন; S5.7-এ `Karaoke`/`ProgressBar`-এও একই নিয়ম থাকতে হবে)। জানালার বাইরে `null` ফেরত দেয় (ফ্রেম **467–552**, ≈ ১৫.৫৭–১৮.৪০ সে.)। **এক্সপোর্ট:** `ArabicBlock`, `ArabicBlockProps`, `ARABIC_TIMING` (leadIn 0.25 / fadeIn 0.5 / outDelay 0.1 / out 0.8 সে.), `getArabicWindow()` (`showStartSec`/`showEndSec`/`sectionStartSec`/`sectionEndSec`)। **`theme.ts` বদলেছে:** `arabic.top` ১৬:৯ **372→392**, ৯:১৬ **640→675** (হেডারের নিচ 359/633 থেকে দৃশ্যমান ফাঁক ≈৪০/≈৫৫px)। **আরবি ব্লকের নিচের প্রান্ত (ডিভাইডারসহ, ফেড-আউট স্কেলসহ): ১৬:৯ ≤ 578, ৯:১৬ ≤ 884** — কারাওকে ব্লক ১৬:৯ ≈ 621 ও ৯:১৬ ≈ 963 থেকে শুরু, তাই ওভারল্যাপ নেই; আরবি ও কারাওকে একই সময়ে পর্দায় থাকে (B-সময়ে পেজ #৬)। S6.1-এ স্তর-ক্রম: `Background → Header → ArabicBlock → Karaoke → …`; `ArabicBlock` Sequence-এর বাইরে (ফ্রেম ০ থেকে) রাখলে `timeOffsetSec` লাগে না |
| S5.2 থেকে পরের ধাপের জন্য তথ্য | `Header.tsx` প্রপস: ঐচ্ছিক `opacity` (০–১, ডিফল্ট ১ — S6.1 আউটরোতে ফেড-আউটের জন্য দেবে)। এন্ট্রান্স **স্থানীয় ফ্রেম** (`useCurrentFrame()`) থেকে চলে — `<Sequence>`-এর ভেতরে রাখলে সেখান থেকে শুরু; S6.1-এ হেডার Sequence-এর বাইরে (ফ্রেম ০ থেকে) রাখাই ঠিক। **হেডারের নিচের প্রান্ত (পিল বক্স): ১৬:৯ y=359, ৯:১৬ y=633** — আর `theme.ts`-এ আরবির `top`: ১৬:৯ = 372, ৯:১৬ = **640** ⇒ ফাঁক মাত্র **১৩px / ৭px**। S5.3 `ArabicBlock`-এ আরবি ব্লকের **দৃশ্যমান লেখা** ঐ `top`-এর নিচে শুরু হবে (লাইন-হাইট ২.০-এর কারণে বক্সের ওপরে ফাঁকা অংশ আছে), তবু স্টিলে দেখে নিন; দরকারে `theme.ts`-এর `arabic.top` ২০–৪০px নামান। `HEADER_TIMING` এক্সপোর্ট করা (সেকেন্ডে এন্ট্রান্স সময়) |
| S5.1 থেকে পরের ধাপের জন্য তথ্য | `Background.tsx` কোনো প্রপস নেয় না (`<Background />`; মাপ `useVideoConfig()` থেকে)। **অর্ধচন্দ্র উপরে-ডানে** (১৬:৯ ≈ x 1744, y 138, ব্যাসার্ধ 64; ৯:১৬ ≈ x 952, y 236, ব্যাসার্ধ 58) — `Header.tsx` (মাঝখানে লোগো) এর সাথে ওভারল্যাপ করবে না, কিন্তু ডান কোণে অন্য কিছু বসালে সাবধান। `mulberry32(seed)` ও `BG` `Background.tsx` থেকে এক্সপোর্ট করা — S5.6 `Outro.tsx` ডিটারমিনিস্টিক কণার জন্য `import {mulberry32} from './Background'` করতে পারবে। ক্যাপশন-ব্লকের "শান্ত অঞ্চল" `getLayout().karaoke` থেকে হিসাব হয় — S5.4-তে কারাওকে মাপ/অবস্থান বদলালে `theme.ts`-এ বদলান, ব্যাকগ্রাউন্ড নিজে মানিয়ে নেবে |
| সিদ্ধান্ত বাকি | নেই — **নতুন (D13):** Hind Siliguri বাদ (আপনার নির্দেশ), সব ছোট বাংলা লেবেলে Anek Bangla; অন্য ফন্ট চাইলে `theme.ts`-এর `FONTS.sans` একটি লাইন বদলালেই হয়। (আরবি পূর্ণ পাঠ বাতিল; শুধু আংশিক আরবি থাকবে — বাদ দিতে চাইলে জানাবেন)। **নতুন (D11):** ক্যাপশন কালারফুল + অ্যানিমেটেড, বাংলা গুগল ফন্ট **Anek Bangla** — অন্য ফন্ট চাইলে জানাবেন (`theme.ts`-এর একটি লাইন বদলালেই হয়)**নতুন (D14, S5.6):** আউটরো ৫ সে. — কম/বেশি চাইলে `config.ts`-এর `OUTRO_SECONDS` বদলান (`Outro` আনুপাতিক সংকুচিত হয়ে মানিয়ে নেয়, ৩.২ সে.-এর নিচে)। আপনার লেখা বানান "প্লে ষ্টোর"/"আ্যপ"-এর বদলে প্রচলিত শুদ্ধ **"প্লে স্টোর"/"অ্যাপ"** দিয়েছি (`hadis-data.ts`-এ `OUTRO_DOWNLOAD_LINE`, `OUTRO_APP_SUFFIX`) — আপনার বানান চাইলে ঐ একটি লাইন বদলালেই হবে। পুরনো "শেয়ার করুন, আমল করুন" ক্যাপশন আউটরোতে আর নেই (`OUTRO_CAPTION` ধ্রুবকটি রাখা আছে)। **নতুন (SVG ফেজ, D19–D23) — ডিফল্ট ধরা হয়েছে, আপত্তি থাকলে জানাবেন:** (১) ছবিতে কোনো মানুষ/নবী/সাহাবীর অবয়ব থাকবে না — প্রতীক ও সিলুয়েট (মিম্বর, গম্বুজ, উট, হৃদয়-আলো); (২) "নারী" শব্দের আইকন = **আংটি** (নারীর অবয়ব নয়); (৩) "আল্লাহর" শব্দে আইকন = অর্ধচন্দ্র + আলো (লিপি/অবয়ব নয়); (৪) কীওয়ার্ড পপ-আপ বাংলা লেবেলসহ (Anek Bangla); (৫) ঐচ্ছিক পপ-আপ (নিয়ত ২য়/৩য় বার, হিজরতের) ডিফল্টে বন্ধ; (৬) SVG স্তর বন্ধ করার সুইচ `config.ts`-এর `SVG_LAYERS` (svg17)।  |
| ⚠️ অযাচাইকৃত (CI-তে নিশ্চিত হবে) | গুগল ফন্ট মডিউল-নাম/সাবসেট (`NotoSerifBengali`, `Amiri`, **`AnekBangla`** — weights ৫০০/৬০০/৭০০/৮০০; `HindSiliguri` আর নেই) — এখানে নেটওয়ার্ক/ইনস্টল নেই; টাইপ-এরর এলে `theme.ts`-এর তালিকা ঠিক হবে; **আউটরো (S5.6):** আসল Remotion/Chromium-এ badge-এর shine (CSS `mask-image` দিয়ে badge-আকৃতিতে কাটা) ও `textWrap: balance` — CI স্টিলে (S7.1/S8.1) দেখতে হবে; আসল Noto Serif Bengali/Anek Bangla-য় ৯:১৬-এর অ্যাপ-লাইন ১ না ২ লাইন হবে |

---

## 2. মূল সিদ্ধান্তসমূহ (ডিজাইন ডিসিশন)

| # | সিদ্ধান্ত | কারণ |
|---|---|---|
| D1 | কম্পোজিশন মাত্র **২টি**: `Hadis-16x9` (1920×1080) ও `Hadis-9x16` (1080×1920) | কোড ডুপ্লিকেট হয় না |
| D2 | **4K = `--scale=2`** (HD কম্পোজিশনকে ২× রেন্ডার): 16:9 → 3840×2160, 9:16 → 2160×3840 | একই লেআউট, আলাদা 4K কোড লাগে না |
| D3 | FPS = **30** | সোশ্যাল মিডিয়ার জন্য যথেষ্ট, রেন্ডার সময় কম |
| D4 | **কোনো সাব-ফোল্ডার নেই**; অ্যাসেট `import` করে ব্যবহার (`staticFile`/`public/` লাগবে না) | আপনার শর্ত |
| D5 | **একমাত্র ব্যতিক্রম:** `.github/workflows/render.yml` | GitHub এই পাথ বাধ্যতামূলক করে |
| D6 | রেন্ডার আউটপুট রুটেই (`hadis0101-16x9-HD.mp4` …), `.gitignore`-এ থাকবে | ফ্ল্যাট স্ট্রাকচার |
| D7 | অডিও-JSON যাচাই **শুধু সাইলেন্স ডিটেকশন** দিয়ে (ffmpeg `silencedetect`) | আপনার শর্ত |
| D8 | লোগো সাদা ব্যাকগ্রাউন্ডসহ **সাদা রাউন্ডেড ব্যাজে** বসবে (ব্যাকগ্রাউন্ড রিমুভ করা হবে না) | ডান মিনারের সাদা অংশ ফুটো হয়ে যেত |
| D9 | ফন্ট: `@remotion/google-fonts` — বাংলা: **Noto Serif Bengali** (শিরোনাম) + **Anek Bangla** (ক্যাপশন, ছোট লেবেল/পিল — D13; ~~Hind Siliguri~~ বাদ), আরবি: **Amiri** | CI-তে ফন্ট ইনস্টল ঝামেলা নেই |
| D10 | থিম: গাঢ় এমারেল্ড সবুজ + সোনালি (লোগোর রঙ থেকে) | লোগোর সাথে মানানসই |
| D11 | **কালারফুল অ্যানিমেটেড ক্যাপশন** *(নতুন নির্দেশ, 2026-11-06)*: প্রতিটি শব্দের নিজস্ব উজ্জ্বল রঙ (৮-রঙা ডিটারমিনিস্টিক চক্র), বাংলা গুগল ফন্ট **Anek Bangla** (৬০০/৭০০/৮০০), শব্দ-পপ + রঙিন পিল + আন্ডারলাইন-wipe + গ্লো; সব অ্যানিমেশন `useCurrentFrame`/`spring`/`interpolate` দিয়ে | আপনার অনুরোধ; `Math.random`/CSS animation নয়, তাই রেন্ডারে ঝিলমিল নেই |
| D12 | সব রঙ bgMid-এর ওপর কনট্রাস্ট ≥ ৪.৫ (সর্বনিম্ন ৪.৮৩); আউটলাইন `ink` ০.০৬em | রঙিন হলেও যেন পড়া যায় |
| D13 | **Hind Siliguri ফন্ট ব্যবহার নয়** *(নতুন নির্দেশ, 2026-11-06, S5.4)*: `FONTS.sans` ("S2" চিপ, সোর্স পিল) এখন Anek Bangla; একটিই ফন্ট-লোড (weights ৫০০/৬০০/৭০০/৮০০), `HindSiliguri` ইম্পোর্ট ও `waitUntilDone` মুছে ফেলা | আপনার অনুরোধ; ফন্ট-ট্রাফিকও কম |
| D14 | **আউটরো = লোগো ↵ "আজই প্লে স্টোর থেকে ডাউনলোড করুন:" ↵ "ইসলামী বিশ্বকোষ ও আল হাদিস S2 অ্যাপ।" ↵ অ্যানিমেটেড Google Play badge**; দৈর্ঘ্য `OUTRO_SECONDS` **১.৫ → ৫.০** *(নতুন নির্দেশ, 2026-11-06, S5.6)* | আপনার অনুরোধ; ১.৫ সে.-এ এত লেখা পড়া ও badge-এর অ্যানিমেশন দেখা যায় না, তাই ৫ সে. (মোট ১৩০০ ফ্রেম); শুদ্ধ বানান "স্টোর"/"অ্যাপ" |
| D15 | **badge = আপনার দেওয়া অফিশিয়াল ছবি**, স্বচ্ছ PNG ক্রপ করে `google-play-badge.png` (রুটে, ১৬০০px চওড়া — 4K-তেও তীক্ষ্ণ); অ্যানিমেশন: স্প্রিং-পপ → ধীর "শ্বাস" → সোনালি আভা → badge-আকৃতিতে মাস্ক-করা shine ঝলক | `.gitignore`-এর `*.png`-এর ব্যতিক্রম `!google-play-badge.png`; ছবি নিজে অপরিবর্তিত (কেবল ক্রপ ও ছোট) |
| D16 | **`HadisVideo` — ফেড-ইন শুধু কনটেন্ট স্তরে, `format` প্রপ যাচাই** *(S6.1)*: শুরুর ৫ ফ্রেম ফেড-ইন `Background` ছাড়া বাকি স্তরে (প্রথম ফ্রেম কালো নয়); `format` মাপের সাথে না মিললে ত্রুটি; `audioSec` প্রপ (ডিফল্ট ৩৮.৩২) | স্পেকের "প্রথম ফ্রেম কালো/ফাঁকা নয়" শর্ত; ভুল প্রপে ভুল লেআউটে নীরব রেন্ডারের চেয়ে স্পষ্ট ত্রুটি ভালো |
| D17 | **`render.yml` নকশা** *(S7.1)*: `prepare` শুধু bash (jq/node নির্ভরতা নেই); npm ক্যাশ `actions/cache` দিয়ে (লকফাইল নেই); `check` জবেও Chrome ইনস্টল (compositions-এর জন্য); ইনপুট `env`-এর মাধ্যমে স্ক্রিপ্টে যায় (সরাসরি `${{ }}` ইন্টারপোলেশন নয়) ও অজানা মান `::error::`-এ ফেইল | spec-এর `cache: npm` লকফাইল ছাড়া ব্যর্থ হতো; ইনপুট-ইনজেকশন এড়াতে |
| D18 | **`render` জব নকশা** *(S7.2)*: ম্যাট্রিক্স মান `env`-এর মাধ্যমে স্ক্রিপ্টে (D17-এর নিয়ম বজায়); রেন্ডারের পর **কঠোর `ffprobe` যাচাই** (h264, মাপ, `yuv420p`, aac অডিও আছে, দৈর্ঘ্য ৪৩.৩৩ ± ০.৫ সে.); আর্টিফ্যাক্টে `compression-level: 0`; ঐচ্ছিক গিটহাব-রিলিজ এখনই নয় (`contents: write` ও ট্যাগ-ট্রিগার লাগে) | ভুল মাপ/নিঃশব্দ/ছোট ভিডিও ডাউনলোডের আগেই CI-তে ধরা; MP4 আবার zip-সংকোচনে সময় নষ্ট করে না; পারমিশন ন্যূনতম |
| D19 | **ফেজ SVG — সব দৃশ্য ইনলাইন React-SVG**, বাইরের ছবি/ফন্ট/নেটওয়ার্ক নেই; অ্যানিমেশন শুধু `useCurrentFrame`/`spring`/`interpolate`, কণা/তারা `mulberry32` সিডে *(2026-11-06)* | আপনার অনুরোধ (সিনভিত্তিক SVG); D4 (ফ্ল্যাট রুট, অ্যাসেট `import`) ও D11 (ডিটারমিনিস্টিক, ঝিলমিল নেই) বজায় থাকে; চাঙ্ক-রেন্ডারে নিরাপদ |
| D20 | **কোনো মানুষ/নবী/সাহাবীর অবয়ব নয়** — শুধু প্রতীক, সিলুয়েট ও আলো (মিম্বর, মদিনা/কাবা, উট-কাফেলা, হৃদয়+আলো, বীজ→গাছ); "নারী" = আংটি; "আল্লাহর" = অর্ধচন্দ্র+আলো *(নতুন, SVG ফেজ)* | ইসলামী প্রচলিত রীতি ও শ্রদ্ধা; উমর রাদিয়াল্লাহু আনহু/রাসূল সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম-এর কথার দৃশ্যে মিম্বর ও আলো-তরঙ্গই যথেষ্ট |
| D21 | **দৃশ্য ক্যাপশনের পেছনে, ক্যাপশন-ব্যান্ডে ম্লান (SVG `<mask>`, `captionBandOpacity` ≈ 0.28, ফেদার ৬০px)**; কম্পোজিশন: আকাশ উপরে · সিলুয়েট/মাটি নিচে · ক্যাপশন মাঝে; `niyyah` দৃশ্যে ব্যান্ড ০.৪৫ (ক্যাপশন ছোট) | D12 (কনট্রাস্ট ≥ ৪.৫) অক্ষুণ্ণ; ১৬:৯-এর সংকীর্ণ জায়গায়ও ছবি-লেখা সংঘর্ষ নেই; মান `SVG_LOOK`-এ একটি সংখ্যা |
| D22 | **কীওয়ার্ড পপ-আপ অঞ্চল = হেডার ও ক্যাপশনের মাঝে** (১৬:৯ y 392–560, ৯:১৬ y 665–900; আরবি ব্লকের জায়গা, যা B-সময়ের বাইরে ফাঁকা); শুরু = শব্দ-শুরু − ০.০৮ সে., ধরে রাখা ১.৩ সে. (ন্যূনতম ০.৭), একসাথে ≤ ১টি; কাছাকাছি শব্দ (আখিরাত→নাজাত, ব্যবধান ০.৫৭ সে.) যুগ্ম পপ-আপ | ক্যাপশন/ডায়াগ্রাম-স্ট্রিপ ঢাকে না; আরবির প্রথম পপ-আপ (১৮.৯৩) আরবি-ফেড-আউটের (১৮.৪০) পরে |
| D23 | **সময় ও কোড-গঠন:** দৃশ্য/কীওয়ার্ডের সময় শব্দ-ইনডেক্স থেকে (`svg-data.ts` — S4.3-এর ধারা); দৃশ্য-কম্পোনেন্ট বিশুদ্ধ (`sec`/`localSec` প্রপ); `SvgLayer` শুধু সক্রিয় দৃশ্য আঁকে; `config.ts`-এর `SVG_LAYERS` সুইচ; ভারী SVG-ফিল্টার এড়িয়ে `radialGradient` (৪K-র জন্য) | JSON আবার সংশোধন হলেও দৃশ্য মেলে; টেস্টযোগ্য; সমস্যায় এক লাইনে বন্ধ করা যায়; রেন্ডার-সময় নিয়ন্ত্রণে |
| D24 | **`svg-data.ts` নকশা** *(svg1)*: `main` দৃশ্য ক্রসফেডে পরিপূরক smoothstep (যোগফল ১); `duniyaNari` ওভারলে — অপাসিটি = নিজের ফেড-ইন × মূল দৃশ্য `hijra`; পপ-আপ জানালা ফেড-আউটসহ ও পরেরটির শুরুতে ছাঁটা; কীওয়ার্ডে `icons[]`/`labels[]` অ্যারে (যুগ্ম পপ-আপ); `validateSvgData()` ফাইল-লোডে চলে ও ভুলে throw করে | দৃশ্য-বদলে ফাঁক/ঝিলিক নেই (প্রতি ফ্রেমে টেস্ট করা); ওভারলের আলাদা বিদায়-যুক্তি লাগে না; একসাথে ≤ ১ পপ-আপ; ইনডেক্স ভুল হলে রেন্ডার শুরুতেই থামে (hadis-data.ts-এর ধারা) |
| D25 | **`SvgKit.tsx` নকশা** *(svg2)*: (১) সব হেলপার বিশুদ্ধ ও `sec`-ভিত্তিক — `remotion`/`useCurrentFrame` ইম্পোর্ট নেই, `popIn` Remotion-`spring` নয় বন্ধ-রূপ অবমন্দিত দোলক (শিখর ১.০৮, শেষে ঠিক ১.০, লাফ নেই); (২) ক্যাপশন-ব্যান্ড হাতে-লেখা y নয় — `theme.ts` লেআউট থেকে লেসন-কার্ডের সূত্রে গণনা (১৬:৯ 588.8–851.2, ৯:১৬ 936–1324); (৩) ম্লান শুধু ব্যান্ডের ভেতরে ধ্রুব, ফেদার ব্যান্ডের **বাইরে** — ব্যান্ডে ঠিক `bandOpacity`, বাকি শিল্প-অঞ্চল পূর্ণ; (৪) SVG `<mask>` (`userSpaceOnUse`) + গ্রে-লিনিয়ার-গ্রেডিয়েন্ট, কোনো `filter` নয়; (৫) `id` সংঘর্ষ এড়াতে `SceneFrame idPrefix`/`Glow id` বাধ্যতামূলক-অনন্য (ক্রসফেডে দুই দৃশ্য একসাথে); (৬) `SceneProps` = `{localSec, sec, width, height, idPrefix?}` সব দৃশ্যের সাধারণ প্রপস; দৃশ্য শুধু `<g>` ফেরত দেয়, `<svg>` র‍্যাপার `SceneFrame`-এর; (৭) `captionBandOpacity` `svg-data.ts`-এর `DEFAULT_BAND_OPACITY` থেকে (একটিই সত্য-উৎস) *(2026-11-06)* | মাস্ক/ব্যান্ড যেন ক্যাপশন-কার্ডের সাথে সবসময় মেলে (Karaoke বদলালে এক জায়গায় ঠিক); টেস্টযোগ্য (Node + আসল Chromium পিক্সেল); দুই দৃশ্যের ক্রসফেডে মাস্ক/আভা ধাক্কা খায় না; D19/D21/D23-র সাথে সঙ্গতি |

---

## 3. ফাইল তালিকা (সব রুটে)

```
/ (repo root)
├── Hadis.md                 ← এই ফাইল
├── package.json
├── tsconfig.json
├── global.d.ts              ← .jpg/.wav ইম্পোর্টের টাইপ (নতুন)
├── remotion.config.ts
├── .gitignore
├── index.ts                 ← registerRoot
├── Root.tsx                 ← কম্পোজিশন রেজিস্টার (S6.2 ✅)
├── config.ts                ← ফরম্যাট/FPS/মাপ
├── theme.ts                 ← রঙ, ফন্ট, স্পেসিং, কালারফুল ক্যাপশন টোকেন (D11)
├── hadis-data.ts            ← টেক্সট ও সেকশন মেটাডেটা (S4.3 ✅; synced JSON ইম্পোর্ট)
├── timing.ts                ← সেকেন্ড→ফ্রেম, শব্দ অবস্থা, পেজ-ভাগ ও ক্রসফেড (S4.4 ✅)
├── Background.tsx           ← অ্যানিমেটেড ব্যাকগ্রাউন্ড (S5.1 ✅)
├── Header.tsx               ← লোগো + S2 + শিরোনাম (S5.2 ✅)
├── ArabicBlock.tsx          ← আংশিক আরবি, শুধু সেকশন B (S5.3 ✅)
├── Karaoke.tsx              ← কালারফুল অ্যানিমেটেড বাংলা ক্যাপশন (S5.4 ✅)
├── ProgressBar.tsx          ← নিচের প্রগ্রেস বার (S5.5 ✅)
├── Outro.tsx                ← আউটরো: লোগো + প্লে-স্টোর CTA + অ্যানিমেটেড Google Play badge (S5.6 ✅)
├── HadisVideo.tsx           ← সব মিলিয়ে মূল ভিডিও (S6.1 ✅; svg17-এ SvgLayer/KeywordPopup যোগ হবে)
├── svg-data.ts              ← (svg1 ✅) দৃশ্য ও কীওয়ার্ড সংজ্ঞা, সময় শব্দ-ইনডেক্স থেকে
├── SvgKit.tsx               ← (svg2 ✅) SceneFrame/ব্যান্ড-মাস্ক/অঞ্চল-জ্যামিতি/হেলপার/Glow/Sparkles/SvgGuides
├── SvgShapes.tsx            ← (পরিকল্পিত, svg3 ⬜) হৃদয়, গম্বুজ, উট, কাবা, মিম্বর … আকৃতি
├── SceneSanad.tsx           ← (পরিকল্পিত, svg4 ⬜) A১ সনদ-চেইন
├── SceneMinbar.tsx          ← (পরিকল্পিত, svg5 ⬜) A২ মিম্বর
├── SceneMadina.tsx          ← (পরিকল্পিত, svg6 ⬜) A৩ মদিনার সিলুয়েট
├── SceneNiyyah.tsx          ← (পরিকল্পিত, svg7 ⬜) B হৃদয় ও আলো
├── SceneAmal.tsx            ← (পরিকল্পিত, svg8 ⬜) C১ হৃদয় ↔ কাজ
├── SceneFruit.tsx           ← (পরিকল্পিত, svg9 ⬜) C২ বীজ → গাছ → ফল
├── SceneHijra.tsx           ← (পরিকল্পিত, svg10 ⬜) C৩ উট-কাফেলা
├── SceneDuniyaNari.tsx      ← (পরিকল্পিত, svg11 ⬜) C৩ দুনিয়া/নারীর উদ্দেশ্য
├── SceneLesson.tsx          ← (পরিকল্পিত, svg12 ⬜) D১ "নিয়্যাত ঠিক = আমল কবুল" ডায়াগ্রাম
├── SceneNajat.tsx           ← (পরিকল্পিত, svg13 ⬜) D২ আখিরাত ও নাজাত
├── KeywordIcons.tsx         ← (পরিকল্পিত, svg14 ⬜) কীওয়ার্ড আইকন সেট
├── KeywordPopup.tsx         ← (পরিকল্পিত, svg15 ⬜) কীওয়ার্ড পপ-আপ
├── SvgLayer.tsx             ← (পরিকল্পিত, svg16 ⬜) দৃশ্য-অর্কেস্ট্রেটর
├── hadis0101.json           ← (আপনার দেওয়া) শব্দ টাইমিং
├── hadis0101.wav            ← (আপনার দেওয়া) অডিও
├── logo.jpg                 ← (আপনার দেওয়া) অ্যাপ লোগো
├── google-play-badge.png    ← (আপনার দেওয়া, ক্রপ/ছোট করা) Google Play badge (S2.4 ✅)
├── check-sync.mjs           ← সাইলেন্স দিয়ে অডিও↔JSON যাচাই
├── sync-fix.mjs             ← (দরকার হলে) সাইলেন্স-অ্যাঙ্কর দিয়ে টাইমিং ঠিক
├── hadis0101.synced.json    ← (S3.3-এ তৈরি) সাইলেন্স-সংশোধিত টাইমিং — ভিডিও এটি ব্যবহার করবে
├── sync-report.json         ← যাচাইয়ের ফলাফল (জেনারেটেড; synced ফাইলের)
├── sync-fix-report.json     ← সংশোধনের অ্যাঙ্কর ও পর্যালোচনা-তালিকা (জেনারেটেড)
└── .github/workflows/render.yml   ← একমাত্র সাব-ফোল্ডারে থাকা ফাইল (S7.1 ✅ check/prepare/preview · S7.2 ✅ render)
```

---

## 4. প্রগ্রেস ড্যাশবোর্ড

- [x] **ফেজ 0** — ইনপুট বিশ্লেষণ (S0.1)
- [x] **ফেজ 1** — প্রজেক্ট স্কেলিটন (S1.1 – S1.6 সব ✅)
- [x] **ফেজ 2** — অ্যাসেট প্রস্তুতি (S2.1 – S2.4 সব ✅)
- [x] **ফেজ 3** — সাইলেন্স যাচাই ও সিঙ্ক (S3.1 – S3.3 সব ✅)
- [x] **ফেজ 4** — কনফিগ, থিম, ডেটা, টাইমিং (S4.1 – S4.4 সব ✅)
- [x] **ফেজ 5** — কম্পোনেন্ট (S5.1 – S5.7 সব ✅)
- [x] **ফেজ 6** — মূল কম্পোজিশন (S6.1 – S6.3 সব ✅; আসল `tsc`/`remotion compositions` CI-তে — S7.1)
- [x] **ফেজ 7** — GitHub Actions `render.yml` (S7.1 ✅ – S7.2 ✅; ⚠️ GitHub-এ এখনো চালানো হয়নি — প্রথম রান `formats = preview`)
- [ ] **ফেজ SVG** *(নতুন, 2026-11-06)* — সিনভিত্তিক SVG দৃশ্য, কীওয়ার্ড আইকন, শিক্ষার ডায়াগ্রাম (svg1 – svg18; পরিকল্পনা ✅, কোড: **svg1 ✅, svg2 ✅ (২/১৮)**, svg3–svg18 ⬜ — নিচে ধাপগুলোর আলাদা টিক)
- [ ] **ফেজ 8** — QA, রেন্ডার, রিলিজ (S8.1 – S8.4)

---

## ফেজ 0 — ইনপুট বিশ্লেষণ

### - [x] S0.1 — আপনার দেওয়া তিনটি ফাইল বিশ্লেষণ

**✅ বিবরণ (সম্পন্ন):**

**অডিও `hadis0101.wav`:** 44100 Hz, মনো, 16-bit, মোট দৈর্ঘ্য **৩৮.৩২ সেকেন্ড**।

**JSON `hadis0101.json`:** মোট **৮৩টি শব্দ**, ফরম্যাট `{word, start, end}`, প্রথম শব্দ শুরু `0.0`, শেষ শব্দ শেষ `37.0` সেকেন্ড।
- প্রতিটি শব্দের ব্যবধান প্রায় সমান (~০.৪৫ সেকেন্ড) এবং শব্দের মাঝে কোনো ফাঁক নেই → **টাইমিং সম্ভবত সমানভাবে ভাগ করা (আনুমানিক), আসল উচ্চারণ-টাইমিং নয়**।

**দৈর্ঘ্য তুলনা:** অডিও ৩৮.৩২ সে. বনাম JSON ৩৭.০০ সে. → **১.৩২ সে. পার্থক্য**।

**প্রাথমিক সাইলেন্স পর্যবেক্ষণ** (ffmpeg `silencedetect`, −40dB, ≥০.৩ সে.; *চূড়ান্ত নয় — S3.2-তে ক্যালিব্রেট হবে*):

| সাইলেন্স শুরু | সাইলেন্স শেষ | JSON-এর নিকটতম বিরতি-শব্দ | সম্ভাব্য অমিল |
|---|---|---|---|
| 11.84 | 12.39 | "আমি" শেষ 11.59 | ~০.২৫–০.৮ সে. |
| 17.58 | 18.06 | "বিন-নিয়্যাত।" শেষ 16.49 | ~১.১ সে. |
| 30.92 | 31.26 | "রাখবেন," শেষ 30.76 | ~০.১৫ সে. |

→ **ধারণা:** JSON টাইমিং অডিওর সাথে পুরোপুরি মেলে না; ফেজ 3-এ যাচাই ও দরকারে সংশোধন করতে হবে।

**লোগো `logo.jpg`:** সোনালি অর্ধচন্দ্র, কাবা (কালো), সবুজ গম্বুজ (মদিনা), মিনার; নিচে লেখা "ইসলামী বিশ্বকোষ ও আল হাদিস"; ব্যাকগ্রাউন্ড **সাদা** (প্রায় বর্গাকার)।

**কনটেন্ট সেকশন (JSON অনুযায়ী, ফেজ 3-এর পর সামান্য বদলাতে পারে):**

| সেকশন | শব্দ নং | সময় (সে.) | বিষয়বস্তু |
|---|---|---|---|
| A — সনদ/বর্ণনা | ১–৩৪ | 0.00 – 15.16 | "হুমায়দী … রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়া সাল্লামকে ইরশাদ করতে শুনেছি:" |
| B — আরবি অংশ | ৩৫–৩৭ | 15.16 – 16.49 | "ইন্নামাল আ'মালু বিন-নিয়্যাত।" |
| C — অনুবাদ | ৩৮–৬৭ | 16.49 – 29.87 | "প্রত্যেক কাজ নিয়তের সাথে সম্পর্কিত … হিজরতের প্রাপ্য।" |
| D — শিক্ষা/স্মরণ | ৬৮–৮৩ | 29.87 – 37.00 | "মনে রাখবেন, আমল ছোট হোক … নাজাতের কারণ।" |

---

## ফেজ 1 — প্রজেক্ট স্কেলিটন

### - [x] S1.1 — `package.json`
**ইনপুট:** কিছু না  **আউটপুট:** `package.json`
**করণীয়:**
- `name`: `hadis-video-kit`, `private: true`, `type: "module"`।
- ডিপেন্ডেন্সি: `react`, `react-dom`, `remotion`, `@remotion/cli`, `@remotion/google-fonts`, `@remotion/media-utils`, `@remotion/media` (Remotion সংস্করণ অনুযায়ী `<Audio>` যেখানে আছে সেটি), `@remotion/captions` (ঐচ্ছিক)।
- **সব `remotion`/`@remotion/*` প্যাকেজ একই সংস্করণে, `^` ছাড়া (exact pin)** — নইলে ভার্সন মিসম্যাচ এরর হয়।
- devDependencies: `typescript`, `@types/react`।
- scripts: `dev` (`remotion studio`), `check` (`node check-sync.mjs`), `fix-sync` (`node sync-fix.mjs`), `compositions` (`remotion compositions index.ts`)।

**গ্রহণযোগ্যতা:** JSON বৈধ; সব Remotion প্যাকেজ একই ভার্সন।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**
- `package.json` তৈরি ও যাচাই (JSON বৈধ; `remotion`, `@remotion/cli`, `@remotion/google-fonts`, `@remotion/media-utils` সব **4.0.340** exact; কোনো `^`/`~` নেই)।
- **সংস্করণ সিদ্ধান্ত:** Remotion এখন 5.x-ও আছে (migration গাইড লাগে), তাই ঝুঁকি এড়াতে স্থিতিশীল **4.0.340** pin করা হয়েছে। React/ReactDOM `18.3.1`, `@types/react 18.3.12`, `typescript 5.8.3`।
- **পরিকল্পনা থেকে পরিবর্তন:** `@remotion/media` ও `@remotion/captions` **বাদ** দেওয়া হয়েছে — 4.0.340-এ `<Audio>` সরাসরি `remotion` থেকে আসে, আর captions লাগছে না।
- scripts: `dev`, `check`, `fix-sync`, `compositions`, `typecheck` (CI `npm run typecheck` ব্যবহার করতে পারবে)।
- `npm install` এখানে চালানো হয়নি (এই সেশনে নেটওয়ার্ক বন্ধ); প্রথম ইনস্টল হবে GitHub Actions-এ, তাই `package-lock.json` নেই এবং `render.yml`-এ `npm install` থাকবে (`npm ci` নয়)।
- ⚠️ ভার্সন সংখ্যাগুলো আমি রেজিস্ট্রি থেকে ইনস্টল করে যাচাই করতে পারিনি; CI-র প্রথম `npm install` ব্যর্থ হলে এখানেই ঠিক করব।

### - [x] S1.2 — `tsconfig.json`
**করণীয়:** `jsx: react-jsx`, `strict: true`, `resolveJsonModule: true`, `esModuleInterop: true`, `module/target: ESNext`, `moduleResolution: bundler`। সব `.ts/.tsx` রুট থেকেই include (সাব-ফোল্ডার নেই)।
**গ্রহণযোগ্যতা:** `import data from './hadis0101.json'` টাইপ-এরর ছাড়া চলে।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**
- `tsconfig.json` তৈরি ও JSON যাচাই (বৈধ)।
- সেটিংস: `target ES2022`, `lib [DOM, DOM.Iterable, ES2022]`, `module ESNext`, `moduleResolution bundler`, `jsx react-jsx`, `strict true`, `noEmit true`, `esModuleInterop`, `allowSyntheticDefaultImports`, `resolveJsonModule` (JSON ইম্পোর্টের জন্য), `isolatedModules`, `skipLibCheck`, `forceConsistentCasingInFileNames`, `noFallthroughCasesInSwitch`।
- `include: ["*.ts", "*.tsx"]` — সব সোর্স রুটে, সাব-ফোল্ডার নেই; `.mjs` স্ক্রিপ্ট টাইপ-চেকের বাইরে; `exclude: node_modules`।
- **আবিষ্কার/পরিকল্পনা পরিবর্তন:** `import logo from './logo.jpg'` ও `import wav from './hadis0101.wav'` টাইপ-চেকে ব্যর্থ হবে, কারণ `.jpg`/`.wav` মডিউলের টাইপ ডিক্লারেশন নেই। তাই নতুন ধাপ **S1.6 (`global.d.ts`)** যোগ করা হয়েছে (ফাইল তালিকাতেও)। `tsc` চালানোর (S6.3) আগে এটি করতে হবে।
- `tsc` এখানে চালানো যায়নি (ইনস্টল নেই); প্রকৃত টাইপ-চেক হবে CI-তে।

### - [x] S1.3 — `remotion.config.ts`
**করণীয়:**
- `Config.setVideoImageFormat('jpeg')` (ভিডিওর জন্য দ্রুত), `Config.setOverwriteOutput(true)`, `Config.setCodec('h264')`, `Config.setPixelFormat('yuv420p')`।
- `Config.setConcurrency` CI থেকে CLI ফ্ল্যাগে দেওয়া হবে (এখানে নয়)।
- `setPublicDir` **ব্যবহার করা হবে না** (রুটে node_modules আছে)।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**
- `remotion.config.ts` তৈরি; `import {Config} from '@remotion/cli/config'` (Remotion 4.0.340 API)।
- সেটিংস: `setEntryPoint('./index.ts')`, `setVideoImageFormat('jpeg')`, `setJpegQuality(92)`, `setCodec('h264')`, `setPixelFormat('yuv420p')`, `setOverwriteOutput(true)`।
- **পরিকল্পনা থেকে পরিবর্তন:** `setEntryPoint` ও `setJpegQuality(92)` যোগ (CLI-তে এন্ট্রি বারবার না দিলেও চলে; JPEG কোয়ালিটি নিশ্চিত)। রেজোলিউশন/`--scale`/`--crf`/`--concurrency` ইচ্ছাকৃতভাবে এখানে নেই — `render.yml` (S7.2)-তে CLI ফ্ল্যাগে যাবে।
- `setPublicDir` ব্যবহার করা হয়নি (ঠিক পরিকল্পনা মতো)।
- ⚠️ `index.ts` (S1.5) না থাকায় এখনো `remotion` কমান্ড চালিয়ে পরীক্ষা সম্ভব নয়, আর এই সেশনে প্যাকেজ ইনস্টলও নেই; যাচাই হবে CI-তে (S7.1/S6.3)।

### - [x] S1.4 — `.gitignore`
**করণীয়:** `node_modules`, `*.mp4`, `*.png` (রেন্ডার স্টিল), `*.log`, `.DS_Store`, `.remotion`, `build`। **`logo.jpg`, `hadis0101.*`, `sync-report.json` ignore হবে না।**

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**
- `.gitignore` তৈরি। ignore: `node_modules/`, `*.mp4`, `*.mov`, `*.webm` (রেন্ডার আউটপুট রুটে তৈরি হয়), `*.png` (প্রিভিউ স্টিল), `.remotion/`, `build/`, `out/`, `*.log`, `npm-debug.log*`, `.DS_Store`, `Thumbs.db`, `.vscode/`, `.idea/`।
- **ইচ্ছাকৃতভাবে ignore নয়:** `logo.jpg`, `hadis0101.json`, `hadis0101.synced.json`, `hadis0101.wav`, `sync-report.json` (ফাইলের শেষে মন্তব্যে লেখা)।
- **পরিকল্পনা থেকে পরিবর্তন:** `*.mov`, `*.webm`, `out/`, এডিটর ফোল্ডার ও লগ প্যাটার্ন বাড়তি যোগ।
- ⚠️ `*.png` ignore থাকায় ভবিষ্যতে লোগো PNG (`logo.png`) যোগ করলে `git add -f` লাগবে বা এই লাইন বদলাতে হবে; বর্তমান লোগো `.jpg` তাই সমস্যা নেই। *(S5.6-এ `google-play-badge.png`-এর জন্য `.gitignore`-এ `!google-play-badge.png` ব্যতিক্রম যোগ হয়েছে।)*

### - [x] S1.5 — `index.ts`
**করণীয়:** `import {registerRoot} from 'remotion'; import {RemotionRoot} from './Root'; registerRoot(RemotionRoot);`
**গ্রহণযোগ্যতা:** `npx remotion compositions index.ts` এ কম্পোজিশন তালিকা দেখায় (S6.2-এর পর)।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**
- `index.ts` তৈরি (৪ লাইন): `registerRoot` ইম্পোর্ট ও `RemotionRoot` রেজিস্টার, সাব-ফোল্ডার ছাড়া `./Root` থেকে।
- ⚠️ **নির্ভরতা:** `Root.tsx` (S6.2) এখনো নেই, তাই এই মুহূর্তে `index.ts` কম্পাইল/রান করবে না। `RemotionRoot` নামের এক্সপোর্ট S6.2-তে **হুবহু এই নামে** দিতে হবে। গ্রহণযোগ্যতার টেস্ট (`remotion compositions`) S6.2/S6.3-এ হবে।

### - [x] S1.6 — `global.d.ts` *(নতুন ধাপ, S1.2 চলাকালে যোগ)*
**উদ্দেশ্য:** `.jpg`, `.png`, `.wav` ইম্পোর্টের টাইপ ঠিক করা (সব রুটে, সাব-ফোল্ডার নয়)।
**করণীয়:** `declare module '*.jpg' { const src: string; export default src; }` — একইভাবে `*.jpeg`, `*.png`, `*.wav`, `*.mp3`।
**গ্রহণযোগ্যতা:** `import logo from './logo.jpg'` ও `import wav from './hadis0101.wav'` `tsc` এ এরর দেয় না (S6.3-তে যাচাই)।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**
- `global.d.ts` তৈরি; `*.jpg`, `*.jpeg`, `*.png`, `*.wav`, `*.mp3` — মোট ৫টি `declare module` (প্রতিটি `string` default export)।
- ফাইলে কোনো `import`/`export` নেই (যাচাই করা হয়েছে: ০টি) — থাকলে এটি গ্লোবাল ডিক্লারেশন থাকত না। ফাইলে সতর্কতা মন্তব্যও আছে।
- `tsconfig.json`-এর `include: ["*.ts", "*.tsx"]` এই ফাইল স্বয়ংক্রিয়ভাবে ধরবে (`.d.ts` ও `.ts` প্যাটার্নে পড়ে)।
- `tsc` দিয়ে প্রকৃত টেস্ট S6.3-তে (ইনস্টল ও সব সোর্স ফাইল তৈরি হওয়ার পর)।

---

## ফেজ 2 — অ্যাসেট প্রস্তুতি (সব রুটে)

### - [x] S2.1 — `hadis0101.json` রুটে বসানো
**করণীয়:** আপনার ফাইলটি অপরিবর্তিত রুটে রাখুন। ব্যাকআপ হিসেবে মূলটি কখনো ওভাররাইট করা হবে না; সংশোধিত সংস্করণ হবে আলাদা `hadis0101.synced.json` (S3.3)।
**গ্রহণযোগ্যতা:** ৮৩টি এন্ট্রি; প্রতিটিতে `word`, `start`, `end`; `start < end`; এন্ট্রিগুলো সময়ক্রমে।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**
- নতুন সংযুক্ত ফাইলটি (`2bd96516-hadis0101.json`) প্রথমবারের ফাইলের সাথে **বাইট-টু-বাইট একই** (`cmp` যাচাই) — অর্থাৎ কোনো পরিবর্তন নেই। রুটে `hadis0101.json` নামে **অপরিবর্তিত কপি** বসানো হয়েছে (৫১৭৫ বাইট)।
- যাচাই: **৮৩টি এন্ট্রি** ✔; প্রতিটিতে ঠিক `word`, `start`, `end` কী ✔; সব `start < end` ✔; সময়ক্রমে সাজানো ও কোনো ওভারল্যাপ নেই ✔; প্রথম `start = 0.0`, শেষ `end = 37.0` ✔।
- এখনো আনুমানিক টাইমিং (সমান ব্যবধান) — সাইলেন্স যাচাই ফেজ ৩-এ।

### - [x] S2.2 — `hadis0101.wav` রুটে বসানো
**করণীয়:** মূল WAV অপরিবর্তিত রাখুন (গিটহাবে ~৩.৪ MB, সীমার মধ্যে)। কনভার্ট করা হবে না।
**গ্রহণযোগ্যতা:** ফাইল সাইজ ≈ 3.38 MB, দৈর্ঘ্য 38.32 সে.।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**
- নতুন সংযুক্ত WAV (`69877042-hadis0101.wav`) আগেরটির সাথে **বাইট-টু-বাইট একই** (`cmp`); রুটে `hadis0101.wav` নামে **অপরিবর্তিত কপি**, কনভার্ট করা হয়নি।
- যাচাই: ৩,৩৭৯,৮৬৮ বাইট (≈ 3.38 MB) ✔; **44100 Hz, মনো, 16-bit, ৩৮.৩২ সে.** ✔ — GitHub-এর ৫০ MB সতর্কতা/১০০ MB সীমার অনেক নিচে।
- নোট: ভিডিওতে `<Audio>` হিসেবে import হবে (AAC 192k-তে এনকোড হবে, মূল WAV অপরিবর্তিত থাকে)।

### - [x] S2.3 — `logo.jpg` রুটে বসানো ও মাপ যাচাই
**করণীয়:** লোগো রুটে রাখুন; পিক্সেল মাপ নোট করুন। ব্যাজে দেখানোর সর্বোচ্চ উচ্চতা (HD-তে ~২০০px, 4K-তে ~৪০০px) এর চেয়ে মূল ছবি বড় কি না যাচাই (ছোট হলে 4K-তে সামান্য নরম দেখাবে — নোট করে রাখা)।
**গ্রহণযোগ্যতা:** মাপ রিপোর্ট হ্যান্ডঅফে লেখা।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**
- নতুন সংযুক্ত ছবি আগেরটির সাথে **বাইট-টু-বাইট একই**; রুটে `logo.jpg` (৪৭,৪১০ বাইট), অপরিবর্তিত।
- **মাপ: 720 × 720 px**, RGB, বর্গাকার, সাদা ব্যাকগ্রাউন্ড।
- **তীক্ষ্ণতা বিশ্লেষণ:** ব্যাজে লোগো আঁকা হবে HD-তে ≈ ২০০px (৯:১৬-তে ≈ ২২০px) ও 4K-তে ≈ ৪০০–৪৪০px — সবই ৭২০px-এর কম, তাই **4K-তেও লোগো নরম/ঝাপসা হবে না** ✔। (বড় আকারে, যেমন আউটরোতে ≥৭২০px, দেখালে সামান্য নরম হতে পারে — আউটরোতে সর্বোচ্চ ৩৬০px (HD)/৭২০px (4K) সীমা রাখা হবে।)
- মূল ফাইল JPEG, ব্যাকগ্রাউন্ড সাদা — সিদ্ধান্ত D8 অনুযায়ী সাদা রাউন্ডেড ব্যাজে বসবে।

### - [x] S2.4 — `google-play-badge.png` রুটে বসানো *(নতুন ধাপ, S5.6 চলাকালে যোগ)*
**ইনপুট:** আপনার দেওয়া Google Play badge ছবি  **আউটপুট:** `google-play-badge.png` (রুটে), `.gitignore` (ব্যতিক্রম)
**করণীয়:** ছবি ক্রপ করে রুটে রাখা; `.gitignore`-এর `*.png` থেকে ব্যতিক্রম।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**
- আপনার ছবি **৫০০০×৫০০০ px**, RGBA, **স্বচ্ছ ব্যাকগ্রাউন্ড**; ব্যাজের বাউন্ডিং-বক্স (125, 1796)–(4875, 3204) = **৪৭৫০×১৪০৮** → শুধু ঐ অংশ ক্রপ, LANCZOS-এ **১৬০০×৪৭৪**-এ ছোট (ফাইল ≈৯৬ KB)। ব্যাকগ্রাউন্ড স্বচ্ছই থাকল (কোণ পিক্সেল α=০), তাই CSS `mask-image` দিয়ে badge-আকৃতিতে shine কাটা যায়।
- মাপ-যুক্তি: আউটরোতে badge প্রস্থ ১৬:৯ = ৫৬০px, ৯:১৬ = ৭৬০px; 4K (`--scale=2`) = ১১২০/১৫২০px — সবই ১৬০০px-এর কম, তাই 4K-তেও ঝাপসা নয়।
- `.gitignore`: `*.png`-এর ঠিক পরে `!google-play-badge.png`; নিচের "ইচ্ছাকৃতভাবে ignore নয়" মন্তব্যেও যোগ। `global.d.ts`-এ `*.png` আগেই ছিল।
- ছবির রঙ/আকৃতি অপরিবর্তিত (শুধু ক্রপ ও ছোট করা)।

---

## ফেজ 3 — সাইলেন্স দিয়ে অডিও ↔ JSON যাচাই

> **নিয়ম:** যাচাই হবে **শুধুই সাইলেন্স ডিটেকশন** দিয়ে; ট্রান্সক্রিপশন/স্পিচ-রিকগনিশন ব্যবহার হবে না।

### - [x] S3.1 — টেক্সট কনটেন্ট সিদ্ধান্ত *(সিদ্ধান্ত নেওয়া হয়েছে — 2026-11-06)*
**সিদ্ধান্ত (আপনার নির্দেশ):** আরবি পাঠ **শুধু স্ক্রিপ্টে যতটুকু আছে ততটুকুই** রাখা হবে। অডিও/JSON-এ আরবি অংশ আংশিক (সেকশন B: "ইন্নামাল আ'মালু বিন-নিয়্যাত।"), তাই **আরবি হাদিসের পূর্ণ পাঠ ভিডিওতে থাকবে না** এবং উৎস থেকে মিলিয়ে নেওয়ার কাজও আর লাগবে না।
- **বাতিল:** পূর্বে প্রস্তাবিত পূর্ণ আরবি পাঠ, সেকশন C-তে ম্লান পূর্ণ আরবি, উৎস-যাচাইয়ের শর্ত।
- **থাকছে:** শুধু সেকশন B-তে (১৫.১৬–১৬.৪৯ সে.) উচ্চারিত আংশিক অংশ আরবি লিপিতে দেখানো — "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ"। *(আপনি চাইলে এটিও বাদ দিয়ে শুধু বাংলা উচ্চারণ কারাওকে-তে রাখা যাবে — জানালেই হবে।)*
- বাংলা শিরোনাম ও সোর্স লাইন অপরিবর্তিত: "আজকের হাদিস" / "সহিহ বুখারী • হাদিস নং: ০১"।
- প্রভাবিত ধাপ: **S4.3** (`hadis-data.ts`-এ শুধু আংশিক আরবি), **S5.3** (`ArabicBlock.tsx` সরল)।

**✅ বিবরণ (সম্পন্ন):** সিদ্ধান্ত নথিবদ্ধ; S4.3 ও S5.3 সেই অনুযায়ী সংশোধিত (নিচে দেখুন)।

### - [x] S3.2 — `check-sync.mjs` (সাইলেন্স যাচাই স্ক্রিপ্ট)
**ইনপুট:** `hadis0101.wav`, `hadis0101.json`  **আউটপুট:** `check-sync.mjs`, `sync-report.json`
**করণীয়:**
1. ffmpeg চালানো: প্রথমে `npx remotion ffmpeg`, না থাকলে সিস্টেম `ffmpeg` (GitHub runner-এ আছে)।
   `ffmpeg -i hadis0101.wav -af silencedetect=noise=-35dB:d=0.25 -f null -`
2. আউটপুট পার্স করে সাইলেন্স ব্লক `[start, end]` তালিকা বানানো; অডিওর মোট দৈর্ঘ্য `Duration`/`ffprobe` থেকে।
3. **হিসাব:**
   - `speechStart` = শুরুর সাইলেন্স শেষ (না থাকলে 0)
   - `speechEnd` = শেষের সাইলেন্স শুরু (না থাকলে অডিও দৈর্ঘ্য)
   - `jsonStart` = প্রথম শব্দের `start`, `jsonEnd` = শেষ শব্দের `end`
4. **যাচাই (টলারেন্স ০.৩০ সে., কনফিগারযোগ্য):**
   - **C1 — শুরু:** `|jsonStart − speechStart| ≤ tol`
   - **C2 — শেষ:** `|jsonEnd − speechEnd| ≤ tol`
   - **C3 — মোট দৈর্ঘ্য:** `jsonEnd ≤ অডিও দৈর্ঘ্য` (JSON অডিওর বাইরে যেতে পারবে না)
   - **C4 — মাঝের বিরতি:** প্রতিটি অভ্যন্তরীণ সাইলেন্সে যে শব্দগুলোর ≥৭০% সময় সাইলেন্সের ভেতরে পড়ে সেগুলো **ফ্ল্যাগ**; এবং প্রতিটি সাইলেন্সের নিকটতম "বিরতি-শব্দ" (যে শব্দ `। , : ?` দিয়ে শেষ) থেকে দূরত্ব রিপোর্ট
5. কনসোলে টেবিল + `sync-report.json` লেখা; C1–C3 ফেইল হলে `exit code 1`, C4 শুধু WARN।
6. থ্রেশহোল্ড ক্যালিব্রেশন: −35dB / −40dB / −30dB তিনটি চালিয়ে তুলনা (S0.1-এ −40dB-এ শেষে কোনো সাইলেন্স মেলেনি, অর্থাৎ ৩৭–৩৮.৩২ সে. অংশে শব্দ/নয়েজ আছে — এটি যাচাই করতে হবে)।

**গ্রহণযোগ্যতা:** স্ক্রিপ্ট চলে; রিপোর্টে PASS/WARN/FAIL স্পষ্ট; ফলাফল এখানে লেখা।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি ফাইল:** `check-sync.mjs` (Node 22-এ চালানো হয়েছে), আউটপুট `sync-report.json` (রুটে, গিটে যাবে)। ব্যবহার: `node check-sync.mjs [--file X.json] [--wav X.wav] [--noise -35] [--dur 0.25] [--tol 0.3] [--out রিপোর্ট.json] [--calibrate]`।

**২) পরিকল্পনা থেকে পরিবর্তন/সংযোজন:**
- ffmpeg-র ক্রম: প্রথমে সিস্টেম `ffmpeg`, না পেলে `npx --no-install remotion ffmpeg` (এখানে npm নেই, GitHub runner-এ সিস্টেম ffmpeg আছে)।
- অডিওর মোট দৈর্ঘ্য **WAV হেডার** থেকে (দ্রুত ও সঠিক); WAV না হলে ffmpeg-এর `Duration` থেকে।
- নতুন **`--calibrate` মোড**: −30/−35/−40/−45/−50 dB-এ তুলনামূলক টেবিল (পরিকল্পনার ৬ নং পয়েন্ট)।
- ফাইলের শেষ পর্যন্ত চলা সাইলেন্স (`silence_end` ছাড়া) স্বয়ংক্রিয়ভাবে অডিও-শেষ ধরা হয়।
- C4 এ "পার্থক্য" = সাইলেন্স শুরু − নিকটতম বিরতি-শব্দের (`। , : ? ! ;`) শেষ। সাইলেন্স-ফাঁক JSON-এ নেই (শব্দগুলো গায়ে গায়ে), তাই ফাঁকের বদলে শব্দ-সাইলেন্স ওভারল্যাপ ≥৭০% যাচাই করা হয়।
- exit code: PASS/WARN → 0, FAIL (C1–C3) → 1, স্ক্রিপ্ট ত্রুটি → 2।

**৩) ক্যালিব্রেশন ফল** (ন্যূনতম ০.২৫ সে.; অডিও ৩৮.৩২ সে.):

| থ্রেশহোল্ড | সাইলেন্স | বলা শুরু | বলা শেষ | মাঝের বিরতি (সে.) |
|---|---|---|---|---|
| −30 dB | 13 | 0 | 38.32 | 1.94–2.43, 6.07–6.53, 7.11–7.61, 11.83–12.39, 15.30–15.80, 17.52–18.20, 20.56–20.98, 23.56–24.19, 28.21–28.68, 30.89–31.27, 31.90–32.29, 33.26–33.72, 35.88–36.32 |
| −35 dB | 8 | 0 | 38.32 | 1.95–2.42, 6.07–6.53, 7.11–7.61, 11.84–12.39, 15.30–15.80, 17.54–18.06, 23.56–23.86, 30.89–31.26 |
| −40 dB | 4 | 0 | 38.32 | 11.84–12.39, 15.52–15.80, 17.58–18.06, 30.92–31.26 |
| −45 dB | 2 | 0 | 38.32 | 12.01–12.34, 30.93–31.26 |
| −50 dB | 1 | 0 | 38.32 | 12.02–12.34 |

- **সিদ্ধান্ত:** ডিফল্ট **−35 dB / ০.২৫ সে. / ±০.৩০ সে.** রাখা হলো (−30 dB-এ শ্বাস-বিরতি/শব্দের মাঝের ফাঁকও ধরা পড়ে; −45 dB-এ বেশি বিরতি হারায়)।
- **মূল পর্যবেক্ষণ:** কোনো থ্রেশহোল্ডেই **শুরুতে বা শেষে নীরবতা নেই** — অর্থাৎ অডিওতে কণ্ঠ ০ থেকে ৩৮.৩২ সে. পর্যন্ত চলছে। (S0.1-এর অনুমান "শেষে নীরব অংশ আছে" **ভুল ছিল**; ৩৭.০–৩৮.৩২ অংশে কণ্ঠ আছে।)
- **স্থিতিশীল বিরতি** (−45 dB-এও টেকে, তাই নির্ভরযোগ্য অ্যাঙ্কর): **12.01–12.34** ও **30.93–31.26**; −40 dB-এ টেকে: 11.84–12.39, 17.58–18.06, 30.92–31.26।

**৪) ডিফল্ট সেটিংয়ে আসল যাচাই ফল — সামগ্রিক: ❌ FAIL (C2)**

| চেক | ফল | বিবরণ |
|---|---|---|
| C1 শুরু | ✅ PASS | JSON 0.00 বনাম অডিও 0.00 |
| C2 শেষ | ❌ **FAIL** | JSON শেষ 37.00 বনাম অডিও 38.32 → **−1.32 সে.** (সীমা ±0.30) |
| C3 JSON অডিওর ভেতরে | ✅ PASS | 37.00 ≤ 38.32 |
| C4 মাঝের বিরতি | ⚠️ WARN | ৮টি বিরতির মধ্যে ৪টি অমিল; ২টি শব্দ সাইলেন্সে পড়েছে *(মূল JSON-এর ফল; সংশোধিতটি PASS — S3.3 দেখুন)* |

মাঝের বিরতি বনাম JSON (−35 dB): `1.95–2.42` ↔ "বলেন," ✔ (০.১৭); `6.07–6.53` ↔ "বলেন," ✔ (−০.১৭); `7.11–7.61` ↔ ❌ (০.৮৭); `11.84–12.39` ↔ "শুনেছি," ❌ (০.৭০); `15.30–15.80` ↔ "শুনেছি:" ✔ (০.১৪); `17.54–18.06` ↔ "বিন-নিয়্যাত।" ❌ (১.০৫); `23.56–23.86` ↔ "পাবে।" ❌ (১.৭২); `30.89–31.26` ↔ "রাখবেন," ✔ (০.১৩)।
সাইলেন্সে পুরোপুরি পড়া শব্দ: **"ইবনুল"** (7.13–7.58, −35 dB) ও **"সাল্লাল্লাহু"** (12.04–12.48, −35/−40 dB) — অর্থাৎ JSON-এর এই শব্দ দুটোর সময়ে অডিওতে কিছুই বলা হচ্ছে না।
−40 dB/০.৩ সে.-তেও একই ফল: FAIL (C2), অমিল ২টি, "সাল্লাল্লাহু" সাইলেন্সে।

**৫) সিদ্ধান্ত ও পরবর্তী ধাপের জন্য নির্দেশনা (S3.3 লাগবে):**
- JSON মোট ~**৩.৪%** (১.৩২ সে.) ছোট; অর্থাৎ JSON-এর টাইমিং সমান ব্যবধানে আনুমানিক, আসল কণ্ঠের গতির সাথে মেলে না।
- S3.3 অবশ্যই: ১) `speechEnd = 38.32` কে শেষ অ্যাঙ্কর ধরবে, ২) স্থিতিশীল বিরতি (12.0–12.34, 17.58–18.06, 30.92–31.26, ও সম্ভব হলে 15.5–15.8) অ্যাঙ্কর হিসেবে ব্যবহার করবে, ৩) বিরতির পাশের শব্দ সাইলেন্সের বাইরে ঠেলে দেবে (যেমন "সাল্লাল্লাহু" সাইলেন্সের পরে শুরু)।
- ⚠️ সতর্কতা: কোন বিরতি ঠিক কোন শব্দের পরে — তা শুধু সাইলেন্স থেকে জানা যায় না (যেমন 12.0–12.34 "শুনেছি, | আমি" নাকি "আমি | রাসূলুল্লাহ" তা অনিশ্চিত)। S3.3-তে সাইলেন্সকে নিকটতম **বিরতি-চিহ্নিত শব্দ** (`, : । `) বা JSON-এর আনুমানিক সময় অনুযায়ী নিকটতম শব্দ-সীমানায় বসানো হবে এবং সম্ভাব্য অনিশ্চিত স্থানগুলো তালিকা করে আপনাকে ভিডিও দেখে নিশ্চিত করতে বলা হবে (S8.2)।
- **CI গেট নোট:** `package.json`-এর `check` স্ক্রিপ্ট এখন মূল JSON-এ চলে এবং FAIL দেয়; S3.3 শেষে `check` কে `node check-sync.mjs --file hadis0101.synced.json` করতে হবে, নইলে `render.yml`-এর `check` জব ব্যর্থ হয়ে রেন্ডার থামাবে।



### - [x] S3.3 — `sync-fix.mjs` (শুধু যাচাইয়ে অমিল পেলে)
**ইনপুট:** `sync-report.json`, `hadis0101.json`  **আউটপুট:** `sync-fix.mjs`, `hadis0101.synced.json`
**করণীয় (সাইলেন্স-অ্যাঙ্কর পদ্ধতি — স্পিচ-রিকগনিশন ছাড়া):**
1. অ্যাঙ্কর = `speechStart`, `speechEnd` এবং প্রতিটি অভ্যন্তরীণ সাইলেন্সের শুরু (শব্দ শেষ) ও শেষ (পরের শব্দ শুরু)।
2. প্রতিটি সাইলেন্সকে JSON-এর নিকটতম বিরতি-শব্দের (`। , :`) পরে বসানো (কাছাকাছি একই শব্দকে দুটি সাইলেন্সে বসানো যাবে না)।
3. দুই অ্যাঙ্করের মাঝের শব্দগুলোর সময় **অক্ষর-সংখ্যার অনুপাতে** পুনর্বণ্টন (লম্বা শব্দ বেশি সময়)।
4. মূল JSON অপরিবর্তিত; ফলাফল `hadis0101.synced.json` এ। এরপর `check-sync.mjs`কে `--file hadis0101.synced.json` দিয়ে পুনরায় চালিয়ে PASS নিশ্চিত।
5. `hadis-data.ts` পরে `synced` ফাইল থাকলে সেটি ব্যবহার করবে।

**S3.2 থেকে পাওয়া তথ্য (এই ধাপে বাধ্যতামূলক):** C2 ফেইল (JSON 37.00 বনাম অডিও 38.32); কণ্ঠ ০–৩৮.৩২ সে. পুরোটা; স্থিতিশীল বিরতি 12.01–12.34 ও 30.93–31.26 (−45 dB), 11.84–12.39, 17.58–18.06 (−40 dB); "সাল্লাল্লাহু" ও "ইবনুল" সাইলেন্সে পড়েছে। শেষে `package.json`-এর `check` স্ক্রিপ্ট `--file hadis0101.synced.json` ব্যবহারে বদলাতে হবে।

**গ্রহণযোগ্যতা:** synced ফাইলে C1–C3 PASS, C4 WARN সংখ্যা কমেছে/শূন্য।
*(যাচাইতেই সব PASS হলে এই ধাপ "প্রয়োজন নেই" লিখে টিক দিন।)*

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি ফাইল:** `sync-fix.mjs`, আউটপুট `hadis0101.synced.json` (৮৩ শব্দ, একই ফরম্যাট `{word,start,end}`), `sync-fix-report.json` (অ্যাঙ্কর ও পর্যালোচনা-তালিকা)। মূল `hadis0101.json` **অপরিবর্তিত**। ব্যবহার: `node sync-fix.mjs [--noise -35] [--dur 0.25] [--maxd 0.6] [--bonus 0.6] [--min-word 0.12] [--init orig|weighted]`।

**২) পদ্ধতি (স্পিচ-রিকগনিশন ছাড়া — শুধু সাইলেন্স):**
1. কণ্ঠ-শুরু/শেষ সাইলেন্স থেকে: **০.০ – ৩৮.৩২ সে.**।
2. মূল JSON-কে আনুপাতিক স্কেল করে (০–৩৭ → ০–৩৮.৩২) প্রতিটি শব্দ-সীমানার প্রত্যাশিত সময় ধরা।
3. **পাস ১:** প্রতিটি সাইলেন্সকে নিকটতম **বিরতি-চিহ্নিত শব্দের (। , : ? ! ;)** পরে বসানো (সর্বোচ্চ দূরত্ব ০.৬ সে.; বিরতি-চিহ্নের অগ্রাধিকার ০.৬ সে.)। গ্রিডি, একই সীমানায় দুটি নয়, ক্রম বজায়, প্রতি শব্দে ≥০.১২ সে. থাকতে হবে।
4. **পাস ২:** অবশিষ্ট সাইলেন্স **সংশোধিত সময়ের ভিত্তিতে** যেকোনো সীমানায় (নিম্ন আস্থা)।
5. দুই অ্যাঙ্করের মাঝের শব্দগুলোর সময় **অক্ষর-সংখ্যা (গ্রাফিম) + ১.৫ ধ্রুবক** অনুপাতে ভাগ; সাইলেন্সের সময়ে কোনো শব্দ নেই (ফাঁক)।
6. স্ক্রিপ্ট নিজে যাচাই করে: প্রতি শব্দে `end > start`, ওভারল্যাপ নেই।

**৩) পরিকল্পনা থেকে পরিবর্তন:**
- অক্ষর-অনুপাতের ভিত্তি-সময় (`--init weighted`) পরীক্ষা করা হয়েছিল — অর্থহীন জায়গায় (যেমন "ওপর", "আলাইহি" এর পরে) অ্যাঙ্কর বসাচ্ছিল; তাই ডিফল্ট **`--init orig`** (মূল JSON-এর স্কেলড সময়), যা বিরতি-চিহ্নের সাথে স্বাভাবিকভাবে মিলেছে।
- `check-sync.mjs` উন্নত করা হয়েছে: সংশোধিত ফাইলে নিজস্ব ফাঁক থাকলে সেটিকে সাইলেন্সের সাথে মিলিয়ে দেখে ("ফাঁক: … এর পর"); মূল ফাইলের ফল অপরিবর্তিত (FAIL ঠিকই আসে — পুনঃযাচাই করা হয়েছে)।
- `package.json`: `check` এখন `node check-sync.mjs --file hadis0101.synced.json`; মূল ফাইলের জন্য নতুন `check:original`।

**৪) বসানো অ্যাঙ্কর (৮টি):**

| সাইলেন্স (সে.) | কোন শব্দের পরে | পরের শব্দ | মূল শেষ → নতুন শেষ | আস্থা |
|---|---|---|---|---|
| 1.95–2.42 | #4 "বলেন," | আলকামা | 1.78 → 1.95 | ✅ high |
| 6.07–6.53 | #14 "বলেন," | আমি | 6.24 → 6.07 | ✅ high |
| 7.11–7.61 | #16 "উমর" | ইবনুল | 7.13 → 7.11 | ⚠️ **low** (বিরতি-চিহ্ন নেই) |
| 11.84–12.39 | #25 "শুনেছি," | আমি | 11.14 → 11.84 | ✅ high |
| 15.30–15.80 | #34 "শুনেছি:" | ইন্নামাল | 15.16 → 15.30 | ✅ high |
| 17.54–18.06 | #37 "বিন-নিয়্যাত।" | প্রত্যেক | 16.49 → 17.54 | 🟡 medium (দূরত্ব ১.০৫ সে.) |
| 23.56–23.86 | #49 "পাবে।" | তাই | 21.84 → 23.56 | 🟡 medium (পাস ২; দূরত্ব ১.৭২ সে.) |
| 30.89–31.26 | #67 "প্রাপ্য।" | মনে | 29.87 → 30.89 | ✅ high |

- এই বিন্যাস শব্দার্থের সাথেও মেলে: আরবি অংশের পর বিরতি, অনুবাদ শেষে ("প্রাপ্য।") বিরতি, তারপর "মনে রাখবেন…" শিক্ষা-অংশ।
- আগের S3.2-এর অনুমান "রাখবেন, এর পরে ৩০.৯ বিরতি" **ভুল ছিল** — আনুপাতিক স্কেল করার পর তা আসলে "প্রাপ্য।" এর শেষে পড়ে।
- নতুন ফাঁক (সে.): ০.৪৭, ০.৪৫৫, ০.৪৯৫, ০.৫৫১, ০.৪৯৪, ০.৫২, ০.৩০৪, ০.৩৭১। শব্দের সময়কাল ০.২২৯ ("আমি") থেকে ০.৬৮৯ সে. ("বিন-নিয়্যাত।")।

**৫) যাচাই (`node check-sync.mjs --file hadis0101.synced.json`):**

| থ্রেশহোল্ড | ফল |
|---|---|
| −35 dB (ডিফল্ট) | ✅ **PASS** — C1 ✔, C2 ✔ (38.32 = 38.32), C3 ✔, C4 ✔ (৮/৮ বিরতি মিলেছে, ০টি শব্দ সাইলেন্সে) |
| −40 dB / ০.৩ সে. | ✅ **PASS** (সংশোধনের সময় ব্যবহৃত নয় এমন স্বাধীন যাচাই) |
| −30 dB | ⚠️ WARN (C1–C3 PASS; অতিরিক্ত শ্বাস-বিরতিগুলো মেলে না — প্রত্যাশিত) |

- ⚠️ **সততার সাথে সীমাবদ্ধতা:** −35 dB-এর PASS আংশিক "নিজেকে যাচাই" (একই সাইলেন্স দিয়ে অ্যাঙ্কর ও যাচাই)। সাইলেন্স শুধু বলে *কোথায় থামা*, *কোন শব্দের পর* তা নয়। তাই অ্যাঙ্কর বসানো শব্দ-সীমানাগুলো এবং অ্যাঙ্করের মাঝের শব্দ-সময় (অক্ষর-অনুপাতে আনুমানিক) চূড়ান্ত নিশ্চিত নয়।
- **S8.2-এ ভিডিও দেখে মানুষের পর্যালোচনা বাধ্যতামূলক:** বিশেষত **#16 "উমর" এর পর (7.11 সে.)** — "আমি | উমর ইবনুল" হতে পারে (নিম্ন আস্থা), এবং **#37 (17.54)** ও **#49 (23.56)**। সংশোধন লাগলে `sync-fix.mjs`-এ `--maxd`/ম্যানুয়াল ওভাররাইড বা `hadis0101.synced.json`-এ সরাসরি সংখ্যা বদলানো যাবে।
- মানুষের চোখে সাইলেন্সের বাইরে শব্দের মাঝখানের সময় (যেমন লম্বা নামের শব্দ) সামান্য এদিক-ওদিক হতে পারে (±~০.১–০.২ সে. আন্দাজ)।

**৬) পরবর্তী ধাপের জন্য:** `hadis-data.ts` (S4.3) `hadis0101.synced.json` ইম্পোর্ট করবে; `timing.ts` (S4.4) শব্দের মাঝে ফাঁক (সাইলেন্স) সামলাবে — ফাঁকের সময় আগের পেজ দেখানো থাকবে, কোনো শব্দ হাইলাইট হবে না (আগের শব্দ "বলা হয়ে গেছে" অবস্থায়)।



---

## ফেজ 4 — কনফিগ, থিম, ডেটা, টাইমিং

### - [x] S4.1 — `config.ts`
**করণীয়:** এক্সপোর্ট করবে:
- `FPS = 30`
- `FORMATS`: `{ '16x9': {id:'Hadis-16x9', width:1920, height:1080}, '9x16': {id:'Hadis-9x16', width:1080, height:1920} }`
- `OUTRO_SECONDS = 1.5` *(S5.6-এ ৫.০ করা হয়েছে — D14)*
- `HADIS_ID = 'hadis0101'`
- রেন্ডার টেবিল (CI-তে ব্যবহৃত): `16x9-HD (scale 1)`, `16x9-4K (scale 2)`, `9x16-HD (scale 1)`, `9x16-4K (scale 2)`
- **দৈর্ঘ্য সূত্র:** `durationInFrames = ceil((অডিও সেকেন্ড + OUTRO_SECONDS) × FPS)` → বর্তমান: `ceil((38.32+1.5)×30) = 1195` ফ্রেম (≈ ৩৯.৮২ সে.)। *(**S5.6 থেকে:** `OUTRO_SECONDS = 5` → `ceil((38.32+5)×30) = 1300` ফ্রেম ≈ ৪৩.৩৩ সে.।)*

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি ফাইল:** `config.ts` (রুটে)।

**২) এক্সপোর্ট তালিকা:**

| নাম | মান/কাজ |
|---|---|
| `FPS` | `30` |
| `OUTRO_SECONDS` | `1.5` *(→ S5.6: `5`)* |
| `HADIS_ID` | `'hadis0101'` |
| `AUDIO_SECONDS_FALLBACK` | `38.32` (S2.2/S3.2 থেকে যাচাইকৃত; `calculateMetadata` ব্যর্থ হলে ফলব্যাক) |
| `FORMATS` | `'16x9'` → `{id:'Hadis-16x9', 1920×1080, landscape}`; `'9x16'` → `{id:'Hadis-9x16', 1080×1920, portrait}` |
| `QUALITIES` | `HD` → scale 1, crf 20; `4K` → scale 2, crf 18 |
| `RENDER_TARGETS` | ৪টি টার্গেট (নিচের টেবিল), `FORMATS × QUALITIES` থেকে স্বয়ংক্রিয় |
| `calcDurationInFrames(audioSec, outroSec?, fps?)` | `ceil((audio + outro) × fps)`; ০/ঋণাত্মক/অসীম হলে ত্রুটি |
| `FALLBACK_DURATION_FRAMES` | `1195` *(→ S5.6: `1300`, স্বয়ংক্রিয়)* |
| `audioEndFrame(audioSec, fps?)` | অডিও শেষের ফ্রেম (`1150`) — আউটরো এখান থেকে শুরু (S5.6/S6.1) |
| টাইপ | `FormatKey`, `QualityKey`, `FormatConfig`, `RenderTarget` |

**রেন্ডার টার্গেট (যাচাইকৃত আউটপুট):**

| key | কম্পোজিশন | scale | crf | ফাইল | রেজোলিউশন |
|---|---|---|---|---|---|
| 16x9-HD | Hadis-16x9 | 1 | 20 | `hadis0101-16x9-HD.mp4` | 1920×1080 |
| 16x9-4K | Hadis-16x9 | 2 | 18 | `hadis0101-16x9-4K.mp4` | 3840×2160 |
| 9x16-HD | Hadis-9x16 | 1 | 20 | `hadis0101-9x16-HD.mp4` | 1080×1920 |
| 9x16-4K | Hadis-9x16 | 2 | 18 | `hadis0101-9x16-4K.mp4` | 2160×3840 |

**৩) দৈর্ঘ্য হিসাব:** `ceil((38.32 + 1.5) × 30) = ceil(1194.6) = ` **1195 ফ্রেম (≈ ৩৯.৮২ সে.)**; অডিও শেষ ফ্রেম **1150**, আউটরো ফ্রেম 1150–1195 (৪৫ ফ্রেম = ১.৫ সে.)। ফ্লোটিং-পয়েন্ট ত্রুটি এড়াতে `− 1e-6` ইপসিলন আছে।

**৪) পরিকল্পনা থেকে পরিবর্তন/সংযোজন:** `QUALITIES` ও `RENDER_TARGETS` (পরিকল্পনায় শুধু "টেবিল" ছিল — এখন কোডে, যাতে `render.yml` ও ফাইলনাম একই উৎস থেকে আসে); `audioEndFrame`, `FALLBACK_DURATION_FRAMES`, `AUDIO_SECONDS_FALLBACK` যোগ; ফাইলে enum/parameter-property নেই।

**৫) টেস্ট (এই সেশনে সত্যিই চালানো হয়েছে):**
- ✅ `tsc --noEmit --strict` (TypeScript 7.0.2, ফাইলটি আলাদা করে) — কোনো এরর নেই।
- ✅ Node type-stripping দিয়ে রান: `FPS=30`, `FALLBACK=1195`, `audioEnd=1150`, চারটি টার্গেটের নাম/মাপ উপরের টেবিলের সাথে মিলেছে; `calcDurationInFrames(10)=345`; `38.3333 → 1195`; `calcDurationInFrames(0)` ত্রুটি ছোড়ে ✔।

**৬) নোট:**
- ⚠️ `render.yml` (S7.2)-এর ম্যাট্রিক্স **হাতে লেখা** হবে — `config.ts`-এর `RENDER_TARGETS`-এর সাথে (নাম/scale/crf) হুবহু মিলিয়ে রাখতে হবে।
- এই সেশনে গ্লোবাল `tsc` (v7.0.2) পাওয়া গেছে; তাই পরবর্তী `.ts/.tsx` ফাইল (যেগুলো শুধু `remotion`/`react`-এ নির্ভর করে না) এখানেই টাইপ-চেক করা যাবে। `remotion`/`react` টাইপ ইনস্টল না থাকায় পূর্ণ `tsc -p .` এখনো চালানো যাবে না (S6.3, CI-তে)।



### - [x] S4.2 — `theme.ts`
**করণীয়:**
- **রঙ:** `bgDeep #052E21`, `bgMid #0B4A33`, `emerald #1FA34A`, `gold #E0B85C`, `goldSoft #F3DDA0`, `cream #FFF8E7`, `ink #0A1F17`, `white #FFFFFF`।
- **ফন্ট:** `loadFont` দিয়ে Noto Serif Bengali (শিরোনাম/সাবটাইটেল), ~~Hind Siliguri~~ *(→ S5.4-এ বাদ, এখন Anek Bangla)* (ছোট লেবেল), Amiri (আরবি); `weights` সীমিত (লোড কম)।
- **স্কেল সূত্র:** ডিজাইন ১৯২০×১০৮০ / ১০৮০×১৯২০ ভিত্তিতে; কম্পোনেন্টে `useVideoConfig()` থেকে নেওয়া পিক্সেলেই আঁকা (4K = `--scale`, কোডে আলাদা কিছু নয়)।
- **৯:১৬ সেফ-জোন:** উপরে ১৫০px ও নিচে ২৫০px খালি (Reels/Shorts UI-র জন্য) — গুরুত্বপূর্ণ টেক্সট এর বাইরে।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি ফাইল:** `theme.ts` (রুটে; অন্য কোনো লোকাল ফাইল import করে না)।

**২) এক্সপোর্ট তালিকা:**

| নাম | বিষয়বস্তু |
|---|---|
| `COLORS` | `bgDeep #052E21`, `bgMid #0B4A33`, `emerald #1FA34A`, `gold #E0B85C`, `goldSoft #F3DDA0`, `cream #FFF8E7`, `ink #0A1F17`, `white #FFFFFF` + যোগ: `goldDeep #B8893A`, `textDim` (সাদা ৫৫%), `textFaint`, `line`, `glowGold`, `glowEmerald`, `shadow` |
| `GRADIENTS` | `background` (রেডিয়াল), `gold` (১৩৫° গ্রেডিয়েন্ট), `lessonCard` |
| `FONTS` | `serif` = Noto Serif Bengali (শিরোনাম/কারাওকে), `sans` = ~~Hind Siliguri~~ → **Anek Bangla** (লেবেল/পিল; S5.4-এ বদল), `arabic` = Amiri |
| `FONT_WEIGHTS` | regular 400, medium 500, semibold 600, bold 700 |
| ফন্ট লোড | Noto Serif Bengali: weights 400/600/700; ~~Hind Siliguri: 400/500/600~~ (S5.4-এ বাদ; লেবেলও এখন Anek Bangla ৫০০/৬০০/৭০০/৮০০); Amiri: 400/700 — subsets: `bengali`+`latin` (Amiri: `arabic`+`latin`); `ignoreTooManyRequestsWarning: true` |
| `waitForFonts()` | তিন ফন্টের `waitUntilDone()` একসাথে |
| `SPACE`, `RADIUS`, `LINE_HEIGHT` | স্পেসিং xs8/sm16/md32/lg56/xl96; বাংলা লাইন-হাইট ১.৫৫, আরবি ২.০ (হারাকাত কাটা এড়াতে) |
| `LAYOUTS` / `getLayout(w,h)` / `orientationOf` / `getUnit` | নিচের টেবিল |
| `CONTRAST_PAIRS` | কনট্রাস্ট টেস্টের রঙ-জোড়া |

**৩) লেআউট টোকেন (প্রথম খসড়া — S5.x-এ স্টিল দেখে সূক্ষ্ম-সমন্বয় হবে):**

| টোকেন | ১৬:৯ (1920×1080) | ৯:১৬ (1080×1920) |
|---|---|---|
| নিরাপদ অঞ্চল (উপর/নিচ/পাশ) | 36 / 40 / 120 | **150 / 250** / 60 |
| লোগো ব্যাজ উচ্চতা (top) | 150 (36) | 220 (170) |
| শিরোনাম "আজকের হাদিস" | 56px | 84px |
| পিল/চিপ ("সহিহ বুখারী…"/"S2") | 30 / 28px | 38 / 34px |
| আরবি (top, size) | 392, 84px *(S5.3-এ ৩৭২ থেকে)* | 675, 96px *(S5.3-এ ৬৪০ থেকে)* |
| কারাওকে (কেন্দ্র-Y, size, সর্বোচ্চ লাইন) | 720, 64px, ২ | 1130, 72px, ৩ |
| **`maxWords` প্রতি পেজ** (S4.4 এটি পড়বে) | **9** | **6** |
| প্রগ্রেস বার (নিচ থেকে, উচ্চতা) | 40, 8px | **260**, 10px |
| আউটরো লোগো উচ্চতা | 320 | 360 |

**৪) স্কেল সূত্র (পরিকল্পনা অনুযায়ী, স্পষ্টীকৃত):** `remotion render --scale=2`-এ কম্পোজিশনের `width/height` **বদলায় না** (1920 থাকে), তাই টোকেন সবই ডিজাইন-পিক্সেল এবং 4K-র জন্য আলাদা মান নেই। `getUnit(w,h) = min(w/baseW, h/baseH)` — রেন্ডারে সবসময় `1`; Studio-তে অন্য মাপে খুললে আনুপাতিক স্কেল।

**৫) টেস্ট (এই সেশনে চালানো):**
- ✅ `tsc --noEmit --strict` পাস (ফন্ট প্যাকেজের **নকল টাইপ স্টাব** সহ — আসল প্যাকেজ ইনস্টল নেই)।
- ✅ Node-এ রান (নকল ফন্ট মডিউল সহ): `getLayout` `maxWords` 9/6 ✔, `getUnit(1920,1080)=1`, `getUnit(960,540)=0.5`, `orientationOf(1080,1920)='portrait'` ✔, `waitForFonts()` ✔।
- **কনট্রাস্ট (WCAG):** সাদা/bgMid **10.29**; goldSoft/bgDeep **11.04**; gold/bgDeep **7.88**; cream/bgMid **9.71**; ink/সাদা (ব্যাজ) **17.20**; ink/gold (S2 চিপ) **9.15**; "আসছে" শব্দ (সাদা ৫৫%)/bgMid **4.30**, /bgDeep **5.45** — সব ≥ ৪.৩ (বড় টেক্সটের জন্য ৩ যথেষ্ট) ✔।
- *(S5.3 নোট: আরবি `top` পরে ১৬:৯ = 392, ৯:১৬ = 675 করা হয়েছে — নিচের সংখ্যা S4.2-সময়ের।)*
- **জ্যামিতি যাচাই:** ৯:১৬-তে হেডার শেষ y=390, কারাওকে ব্লক y≈963–1297, প্রগ্রেস বার y=1660 (নিরাপদ সীমা 1670-এর ভেতরে) ✔; ১৬:৯-তে লোগো শেষ y=186, আরবি ~372–540, কারাওকে ~621–819 — ওভারল্যাপ নেই ✔।

**৬) ⚠️ অযাচাইকৃত অনুমান (CI-র প্রথম রানে নিশ্চিত হবে):**
- `@remotion/google-fonts/NotoSerifBengali`, `/Amiri` (*`/HindSiliguri` S5.4-এ বাদ*) মডিউল-নাম এবং `bengali`/`arabic` সাবসেট ও weight-তালিকা — অফিসিয়াল ডকে `loadFont(style?, options?)` ও `weights/subsets/ignoreTooManyRequestsWarning` অপশন নিশ্চিত হয়েছে, কিন্তু প্রতিটি ফন্টের নির্দিষ্ট সাবসেট/weight নাম এখানে ইনস্টল করে মেলানো যায়নি। টাইপ-এরর এলে (S6.3/CI) এই ফাইলের তালিকা ঠিক করব।
- ফন্ট ডাউনলোডের অনুরোধ বেশি হলে রেন্ডার টাইমআউট হতে পারে → `render.yml`-এ `--timeout=120000` (পরিকল্পনায় আছে) ও weights সীমিত রাখা হয়েছে।
- Remotion 5-এ `weights`/`subsets` বাধ্যতামূলক — আমরা সবসময় দিচ্ছি, তাই ভবিষ্যৎ-সামঞ্জস্যপূর্ণ।


**✅ সংযোজন (2026-11-06, S4.3 সেশনে — নতুন নির্দেশ D11: কালারফুল অ্যানিমেটেড ক্যাপশন, বাংলা গুগল ফন্ট):**
- **`theme.ts`-এ যোগ হয়েছে (আগের কিছু মোছা/বদলানো হয়নি):**

| নতুন নাম | বিষয়বস্তু |
|---|---|
| ফন্ট `FONTS.caption` | **Anek Bangla** (`@remotion/google-fonts/AnekBangla`), weights ~~600/700/800~~ → **500/600/700/800** (S5.4-এ ৫০০ যোগ: লেবেল/পিলও এই ফন্টে), subsets `bengali`+`latin`; ফলব্যাক Noto Serif Bengali → sans-serif; `waitForFonts()`-এ চতুর্থ ফন্ট যোগ |
| `CAPTION_COLORS` | ৮টি উজ্জ্বল রঙ (গরম/ঠান্ডা মিশিয়ে): `#FFD34D` সোনালি, `#6CCBFF` আকাশি, `#FF9580` প্রবাল, `#C3F26B` লাইম, `#C0A8FF` ল্যাভেন্ডার, `#FFB259` কমলা, `#6EE7B7` পুদিনা, `#FF9BD2` গোলাপি |
| `captionColor(wordIndex)` | `index % ৮` — ডিটারমিনিস্টিক (ঋণাত্মক ইনডেক্সও নিরাপদ); পাশাপাশি দুই শব্দ কখনো একরঙা নয় |
| `withAlpha(hex, a)` | `#RRGGBB` → `rgba(...)` (গ্লো/পিলের জন্য; a ০–১ ক্ল্যাম্প) |
| `CAPTION` | অ্যানিমেশন/স্টাইল মান: `pageFade 5`; `wordIn {stagger 2, duration 8, riseY 18}`; `pop {popScale 1.18, settleScale 1.08, spring damping 11/stiffness 180/mass 0.6}`; `pill {alpha 0.22 …}`; `underline {heightEm 0.07}`; `glow {blurEm 0.45, alpha 0.7}`; `stroke {0.06em, ink}`; `upcoming {সাদা, ৫৫%}`; weights normal 700/active 800 |
| `CONTRAST_PAIRS` | ৮টি ক্যাপশন রঙ/bgMid জোড়া যোগ (মোট ১৪) |

- **কনট্রাস্ট (WCAG, bgMid #0B4A33-এর ওপর):** সোনালি 7.19, আকাশি 5.69, প্রবাল **4.83** (সর্বনিম্ন), লাইম 7.95, ল্যাভেন্ডার 5.04, কমলা 5.76, পুদিনা 6.75, গোলাপি 5.32 — সব ≥ ৪.৫ ✔। (প্রথম খসড়ার প্রবাল `#FF8A75` ছিল 4.48, তাই `#FF9580`-এ হালকা করা হয়েছে।)
- **টেস্ট (সত্যিই চালানো):** `tsc --noEmit --strict` পাস (ফন্ট প্যাকেজের নকল টাইপ-স্টাব সহ); Node-রান (নকল ফন্ট মডিউল সহ) **১১/১১ পাস** — রঙ-চক্র, নেগেটিভ ইনডেক্স, `withAlpha`, ফন্ট-ফলব্যাক স্ট্রিং, সব কনট্রাস্ট ≥ ৪.৫, পাশাপাশি শব্দ একরঙা নয়, আগের `maxWords 9/6` লেআউট অক্ষত।
- ⚠️ **অযাচাইকৃত:** `@remotion/google-fonts/AnekBangla` মডিউল-নাম ও `600/700/800` weight-সাবসেট এখানে ইনস্টল করে মেলানো যায়নি (নেটওয়ার্ক বন্ধ) — CI-র প্রথম `tsc`/রেন্ডারে নিশ্চিত হবে; ব্যর্থ হলে শুধু `theme.ts`-এর ওই import/weights লাইন ঠিক হবে (বিকল্প: `BalooDa2`, `NotoSansBengali`)।
- বাস্তবে ক্যাপশন আঁকা হবে **S5.4 `Karaoke.tsx`-এ** (নিচে সংশোধিত); এই সংযোজন শুধু টোকেন।


### - [x] S4.3 — `hadis-data.ts`
**ইনপুট:** **`hadis0101.synced.json`** (S3.3-এ তৈরি; মূল `hadis0101.json` নয়), S3.1 সিদ্ধান্ত (আংশিক আরবি)
**করণীয়:**
- JSON ইম্পোর্ট ও `Word = {word,start,end}` টাইপ।
- মেটা: `TITLE='আজকের হাদিস'`, `SOURCE='সহিহ বুখারী'`, `NUMBER='হাদিস নং: ০১'`, `APP_NAME='ইসলামী বিশ্বকোষ ও আল হাদিস'`, `SEASON='S2'`।
- সেকশন সংজ্ঞা (শব্দ ইনডেক্স রেঞ্জ, সময় নয়): A `[0..33]`, B `[34..36]`, C `[37..66]`, D `[67..82]`; প্রতিটিতে `kind: 'narration' | 'arabic' | 'translation' | 'lesson'`। সময় শব্দ থেকেই বের হবে।
- C-এর উপ-বাক্য: `[37..41]`, `[42..48]`, `[49..66]`।
- আরবি: **শুধু আংশিক** `ARABIC_PARTIAL = 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ'` (সেকশন B-এর জন্য); পূর্ণ পাঠ নেই (S3.1 সিদ্ধান্ত)। এছাড়া বিরতি-শব্দ ফ্ল্যাগ (`isPause`: শেষ অক্ষর `। , : ?`)।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি ফাইল:** `hadis-data.ts` (রুটে; অন্য লোকাল ফাইল import করে না — শুধু `./hadis0101.synced.json`)। ডেটা-উৎস **synced JSON** (মূল নয়)।

**২) এক্সপোর্ট তালিকা:**

| নাম | বিষয়বস্তু |
|---|---|
| টাইপ | `Word {word,start,end}`, `HadisWord` (= Word + `index`, `isPause`, `sectionId`, `sectionKind`, `phraseId`), `Section`, `Phrase`, `SectionId 'A'..'D'`, `SectionKind`, `PhraseId 'C1'..'C3'` |
| মেটা | `TITLE='আজকের হাদিস'`, `SOURCE='সহিহ বুখারী'`, `NUMBER='হাদিস নং: ০১'`, `APP_NAME='ইসলামী বিশ্বকোষ ও আল হাদিস'`, `SEASON='S2'` |
| অতিরিক্ত মেটা | `SOURCE_LINE='সহিহ বুখারী • হাদিস নং: ০১'`, `LESSON_LABEL='শিক্ষা'`, `OUTRO_CAPTION='শেয়ার করুন, আমল করুন'` |
| আরবি | `ARABIC_PARTIAL = 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ'` (শুধু আংশিক, হারাকাতসহ — S3.1) |
| `SECTIONS` | A `[0..33]` narration/বর্ণনা · B `[34..36]` arabic/আরবি · C `[37..66]` translation/অনুবাদ · D `[67..82]` lesson/শিক্ষা |
| `PHRASES` | C1 `[37..41]` · C2 `[42..48]` · C3 `[49..66]` |
| ডেটা | `RAW_WORDS` (অপরিবর্তিত), `WORDS` (সমৃদ্ধ ৮৩ শব্দ), `WORD_COUNT=83`, `SPEECH_START_SEC=0`, `SPEECH_END_SEC=38.32` |
| হেলপার | `isPauseWord(text)`, `getSection(id)`, `getSectionOfWord(i)`, `sectionIndexOf(i)`, `wordsOfSection(id)`, `wordsOfPhrase(id)`, `getSectionTiming(id)`, `textOfSection(id)`, `sectionAtTime(sec)` |
| যাচাই | `validateHadisData(words?)` → ত্রুটির তালিকা; **ফাইল লোডের সময় নিজে চলে ও ভুল হলে throw করে** (রেন্ডার শুরুতেই থামে) |

**৩) synced টাইমিং অনুযায়ী সেকশনের আসল সময় (সময় শব্দ থেকে বের হয়, এখানে হাতে লেখা নেই):**

| সেকশন | শব্দ | সময় (সে.) | ছোট বিবরণ |
|---|---|---|---|
| A — বর্ণনা | ৩৪টি | 0.000 – 15.301 | সনদ, "…শুনেছি:" |
| B — আরবি | ৩টি | **15.795 – 17.544** | "ইন্নামাল আ'মালু বিন-নিয়্যাত।" |
| C — অনুবাদ | ৩০টি | 18.064 – 30.893 | C1 5টি, C2 7টি, C3 18টি |
| D — শিক্ষা | ১৬টি | 31.264 – 38.320 | "মনে রাখবেন, …কারণ।" |

- **বিরতি-শব্দ (`isPause`) ১৪টি**, ইনডেক্স: `3, 11, 13, 24, 33, 36, 41, 48, 60, 66, 68, 71, 77, 82`। প্রতিটি সেকশন ও উপ-বাক্য বিরতি-শব্দে শেষ হয় — `buildPages` (S4.4) এখান থেকেই পেজ ভাঙবে।
- সেকশন A/B/C/D-র মাঝের ফাঁক (সাইলেন্স): 15.301→15.795, 17.544→18.064, 30.893→31.264।

**৪) পরিকল্পনা থেকে পরিবর্তন/সংযোজন:**
- **সেকশন B-র সময় বদলেছে:** পুরোনো পরিকল্পনায় ১৫.১৬–১৬.৪৯; synced ফাইলে **১৫.৭৯৫–১৭.৫৪৪**। S5.3 (`ArabicBlock`) এই ফাইলের `getSectionTiming('B')` থেকে সময় নেবে — সংখ্যা হাতে লেখা হবে না (নিচে S5.3 সংশোধিত)।
- `isPauseWord` নিয়ম `sync-fix.mjs`-এর সাথে একই: `। , : ? ! ;` (পরিকল্পনায় `! ;` ছিল না)।
- সংযোজন: `SOURCE_LINE`, `LESSON_LABEL`, `OUTRO_CAPTION`, `WORDS` (সমৃদ্ধ), `sectionAtTime`, `validateHadisData` ও লোড-সময়ের আত্ম-যাচাই।
- ক্যাপশনের রঙ/ফন্ট এই ফাইলে নেই — সেগুলো `theme.ts`-এ (D11; উপরে S4.2 সংযোজন দেখুন), যাতে ডেটা ও স্টাইল আলাদা থাকে।

**৫) টেস্ট (এই সেশনে সত্যিই চালানো):**
- ✅ `tsc --noEmit --strict --resolveJsonModule` — কোনো এরর নেই।
- ✅ Node (type-stripping; JSON-এ শুধু টেস্টের জন্য `with {type:'json'}` যোগ করা কপিতে) — **১২/১২ পাস:** ৮৩ শব্দ; `validateHadisData()` ফাঁকা; কণ্ঠ ০→38.32; সেকশন আকার 34/3/30/16; উপ-বাক্য 5/7/18; সেকশন B-র টেক্সট "ইন্নামাল আ'মালু বিন-নিয়্যাত।"; বিরতি-শব্দ ১৪টি; `sectionAtTime` (০, ১৬, ১৭.৮, ২০, ৩১.১, ৩৩, ৯৯ সে.) সঠিক; `isPauseWord`; `phraseId`; `SOURCE_LINE`; **নেগেটিভ টেস্ট:** ইচ্ছাকৃত ভাঙা টাইমিং দিলে `validateHadisData` ত্রুটি ধরে।
- (নোট: প্রথম রানে একটি টেস্ট আমার নিজের গণনার ভুলে ফেইল করেছিল — প্রত্যাশা ২০ ধরেছিলাম, আসল সংখ্যা ১৪; হাতে গুনে মিলিয়ে টেস্ট ঠিক করা হয়েছে, `hadis-data.ts` বদলায়নি।)

**৬) বাধা/সতর্কতা:**
- ⚠️ `import syncedWords from './hadis0101.synced.json'` — `tsconfig`-এর `resolveJsonModule` + Remotion-এর webpack-এ কাজ করবে (পরিকল্পনা মতো); প্রকৃত বান্ডল-টেস্ট CI-তে (S6.3)।
- ⚠️ শব্দ-সংখ্যা/ক্রম বদলালে (নতুন হাদিস) `SECTIONS`/`PHRASES` ইনডেক্স ও `ARABIC_PARTIAL` হাতে মেলাতে হবে — `validateHadisData` ভুল হলে স্পষ্ট বার্তাসহ থামবে।
- এই ধাপ শেষে **S4.4 (`timing.ts`)** পরের ধাপ; সে `WORDS`/`HadisWord` ও `SECTIONS` ইম্পোর্ট করবে।


### - [x] S4.4 — `timing.ts`
**করণীয়:**
- **ইনপুট:** `hadis-data.ts`-এর `WORDS` (`HadisWord`: `index`, `isPause`, `sectionId/Kind`, `phraseId`) ও `SECTIONS`; পেজের প্রতিটি শব্দ `index` ধরে রাখবে — `Karaoke` এই `index` দিয়ে `captionColor(index)` (theme.ts, D11) নেবে, তাই পেজ ভাঙলেও শব্দের রঙ বদলাবে না।
- `secToFrame(sec, fps)`; `activeWordIndex(words, currentSec)`।
- `buildPages(words, {maxWords, sections})`: পেজ ভাঙার নিয়ম — (ক) সেকশন সীমানা, (খ) বিরতি-শব্দের পরে, (গ) `maxWords` পূর্ণ হলে। **maxWords: ১৬:৯ = ৯, ৯:১৬ = ৬**।
- প্রতি পেজ: `{words, startSec, endSec, section}`; পেজ দেখা শুরু প্রথম শব্দের **০.১৫ সে. আগে**, থাকবে পরের পেজ শুরু পর্যন্ত (শেষ পেজ: অডিও শেষ পর্যন্ত)।
- দুর্ঘটনাক্রমে ফাঁকা পর্দা এড়াতে: দুই পেজের মাঝে ফাঁক থাকলে আগেরটি ফ্রেজ শেষ পর্যন্ত ধরে রাখা।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি ফাইল:** `timing.ts` (রুটে)। শুধু `import type` (hadis-data.ts থেকে) — রানটাইমে কিছু লোড হয় না। বিশুদ্ধ ফাংশন, `Math.random`/`Date` নেই।

**২) এক্সপোর্ট তালিকা:**

| নাম | কাজ |
|---|---|
| `PAGE_LEAD_SEC = 0.15` | পেজ প্রথম শব্দের এত আগে দেখা দেয় |
| `secToFrame(sec,fps)` / `frameToSec(frame,fps)` | `Math.round`; `fps ≤ 0` হলে ত্রুটি |
| `wordState(w, t)` | `upcoming` / `active` (`start ≤ t < end`) / `spoken` (শেষের পর, ফাঁকসহ) |
| `wordProgress(w, t)` | ০..১ — আন্ডারলাইন-wipe/পপের জন্য (S5.4) |
| `activeWordIndex(words, t)` | সক্রিয় শব্দের ইনডেক্স; ফাঁক/আগে/পরে → `-1` |
| `spokenCount(words, t)` | কয়টি শব্দ বলা শেষ |
| `buildPages(words, {maxWords, sections?, leadSec?, audioEndSec?})` | `Page[]` (নিচে) |
| `pageIndexAtTime(pages, t)` | কোন পেজ দেখানো হচ্ছে; শুরুর আগে/শেষের পর → `-1` |
| `visiblePages(pages, t, fadeSec)` | আঁকার পেজ-তালিকা: নতুন পেজের প্রথম `fadeSec`-এ **ক্রসফেড** (আগের পেজ ফেড-আউট + নতুন ফেড-ইন, অপাসিটি যোগফল ১); প্রতিটিতে `ageSec` (শব্দ stagger-এর জন্য) ও `leaving` |
| `pageFrameRange(page, fps)` | `{from, to, durationInFrames}` |
| `sectionSpans(pages)` | সেকশনের প্রথম পেজের শুরু → শেষ পেজের শেষ (লেসন-কার্ড পেজ বদলালেও টিকিয়ে রাখতে) |
| `validatePages(pages, words, maxWords)` | ত্রুটির তালিকা (ফাঁকা = ঠিক) |

`Page` = `{index, words, firstWordIndex, lastWordIndex, startSec, endSec, speechStartSec, speechEndSec, sectionId, sectionKind, section|null, isFirstInSection, isLastInSection}`। প্রতিটি শব্দ `HadisWord` (`index` ধরে রাখে → S5.4 `captionColor(word.index)`-এ রঙ পেজ বদলালেও একই)।

**৩) পেজ ভাঙার নিয়ম (বাস্তবায়িত):** (ক) সেকশন সীমানা, (খ) বিরতি-শব্দের পরে — বিরতি-শব্দ সবসময় পেজের শেষ শব্দ, (গ) `maxWords` ছাড়ালে **সমান-সমান ভাগ** (১১ শব্দ → ৬+৫, ৯+২ নয়)।
**সময়:** `startSec = max(প্রথম শব্দ − 0.15, আগের পেজের শেষ শব্দের শেষ)`; `endSec` = পরের পেজের `startSec` (শেষ পেজে অডিও শেষ ৩৮.৩২)। ফলে সাইলেন্সের ফাঁকে আগের পেজ ধরে রাখা হয় — ফাঁকা পর্দা নেই; ফাঁকহীন জায়গায় lead আপনাআপনি ছাঁটা যায়।

**৪) আসল ডেটায় ফল (synced টাইমিং):**
- **১৬:৯ (`maxWords 9`): ১৬ পেজ** — A: ৪,৮,২,৬,৫,৯ · B: ৩ · C: ৫,৭,৬,৬,৬ · D: ২,৩,৬,৫।
- **৯:১৬ (`maxWords 6`): ১৯ পেজ** — A: ৪,৪,৪,২,৬,৫,৫,৪ · B: ৩ · C: ৫,৪,৩,৬,৬,৬ · D: ২,৩,৬,৫।
- ১৬:৯ পেজ-সময়: #০ 0.00→2.27, #১ 2.27→5.48, #২ 5.48→6.38, … #৬ (আরবি B) 15.64→17.91, #৭ (C শুরু) 17.91→20.49, #১২ (D শুরু) 31.11→32.20, #১৫ 35.88→38.32।

**৫) পরিকল্পনা থেকে পরিবর্তন/সংযোজন:**
- **সমান ভাগ** (পরিকল্পনায় শুধু "`maxWords` পূর্ণ হলে" ছিল — এতে ৯+২-এর মতো এক-দুই শব্দের এতিম পেজ হতো)।
- নতুন: `wordState`, `wordProgress`, `spokenCount`, `visiblePages` (ক্রসফেড), `pageFrameRange`, `sectionSpans`, `validatePages` — S5.4/S5.7 সরাসরি ব্যবহার করবে।
- `endSec` = পরের পেজের শুরু (পরিকল্পনার "ফাঁকে আগেরটি ধরে রাখা")।
- ⚠️ **সেকশন B-র আরবি ও পেজ-সময়:** পেজ #৬ (B) ১৫.৬৪ থেকে দেখায় (শব্দ ১৫.৭৯৫ − lead; আগের পেজ #৫ ততক্ষণ "শুনেছি:" ধরে রাখে)। `ArabicBlock` (S5.3) নিজের সময় `getSectionTiming('B')` থেকে নেবে — এই পেজ-সময় ক্যাপশনের জন্য।

**৬) টেস্ট (এই সেশনে সত্যিই চালানো):**
- ✅ `tsc --noEmit --strict` (timing.ts + hadis-data.ts) — কোনো এরর নেই।
- ✅ Node (type-stripping) — **৩৪/৩৪ পাস:** পেজ-সংখ্যা/আকার (১৬:৯ ও ৯:১৬ হাতে-গোনা মানের সাথে মিলেছে); `validatePages` উভয়ে ফাঁকা; ফাঁকে lead (পেজ১ শুরু 2.27); ফাঁকহীনে lead ছাঁটা (5.476); প্রথম পেজ ০, শেষ পেজ ৩৮.৩২; **১১৫০ ফ্রেমের প্রতিটিতে পেজ আছে (ফাঁকা ফ্রেম ০)**; ক্রসফেডে অপাসিটি যোগফল ১; `wordState` সীমানা; `wordProgress`; `activeWordIndex` ফাঁকে −১; `secToFrame(38.32,30)=1150`; অবৈধ `maxWords` (০, −১, ২.৫) ত্রুটি; ফাঁকা ইনপুট → `[]`; নেগেটিভ টেস্ট (ভাঙা পেজ `validatePages` ধরে)।
- (নোট: প্রথম রানে ২টি টেস্ট ফেইল করেছিল — আমার হাতে-গোনা প্রত্যাশায় C সেকশনের পেজ-সংখ্যা ভুল ধরেছিলাম (৪ নয়, ৫)। যোগ করে মেলানো হয়েছে (৫+৭+১২+৬=৩০ শব্দ); `timing.ts` বদলায়নি, টেস্ট ঠিক করা হয়েছে।)

**৭) বাধা/সতর্কতা:**
- ⚠️ সব ফাংশন "অডিওর শুরু থেকে সেকেন্ড" ধরে — `<Sequence from=…>`-এর ভেতরে `useCurrentFrame()` স্থানীয় ফ্রেম দেয়; তাই S5.7-এ অফসেট যোগ করে `currentSec` দিতে হবে (অথবা Sequence ব্যবহারই করা হবে না)।
- ৯:১৬-তে "তিনি বলেন," (২ শব্দ) ও D-র "মনে রাখবেন," (২ শব্দ) ছোট পেজ — স্বাভাবিক (বিরতি-নিয়ম); S8.1-এ চোখে দেখে দেখা হবে।


---

## ফেজ 5 — কম্পোনেন্ট (প্রতিটি একটি ফাইল)

> সবকটি কম্পোনেন্ট: কেবল `useCurrentFrame()`/`interpolate`/`spring` ভিত্তিক অ্যানিমেশন (CSS transition/animation নয়, নইলে রেন্ডারে ঝিলমিল হয়)। লেআউট `width/height` দেখে ১৬:৯ বনাম ৯:১৬ আলাদা।

### - [x] S5.1 — `Background.tsx`
**ডিজাইন (২D, পুরোপুরি কোডে আঁকা SVG/CSS):**
- গাঢ় সবুজ রেডিয়াল গ্রেডিয়েন্ট (`bgDeep → bgMid`) ধীরে নড়া।
- ধীরে ঘোরা **ইসলামী জ্যামিতিক ৮-কোনা তারা প্যাটার্ন** (খুব কম অপাসিটি ০.০৫–০.০৮)।
- উপরে-ডানে সোনালি **অর্ধচন্দ্র** হালকা গ্লো ও ভাসমান ওঠানামা।
- মিটমিট করা তারা (সিড-ভিত্তিক ডিটারমিনিস্টিক র‍্যান্ডম — `Math.random()` **নিষেধ**, রেন্ডার ফ্রেমে ফ্রেমে বদলে যায়)।
- নিচে সাধারণ মসজিদ-সিলুয়েট (গম্বুজ + ২ মিনার, কোডে আঁকা), হালকা সবুজ ছায়া।
- ধীরগতির আলোকরশ্মি (গড অ্যাঙ্গেল ব্লেন্ড)।

**গ্রহণযোগ্যতা:** দুই অনুপাতেই কনটেন্ট-পড়ার মতো কনট্রাস্ট; কোনো `Math.random`।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি ফাইল:** `Background.tsx` (রুটে; ৪৯৩ লাইন)। ইম্পোর্ট: `react`, `remotion` (`AbsoluteFill`, `useCurrentFrame`, `useVideoConfig`), `./theme` (`COLORS`, `getLayout`, `Orientation`)। প্রপস লাগে না — `<Background />`। **এক্সপোর্ট:** `Background`, `mulberry32(seed)` (সিড-ভিত্তিক ডিটারমিনিস্টিক র‍্যান্ডম — S5.6 কাজে লাগাতে পারবে), `BG` (টিউনিং-মান)।

**২) স্তর (নিচ থেকে উপরে) — সবই কোডে আঁকা SVG/CSS, কোনো ছবি/ফাইল নেই:**

| # | স্তর | বিবরণ |
|---|---|---|
| ১ | গ্রেডিয়েন্ট | `bgMid → bgDeep` রেডিয়াল; কেন্দ্র ধীরে নড়ে (পিরিয়ড x 14 সে., y 17 সে.) + ভাসমান এমারেল্ড আভা (অপাসিটি ০.৩) |
| ২ | ইসলামী তারা-গ্রিড | ৮-কোনা তারা {8/2} (বাইরের ব্যাসার্ধ ০.৪৪×গ্রিড, ভেতরে ০.৫× ছোট তারা + কেন্দ্র-বিন্দু), হেক্স-ইট বিন্যাস (গ্রিড ১৬:৯ = 190px, ৯:১৬ = 180px); পাশাপাশি তারা **উল্টো দিকে** ঘোরে (২.৪°/সে.); অপাসিটি ঢেউ **০.০৪৫–০.০৮** (৯ সে. পিরিয়ড) |
| ৩ | আলোকরশ্মি | অর্ধচন্দ্র থেকে নিচে-বামে ৫টি সোনালি রশ্মি; কোণ ±২.৪° দোলে (১২ সে.), উজ্জ্বলতা ধীরে ওঠানামা (৯ সে.); কেন্দ্রে আলফা ০.০৫৫ → দূরে ০ |
| ৪ | মিটমিট তারা | সিড-ভিত্তিক (`mulberry32`) ~৪৬টি (বিন্দু + ৪-কোনা ঝিলিক ~১৮%), উপরের ৭২% এ; পিরিয়ড ২.২–৬.৪ সে.; **ক্যাপশন-ব্লকের পেছনে ম্লান (×০.৩)** |
| ৫ | অর্ধচন্দ্র | সোনালি গ্রেডিয়েন্ট (`goldSoft→gold→goldDeep`), SVG মাস্ক দিয়ে আঁকা, ভেতরে ছোট ঝিলিক-তারা; **ভাসমান ওঠানামা** ±৯px (৬ সে.) ও ±৩.৫° দোলা; পেছনে নরম গ্লো-হ্যালো (আকার ৭×ব্যাসার্ধ, অপাসিটি ০.৩৫–০.৮৫) |
| ৬ | মসজিদ-সিলুয়েট | কেন্দ্রীয় গম্বুজ + ২ মিনার (বারান্দা, সোনালি চূড়া) + ২ পাশের গম্বুজ + ২ ডানা-গম্বুজ; ১৪টি জানালা ডিটারমিনিস্টিক মৃদু ঝিলিক; দুই পাশে **দূরের স্কাইলাইন** (সিড-ভিত্তিক গম্বুজ/মিনার); ভূমি-রেখা; নিচে হালকা সবুজ কুয়াশা (অপাসিটি ওঠানামা); গম্বুজের পেছনে সবুজ আভা |
| ৭ | ভিনিয়েট | কোণায় হালকা অন্ধকার (০.৩৮) |

মসজিদ ১৬:৯-তে স্কেল ১.০ (১২০০px চওড়া), ৯:১৬-তে `width/1200` (= ০.৯, উচ্চতা ≈২৮৮px)। ৯:১৬-তে মসজিদ প্রায় পুরোটাই নিচের ২৫০px সেফ-জোনে (শুধু মিনারের চূড়া ~৩৮px ওপরে) — গুরুত্বপূর্ণ টেক্সট সেখানে নেই; প্রগ্রেস বার (y≈১৬৬০) মসজিদের ওপরে থাকবে।

**৩) পরিকল্পনা থেকে পরিবর্তন/সংযোজন:**
- **"শান্ত অঞ্চল" (quiet zone):** `theme.ts`-এর কারাওকে লেআউট (`centerY`, `size`, `maxLines`, `boxWidthRatio`) থেকে ক্যাপশনের জায়গা হিসাব করে সেখানে তারার অপাসিটি ৩০%-এ নামানো — রঙিন ক্যাপশনের কনট্রাস্ট (D12) রক্ষার জন্য। (পরিকল্পনায় ছিল না।)
- **কনট্রাস্ট সংশোধন:** প্রথম খসড়ায় রশ্মির আলফা ০.১০ ও এমারেল্ড আভা ০.৫৫ ছিল — ক্যাপশন-অঞ্চলে ব্যাকগ্রাউন্ড বেশি উজ্জ্বল হয়ে প্রবাল রঙের কনট্রাস্ট ~৩.১-এ নামছিল। তাই রশ্মি **০.০৫৫**, আভা **০.৩** করা হয়েছে (নিচের মাপ দেখুন)।
- দুটি SVG স্তর (পেছনে: তারা-গ্রিড/রশ্মি/তারা; সামনে: অর্ধচন্দ্র/মসজিদ) — মাঝখানে অর্ধচন্দ্রের গ্লো-হ্যালো বসাতে। SVG `id`-গুলো স্থির `hbg-*` (ক্ল্যাশ এড়াতে; কম্পোজিশনে `Background` একবারই থাকে)।
- দূরের স্কাইলাইন ও জানালার ঝিলিক (পরিকল্পনায় শুধু "মসজিদ-সিলুয়েট, হালকা সবুজ ছায়া" ছিল)।
- অপাসিটি পরিসর ০.০৫–০.০৮-এর বদলে ০.০৪৫–০.০৮ (ঢেউয়ের নিচের প্রান্ত সামান্য কম — আরও সূক্ষ্ম)।

**৪) টেস্ট (এই সেশনে সত্যিই চালানো):**
- ✅ `tsc --strict` — **আসল** `remotion 4.0.340`, `react 18.3.1`, `@types/react 18.3.12`, TypeScript 5.8.3 ইনস্টল করে `Background.tsx` + `theme.ts` + `global.d.ts` টাইপ-চেক: কোনো এরর নেই (শুধু গুগল-ফন্টের ৪টি মডিউল নকল স্টাব — নেটওয়ার্কে সেগুলো নেই)।
- ✅ **রেন্ডার-টেস্ট:** `useCurrentFrame`/`useVideoConfig`/`AbsoluteFill` একটি ছোট শিমে (বাকি সব আসল `remotion` প্যাকেজ থেকে) বসিয়ে React SSR দিয়ে প্রতি ফ্রেমের HTML বানিয়ে **Chromium (Playwright)** স্ক্রিনশট — ১৬:৯ (1920×1080) ও ৯:১৬ (1080×1920), ফ্রেম **০, ১৫০, ৩৬০, ৬০০, ১০০০** — ১০টি ছবি দেখা হয়েছে; মসজিদ, অর্ধচন্দ্র, রশ্মি, তারা-প্যাটার্ন দুই অনুপাতেই ঠিক।
- ✅ **ডিটারমিনিজম:** ফ্রেম ৩০০ → ফ্রেম ৭৭৭ → আবার ফ্রেম ৩০০ — আউটপুট **হুবহু একই** (ক্রম-নিরপেক্ষ, চাঙ্ক-রেন্ডার নিরাপদ); ফ্রেম ৩০০ ≠ ৩০১ (সত্যিই অ্যানিমেট হচ্ছে)। সোর্সে `Math.random`, `Date`, CSS `transition`/`animation` — **০টি** (grep)।
- ✅ **কনট্রাস্ট (রেন্ডার করা ছবির ক্যাপশন-অঞ্চলে পিক্সেল-মাপ, WCAG; ফ্রেম ০–১০০০-এর সবচেয়ে খারাপ):** ব্যাকগ্রাউন্ড লুমিন্যান্সের মিডিয়ান 0.039–0.043 (bgMid নিজে 0.052)। **সবচেয়ে সংকটজনক রঙ প্রবাল `#FF9580`:** মিডিয়ান পিক্সেলে **৫.৩–৫.৫**, ৯৫% পিক্সেলে **≥ ৪.৭**, ৯৯% পিক্সেলে **≥ ৪.২৭** (সবচেয়ে উজ্জ্বল ১% = তারা-গ্রিডের সোনালি রেখা); ল্যাভেন্ডার ৯৯%-এ ≥ ৪.৪৫। সাদা (আসছে, ৫৫%) ≥ ৬.৬। **অর্থাৎ ১% সবচেয়ে উজ্জ্বল পিক্সেলে প্রবাল ৪.৫-এর সামান্য নিচে (৪.২৭) নামে** — গাঢ় `ink` আউটলাইন (০.০৬em, S5.4) এটি পুষিয়ে দেবে; S8.1-এ চোখে দেখে নিশ্চিত করা হবে।

**৫) বাধা/সতর্কতা:**
- ⚠️ আসল `remotion still/render` এখানে চালানো যায়নি (Remotion-এর Chrome ডাউনলোড নেটওয়ার্কে বন্ধ) — রেন্ডার-টেস্ট শিম + SSR + সিস্টেম Chromium দিয়ে। আসল রেন্ডার CI-তে (S7.1 প্রিভিউ স্টিল) নিশ্চিত হবে; বিশেষত **৪K (`--scale=2`)**-এ SVG পরিষ্কার আঁকা ও রেন্ডার-গতি।
- ⚠️ কম্পোজিশনে প্রায় ২০০টি SVG পলিগন/প্রতি ফ্রেম পুনঃআঁকা হয় — রেন্ডার ধীর হলে (S8.2/S8.3) `StarGrid`-এর গ্রিড বাড়ানো (`gridS`) বা ফ্রেমে-ফ্রেমে অপাসিটি ঢেউ বন্ধ করা যাবে (শুধু `BG`/`StarGrid`-এ বদলাবে)।
- অর্ধচন্দ্র ডানে-উপরে ১৬:৯-তে লোগো-ব্যাজের (মাঝখানে) সাথে ওভারল্যাপ করে না; ৯:১৬-তে সেফ-জোনের ওপরের ১৫০px-এ অলঙ্করণ হিসেবে আছে (গুরুত্বপূর্ণ টেক্সট নয়, তাই ঠিক)।
- **S8.1 চেকে** যোগ করার মতো: ৪K-তে তারা-প্যাটার্ন খুব ম্লান/বেশি স্পষ্ট লাগছে কি না; মসজিদের চূড়া-ফিনিয়াল গম্বুজের সাথে ঠিকমতো লেগে আছে কি না।

### - [x] S5.2 — `Header.tsx` (লোগো + শিরোনাম) — *অ্যাপ লোগো উপরে*
**ডিজাইন:**
- `import logo from './logo.jpg'`; `<Img src={logo}>` (Remotion `Img`)।
- লোগো **সাদা রাউন্ডেড ব্যাজে** (সোনালি বর্ডার, নরম শ্যাডো), উপরের মাঝখানে। উচ্চতা: ১৬:৯ ≈ ১৭০px, ৯:১৬ ≈ ২২০px।
- ব্যাজের পাশে/নিচে **"S2" চিপ** (সোনালি পিল)।
- নিচে: "**আজকের হাদিস**" (বড়, সোনালি) এবং পিল-ট্যাগ "**সহিহ বুখারী • হাদিস নং: ০১**"।
- এন্ট্রান্স: লোগো স্প্রিং স্কেল-ইন (০–০.৮ সে.), শিরোনাম নিচ থেকে ফেড-আপ (০.৩–১.০ সে.), পিল ডানদিক থেকে স্লাইড (০.৬–১.২ সে.)।
- ৯:১৬-তে শীর্ষে ১৫০px সেফ-জোন বজায়।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি ফাইল:** `Header.tsx` (রুটে)। ইম্পোর্ট: `react`, `remotion` (`Easing`, `Img`, `interpolate`, `spring`, `useCurrentFrame`, `useVideoConfig`), `./logo.jpg` (`global.d.ts`-এর টাইপে), `./hadis-data` (`TITLE`, `SOURCE_LINE`, `SEASON`), `./theme` (`COLORS`, `FONTS`, `FONT_WEIGHTS`, `GRADIENTS`, `RADIUS`, `getLayout`, `getUnit`)। **এক্সপোর্ট:** `Header`, `HeaderProps = {opacity?: number}`, `HEADER_TIMING`। সব মাপ/অবস্থান `getLayout().header` থেকে, টেক্সট `hadis-data.ts` থেকে — এই ফাইলে হাতে লেখা নেই।

**২) ডিজাইন (যা বাস্তবায়িত):**

| অংশ | বিবরণ |
|---|---|
| লোগো-ব্যাজ | `logo.jpg` (720×720) **সাদা রাউন্ডেড বর্গ ব্যাজে** (D8), সোনালি বর্ডার (≈৪px), কোণ-ব্যাসার্ধ ≈৩৬px, নিচে নরম শ্যাডো + সোনালি গ্লো (আলফা ০.১৮–০.৪৬ ধীরে ওঠানামা, ৩.৫ সে. পিরিয়ড); ব্যাজ-মাপ ১৬:৯ = ১৫০px, ৯:১৬ = ২২০px (`theme.ts`-এর `logoHeight`); ভেতরে লোগো `objectFit: contain` (১৬:৯ ≈ ১১৮px, ৯:১৬ ≈ ১৮৮px) |
| "S2" চিপ | সোনালি গ্রেডিয়েন্ট পিল, `ink` রঙের লেখা (কনট্রাস্ট ৯.১৫), ফন্ট ~~Hind Siliguri~~ → Anek Bangla ৬০০ (S5.4-এ বদল); ব্যাজের **ডানে (বাইরে)**, ব্যাজের নিচের কিনারা থেকে ১০px ওপরে; `position:absolute` তাই হেডারের উচ্চতা/ব্যাজের মাঝ-সারিবদ্ধতা বদলায় না |
| শিরোনাম | "আজকের হাদিস" — Noto Serif Bengali ৭০০, ১৬:৯ = ৫৬px / ৯:১৬ = ৮৪px, **সোনালি গ্রেডিয়েন্ট লেখা** (`background-clip:text`), নরম ড্রপ-শ্যাডো; লাইন-হাইট ১.৪ + ০.০৬em padding (যাতে বাংলা মাত্রা/ঊর্ধ্ব-চিহ্ন কাটা না পড়ে) |
| সোর্স পিল | "সহিহ বুখারী • হাদিস নং: ০১" — ~~Hind Siliguri~~ → Anek Bangla ৫০০ (S5.4-এ বদল), ১৬:৯ = ৩০px / ৯:১৬ = ৩৮px, goldSoft লেখা, গাঢ় সবুজ আধা-স্বচ্ছ পিল, `COLORS.line` বর্ডার |
| এন্ট্রান্স | লোগো **স্প্রিং স্কেল-ইন ০–০.৮ সে.** (ঈষৎ ওভারশুট ১.০৯ পর্যন্ত, ফ্রেম ৩০-এ ১.০ স্থির); চিপ ০.৫ সে. থেকে স্প্রিং-পপ; শিরোনাম **০.৩–১.০ সে.** নিচ থেকে ৪০px উঠে ফেড-ইন (ease-out cubic); পিল **০.৬–১.২ সে.** ডান থেকে ১৪০px স্লাইড ও ফেড-ইন। ফ্রেম ৩৬ (১.২ সে.)-এর পর সব স্থির |

**৩) মাপ/জ্যামিতি (রেন্ডার করা ছবিতে `getBoundingClientRect` মাপা, স্থির অবস্থায়, উপরে-বামে (বাম, উপর, ডান, নিচ)):**

| অংশ | ১৬:৯ (1920×1080) | ৯:১৬ (1080×1920) |
|---|---|---|
| ব্যাজ | 885, 36 → 1035, 186 | 430, 170 → 650, 390 |
| S2 চিপ | 1053, 130 → 1123, 176 | 668, 327 → 746, 380 |
| শিরোনাম | 784, 200 → 1136, 285 | 277, 412 → 803, 540 |
| পিল | 780, 299 → 1140, 359 | 320, 562 → 760, 633 |
| **হেডারের নিচ** | **359** (আরবি `top` 372 — ফাঁক ১৩px) | **633** (আরবি `top` 640 — ফাঁক ৭px) |

- ৯:১৬-তে ব্যাজের উপর y=170 ≥ সেফ-জোন ১৫০ ✔; সব ক্ষেত্রে কনটেন্ট ক্যানভাসের ভেতরে (সবচেয়ে চওড়া = পিল ৪৪০px, ৯:১৬-র ১০৮০-র মাত্র ৪১%) ✔। ব্যাজ ঠিক পর্দার মাঝখানে (ক্যানভাস-মাঝ ± ০)।

**৪) পরিকল্পনা থেকে পরিবর্তন/সংযোজন:**
- **লোগো-উচ্চতা:** ডিজাইন-নোটে ১৬:৯ ≈ ১৭০px ছিল, কিন্তু S4.2-এর `theme.ts` টোকেন (`logoHeight` ১৫০) ও আরবি-ব্লকের `top` 372 মেনে চলতে **১৫০px** ব্যবহার করা হয়েছে (১৭০ করলে হেডার আরবির সাথে ঠেকে যেত)।
- **S2 চিপ ব্যাজের "পাশে"** (ডানে, বাইরে) — "নিচে" নয়, কারণ নিচে বসালে শিরোনামের সাথে ওভারল্যাপ হতো ও হেডারের উচ্চতা বাড়ত।
- নতুন `opacity` প্রপ (আউটরো ফেড-আউটের জন্য — S6.1/S5.6) ও `HEADER_TIMING` এক্সপোর্ট (পরিকল্পনায় ছিল না)।
- শিরোনামে সোনালি **গ্রেডিয়েন্ট** (পরিকল্পনায় শুধু "সোনালি") — `GRADIENTS.gold` থেকে।
- ব্যাজের সোনালি গ্লো ধীরে ওঠানামা (ডিটারমিনিস্টিক, `sin(frame)`)।

**৫) টেস্ট (এই সেশনে সত্যিই চালানো):**
- ✅ `tsc --strict` — আসল `remotion 4.0.340`/`react 18.3.1`/TypeScript 5.8.3 টাইপে `Header.tsx` + `hadis-data.ts` (+JSON ইম্পোর্ট) + `theme.ts` + `Background.tsx` + `global.d.ts` — কোনো এরর নেই (শুধু গুগল-ফন্টের ৪টি মডিউল নকল স্টাব)।
- ✅ **রেন্ডার-টেস্ট (React SSR + Chromium/Playwright; `Img` শুধু সাধারণ `<img>` শিমে — S5.1-এর মতোই):** ১৬:৯ ও ৯:১৬, ফ্রেম ০, ৬, ১২, ১৮, ২৪, ৩৬, ৬০, ১২০ — ১৬টি স্টিল; স্থির ফ্রেম (১২০) চোখে দেখা: লোগো ব্যাজে স্পষ্ট, শিরোনাম/পিল পরিষ্কার, বাংলা যুক্তাক্ষর অক্ষত। **আসল ফন্ট দিয়ে** (`@fontsource` থেকে Noto Serif Bengali ৭০০ ও ~~Hind Siliguri~~ ৫০০/৬০০ (তখনকার টেস্ট; এখন বাদ) — Chromium-এ `loaded` নিশ্চিত) — তাই মাপগুলো বাস্তবের কাছাকাছি।
- ✅ **অ্যানিমেশন-মান (সংখ্যায়):** ফ্রেম ০: লোগো-স্কেল ০, শিরোনাম অপাসিটি ০, পিল +১৪০px; ফ্রেম ১২: লোগো ১.০৮, শিরোনাম ০.৩৭; ফ্রেম ২৪: লোগো ০.৯৯৬, শিরোনাম ০.৯৮, পিল +৪১px, চিপ ১.০৮; ফ্রেম ৩৬ ও পরে: লোগো/শিরোনাম/চিপ ১, পিল ০ — স্থির।
- ✅ **ডিটারমিনিজম:** ফ্রেম ৬০ → ৫ → ৬০ আউটপুট হুবহু একই; সোর্সে `Math.random`/`Date`/CSS `transition`/`animation` — **০টি** (grep)।

**৬) বাধা/সতর্কতা:**
- ⚠️ **৯:১৬-তে হেডার ও আরবি ব্লকের ফাঁক মাত্র ৭px** (বক্স-ভিত্তিক; আসল লেখা-সীমা আরও বেশি ফাঁক রাখবে)। S5.3-এ আরবির স্টিল দেখে ঠিক করুন; দরকারে `theme.ts`-এ `portrait.arabic.top` 640 → ~670 (কারাওকে ব্লক y≈৯৬৩ থেকে শুরু, তাই জায়গা আছে)।
- ⚠️ আসল `remotion still/render`-এ `Img` কম্পোনেন্ট ছবি লোড না হওয়া পর্যন্ত রেন্ডার আটকে রাখে (স্বাভাবিক); লোগো `import`-করা (বান্ডলে), তাই নেটওয়ার্ক-নির্ভর নয়। প্রকৃত রেন্ডার CI-তে (S7.1) নিশ্চিত হবে।
- ⚠️ ফন্ট (Noto Serif Bengali/~~Hind Siliguri~~ → Anek Bangla) গুগল-ফন্ট প্যাকেজ থেকে CI-তে লোড হবে; এখানে নকল স্টাব + `@fontsource`-এর সমতুল্য ফাইল দিয়ে টেস্ট — মডিউল-নাম/weight CI-তে নিশ্চিত হবে (S4.2-এর পূর্ব-সতর্কতা অপরিবর্তিত)।
- ৪K (`--scale=2`)-তে লোগো তীক্ষ্ণ কি না S8.1/S8.3-এ দেখতে হবে: ব্যাজ-ভেতরের লোগো ১৬:৯-তে ≈১১৮px ×২ = ২৩৬px, ৯:১৬-তে ≈১৮৮ ×২ = ৩৭৬px — সবই ৭২০px মূল ছবির কম (S2.3 বিশ্লেষণ অনুযায়ী ঝাপসা হবে না)।

### - [x] S5.3 — `ArabicBlock.tsx` *(S3.1 সিদ্ধান্ত অনুযায়ী সরলীকৃত)*
**ডিজাইন:**
- ফন্ট Amiri, RTL (`direction: rtl`), সোনালি/ক্রিম রঙ, লাইন-হাইট বড় (হারাকাত কাটা না যায়)।
- **শুধু সেকশন B (synced টাইমিং অনুযায়ী ১৫.৭৯৫–১৭.৫৪৪ সে.; সময় `getSectionTiming('B')` থেকে নেবে, হাতে লিখবে না):** আংশিক অংশ "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ" উজ্জ্বল গ্লো সহ বড় আকারে স্কেল/ফেড-ইন; শেষে ধীর ফেড-আউট।
- **অন্য সময় কিছু দেখানো হবে না** (পূর্ণ আরবি পাঠ বাতিল)।
- ভেতরে সোনালি আলংকারিক ডিভাইডার (SVG রেখা + মাঝে ছোট হীরা)।
- (আপনি আরবি লিপি বাদ দিতে চাইলে এই কম্পোনেন্ট বাদ যাবে।)

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি/পরিবর্তিত ফাইল:**
- **তৈরি:** `ArabicBlock.tsx` (রুটে)। ইম্পোর্ট: `react`, `remotion` (`interpolate`, `interpolateColors`, `spring`, `useCurrentFrame`, `useVideoConfig`), `./hadis-data` (`ARABIC_PARTIAL`, `WORDS`, `getSection`, `getSectionTiming`), `./theme` (`COLORS`, `FONTS`, `FONT_WEIGHTS`, `LINE_HEIGHT`, `getLayout`, `getUnit`), `./timing` (`frameToSec`, `wordProgress`, `wordState`)। **এক্সপোর্ট:** `ArabicBlock`, `ArabicBlockProps = {opacity?: number; timeOffsetSec?: number}`, `ARABIC_TIMING`, `getArabicWindow()`। আরবি লেখা `ARABIC_PARTIAL` থেকে, সময় `getSectionTiming('B')` থেকে — এই ফাইলে হাতে লেখা কোনো সময়/টেক্সট নেই।
- **পরিবর্তিত:** `theme.ts` — শুধু `LAYOUTS.*.arabic.top` (নিচে ৩ ও ৪ দেখুন)। অন্য কোনো ফাইল বদলায়নি।

**২) ডিজাইন (যা বাস্তবায়িত):**

| অংশ | বিবরণ |
|---|---|
| আরবি লেখা | "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ" — Amiri ৭০০, `dir="rtl"`, লাইন-হাইট ২.০ (`LINE_HEIGHT.arabic`; হারাকাত/শাদ্দা কাটা পড়ে না), `letter-spacing: 0`, শব্দ ৩টি আলাদা `inline-block` (RTL — প্রথম শব্দ ডানে); মাপ `theme.ts` থেকে: ১৬:৯ = ৮৪px/ঘরের চওড়া ৮০%, ৯:১৬ = ৯৬px/৮৮% |
| রঙ | ক্রিম (`COLORS.cream`) → সক্রিয় শব্দ **goldSoft** (`interpolateColors`) + সোনালি `textShadow` গ্লো; সক্রিয় শব্দ ১.০৬× বড় |
| শব্দ-সিঙ্ক | আরবির i-তম শব্দ ↔ সেকশন B-র i-তম বাংলা-উচ্চারণ শব্দ (ইন্নামাল / আ'মালু / বিন-নিয়্যাত; `validateHadisData()` গণনা মিলিয়ে দেখে)। *এখন বলা হচ্ছে* → উজ্জ্বল সোনালি (ঢোকা-বেরোনো মসৃণ); *বলা হয়ে গেছে* → ০.৩৫ সোনালি ছোঁয়া; *আসছে* → ক্রিম |
| ঢোকা | সেকশন B-র প্রথম শব্দের **০.২৫ সে. আগে** (≈ ১৫.৫৪৫) থেকে: ফেড-ইন ০.৫ সে. + স্প্রিং স্কেল ০.৮২→১ |
| গ্লো-হ্যালো | লেখার পেছনে নরম সোনালি রেডিয়াল আভা, ধীরে ওঠানামা (৩ সে. পিরিয়ড, `sin`) |
| ধরে রাখা | সেকশন B শেষ (১৭.৫৪৪) পর্যন্ত |
| যাওয়া | ১৭.৫৪৪ + ০.১ থেকে **০.৮ সে. ধীর ফেড-আউট** (smoothstep) + ১.০৫× পর্যন্ত সামান্য বড় হয়ে মিলিয়ে যাওয়া → শেষ ≈ ১৮.৪৪ সে. (C-র প্রথম শব্দ ১৮.০৬৪-এ শুরু; ০.৩৮ সে. হালকা ওভারল্যাপ — আরবি ওপরে, ক্যাপশন নিচে, তাই সংঘর্ষ নেই) |
| ডিভাইডার | লেখার নিচে SVG: মাঝখানে সোনালি **হীরা** + দুই পাশে ছোট বিন্দু + দুই দিকে সোনালি রেখা (প্রান্তে মিলিয়ে যায়); ০.২ সে. পর থেকে ০.৫৫ সে. ধরে মাঝ থেকে বাইরে **আঁকা হয়** |
| অন্য সময় | **কিছুই আঁকে না** (`null`) — পূর্ণ আরবি পাঠ বাতিল (S3.1) |
| প্রপস | `opacity` (আউটরো ফেড-আউট) ও `timeOffsetSec` (Sequence অফসেট — S5.7) |

**৩) মাপ/জ্যামিতি (রেন্ডার করা ছবিতে `getBoundingClientRect` মাপা; আসল Amiri ফন্টে):**

| | ১৬:৯ (1920×1080) | ৯:১৬ (1080×1920) |
|---|---|---|
| হেডারের নিচ (পিল) | 359 | 633 |
| আরবি ব্লক (স্থির অবস্থায়) | y = 392 → 574 (লেখা 392–540, ডিভাইডার ≈ 562) | y = 675 → 879 |
| ফেড-আউট শুরুতে সবচেয়ে বড় | 389 → 578 | 672 → 884 |
| কারাওকে ব্লক শুরু (S4.2) | ≈ 621 | ≈ 963 |
| **দৃশ্যমান ফাঁক (হেডার↔আরবির উপরের হারাকাত)** | ≈ ৪০px | ≈ ৫৫px |
| আরবি↔কারাওকে ফাঁক | ≥ ৪০px | ≥ ৭৯px |

**৪) পরিকল্পনা থেকে পরিবর্তন/সংযোজন:**
- **`theme.ts` বদল (S5.2-এর সতর্কতা অনুযায়ী):** প্রথম স্টিলে (top ৩৭২/৬৪০) আরবির উপরের শাদ্দা/ফাতহা হেডার-পিলের খুব কাছে ছিল — ৯:১৬-তে ≈২০px, ১৬:৯-ও ঠাসা। তাই `arabic.top` ১৬:৯ **372→392**, ৯:১৬ **640→675**। কারাওকে বা অন্য ব্লকের জায়গা কমেনি (উপরের টেবিল)। `Background.tsx` শুধু কারাওকে-লেআউট পড়ে, তাই তার কিছু বদলাতে হয়নি।
- **শব্দ-ভিত্তিক হাইলাইট** (পরিকল্পনায় শুধু "উজ্জ্বল গ্লো সহ স্কেল/ফেড-ইন" ছিল) — উচ্চারণের সাথে আরবির শব্দ জ্বলে ওঠে, যাতে দর্শক শুনতে শুনতে পড়তে পারে।
- **গ্লো-হ্যালো, `timeOffsetSec` প্রপ, `getArabicWindow()`, `ARABIC_TIMING` এক্সপোর্ট** (পরিকল্পনায় ছিল না; S5.7/S6.1-এর কাজে লাগবে)।
- ডিভাইডার **লেখার নিচে** (ওপরে নয়) — ওপরে বসালে হেডারের সাথে ফাঁক আরও কমত।
- ফেড-আউট ০.৮ সে. + ০.১ সে. দেরি: "ধীর" রাখতে, আবার C-র প্রথম শব্দের আগেই প্রায় মিলিয়ে যেতে।

**৫) টেস্ট (এই সেশনে সত্যিই চালানো):**
- ✅ `tsc --strict` — **আসল** `remotion 4.0.340`, `react 18.3.1`, `@types/react 18.3.12`, TypeScript 5.8.3-এ `ArabicBlock.tsx` + `Header.tsx` + `Background.tsx` + `theme.ts` + `timing.ts` + `hadis-data.ts` (+ synced JSON ইম্পোর্ট) + `global.d.ts` — কোনো এরর নেই (শুধু গুগল-ফন্টের ৪টি মডিউল নকল স্টাব)।
- ✅ **রেন্ডার-টেস্ট (React SSR + Chromium/Playwright; শিমে শুধু `useCurrentFrame`/`useVideoConfig`/`AbsoluteFill`/`Img` — `interpolate`/`spring`/`interpolateColors` আসল `remotion` থেকে):** ১৬:৯ ও ৯:১৬, শুধু আরবি (ফ্রেম ৪৬৫, ৪৭০, ৪৮০, ৪৯৮, ৫১৬, ৫৩৭, ৫৪৯, ৫৬০) এবং `Background` + `Header` + `ArabicBlock` একসাথে (ফ্রেম ৪৬৮, ৪৮০, ৪৯৮, ৫১৬, ৫৩৭, ৫৪৯) — মোট ৩২টি স্টিল; এর মধ্যে ১৬:৯ ও ৯:১৬ চোখে দেখা (সংশোধনের আগে ও পরে)। **আসল Amiri ফন্টে** (`@fontsource/amiri` ৭০০ — Chromium-এ `loaded` নিশ্চিত): হারাকাত/শাদ্দা অক্ষত, RTL ক্রম ঠিক (إِنَّمَا ডানে), সক্রিয় শব্দ সোনালি, ডিভাইডার ও হ্যালো পরিষ্কার।
- ✅ **সময়-জানালা:** পুরো ১২০০ ফ্রেম স্ক্যান — দৃশ্যমান **ফ্রেম ৪৬৭–৫৫২ (৮৬ ফ্রেম, ধারাবাহিক)**, বাকি সব ফ্রেমে ফাঁকা (`null`)।
- ✅ **শব্দ-হাইলাইট:** ফ্রেম ৪৮০ → শব্দ ১, ৪৯৮ → শব্দ ২, ৫১৬ → শব্দ ৩ — ঠিক একটি শব্দ ১.০৬× (সক্রিয়)।
- ✅ **ডিটারমিনিজম:** ফ্রেম ৫০০ → ৭৭৭ → ৩০০ → ৫০০ আউটপুট **হুবহু একই** (ক্রম-নিরপেক্ষ, চাঙ্ক-রেন্ডার নিরাপদ); ৫০০ ≠ ৫০১ (সত্যিই অ্যানিমেট)।
- ✅ **প্রপস:** `timeOffsetSec={1}` + স্থানীয় ফ্রেম ৪৭০ ≡ গ্লোবাল ফ্রেম ৫০০ (হুবহু একই); `opacity={0}` → `null`; `opacity={0.5}` প্রয়োগ হয়।
- ✅ আরবি ৩ শব্দ হারাকাতসহ HTML-এ অক্ষত। মোট লজিক-টেস্ট **১৫/১৫ পাস**। সোর্সে `Math.random`/`Date`/CSS `transition`/`animation` — **০টি** (grep)।

**৬) বাধা/সতর্কতা:**
- ⚠️ আসল `remotion still/render` এখানে চালানো যায়নি (Remotion-এর Chrome ডাউনলোড ও গুগল-ফন্ট নেটওয়ার্কে বন্ধ) — রেন্ডার-টেস্ট শিম + SSR + সিস্টেম Chromium দিয়ে। আসল রেন্ডার ও **Amiri-র গুগল-ফন্ট মডিউল/সাবসেট (`arabic`)** CI-তে (S7.1) নিশ্চিত হবে; ফন্ট না লোড হলে আরবি ফলব্যাক serif-এ পড়বে।
- ⚠️ **আরবি↔বাংলা শব্দ-জোড়া আনুমানিক:** বাংলা "ইন্নামাল" আসলে "إِنَّمَا" + "ال"-এর শুরু; তাই আরবি শব্দ ২-এর হাইলাইট "আ'মালু"-র সময়ে জ্বলে (শব্দ-সংখ্যা ৩=৩ হওয়ায় সূচক ধরে মেলানো)। উচ্চারণের সাথে এক-দুই ফ্রেমের হেরফের হলে S8.1/S8.2-এ দেখে নিন।
- ⚠️ আরবি ১৬:৯-তে `top` ৩৯২ হওয়ায় ডিভাইডার ≈ ৫৬২ — ক্যাপশন (২ লাইন, ≈ ৬২১) থেকে ≥ ৪০px দূরে; S5.4-তে কারাওকে `size`/`centerY` বাড়ালে এই ফাঁক আবার দেখে নিন (`theme.ts`)।
- ফেড-আউটের শেষ প্রান্তে (১৮.০৬–১৮.৪৪ সে.) আরবি ও C-র প্রথম ক্যাপশন একসাথে ঝাপসা অবস্থায় থাকে — S8.1/S8.2-এ চোখে ঠিক লাগছে কি না দেখুন; ভারী লাগলে `ARABIC_TIMING.outSec` ০.৮ → ০.৫ করুন (শুধু এক জায়গা)।

### - [x] S5.4 — `Karaoke.tsx` (কালারফুল অ্যানিমেটেড বাংলা ক্যাপশন — মূল কম্পোনেন্ট) *(D11 অনুযায়ী সংশোধিত)*
**ইনপুট:** `timing.ts`-এর `buildPages` (পেজ), `visiblePages(pages, currentSec, fadeSec)` (ক্রসফেড; `fadeSec = CAPTION.pageFade / fps`), `wordState`/`wordProgress` (শব্দের অবস্থা ও আন্ডারলাইন-wipe), `sectionSpans` (লেসন-কার্ড টিকিয়ে রাখা); `hadis-data.ts`-এর `HadisWord`; `theme.ts`-এর `FONTS.caption` (**Anek Bangla**), `CAPTION`, `captionColor`, `withAlpha`, `COLORS`।
**ডিজাইন:**
- বর্তমান পেজের শব্দগুলো বাংলা গুগল ফন্টে (`FONTS.caption`, ওজন ৭০০; সক্রিয় শব্দ ৮০০) মাঝ-সারিবদ্ধ (লাইন র‍্যাপ, ১৬:৯ সর্বোচ্চ ২ লাইন, ৯:১৬ সর্বোচ্চ ৩ লাইন)।
- **প্রতিটি শব্দের নিজস্ব রঙ:** `captionColor(word.index)` (৮-রঙা চক্র, ডিটারমিনিস্টিক; পেজ বদলালেও শব্দের রঙ একই)।
- **শব্দ অবস্থা:**
  - *আসছে (এখনো বলা হয়নি)* → সাদা, ~৫৫% অপাসিটি (`CAPTION.upcoming`)
  - *এখন বলা হচ্ছে* → শব্দের **নিজের রঙে উজ্জ্বল** + **স্প্রিং পপ** (১.০ → `popScale 1.18` → `settleScale 1.08`) + পেছনে শব্দের রঙের স্বচ্ছ **রঙিন পিল** (`withAlpha(রঙ, 0.22)`) + **রঙিন আন্ডারলাইন** যা শব্দের `start→end` সময়ে বাঁ থেকে ডানে ঢোকে (wipe) + রঙিন **গ্লো** (`textShadow`)
  - *বলা হয়ে গেছে* → নিজের রঙ ধরে রাখে (পপ/পিল/আন্ডারলাইন ছাড়া, গ্লো কমে যায়) — অর্থাৎ ক্যাপশন যত এগোয় তত রঙিন হয়
- **এন্ট্রান্স অ্যানিমেশন** (`visiblePages`-এর `ageSec` থেকে): নতুন পেজে শব্দগুলো একে একে নিচ থেকে `riseY 18px` উঠে + ফেড-ইন (শব্দ-প্রতি `stagger 2` ফ্রেম, `duration 8`); পেজ বদলে ফেড-আউট/ইন `pageFade 5` ফ্রেম।
- **পড়ার যোগ্যতা:** সব শব্দে গাঢ় `ink` আউটলাইন (`paint-order: stroke fill`, ০.০৬em) ও নরম ছায়া; সব রঙ bgMid-এর ওপর কনট্রাস্ট ≥ ৪.৮৩।
- **সেকশন-ভিত্তিক স্টাইল:** `narration` সাধারণ; `translation` বড় (মূল মাপ); `lesson` ("মনে রাখবেন …") আলাদা **সোনালি-বর্ডার কার্ড + "শিক্ষা" লেবেল** (`LESSON_LABEL`) — কার্ডের ভেতরেও রঙিন শব্দ।
- **ফাঁকের (সাইলেন্স) সময়:** কোনো শব্দ সক্রিয় নয়; আগের পেজ ও আগের শব্দ "বলা হয়ে গেছে" অবস্থায় দেখানো থাকে (S3.3/S4.4 নিয়ম)।
- বাংলা যুক্তাক্ষর ঠিক রাখতে শব্দ আলাদা `<span>` হলেও `letter-spacing: 0`, `font-kerning: normal`; **শব্দের ভেতর কখনো কাটা নয়**; রঙিন পিলের padding `em`-এ (লাইন-হাইট ১.৫৫ বজায়)।
- **নিয়ম:** শুধু `useCurrentFrame()`/`spring`/`interpolate` — CSS transition/animation ও `Math.random` **নিষেধ** (রেন্ডারে ঝিলমিল হয়)।

**গ্রহণযোগ্যতা:** স্টিল ফ্রেমে (৫, ১২, ২০, ৩৩ সে.) বাংলা অক্ষর ভাঙা নয়, রঙ-কনট্রাস্ট ভালো, সক্রিয় শব্দের পপ/পিল দৃশ্যমান; পাশাপাশি দুই শব্দ একরঙা নয়; ফন্ট সত্যিই Anek Bangla হিসেবে লোড (ফলব্যাক নয়)।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি/পরিবর্তিত ফাইল:**
- **তৈরি:** `Karaoke.tsx` (রুটে)। ইম্পোর্ট: `react`, `remotion` (`spring`, `useCurrentFrame`, `useVideoConfig`), `./hadis-data` (`LESSON_LABEL`, `SECTIONS`, `SPEECH_END_SEC`, `WORDS`, টাইপ `HadisWord`), `./theme` (`CAPTION`, `COLORS`, `FONTS`, `GRADIENTS`, `LINE_HEIGHT`, `RADIUS`, `captionColor`, `getLayout`, `getUnit`, `withAlpha`), `./timing` (`buildPages`, `frameToSec`, `sectionSpans`, `visiblePages`, `wordProgress`, `wordState`)। **এক্সপোর্ট:** `Karaoke`, `KaraokeProps = {opacity?, timeOffsetSec?, holdLastPage?}`, `KARAOKE_LOOK`, `computeWordVisual`/`WordVisual`, `popScaleAt`, `mixUpcomingToWord`, `getKaraokePages(maxWords)`। টেক্সট/সময়/রঙ কিছুই এই ফাইলে হাতে লেখা নেই — সব `hadis-data`/`timing`/`theme` থেকে।
- **পরিবর্তিত (ফন্ট — আপনার নির্দেশ "Hind Siliguri চাই না"):** `theme.ts` — `@remotion/google-fonts/HindSiliguri` ইম্পোর্ট, তার `loadFont` কল ও `waitForFonts()`-এর `bengaliSans.waitUntilDone()` **মুছে ফেলা**; `FONTS.sans` এখন **Anek Bangla** (আগে Hind Siliguri)। Anek Bangla-র একটিই লোড, weights `500/600/700/800` (আগে `600/700/800`; ৫০০ যোগ হলো কারণ হেডারের সোর্স-পিল ৫০০ ব্যবহার করে)। `Header.tsx` **অপরিবর্তিত** (সে `FONTS.sans` ব্যবহার করে, সরাসরি ফন্টের নাম নয়) — তাই "S2" চিপ ও সোর্স-পিল স্বয়ংক্রিয়ভাবে Anek Bangla-য় গেছে। সব `.ts/.tsx/.mjs` ফাইলে (মন্তব্য বাদে) `Hind Siliguri`/`HindSiliguri` এখন **০টি** (টেস্টে যাচাই)। `Hadis.md`-তে পুরোনো উল্লেখে `~~কাটা~~ → নতুন` চিহ্ন দেওয়া (ইতিহাস মোছা হয়নি) এবং নতুন সিদ্ধান্ত **D13**।

**২) ডিজাইন (যা বাস্তবায়িত):**

| অংশ | বিবরণ |
|---|---|
| ফন্ট/লেআউট | `FONTS.caption` (Anek Bangla) ৭০০; `display:flex; flex-wrap` মাঝ-সারিবদ্ধ; শব্দ `white-space: nowrap` (শব্দের ভেতর কাটা নয়), `letter-spacing: 0`, `font-kerning: normal`, লাইন-হাইট ১.৫৫; শব্দের মাঝে `0.55em` ফাঁক (সক্রিয় শব্দ ১.১৮× বড় হয় ও পিল বেরোয়, তাই) |
| মাপ | `theme.ts`-এর `karaoke.size` × সেকশন-গুণক: narration **০.৮৮**, translation/arabic(B) **১.০**, lesson **০.৯২**; অবস্থান `karaoke.centerY` কেন্দ্রে (উল্লম্ব মাঝ-সারিবদ্ধ, তাই লাইন-সংখ্যা বদলালে সমান বাড়ে/কমে); প্রস্থ `boxWidthRatio` |
| রঙ | প্রতি শব্দ `captionColor(word.index)` — পেজ ও অনুপাত বদলালেও একই রঙ (টেস্টে যাচাই) |
| *আসছে* | সাদা ৫৫%; আউটলাইনও হালকা (অপাসিটি ০.৩৫) — নইলে ৫৫% ভরাটের নিচে গাঢ় আউটলাইন ঘোলাটে দেখাত (প্রথম স্টিলে ধরা পড়ে, ঠিক করা হয়েছে) |
| *বলা হচ্ছে* | `start` থেকে ০.১২ সে.-এ আসছে→নিজের রঙে মসৃণ মিশ্রণ; **স্প্রিং পপ** ১.০ → ৩ ফ্রেমে **১.১৮** → কম-ড্যাম্পড স্প্রিংয়ে **১.০৮**-এ থিতু (মাঝে একটু নেমে আবার ওঠে); **রঙিন পিল** (`withAlpha(রঙ, 0.22)` + সরু বর্ডার + নরম আভা); **আন্ডারলাইন** `start→end`-এ বাঁ থেকে ডানে wipe (`wordProgress`); **গ্লো** `textShadow`; প্রথম ০.০৮ সে.-এ পিল/আন্ডারলাইন/গ্লো ধীরে ঢোকে |
| *বলা হয়েছে* | নিজের রঙ ধরে রাখে; পিল/আন্ডারলাইন/স্কেল ০.২–০.২৫ সে.-এ মসৃণভাবে মিলিয়ে যায় (হঠাৎ লাফ নেই); গ্লো ০.৩৫-এ নামে — ক্যাপশন যত এগোয় তত রঙিন |
| এন্ট্রান্স | `visiblePages`-এর `ageSec` থেকে: প্রতি শব্দ নিচ থেকে ১৮px উঠে + ফেড-ইন, `stagger 2`/`duration 8` ফ্রেম (ইজ-আউট কিউবিক); **নতুন:** যে শব্দের বলার সময় ঘনিয়ে এসেছে তার stagger-দেরি ছাঁটা হয়, আর বলা শুরু হলে ০.১ সে.-এর মধ্যে পুরো দৃশ্যমান — যাতে প্রথম শব্দ আধা-ফেড অবস্থায় বলা না হয় |
| পেজ-বদল | `visiblePages(pages, t, pageFade/fps)` — ৫ ফ্রেম ক্রসফেড (অপাসিটি যোগফল ১) |
| লেসন কার্ড (সেকশন D) | `GRADIENTS.lessonCard` ব্যাকগ্রাউন্ড, `COLORS.gold` ৩px বর্ডার + ভেতরে সরু `line` রেখা + সোনালি গ্লো; উপরের বর্ডারে বসা সোনালি **"শিক্ষা" লেবেল** (`LESSON_LABEL`, দুই পাশে ছোট হীরা, Anek Bangla ৮০০); কার্ড `sectionSpans`-এর D-র শুরুতে ০.৩ সে.-এ ফেড-ইন+সামান্য ওঠা/স্কেল, **পুরো D জুড়ে স্থির** (ফিক্সড উচ্চতা = `maxLines` লাইন), ভেতরের শব্দ পেজ বদলে ক্রসফেড |
| ফাঁক ও শেষ | ফাঁকে কোনো শব্দ সক্রিয় নয়, আগের পেজ ধরা (১১৫০ ফ্রেমে ফাঁকা পর্দা ০); অডিও শেষের পর `holdLastPage` — শেষ পেজ+কার্ড থাকে, আউটরো `opacity` দিয়ে ফেড-আউট করবে |

**৩) জ্যামিতি (স্টিলে `getBoundingClientRect`/`offsetTop` মাপা; ১৬:৯ ও ৯:১৬-র **প্রতিটি পেজ** — ১৬ + ১৯):**

| | ১৬:৯ | ৯:১৬ |
|---|---|---|
| সর্বোচ্চ লাইন (সীমা) | সব পেজ ১ লাইন (২) | সর্বোচ্চ ২ লাইন (৩) |
| ক্যাপশন ব্লক y | ≈ 670–770 (narration 676–764) | ≈ 1074–1186 (২ লাইন 1018–1242) |
| সবচেয়ে চওড়া পেজ x | 292–1628 (পর্দা ১৯২০) | 72–1008 (পর্দা ১০৮০) |
| লেসন-কার্ড | y 589–851, x 211–1709 | y 936–1324, x 65–1015 |
| আরবি ব্লকের সাথে (B-সময়) | আরবির নিচ ≈ 578 < ক্যাপশন ≈ 670 | আরবির নিচ ≈ 884 < ক্যাপশন ≈ 1074 |

কোনো পেজ পর্দার বাইরে যায়নি, কার্ডের টেক্সট কার্ডের ভেতরেই — সমস্যা ০।

**৪) পরিকল্পনা থেকে পরিবর্তন/সংযোজন (সৎ তালিকা):**
- **ওজন:** পরিকল্পনায় "সক্রিয় শব্দ ৮০০" ছিল; বাস্তবায়নে **সব শব্দ ৭০০**। কারণ একটি শব্দ ৭০০→৮০০ হলে অক্ষরের প্রস্থ বদলায়, লাইন-র‍্যাপ ও বাকি শব্দ প্রতিটি শব্দে নড়ে যেত। জোর দেওয়া হয় পপ/পিল/গ্লো দিয়ে। (`CAPTION.weights.active` তাই এখন অব্যবহৃত; ৮০০ শুধু "শিক্ষা" লেবেলে।)
- **`columnGap`:** প্রথম খসড়া ০.৪em → স্টিলে সক্রিয় শব্দ (১.১৮×) পাশের শব্দে ঠেকছিল → **০.৫৫em**।
- **পিলের উচ্চতা:** `theme.ts`-এর `CAPTION.pill.padYEm` নয়; পিল লাইন-বক্সের ভেতরে `pillInsetYEm = 0.1em` গুটিয়ে (লাইন-হাইট ১.৫৫-এ পিল অক্ষরের উচ্চতা ধরে) — `padYEm` এখন অব্যবহৃত, তবে `theme.ts` বদলানো হয়নি।
- **নতুন:** `holdLastPage` (আউটরোতে ক্যাপশন হঠাৎ উধাও না হতে), "আসছে" আউটলাইন হালকা, এন্ট্রান্স-দেরি ছাঁটা, বিশুদ্ধ ফাংশন `computeWordVisual` (টেস্টযোগ্য)।

**৫) টেস্ট (এই সেশনে সত্যিই চালানো):**
- ✅ `tsc --noEmit --strict --noUnusedLocals --noUnusedParameters` — **Karaoke.tsx + theme.ts + Header.tsx + ArabicBlock.tsx + Background.tsx + timing.ts + hadis-data.ts** (+ synced JSON) এ কোনো এরর নেই। ⚠️ **সীমা:** এই সেশনে আসল `remotion`/`@types/react` ইনস্টল করা যায়নি (নেটওয়ার্ক বন্ধ), তাই টাইপ-চেক হাতে-লেখা **টাইপ-স্টাব** দিয়ে; আসল টাইপ-চেক CI-তে (S6.3/S7.1)।
- ✅ **লজিক-টেস্ট ২৮/২৮ পাস:** ১৬:৯ ও ৯:১৬-র **প্রতিটি শব্দে** (৮৩) আসছে/বলা হচ্ছে/বলা হয়েছে অবস্থা (পিল, আন্ডারলাইন ০.৫ মাঝপথে, গ্লো, স্কেল, রঙ); পপ-কার্ভ (০ ফ্রেমে ১.০০০, ৩ ফ্রেমে ১.১৮০, থিতু ১.০৮০, কখনো ১.২৫-এর বেশি নয়); রঙ-মিশ্রণের দুই প্রান্ত; পাশাপাশি দুই শব্দ একরঙা নয় (৮২ জোড়া); একই শব্দ দুই অনুপাতে একই রঙ; এন্ট্রান্স (শুরুতে অদৃশ্য ও ১৮px নিচে, ০.৬ সে. পরে পূর্ণ) ও stagger; ক্রসফেডে অপাসিটি যোগফল ১; **১১৫০ ফ্রেমের প্রতিটিতে ক্যাপশন আছে, দুই অনুপাতে (ফাঁকা ০)**; ডিটারমিনিজম (ফ্রেম ৫০০→৭৭৭→৫০০ হুবহু একই; ৫০০ ≠ ৫০১); `timeOffsetSec=1`-এ স্থানীয় ৪৭০ ≡ গ্লোবাল ৫০০; `opacity=0` → null; `holdLastPage` (ফ্রেম ১১৮০-তে শেষ শব্দ আছে; `false` হলে নেই); কার্ড ২০ সে.-তে নেই, ৩৩ সে.-তে আছে + "শিক্ষা"; সোর্সে `Math.random`/`Date`/CSS `transition`/`animation` — **০টি**; `Hind Siliguri` **০টি**।
- ✅ **স্টিল (React SSR + Chromium/Playwright):** দুই অনুপাতে ৭টি করে (৫, ১২, ১৬.৫ [আরবি B], ২০, ২৫, ৩৩ সে. ও শেষ-হোল্ড) — `Background + Header + ArabicBlock + Karaoke` একসাথে; চোখে দেখা (১৬:৯: ২০ সে. ও ১৬.৫ সে.; ৯:১৬: ১২ ও ৩৩ সে.)। প্রতিটি শব্দের আলাদা রঙ, সক্রিয় শব্দে পিল+আন্ডারলাইন+গ্লো, "আসছে" শব্দ ম্লান সাদা, "শিক্ষা" কার্ড/লেবেল ঠিক। প্রথম স্টিলে দুটি সমস্যা পেয়ে ঠিক করা হয়েছে (সক্রিয় শব্দ পাশের শব্দে ঠেকা; "আসছে" আউটলাইন ঘোলাটে)।

**৬) বাধা/সতর্কতা:**
- ⚠️ **আসল Anek Bangla ফন্ট এখানে নেই** (নেটওয়ার্ক বন্ধ) — স্টিলগুলো **নকল ফন্ট (FreeSans Bold, বাংলা সমর্থিত)** দিয়ে। তাই *জ্যামিতির সংখ্যাগুলো আনুমানিক*: Anek Bangla-র অক্ষর-প্রস্থ/উচ্চতা অন্যরকম হতে পারে (লাইন-ভাঙা, পিল-উচ্চতা, আন্ডারলাইনের অবস্থান)। **"ফন্ট সত্যিই Anek Bangla হিসেবে লোড (ফলব্যাক নয়)" — এই গ্রহণযোগ্যতা শর্তটি এখানে যাচাই করা যায়নি; CI-র প্রথম রেন্ডার/স্টিলে (S7.1/S8.1) দেখতে হবে।** ব্যর্থ হলে শুধু `theme.ts`-এর ফন্ট লাইন বদলাবে।
- ⚠️ আসল `remotion still/render` চালানো যায়নি — `spring` এখানে আমার লেখা শিম (Remotion-এর মতো সংখ্যাসূচক সিমুলেশন); আসল spring-এর পপ-কার্ভে সামান্য তফাত হতে পারে। `-webkit-text-stroke` + `paint-order: stroke fill` Remotion-এর Chromium-এ চলার কথা (আধুনিক Chrome), তবে আসল রেন্ডারে আউটলাইন ঠিক আছে কি না S8.1-এ দেখুন।
- ⚠️ লেসন-কার্ডের উচ্চতা `maxLines`-ভিত্তিক স্থির; নকল ফন্টে D-র সব পেজ ১ লাইন (১৬:৯-তেও) হওয়ায় কার্ডে বেশ ফাঁকা দেখায়। আসল ফন্টে চওড়া হলে ভরবে; তবু ফাঁকা লাগলে `theme.ts`-এ `lesson.padding`/`maxLines` কমান।
- ⚠️ আরবি→ক্যাপশন ফাঁক ও B-সময়ে ক্যাপশনের "ইন্নামাল আ'মালু বিন-নিয়্যাত।" একসাথে আরবির নিচে — স্টিলে ওভারল্যাপ নেই (উপরের টেবিল)।

### - [x] S5.5 — `ProgressBar.tsx`
**ডিজাইন:** নিচে পাতলা সোনালি প্রগ্রেস বার (অডিওর `currentSec / audioSec`), শেষে ছোট উজ্জ্বল বিন্দু; ৯:১৬-তে সেফ-জোনের উপরে (নিচ থেকে ≥২৬০px)।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি ফাইল:** `ProgressBar.tsx` (রুটে; অন্য কোনো ফাইল বদলায়নি)। ইম্পোর্ট: `react`, `remotion` (`useCurrentFrame`, `useVideoConfig`), `./config` (`AUDIO_SECONDS_FALLBACK`), `./theme` (`COLORS`, `GRADIENTS`, `getLayout`, `getUnit`), `./timing` (`frameToSec`)। **এক্সপোর্ট:** `ProgressBar`, `ProgressBarProps = {opacity?, timeOffsetSec?, audioSec?}`, `PROGRESS_LOOK`, `progressAt(currentSec, audioSec)` (বিশুদ্ধ, ০..১ ক্ল্যাম্প)।

**২) ডিজাইন:** ম্লান ট্র্যাক (`COLORS.line`) + সোনালি গ্রেডিয়েন্ট ভরা অংশ (`GRADIENTS.gold`, নরম গ্লো) + ডগায় উজ্জ্বল `goldSoft` বিন্দু (ব্যাস = বারের উচ্চতা × ২.৪, গ্লো ১.৬ সে. পিরিয়ডে ধীরে স্পন্দিত — `sin`, ডিটারমিনিস্টিক)। প্রথম ০.৪ সে.-এ ফেড-ইন; অডিও শেষের পর ১০০% ধরা (আউটরো `opacity` দিয়ে ফেড-আউট করবে)। `audioSec` না দিলে ৩৮.৩২।

**৩) জ্যামিতি (মাপা):** ১৬:৯ — y 1032–1040 (নিচ থেকে 40, উচ্চতা 8), x 120–1800; ৯:১৬ — **y 1650–1660 (নিচ থেকে ২৬০ ✔ সেফ-জোনের ওপরে)**, x 60–1020। ডগার বিন্দু বারের মধ্যেই (ফ্রেম ৩০০ ও ১০০০-এ মাপা)।

**৪) টেস্ট (সত্যিই চালানো):** ✅ `tsc --strict --noUnusedLocals` পাস (সব ফাইল, টাইপ-স্টাবে — আসল remotion টাইপ নয়); ✅ ২০/২০ টেস্ট দুই অনুপাতে: ফ্রেম ০-তে null, ফ্রেম ১৫-তে আছে; ফ্রেম ৫৭৫ (১৯.১৭ সে.) → ০.৫; অডিও শেষে ও পরে ১.০; ১১৮০ ফ্রেমে প্রগ্রেস শুধু বাড়ে; ডিটারমিনিজম (৫০০ ≡ ৫০০, ৫০০ ≠ ৫০১); `timeOffsetSec=1` (স্থানীয় ৪৭০ ≡ গ্লোবাল ৫০০); `opacity=0` → null; `audioSec=20` কাজ করে; সোর্সে `Math.random`/`Date`/CSS-অ্যানিমেশন ০টি। ✅ আগের ২৮/২৮ Karaoke টেস্ট এখনো পাস। ✅ ৪টি স্টিল (দুই অনুপাত × ফ্রেম ৩০০/১০০০) Background+Header+Karaoke সহ; ৯:১৬-এ চোখে দেখা — বার মসজিদ-সিলুয়েটের ওপরে, ক্যাপশন/কার্ডের সাথে ওভারল্যাপ নেই।
- (নোট: প্রথম রানে `timeOffsetSec` টেস্ট ফেইল — কারণ বিন্দুর গ্লো-মানে ফ্লোটের শেষ-বিটের তফাত স্টাইল-স্ট্রিংয়ে ঢুকছিল; মান `toFixed`-এ গোল করে ঠিক করা হয়েছে, ফলে চাঙ্ক-রেন্ডারেও আউটপুট হুবহু একই।)

**৫) বাধা/সতর্কতা:** ⚠️ আসল `remotion render` চালানো যায়নি (CI-তে); বারে কোনো ফন্ট নেই তাই ফন্ট-ঝুঁকি নেই। S6.1-এ `<ProgressBar audioSec={…}/>`-এ আসল অডিও-দৈর্ঘ্য দিলে ভালো (না দিলে ৩৮.৩২)।

### - [x] S5.6 — `Outro.tsx`
**ডিজাইন (আপনার নির্দেশে আপডেট):** অডিও শেষে আউটরো — আগের কনটেন্ট ফেড-আউট; মাঝখানে **অ্যাপ লোগো** ↵ (লাইন ব্রেক) **"আজই প্লে স্টোর থেকে ডাউনলোড করুন:"** ↵ (লাইন ব্রেক) **"ইসলামী বিশ্বকোষ ও আল হাদিস S2 অ্যাপ।"** ↵ **Google Play badge (অ্যানিমেটেড)**; পেছনে সোনালি কণা (ডিটারমিনিস্টিক)।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি/বদলানো ফাইল:**
- **নতুন:** `Outro.tsx` (রুটে, 369 লাইন), `google-play-badge.png` (S2.4)।
- **বদলানো:** `theme.ts` (`Layout.outro` টাইপে `badgeWidth`, `gap` যোগ; ১৬:৯ `{logoHeight 320, titleSize 64, captionSize 38, badgeWidth 560, gap 30}`, ৯:১৬ `{360, 62, 44, 760, 40}`); `config.ts` (`OUTRO_SECONDS` **১.৫ → ৫**; তাই `FALLBACK_DURATION_FRAMES` 1195 → **1300**); `hadis-data.ts` (`OUTRO_DOWNLOAD_LINE`, `OUTRO_APP_SUFFIX`, `OUTRO_APP_LINE` যোগ; `OUTRO_CAPTION` রাখা কিন্তু আর দেখানো হয় না); `.gitignore` (`!google-play-badge.png`)। বাকি সব ফাইল অপরিবর্তিত।
- ইম্পোর্ট: `react`, `remotion` (`Easing`, `Img`, `interpolate`, `spring`, `useCurrentFrame`, `useVideoConfig`), `./logo.jpg`, `./google-play-badge.png`, `./Background` (`mulberry32`), `./hadis-data`, `./config`, `./theme`। **এক্সপোর্ট:** `Outro`, `OutroProps = {opacity?, durationSec?, timeOffsetSec?}`, `OUTRO_TIMING`, `OUTRO_LOOK`, `BADGE_ASPECT`, `previousLayersOpacity()`, `compressFactor()`, `shineAt()`, `getOutroParticles()`, `particleAt()`, `Particle`।

**২) লেআউট ও টেক্সট (উপর থেকে নিচে, মাঝ-সারিবদ্ধ; ৯:১৬-তে সেফ-জোনের ভেতরে মাঝখানে):**
1. **লোগো** — সাদা রাউন্ডেড ব্যাজ (D8) + সোনালি বর্ডার + ধীরে স্পন্দিত সোনালি গ্লো; উচ্চতা = `outro.logoHeight` (৩২০/৩৬০, অর্থাৎ ≤ সীমা; লোগো ৭২০px তাই 4K-তেও ঝাপসা নয়)।
2. লাইন ব্রেক
3. **"আজই প্লে স্টোর থেকে ডাউনলোড করুন:"** — Anek Bangla ৬০০, `goldSoft`, ছায়াসহ।
4. লাইন ব্রেক
5. **"ইসলামী বিশ্বকোষ ও আল হাদিস [S2] অ্যাপ।"** — Noto Serif Bengali ৭০০, ক্রিম; **S2 সোনালি পিল-চিপ** (হেডারের চিপের মতো, লাইনের মাঝে); `textWrap: balance` (সংকীর্ণ পর্দায় ২ লাইনে ভাগ হলে ভারসাম্যে)।
6. **Google Play badge** — প্রস্থ ৫৬০/৭৬০px (`BADGE_ASPECT` = 1600/474)।
- **পেছনে:** গাঢ় সবুজ রেডিয়াল আবরণ (scrim, ০–০.৬ সে.-এ ওঠে, অপাসিটি ০.৮৮) — ব্যাকগ্রাউন্ড ম্লান করে লেখা ফোটায়; **৩৪টি সোনালি কণা** (গোল + কিছু ৪-কোনা তারা, `mulberry32`-সিড-ভিত্তিক, ওপরে ভাসে, মিটমিট করে, প্রান্তে ঘুরে আসে — `Math.random` নয়)।

**৩) badge-এর অ্যানিমেশন ("with animated"):** (১) **পপ** — ১.৫ সে.-এ স্প্রিং স্কেল ০.৫৫→১ (সামান্য ওভারশুট) + ০.২৫ সে. ফেড-ইন; (২) **শ্বাস** — পপের পর ধীরে ±১.৮% স্কেল, পিরিয়ড ২.৪ সে.; (৩) **সোনালি আভা** badge-এর পেছনে একই তালে স্পন্দিত; (৪) **shine ঝলক** — সাদা তির্যক আলোর পট্টি ২.৪ সে.-এ প্রথম, তারপর প্রতি ২.৪ সে., প্রতিবার ০.৯ সে. বাঁ→ডানে; **CSS `mask-image`-এ badge-ছবি দিয়েই কাটা**, তাই ব্যাজের গোল কোণের বাইরে আলো ছড়ায় না। সব `useCurrentFrame`/`spring`/`interpolate`/`sin`-ভিত্তিক।

**৪) সময়রেখা (আউটরোর স্থানীয় সেকেন্ড; ৩০ fps):** আবরণ ০–০.৬ · লোগো ০.১৫ (স্প্রিং ০.৯) · লাইন-১ ০.৫৫–১.১৫ (নিচ থেকে ওঠা) · লাইন-২ ০.৮৫–১.৪৫ · badge ১.৫ (পপ ০.৯) · প্রথম shine ২.৪ · এন্ট্রান্স শেষ ≈ ২.৪; এরপর শেষ (৫.০) পর্যন্ত হোল্ড + শ্বাস/shine। আউটরো `durationSec` < ৩.২ হলে সব সময় আনুপাতিক সংকুচিত (`compressFactor`) — ১.৫ সে.-তেও সব পূর্ণ দেখা যায় (টেস্ট করা)।
- **আগের স্তর ফেড:** `previousLayersOpacity(secSinceAudioEnd)` = ১ → ০, ০.৬ সে.-এ (লিনিয়ার)। S6.1 এটি Header/ArabicBlock/Karaoke/ProgressBar-এ `opacity` হিসেবে দেবে (স্টিলে আসল Header/Karaoke/ProgressBar-এ দেখা: ফ্রেম ১১৫৫-এ ম্লান, ১১৭০-এ নেই)।

**৫) জ্যামিতি (স্টিলে `getBoundingClientRect` মাপা, ৩টি ফ্রেমে — শ্বাসের সময়সহ):**

| | ১৬:৯ (১৯২০×১০৮০) | ৯:১৬ (১০৮০×১৯২০) |
|---|---|---|
| লোগো | y 183–503 (উচ্চতা ৩২০) | y 491–851 (৩৬০) |
| লাইন-১ | y 533–590 | y 891–957 |
| লাইন-২ (অ্যাপ-নাম + S2) | y 596–692, x 518–1402, ১ লাইন | y 965–1058, x 112–968, ১ লাইন |
| badge | y ≈727–892, প্রস্থ ≈৫৫২–৫৬৪ | y ≈1105–1330, প্রস্থ ≈৭৫০–৭৬৬ |
| সীমা | প্রগ্রেস বার (y 1032) থেকে ≥১৪০px ওপরে | সেফ-জোন ১৫০–১৬৭০-এর ভেতরে; পাশে ≥১১২px |

কোনো উপাদান ওভারল্যাপ করেনি (উল্লম্ব ক্রম লোগো < লাইন-১ < লাইন-২ < badge), সব `safe.side` মার্জিনের ভেতরে।

**৬) পরিকল্পনা/নির্দেশ থেকে পরিবর্তন ও সংযোজন (সৎ তালিকা):**
- **`OUTRO_SECONDS` ১.৫ → ৫.০** (D14) — মোট ১৩০০ ফ্রেম। কারণ: ১.৫ সে.-এ এত লেখা ও badge অ্যানিমেশন অসম্ভব। কম চাইলে `config.ts`-এর একটি সংখ্যা।
- **বানান:** "প্লে ষ্টোর" → "প্লে **স্টোর**", "আ্যপ" → "**অ্যাপ**" (শুদ্ধ/প্রচলিত)।
- পুরনো ক্যাপশন "শেয়ার করুন, আমল করুন" ও পরিকল্পনার `APP_NAME`/`SEASON` আলাদা লাইনে দেখানো — **বাদ**; আপনার নতুন বিন্যাস মতো `APP_NAME + S2-চিপ + "অ্যাপ।"` এক লাইনে।
- সংযোজন: scrim, কণা, `previousLayersOpacity`, `compressFactor`, `timeOffsetSec`/`durationSec` প্রপ (S6.1-এর কাজে লাগবে)।

**৭) টেস্ট (এই সেশনে সত্যিই চালানো):**
- ✅ `tsc --noEmit --strict --noUnusedLocals --noUnusedParameters` — **সব সোর্স ফাইলে (Outro.tsx সহ) এরর ০**; একমাত্র ব্যতিক্রম `index.ts`-এর `./Root` (S6.2-এ তৈরি হবে)। ⚠️ আসল `remotion`/`@types/react` ইনস্টল নেই (নেটওয়ার্ক বন্ধ) — টাইপ-স্টাব দিয়ে; আসল টাইপ-চেক CI-তে।
- ✅ **লজিক ও জ্যামিতি টেস্ট ১২৫/১২৫ পাস:** `previousLayersOpacity` (−১→১, ০.৩→০.৫, ০.৬→০); দৈর্ঘ্য ১৩০০ ফ্রেম, `audioEndFrame` ১১৫০; `compressFactor`; `shineAt` (২.৪ সে.-এর আগে নেই, ২.৮৫-এ ০.৫, ৩.৩-এ ১, ফাঁকে নেই, ৪.৮-এ পুনরাবৃত্তি); কণা — দুই অনুপাতে ৩৪টি, একই ইনপুটে হুবহু একই (ডিটারমিনিস্টিক), দুই অনুপাতে ভিন্ন, ০–৫ সে. জুড়ে y সীমার ভেতরে ও অপাসিটি ০.১৮–০.৮; রেন্ডার — ফ্রেম ১০০ ≡ ১০০ (৫০ বা ১০১-এর সাথে ভিন্ন), `timeOffsetSec=1`-এ ফ্রেম ৩০ ≡ ফ্রেম ৬০, `opacity=0`/ঋণাত্মক সময় → `null`; চারটি টেক্সট অংশ, লোগো (jpeg) ও badge (png) ইনলাইন; shine ২.৬৭ সে.-এ আছে, ১.৩৩ সে.-এ নেই; ১.৫ সে.-এ সংকুচিত আউটরোতে লাইন-২ ও badge অপাসিটি ১; ০.৩ সে.-এ badge অদৃশ্য; সোর্সে `Math.random`/`Date`/CSS `transition`/`animation`/`@keyframes` ০টি; `Hind Siliguri` কোডে ০টি (শুধু মন্তব্যে)।
- ✅ **স্টিল (React SSR + Chromium/Playwright):** দুই অনুপাতে ফ্রেম ১১৫০, ১১৫৫, ১১৬৫, ১১৭০, ১১৮৫, ১১৯০, ১২১৫, ১২৩৬ (shine মাঝপথে), ১২৫০, ১২৯৯ — `Background + Header + Karaoke + ProgressBar + Outro` একসাথে (S6.1-এর স্তর-ক্রম); চোখে দেখা: ১৬:৯ ফ্রেম ১১৫৫/১১৭০/১১৮৫/১২৩৬ ও ১২৫০, ৯:১৬ ফ্রেম ১২৫০ — ফেড-আউট/এন্ট্রান্স/shine সব ঠিক। প্রথম স্টিলে ৯:১৬-এ অ্যাপ-লাইন পাশের মার্জিনে ঘেঁষছিল (x 70–1000) → `titleSize` ৬৮ → **৬২** (এখন 112–968)।

**৮) বাধা/সতর্কতা:**
- ⚠️ **আসল Noto Serif Bengali/Anek Bangla এখানে নেই** (নেটওয়ার্ক বন্ধ) — স্টিল নকল ফন্ট (FreeSans, বাংলা সমর্থিত) দিয়ে; তাই লেখার প্রস্থ/উচ্চতা আনুমানিক। আসল ফন্টে ৯:১৬-এর অ্যাপ-লাইন (এখন ১ লাইন) ২ লাইনে ভাঙতে পারে — লেআউট তখনও সেফ-জোনে ধরবে (≈২০০px উচ্চতা বাড়লেও), তবু CI স্টিলে (S7.1/S8.1) দেখে নিন; দরকারে `theme.ts`-এ `outro.titleSize` কমান।
- ⚠️ আসল `remotion still/render` চালানো যায়নি; `spring` এখানে আমার লেখা শিম, আসল স্প্রিংয়ের ওভারশুটে সামান্য তফাত হতে পারে। shine-এর `mask-image` আসল Remotion-এ (আধুনিক Chromium) চলার কথা; `url()`-এ বান্ডলড অ্যাসেট-URL যায় — S8.1-এ দেখুন।
- ⚠️ **Google Play badge:** ছবিটি আপনার দেওয়া অফিশিয়াল artwork; আমি শুধু ক্রপ/ছোট করেছি। অ্যানিমেশন (পপ/shine/আভা) আপনার অনুরোধে — তবে Google-এর ব্র্যান্ড-নির্দেশিকা সাধারণত badge বদলানো/অ্যানিমেট না করতে বলে; প্রচারণা-ভিডিওতে ঝুঁকি কম হলেও জেনে রাখা ভালো। পুরোপুরি স্থির চাইলে `Outro.tsx`-এ `breathe.amp`/shine বন্ধ করা যায়।
- `ProgressBar`-এ আসল অডিও-দৈর্ঘ্য (`audioSec`) দেওয়া ও Karaoke `holdLastPage` ফেড — S6.1-এ (`previousLayersOpacity` দিয়ে)।

### - [x] S5.7 — অডিও-সিঙ্ক হেলপার যাচাই (ছোট, `HadisVideo.tsx`-এর অংশ নয়)
**করণীয়:** `Karaoke` ও `ProgressBar` উভয়ই একই `currentSec = frameToSec(frame, fps)` (`timing.ts`) ব্যবহার করছে কি যাচাই; `<Sequence>` অফসেট ব্যবহার করলে শব্দের সময়েও সেই অফসেট বিয়োগ হচ্ছে কি না নিশ্চিত। *(S5.6 থেকে: `Outro`-ও অন্তর্ভুক্ত।)*

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) যাচাইয়ে যা পাওয়া গেছে (কোড পড়ে + টেস্ট):**
- `Karaoke`, `ProgressBar`, `ArabicBlock` তিনটিই `frameToSec(frame, fps) + timeOffsetSec` ব্যবহার করছিল — ✅ একই সূত্র।
- ❌ **`Outro` সরাসরি `frame / fps` ব্যবহার করছিল** (S5.6-এর ছোট অসঙ্গতি) → ঠিক করা হয়েছে।
- ❌ **ফ্লোট-শব্দ:** `<Sequence>`-অফসেট দিয়ে (`স্থানীয় f + N/30`) আর গ্লোবাল ফ্রেম (`f+N`) — অর্থ একই, কিন্তু `Karaoke`-র স্টাইল-স্ট্রিংয়ে ১e-১৬ তফাত ঢুকছিল (যেমন `…0.4784061250370369` বনাম `…0.47840612503703717`)। চোখে অদৃশ্য, তবে "Sequence বনাম বাইরে" হুবহু-সমতা ভাঙছিল (S5.5-এও এমন হয়েছিল, সেখানে `toFixed` দিয়ে ঠিক)।
- **সমাধান (একটি কেন্দ্রীয় হেলপার):** `timing.ts`-এ নতুন **`audioSecAt(frame, fps, offsetSec = 0)`** = `frame/fps + offset`, ১e-৬-এ গোল। `Karaoke`, `ProgressBar`, `ArabicBlock`, `Outro` চারটিই এখন এটি ব্যবহার করে (ইম্পোর্টও বদলেছে)। `frameToSec` রয়ে গেছে (`timing.ts` ও অন্যত্র)।

**২) তৈরি/বদলানো ফাইল:** `timing.ts` (+`audioSecAt`), `Karaoke.tsx`, `ProgressBar.tsx`, `ArabicBlock.tsx`, `Outro.tsx` (শুধু `currentSec`/`rawSec` লাইন ও ইম্পোর্ট; দৃশ্য/জ্যামিতি অপরিবর্তিত)। `Header`/`Background` অপরিবর্তিত — তারা অডিও-সময় নেয় না (নিজস্ব এন্ট্রান্স/লুপ, `frame / fps`), তাই S6.1-এ Sequence-এর বাইরে রাখতে হবে।

**৩) টেস্ট (সত্যিই চালানো; দুই অনুপাতে ১৯২০×১০৮০ ও ১০৮০×১৯২০):** ✅ **১০,৪৬৮/১০,৪৬৮ পাস**
- **Sequence-অফসেট সমতা:** `Karaoke`/`ProgressBar`/`ArabicBlock` — `N ∈ {1, 30, 100, 467, 1000}`-এ প্রতি ৩য় ফ্রেমে *স্থানীয় ফ্রেম f + `timeOffsetSec = N/30`* ≡ *গ্লোবাল ফ্রেম f+N* — **হুবহু একই HTML**। `Outro`: `<Sequence from=1150>`-স্থানীয় ফ্রেম ≡ গ্লোবাল ফ্রেম + `timeOffsetSec = −1150/30` (প্রতি ২য় ফ্রেম)।
- **শব্দ ↔ কণ্ঠ ↔ বার (সিঙ্ক):** ৮৩টি শব্দের প্রতিটির মাঝের ফ্রেমে (ক) `Karaoke`-এ সেই শব্দ `active`, একসাথে ≤২টি active; (খ) `ProgressBar`-এর অগ্রগতি = `t / 38.32` (±১e-৪) — অর্থাৎ ক্যাপশন ও বার একই ঘড়িতে চলছে, আর শব্দের সময় `hadis0101.synced.json` থেকে।
- **আউটরো-সীমা:** `ProgressBar` ফ্রেম ১১৫০-এ ঠিক ১.০, ১১৪৯-এ <১.০; `Outro` স্থানীয় ফ্রেম ০-তেই শুরু; `previousLayersOpacity` ০ সে.-এ ১, ০.৬ সে.-এ ০।
- ✅ আগের ১২৫/১২৫ `Outro` লজিক/জ্যামিতি টেস্ট এখনো পাস; ✅ `tsc --strict --noUnusedLocals --noUnusedParameters` সব ফাইলে এরর ০ (একমাত্র `index.ts`→`./Root`, S6.2-এ)।

**৪) বাধা/সতর্কতা:** ⚠️ এই টেস্ট আমার `remotion` শিম (SSR) দিয়ে — আসল `<Sequence>` নয়; আসল Remotion-এ `<Sequence from={N}>`-এর ভেতরে `useCurrentFrame()` স্থানীয় ফ্রেম দেয় (সেটাই মডেল করা হয়েছে)। আসল সিঙ্ক (কণ্ঠের সাথে শব্দ-হাইলাইট মেলা) চোখে/কানে S8.2-এ — বিশেষত ৩টি অ্যাঙ্কর (#16 "উমর" 7.11, #37 17.54, #49 23.56)।

---

## ফেজ 6 — মূল কম্পোজিশন

### - [x] S6.1 — `HadisVideo.tsx`
**করণীয়:**
- স্তর (নিচ থেকে উপরে): `Background` → `Header` → `ArabicBlock` → `Karaoke` → `ProgressBar` → `Outro` (অডিও শেষের পর `<Sequence>`)।
- **সময় (S5.7 যাচাইকৃত):** `Background`/`Header`/`ArabicBlock`/`Karaoke`/`ProgressBar` সবই Sequence-এর বাইরে, গ্লোবাল ফ্রেমে (`timeOffsetSec` লাগে না); শুধু `Outro` `<Sequence from={audioEnd}>`-এর ভেতরে।
- **আউটরো (S5.6):** `<Sequence from={audioEndFrame(audioSec)} durationInFrames={outroFrames}><Outro durationSec={OUTRO_SECONDS}/></Sequence>`; `const prev = previousLayersOpacity((frame/fps) − audioSec)` → `Header`, `ArabicBlock`, `Karaoke`, `ProgressBar`-এ `opacity={prev}` (Karaoke-র `holdLastPage` তাই আউটরোতে ফেড-আউট হবে); `ProgressBar audioSec={…}`।
- `<Audio src={wav} />` (`hadis0101.wav` ইম্পোর্ট), ভলিউম ১.০; **অডিও ফ্রেম ০ থেকে শুরু**।
- প্রপস: `{ format: '16x9' | '9x16' }` (লেআউট সিদ্ধান্তের জন্য)।
- শুরুতে ৫ ফ্রেমের ফেড-ইন, যাতে প্রথম ফ্রেম কালো/ফাঁকা না থাকে।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি ফাইল:** `HadisVideo.tsx` (নতুন, রুটে) — আর কোনো ফাইল বদলায়নি। `Hadis.md` আপডেট।

**২) কী করা হলো:**
- **স্তর-ক্রম (নিচ থেকে উপরে):** `Background` → `Header` → `ArabicBlock` → `Karaoke` → `ProgressBar` → `Outro` (অডিও শেষের পর `<Sequence name="Outro">`)। সবার ওপরে `<Audio src={wav} volume={1}/>`, **Sequence-এর বাইরে ⇒ ফ্রেম ০ থেকে**।
- **সময় (S5.7 অনুযায়ী):** পাঁচটি স্তরই Sequence-এর বাইরে, গ্লোবাল ফ্রেমে — কারো `timeOffsetSec` লাগে না; শুধু `Outro` `<Sequence from={audioEndFrame(audioSec)} durationInFrames={outroFrames}>`-এর ভেতরে (স্থানীয় ফ্রেম ০ = অডিও শেষ ⇒ অফসেট ০)। `Outro durationSec={OUTRO_SECONDS}`।
- **আউটরো ফেড:** `prev = previousLayersOpacity(frame/fps − audioSec)` → `Header`, `ArabicBlock`, `Karaoke`, `ProgressBar`-এ `opacity={prev}` (তাই Karaoke-র `holdLastPage` আউটরোতে ফেড-আউট হয়); `ProgressBar audioSec={audioSec}`।
- **শুরুর ফেড-ইন:** `introOpacity(frame)` — ফ্রেম ০ → ০, ফ্রেম ৫ → ১ (লিনিয়ার)। এটি শুধু কনটেন্ট স্তরগুলোর (Header…ProgressBar) র‍্যাপারে; **`Background` সবসময় পূর্ণ**, তাই প্রথম ফ্রেম কালো/ফাঁকা নয়। ফ্রেম ৫-এর পর র‍্যাপারে কোনো `opacity` স্টাইলই থাকে না।
- **প্রপস:** `{format: '16x9' | '9x16', audioSec?: number}`। `format` কম্পোজিশনের মাপের অভিযোজনের সাথে না মিললে (বা অজানা হলে) স্পষ্ট বাংলা ত্রুটি; `audioSec` না দিলে `AUDIO_SECONDS_FALLBACK` (৩৮.৩২)।
- **নিরাপত্তা:** কম্পোজিশন ১১৫০ ফ্রেম বা কমে হলে `outroFrames = 0` ⇒ আউটরো আঁকা হয় না (অবৈধ `durationInFrames` যায় না)।
- **এক্সপোর্ট:** `HadisVideo`, `HadisVideoProps`, `HADIS_VIDEO`, `introOpacity()`, `outroTiming()`।

**৩) টেস্ট (সত্যিই চালানো):**
- ✅ `tsc --noEmit --strict --noUnusedLocals --noUnusedParameters -p .` — **সব সোর্স ফাইলে এরর ০**; একমাত্র ব্যতিক্রম `index.ts` → `./Root` (S6.2-এ তৈরি হবে)।
- ✅ **SSR টেস্ট ১৯৫/১৯৫ পাস** (দুই অনুপাত ১৯২০×১০৮০ ও ১০৮০×১৯২০; ফ্রেম ০, ১, ৩, ৫, ৬, ১০০, ৫০০, ১০০০, ১১৪৯, ১১৫০, ১১৫৫, ১১৭০, ১১৭১, ১২৫০, ১২৯৯): `Audio` ঠিক ১টি, স্থানীয় ফ্রেম = গ্লোবাল ফ্রেম (অফসেট ০, অর্থাৎ ফ্রেম ০ থেকে), ভলিউম ১; `Outro` Sequence **ফ্রেম ≥ ১১৫০-এই** আছে, আগে নেই; ফ্রেম ০-তে কনটেন্ট-র‍্যাপারে `opacity:0`, ফ্রেম ৫-এ নেই; `introOpacity` (০, ২.৫→০.৫, ৫→১, ক্ল্যাম্প), `outroTiming` (১১৫০/১৫০; ১১৫০ বা কম ফ্রেমে ০), `previousLayersOpacity` (০ সে.→১, ০.৬ সে.→০); ভুল `format` (১৯২০×১০৮০-তে `'9x16'`) ও অজানা `format` — দুটোতেই ত্রুটি; ছোট কম্পোজিশনে (১১৫০ ফ্রেম) আউটরো নেই, ক্র্যাশ নেই।
- ✅ **আউটরো-ফেড:** ১৬:৯-এ কনটেন্ট স্তরগুলো ফ্রেম ১১৪৯.৬ থেকে ম্লান হয়ে **ফ্রেম ১১৬৮-এ সম্পূর্ণ অদৃশ্য** (১৮ ফ্রেম = ০.৬ সে.); `Outro` ১১৫০ থেকে শুরু।

**৪) বাধা/সতর্কতা:**
- ⚠️ টেস্ট ও টাইপ-চেক আমার `remotion`/`react` **শিম ও টাইপ-স্টাব** দিয়ে (এই সেশনে নেটওয়ার্ক বন্ধ, আসল প্যাকেজ ইনস্টল নেই)। আসল `remotion` টাইপে `tsc` ও `remotion compositions`/`still`/`render` — **S6.3 ও CI (S7.1)**-তে। শিমের `spring`/`interpolateColors` সরলীকৃত, তাই এই টেস্ট দৃশ্যের মান নয়, **কাঠামো/সময়/ফেড-লজিক** যাচাই করেছে; চেহারা S7.1 প্রিভিউ স্টিলে দেখা হবে।
- ⚠️ `import wav from './hadis0101.wav'` ও `<Audio>` আসল Remotion webpack-এ চলবে বলে ধরা হয়েছে (`global.d.ts` টাইপ দেয়); প্রকৃত অডিও-রেন্ডার CI-তে (S8.1/S8.2)।
- ⚠️ `audioSec` এখনো কেউ পাস করছে না — **S6.2 `calculateMetadata`-তে আসল দৈর্ঘ্য `props`-এ ফেরত দিতে হবে** (না দিলে ফলব্যাক ৩৮.৩২ চলে, বর্তমান অডিওতে একই ফল)।

### - [x] S6.2 — `Root.tsx`
**করণীয়:**
- দুটি `<Composition>`: `Hadis-16x9` (1920×1080) ও `Hadis-9x16` (1080×1920), `fps=30`।
- `calculateMetadata` দিয়ে `getAudioDurationInSeconds(wav)` পড়ে `durationInFrames` সেট (S4.1 সূত্র; S5.6 থেকে `OUTRO_SECONDS = 5` ⇒ বর্তমান অডিওতে **১৩০০ ফ্রেম**)।
- *(S6.1 থেকে)* `component={HadisVideo}`, `defaultProps={{format: '16x9'}}` / `{{format: '9x16'}}`; `calculateMetadata` আসল `audioSec` `props`-এ ফেরত দেবে (নইলে `HadisVideo` ফলব্যাক ৩৮.৩২ নেয়); `RemotionRoot` নামে এক্সপোর্ট।
- `npx remotion compositions index.ts` দুটি আইডি দেখায়।

**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি ফাইল:** `Root.tsx` (নতুন, রুটে) — আর কোনো সোর্স ফাইল বদলায়নি। `Hadis.md` আপডেট।

**২) কী করা হলো:**
- **`export const RemotionRoot`** (হুবহু এই নাম — `index.ts` এটি ইম্পোর্ট করে): `FORMATS`-এর দুই এন্ট্রি থেকে দুটি `<Composition>` — `Hadis-16x9` (1920×1080) ও `Hadis-9x16` (1080×1920), `fps = FPS` (৩০), `component={HadisVideo}`, `defaultProps = {format: '16x9' | '9x16', audioSec: ৩৮.৩২}`।
- **`calculateMetadata`** (`calculateHadisMetadata`): `getAudioDurationInSeconds(wav)` (`@remotion/media-utils`) → `durationInFrames = calcDurationInFrames(audioSec)` (S4.1 সূত্র; বর্তমান অডিওতে **১৩০০**) এবং `props: {...props, audioSec}` — `HadisVideo` এটি `ProgressBar`, আউটরো-শুরু (ফ্রেম ১১৫০) ও আগের স্তরের ফেড-আউটে ব্যবহার করে।
- **ফলব্যাক:** `getAudioDurationInSeconds` ব্যর্থ হলে বা মান অবৈধ (০, ঋণাত্মক, NaN, ∞, সংখ্যা নয়) হলে `AUDIO_SECONDS_FALLBACK` (৩৮.৩২) ⇒ ১৩০০ ফ্রেম; রেন্ডার থামে না।
- **স্ট্যাটিক `durationInFrames`:** ফলব্যাক `calcDurationInFrames(৩৮.৩২)` = ১৩০০ (প্রয়োজনীয় প্রপ; আসল মান `calculateMetadata` দেয়)।
- **এক্সপোর্ট:** `RemotionRoot`, `calculateHadisMetadata`, `metadataFor()`, `sanitizeAudioSec()` (শেষ দুটি বিশুদ্ধ — টেস্টযোগ্য)।

**৩) টেস্ট (সত্যিই চালানো):**
- ✅ `tsc --noEmit --strict --noUnusedLocals --noUnusedParameters -p .` — **সব ফাইলে এরর ০, `index.ts`-সহ** (S6.1-এর পর থেকে বাকি থাকা `./Root` এরর এখন নেই)।
- ✅ **২২/২২ টেস্ট পাস:** ২টি কম্পোজিশন; আইডি `Hadis-16x9`/`Hadis-9x16`; মাপ ১৯২০×১০৮০/১০৮০×১৯২০; fps ৩০; স্ট্যাটিক ১৩০০; `defaultProps.format` মাপের সাথে মেলে (যাতে `HadisVideo`-এর `format`-যাচাই পাস করে); একই `component`; কী ইউনিক। `calculateMetadata`: ৩৮.৩২ সে. → **১৩০০** ফ্রেম ও `audioSec` ৩৮.৩২ ও `format` অক্ষুণ্ণ; ১০ সে. → ৪৫০; ৬০.০১ সে. → `ceil((৬০.০১+৫)×৩০)`; অবৈধ মান (০, −৩, NaN, ∞, `'x'`, `null`) ও ব্যর্থতা (exception) — সবগুলোতে ফলব্যাক ১৩০০/৩৮.৩২; অডিও-শেষ (১১৫০) থেকে মোট ফ্রেমের ব্যবধান ঠিক **১৫০ (= ৫.০ সে. আউটরো)**।

**৪) বাধা/সতর্কতা:**
- ⚠️ `npx remotion compositions index.ts` এই সেশনে চালানো যায়নি (আসল `remotion`/`@remotion/media-utils` ইনস্টল নেই, নেটওয়ার্ক বন্ধ) — টেস্ট ও টাইপ-চেক স্টাব/শিম দিয়ে; আসল চেক **S6.3/CI (S7.1)**-তে।
- ⚠️ `getAudioDurationInSeconds(wav)` আসল Remotion-এ `.wav` ইম্পোর্ট-URL-এ কাজ করবে বলে ধরা (এটি ডকুমেন্টেড ব্যবহার); ব্যর্থ হলেও ফলব্যাকে বর্তমান অডিওর ফল একই।

### - [x] S6.3 — একীভূত টাইপ/বিল্ড চেক
**করণীয়:** `npx tsc --noEmit` পাস; `npx remotion compositions index.ts` পাস। (এই ধাপ CI-তেও চলবে, কারণ আপনার ডিভাইসে লোকাল রান নাও হতে পারে।)

**✅ বিবরণ (সম্পন্ন — 2026-11-06; ⚠️ আসল রান CI-তে):**

**১) তৈরি/বদলানো ফাইল:** কোনো সোর্স ফাইল বদলায়নি (শুধু যাচাই)। `Hadis.md` আপডেট। `sync-report.json` `npm run check` চালানোয় আবার লেখা হয়েছে, কিন্তু **আগের zip-এর সাথে বাইট-একই**।

**২) যা যাচাই করা হলো (সত্যিই চালানো):**
- ✅ **ইম্পোর্ট-যাচাই (১৫টি `.ts/.tsx`):** প্রতিটি রিলেটিভ ইম্পোর্ট (`./Root`, `./HadisVideo`, `./hadis0101.wav`, `./hadis0101.synced.json` …) বাস্তব ফাইলে মেলে — **অমীমাংসিত ০**। প্যাকেজ-ইম্পোর্ট (`remotion`, `react`, `@remotion/cli`, `@remotion/google-fonts`, `@remotion/media-utils`) সব `package.json`-এ আছে — **অনুপস্থিত ০**। `index.ts` → `RemotionRoot` (`Root.tsx`) এখন মেলে।
- ✅ **`tsc`:** স্টাব-টাইপে `--noEmit --strict --noUnusedLocals --noUnusedParameters` **এরর ০**; প্রজেক্টের নিজস্ব `tsconfig.json` ফ্ল্যাগেও **এরর ০** (`*.ts`/`*.tsx` সব, `index.ts`-সহ)।
- ✅ **পুনঃটেস্ট:** `HadisVideo` SSR **১৯৫/১৯৫**, `Root` **২২/২২** — সব পাস।
- ✅ **`npm run check`** (`node check-sync.mjs --file hadis0101.synced.json`, `ffmpeg` দিয়ে): **PASS** — ৮টি সাইলেন্স-ব্যবধান JSON-এর ৮টি বিরতি-শব্দের সাথে মেলে, পার্থক্য ০ (অডিও ৩৮.৩২ সে.)।
- ✅ **কম্পোজিশন-তালিকা (লজিক):** `RemotionRoot`-এ ঠিক ২টি `<Composition>` — `Hadis-16x9`, `Hadis-9x16`; ফলব্যাক ১৩০০ ফ্রেম।

**৩) বাধা/সতর্কতা (তাই `npx tsc --noEmit` ও `npx remotion compositions index.ts`-এর আসল রান বাকি):**
- ⚠️ এই সেশনে নেটওয়ার্ক বন্ধ ⇒ `npm install` সম্ভব নয়; আসল `remotion`, `react`, `@types/react`, `@remotion/*` ইনস্টল নেই। টাইপ-চেক হাতে-লেখা **টাইপ-স্টাব** দিয়ে, রানটাইম টেস্ট **শিম** (SSR) দিয়ে। তাই আসল প্যাকেজের টাইপ-অসঙ্গতি (যেমন `Composition`-এর জেনেরিক, `CalculateMetadataFunction`, ফন্ট-মডিউলের সাবসেট নাম) এখানে ধরা পড়েনি।
- **প্রথম আসল চেক = S7.1 `check` জব** (`npm install` → `npm run check` → `npx tsc --noEmit` → `npx remotion compositions index.ts`)। সেখানে ব্যর্থ হলে লগ দেখিয়ে ঠিক করা হবে (সাধারণত ফন্ট-মডিউল নাম — সমস্যা-সমাধান সারি ও S4.2 নোট দেখুন)।

---

## ফেজ 7 — GitHub Actions: `.github/workflows/render.yml`

### - [x] S7.1 — `render.yml` (যাচাই + প্রিভিউ স্টিল)
**ট্রিগার:** শুধু `workflow_dispatch` (ম্যানুয়াল — মিনিট বাঁচাতে)। ইনপুট `formats`: `preview` | `16x9-HD` | `16x9-4K` | `9x16-HD` | `9x16-4K` | `all`।
**জব:**
1. **`check`** — checkout, `actions/setup-node` (Node 22, npm cache), `npm install --no-audit --no-fund`, `npm run check` (সাইলেন্স যাচাই; ফেইল হলে থামবে), `npx tsc --noEmit`, `npx remotion compositions index.ts`।
2. **`prepare`** — ইনপুট থেকে ডাইনামিক JSON ম্যাট্রিক্স তৈরি (`fromJSON`)।
3. **`preview`** (`formats=preview`) — Chrome ডিপেন্ডেন্সি, `npx remotion browser ensure`, উভয় কম্পোজিশনের স্টিল `npx remotion still index.ts Hadis-16x9 --frame=N --scale=1` N = `0, 60, 300, 480, 560, 700, 1000, 1160, 1190, 1250, 1299` (শেষ তিনটি আউটরো) (লেআউট দেখার জন্য), PNG আর্টিফ্যাক্ট। **আপনার ডিভাইস দুর্বল হওয়ায় ভিডিওর আগে এটি দিয়ে চেহারা দেখা হবে।**

**গ্রহণযোগ্যতা:** `preview` চালিয়ে ছবি আর্টিফ্যাক্টে আসে।

**✅ বিবরণ (সম্পন্ন — 2026-11-06; ⚠️ GitHub-এ এখনো চালানো হয়নি):**

**১) তৈরি/বদলানো ফাইল:** `.github/workflows/render.yml` (নতুন — একমাত্র সাব-ফোল্ডারের ফাইল, D5); `.gitignore`-এ `preview/` ও `compositions.log` যোগ (স্থানীয় রানের আউটপুট; আগের লাইন অক্ষত)। `Hadis.md` আপডেট।

**২) কী করা হলো:**
- **ট্রিগার:** শুধু `workflow_dispatch`; ইনপুট `formats` (`type: choice`, ডিফল্ট `preview`; `preview | 16x9-HD | 16x9-4K | 9x16-HD | 9x16-4K | all`); `permissions: contents: read`।
- **`check`:** checkout → Node 22 → npm ক্যাশ → `ffmpeg` যাচাই/ইনস্টল → `npm install --no-audit --no-fund` → `npm run check` (ফেইলে থামে) → `npx tsc --noEmit` → Chrome-লাইব্রেরি + `npx remotion browser ensure` → `npx remotion compositions index.ts` (লগে দুটি আইডি **বাধ্যতামূলক**; ১৩০০ না থাকলে `::warning::`)।
- **`prepare`:** ইনপুট → `matrix`/`has_video`/`run_preview` আউটপুট (শুধু bash)। ম্যাট্রিক্স এন্ট্রি `{id, comp, scale, crf, out, w, h}` — **S7.2-এর `render` জব এটাই `fromJSON` করবে**। স্টেপ-সারাংশে পরিকল্পনা লেখা হয়।
- **`preview`** (`needs: [check, prepare]`, শুধু `formats=preview`): Chrome-লাইব্রেরি + `browser ensure` → দুই কম্পোজিশন × ফ্রেম `0 60 300 480 560 700 1000 1160 1190 1250 1299` = **২২টি স্টিল** (`npx remotion still index.ts <comp> preview/<comp>-fNNNN.png --frame=N --scale=1 --timeout=120000`) → `actions/upload-artifact@v4`, নাম `hadis0101-preview`, ১৪ দিন, ফাইল না থাকলে ব্যর্থ।
- **spec থেকে দুটি পরিবর্তন (D17):** (ক) `setup-node`-এর `cache: npm` বাদ — রুটে `package-lock.json` নেই, থাকলেই কাজ করে; বদলে `actions/cache` দিয়ে `~/.npm`; (খ) `check` জবে Chrome ইনস্টল যোগ — `remotion compositions` নিজেও ব্রাউজার চালায় (spec-এ শুধু preview/render-এ ছিল)।

**৩) টেস্ট (সত্যিই চালানো — ✅ ৪২/৪২ পাস):**
- ✅ YAML বৈধ; ৩টি জব; `preview.needs = [check, prepare]` ও `if: run_preview == 'true'`; Node 22 সব জবে; ট্রিগার শুধু `workflow_dispatch`; ট্যাব নেই।
- ✅ **`prepare` স্ক্রিপ্ট আসলে `bash`-এ চালানো — ৬টি ইনপুটেই:** `preview` → ম্যাট্রিক্স খালি, `has_video=false`, `run_preview=true`; `all` → ৪টি এন্ট্রি **`config.ts`-এর `RENDER_TARGETS`-এর সাথে হুবহু সমান** (id, comp, scale, crf, out, w, h — নোড দিয়ে `config.ts` থেকে পড়ে মেলানো); চারটি একক ইনপুটে ঠিক একটি করে এন্ট্রি; অজানা মান ও ইনজেকশন-ধাঁচের মান (`16x9-HD; rm -rf /`) → `::error::`/ব্যর্থ। আউটপুট বৈধ JSON।
- ✅ **প্রিভিউ লুপ (`npx` স্টাব দিয়ে):** ঠিক ২২টি কল; প্রথম `remotion still index.ts Hadis-16x9 preview/Hadis-16x9-f0000.png --frame=0 --scale=1 --timeout=120000`, শেষ `Hadis-9x16 … f1299`; ২২টি ভিন্ন PNG পাথ; সব ফ্রেম ≤ ১২৯৯ (মোট ১৩০০), ৪টি আউটরো-ফ্রেম (≥ ১১৫০)।
- ✅ **`compositions`-যাচাই (স্টাব লগ দিয়ে):** দুটি আইডিসহ লগ → পাস; একটি আইডি নেই → ফেইল; ফ্রেম ১৩০০ নয় → শুধু সতর্কতা।
- ✅ `CHROME_LIBS` spec-এর ১৪টি লাইব্রেরির সাথে হুবহু; এক লাইন।

**৪) বাধা/সতর্কতা:**
- ⚠️ **এই ওয়ার্কফ্লো GitHub-এ চালানো হয়নি** (এই সেশনে শুধু স্থানীয় লজিক-টেস্ট; `actionlint` নেই, নেটওয়ার্ক বন্ধ)। চালিয়ে যা দেখার: (১) `npm install` ও `npx tsc --noEmit` — **আসল Remotion টাইপে প্রথম চেক**; (২) `remotion compositions` আউটপুটের ফরম্যাট (আমি শুধু আইডি-নাম ও `১৩০০` সংখ্যা গ্রেপ করি); (৩) `npx remotion browser ensure` ও Chrome-লাইব্রেরি; (৪) ফন্ট-মডিউল নাম (সমস্যা-সমাধান সারি); (৫) `ffmpeg` রানারে আছে কি (না থাকলে ধাপটি ইনস্টল করে)।
- **প্রথম রান:** Actions → `render` → *Run workflow* → `formats = preview`। ফেইল হলে ব্যর্থ ধাপের লগ দিন — ঠিক করা হবে।
- ⚠️ প্রতিটি `remotion still` আলাদা বান্ডল করে ⇒ ২২টি স্টিলে সময় লাগবে; `timeout-minutes: 45`। ধীর হলে একবার `remotion bundle` করে সার্ভ-URL-এ স্টিল নেওয়ার উন্নতি পরে সম্ভব।

### - [x] S7.2 — `render.yml` (ভিডিও রেন্ডার ম্যাট্রিক্স)
**জব `render`:** `needs: [check, prepare]`, ম্যাট্রিক্স `include`:

| id | কম্পোজিশন | `--scale` | আউটপুট | আনুমানিক রেজোলিউশন | `--crf` |
|---|---|---|---|---|---|
| 16x9-HD | `Hadis-16x9` | 1 | `hadis0101-16x9-HD.mp4` | 1920×1080 | 20 |
| 16x9-4K | `Hadis-16x9` | 2 | `hadis0101-16x9-4K.mp4` | 3840×2160 | 18 |
| 9x16-HD | `Hadis-9x16` | 1 | `hadis0101-9x16-HD.mp4` | 1080×1920 | 20 |
| 9x16-4K | `Hadis-9x16` | 2 | `hadis0101-9x16-4K.mp4` | 2160×3840 | 18 |

**কমান্ড:** `npx remotion render index.ts ${{ matrix.comp }} ${{ matrix.out }} --scale=${{ matrix.scale }} --codec=h264 --crf=${{ matrix.crf }} --pixel-format=yuv420p --audio-codec=aac --audio-bitrate=192k --concurrency=4 --timeout=120000`
**অন্যান্য:**
- `runs-on: ubuntu-latest`, `timeout-minutes: 90`, `fail-fast: false`।
- Chrome-এর জন্য দরকারি লাইব্রেরি (`libnss3 libdbus-1-3 libatk1.0-0 libgbm-dev libasound2t64 libxrandr2 libxkbcommon-dev libxfixes3 libxcomposite1 libxdamage1 libatk-bridge2.0-0 libpango-1.0-0 libcairo2 libcups2`) `apt-get install`; `npx remotion browser ensure`।
- রেন্ডারের পর `ffprobe` দিয়ে রেজোলিউশন/দৈর্ঘ্য/অডিও স্ট্রিম যাচাই ধাপ (ফেইল করলে জব ফেইল)।
- `actions/upload-artifact@v4` — নাম `hadis0101-${{ matrix.id }}`, `retention-days: 14`।
- (ঐচ্ছিক) `softprops/action-gh-release` দিয়ে ট্যাগে রিলিজ।
- **সময় আন্দাজ:** HD ≈ ৫–১২ মিনিট; 4K ≈ ১৫–৪০ মিনিট প্রতি জব। প্রাইভেট রিপোতে ফ্রি প্ল্যানে মাসে ২০০০ মিনিট — `all` চালানোর আগে হিসাব রাখুন।

**✅ বিবরণ (সম্পন্ন — 2026-11-06; ⚠️ GitHub-এ এখনো চালানো হয়নি):**

**১) তৈরি/বদলানো ফাইল:** `.github/workflows/render.yml` (জব `render` যোগ; শিরোনাম-মন্তব্য ও `formats` ইনপুটের বর্ণনা থেকে "(S7.2)" শব্দ সরানো — এখন বাস্তবায়িত)। অন্য কোনো সোর্স/অ্যাসেট বদলায়নি (`.gitignore`-এ `*.mp4` আগে থেকেই ignore — রেন্ডার আউটপুট গিটে যাবে না)। `Hadis.md` আপডেট (টিক, হ্যান্ডঅফ, D18, লগ, সমস্যা-সমাধান)।

**২) কী করা হলো (`render` জব):**
- **শর্ত/ম্যাট্রিক্স:** `needs: [check, prepare]`; `if: needs.prepare.outputs.has_video == 'true'` (প্রিভিউ-রানে খালি ম্যাট্রিক্সে জব ব্যর্থ হওয়া এড়াতে); `strategy: {fail-fast: false, matrix: ${{ fromJSON(needs.prepare.outputs.matrix) }}}` — একটি ফরম্যাট ফেইল করলে বাকিগুলো চলে; `runs-on: ubuntu-latest`, `timeout-minutes: 90`; জবের নাম `render (${{ matrix.id }})`।
- **ধাপগুলো:** Checkout → Node 22 → `actions/cache` (`~/.npm`) → `ffprobe` না থাকলে `apt-get install ffmpeg` → `npm install --no-audit --no-fund` → `sudo apt-get install -y $CHROME_LIBS` + `npx remotion browser ensure` (S7.1-এর হুবহু একই ভঙ্গি) → **রেন্ডার** → **`ffprobe` যাচাই** → **আর্টিফ্যাক্ট**।
- **রেন্ডার কমান্ড (spec-এর হুবহু):** `npx remotion render index.ts "$COMP" "$OUT" --scale="$SCALE" --codec=h264 --crf="$CRF" --pixel-format=yuv420p --audio-codec=aac --audio-bitrate=192k --concurrency=4 --timeout=120000`। ম্যাট্রিক্স মান `env` (`COMP`/`OUT`/`SCALE`/`CRF`) দিয়ে, `run`-এ সরাসরি `${{ }}` ইন্টারপোলেশন নয় (D17-এর নিয়ম)।
- **`ffprobe` যাচাই (ফেইলে জব ফেইল, `::error::` বার্তাসহ):** (১) ফাইল আছে ও ফাঁকা নয়; (২) ভিডিও কোডেক `h264`; (৩) রেজোলিউশন ঠিক `matrix.w`×`matrix.h` (1920×1080 / 3840×2160 / 1080×1920 / 2160×3840); (৪) পিক্সেল-ফরম্যাট `yuv420p`; (৫) অডিও স্ট্রিম **আছে** ও `aac`; (৬) `format=duration` ≈ **৪৩.৩৩ সে. ± ০.৫** (`EXPECTED_SEC`/`DURATION_TOLERANCE` জব-`env`-এ; তুলনা `awk` দিয়ে, `bc` নির্ভরতা নেই)। পাস করলে `$GITHUB_STEP_SUMMARY`-তে কোডেক/মাপ/অডিও/দৈর্ঘ্য/MB লেখা হয়।
- **আর্টিফ্যাক্ট:** `actions/upload-artifact@v4`, নাম `hadis0101-${{ matrix.id }}`, পাথ `${{ matrix.out }}`, `retention-days: 14`, ফাইল না থাকলে ব্যর্থ (`if-no-files-found: error`); **`compression-level: 0`**।
- **spec থেকে পরিবর্তন/সংযোজন:** (ক) ffprobe-যাচাইয়ে কোডেক ও `yuv420p` চেক বাড়তি; (খ) `compression-level: 0`; (গ) `ffprobe` আছে কি দেখে না থাকলে ইনস্টল (spec-এর "ffmpeg আছে কি দেখে নিন")। **ঐচ্ছিক `softprops/action-gh-release` বাদ রাখা হয়েছে** (D18) — S8.4-এ দরকার হলে।

**৩) টেস্ট (সত্যিই চালানো — ✅ সব পাস):**
- ✅ YAML বৈধ (`yaml.safe_load`); জব ঠিক ৪টি (`check`, `prepare`, `preview`, `render`); `render.needs = [check, prepare]`, `if`, `fail-fast: false`, `timeout-minutes: 90` যেমন; ফাইলে ট্যাব নেই; `matrix.*`-এ ব্যবহৃত কী (`id, comp, scale, crf, out, w, h`) সব `prepare`-এর এন্ট্রিতে আছে।
- ✅ **`prepare` স্ক্রিপ্ট (`formats=all`) চালিয়ে ৪টি এন্ট্রি নিয়ে `render`-এর রেন্ডার-ধাপের `run` স্ক্রিপ্ট প্রতিটির জন্য আলাদা চালানো (স্টাব `npx` দিয়ে):** চারটি কমান্ডলাইন spec-এর সাথে হুবহু মিলেছে (`Hadis-16x9`/`Hadis-9x16`, `--scale=1/2`, `--crf=20/18`, আউটপুট `hadis0101-<id>.mp4`), প্রতিটি exit 0 ও আউটপুট ফাইল তৈরি।
- ✅ **`ffprobe` যাচাই-ধাপ আসল `ffmpeg`/`ffprobe` দিয়ে বানানো MP4-তে** (workflow-এর `run` স্ক্রিপ্ট হুবহু `bash -e`-এ): সঠিক ১৬:৯ (1920×1080, ৪৩.৩৩ সে., h264, yuv420p, aac) → **পাস**; সঠিক ৯:১৬ (1080×1920) → **পাস**; ভুল রেজোলিউশন (1280×720) → **ফেইল**; ছোট দৈর্ঘ্য (২০ সে.) → **ফেইল**; অডিও নেই → **ফেইল**; `yuv444p` → **ফেইল**; ফাইল নেই → **ফেইল**; ফাঁকা ফাইল → **ফেইল**। প্রতিটি ফেইলে সঠিক `::error::` বার্তা।
- ⚠️ **যা এখানে যাচাই করা যায়নি:** আসল `remotion render` (Remotion/Chrome/ফন্ট নেটওয়ার্কে নেই), `actions/*` ধাপ ও GitHub-এর `fromJSON`/`matrix` ব্যাখ্যা (`actionlint` নেই)।

**৪) বাধা/সতর্কতা:**
- ⚠️ **এই ওয়ার্কফ্লো GitHub-এ চালানো হয়নি।** প্রথম রান: Actions → `render` → *Run workflow* → `formats = preview` (S7.1-এর `check`/`preview` যাচাই); তারপর `16x9-HD` একটি, মিনিট/সময় মেপে `all`।
- ⚠️ **`EXPECTED_SEC = 43.33`** অডিও/`OUTRO_SECONDS` বদলালে হাতে বদলাতে হবে (পরবর্তী হাদিসে মনে রাখুন)। সহনসীমা ০.৫ সে.।
- ⚠️ 4K সময়/মেমরি অজানা — ৯০ মিনিটে না কুলালে বা মেমরি-ত্রুটি হলে `--concurrency=2`, `--jpeg-quality=90` (সমস্যা-সমাধান সারি)।
- ⚠️ প্রাইভেট রিপোতে `all` = ৪ জব সমান্তরাল, মিনিট আলাদা গোনা — মাসিক ২০০০ মিনিটের হিসাব রাখুন।

---

## ফেজ SVG — সিনভিত্তিক SVG দৃশ্য, কীওয়ার্ড আইকন ও শিক্ষার ডায়াগ্রাম (svg1 – svg18)

> **উৎস:** আপনার নতুন নির্দেশ (2026-11-06) — "সিনভিত্তিক SVG (সেকশন A/B/C/D অনুযায়ী আলাদা ছোট দৃশ্য: মিম্বর, কাবা/মদিনার সিলুয়েট, হিজরতের উট-কাফেলা, নিয়্যাতের প্রতীক হৃদয় ও আলো — ক্যাপশনের পেছনে ফেড-ইন/আউট)", "কীওয়ার্ড আইকন (হিজরত, নিয়্যাত, দুনিয়া, নারী ইত্যাদি শব্দে ছোট SVG পপ-আপ)", "শিক্ষার ভিজ্যুয়াল (\"নিয়্যাত ঠিক = আমল কবুল\" ধরনের সরল অ্যানিমেটেড ডায়াগ্রাম)"। প্রতিটি ধাপ `svg1`, `svg2`, `svg3` … নামে, এক ধাপ = একটি ফাইল।
>
> **অবস্থা:** পরিকল্পনা ✅; কোড: **`svg1` ✅** (`svg-data.ts`), **`svg2` ✅** (`SvgKit.tsx`), `svg3 – svg18` ⬜ বাকি। **আগের কোনো ফাইল/ধাপ/টিক বদলায়নি** — শুধু `svg17`-এ `HadisVideo.tsx` ও `config.ts` সামান্য বদলাবে।
> **S8 (QA/রেন্ডার) এর সাথে ক্রম:** SVG ফেজ শেষ করে S8.1–S8.4 করাই ভালো (প্রিভিউ-স্টিলে SVG-সহ সবটা একবারে দেখা যাবে); চাইলে আগে একবার `formats = preview` চালিয়ে বর্তমান ভিডিওর বেস ঠিক আছে কি না দেখে নিন — SVG যোগ হলে আবার চালাতে হবে।

### SVG-১. নতুন স্তর-ক্রম (নিচ থেকে উপরে)

`Audio` → `Background` → **`SvgLayer` (দৃশ্য — নতুন)** → `Header` → `ArabicBlock` → `Karaoke` → `ProgressBar` → **`KeywordPopup` (নতুন)** → `Outro`

- দৃশ্য (`SvgLayer`) ক্যাপশনের **পেছনে**, হেডার/আরবি/ক্যাপশনের নিচে; ক্যাপশন-ব্যান্ডে ম্লান (মাস্ক) যাতে পড়া না কঠিন হয়।
- কীওয়ার্ড পপ-আপ (`KeywordPopup`) ক্যাপশনের **ওপরে** কিন্তু আলাদা অঞ্চলে (হেডার ও ক্যাপশনের মাঝে) — ক্যাপশন ঢাকে না।
- দুটিই আউটরোতে `previousLayersOpacity`-তে ফেড-আউট হবে; শুরুর ৫ ফ্রেম ফেড-ইন কনটেন্ট স্তরের মতোই।
- মোট দৈর্ঘ্য অপরিবর্তিত (১৩০০ ফ্রেম); `render.yml`-এর `EXPECTED_SEC` বদলাবে না।

### SVG-২. দৃশ্য-মানচিত্র (synced JSON থেকে মাপা — সময় কোডে হাতে লেখা হবে না, শব্দ-ইনডেক্স থেকে বের হবে)

| দৃশ্য-আইডি | সেকশন | শব্দ-ইনডেক্স (০-ভিত্তিক) | কথার সময় (সে.) | কথা | দৃশ্যের ছবি | ফাইল (ধাপ) |
|---|---|---|---|---|---|---|
| `sanad` | A১ | 0–13 | 0.00 – 6.07 | হুমায়দী … আলকামা … থেকে বর্ণিত, তিনি বলেন, | **সনদ-চেইন:** সোনালি সুতোয় বাঁধা জ্বলন্ত কিতাব/পাণ্ডুলিপি-নোড; হুমায়দী (0.00) ও আলকামা (2.42) এ একটি করে জ্বলে ওঠে, নোডের মাঝে আলোর বিন্দু বয়ে চলে (বর্ণনা পৌঁছানো); "তিনি" (5.48)-তে তৃতীয় নোড জ্বলতে শুরু | `SceneSanad.tsx` (svg4) |
| `minbar` | A২ | 14–24 | 6.53 – 11.84 | আমি উমর ইবনুল খাত্তাব … মিম্বরের ওপর দাঁড়িয়ে বলতে শুনেছি, | **মিম্বর:** মসজিদের খিলানের ভেতরে তিন ধাপের মিম্বর-সিলুয়েট (কোনো মানুষ নেই); "মিম্বরের" (9.65)-এ ধাপগুলো ক্রমে জ্বলে; "বলতে শুনেছি" (11.00–11.84)-এ ওপরের ধাপ থেকে সোনালি শব্দ-তরঙ্গ ছড়ায় | `SceneMinbar.tsx` (svg5) |
| `madina` | A৩ | 25–33 | 12.39 – 15.30 | আমি রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়া সাল্লামকে ইরশাদ করতে শুনেছি: | **মদিনার সিলুয়েট:** রাতের আকাশে সবুজ গম্বুজ, মিনার, খেজুর গাছ, অর্ধচন্দ্র (লোগোর সাথে মানানসই); "ইরশাদ" (14.35)-এ গম্বুজ থেকে নরম আলোর স্তম্ভ ওঠে | `SceneMadina.tsx` (svg6) |
| `niyyah` | B | 34–36 | 15.79 – 17.54 | ইন্নামাল আ'মালু বিন-নিয়্যাত। | **নিয়্যাতের প্রতীক — হৃদয় ও আলো:** হৃদয়ের রেখা আঁকা হয় (15.79), ভেতরে আলোর গোলক জ্বলে (16.38), "বিন-নিয়্যাত" (16.86)-এ রশ্মি ছড়ায় ও ৮-কোনা তারার বলয় ঘোরে | `SceneNiyyah.tsx` (svg7) |
| `amal` | C১ | 37–41 | 18.06 – 20.49 | প্রত্যেক কাজ নিয়তের সাথে সম্পর্কিত। | **হৃদয় ↔ কাজ:** হৃদয় থেকে আলোর সুতো আঁকা হয়ে কাজের আইকন-সারিতে (দান-হাত, পদচিহ্ন, কিতাব) পৌঁছায়; "নিয়তের" (18.93)-এ সুতোয় আলো দপদপ করে; "সম্পর্কিত" (19.90)-এ গিঁট-ঝলক | `SceneAmal.tsx` (svg8) |
| `fruit` | C২ | 42–48 | 20.49 – 23.56 | আর মানুষ তার নিয়ত অনুযায়ী ফল পাবে। | **বীজ → গাছ → ফল:** আলো-বীজ → অঙ্কুর → গাছ (সোনালি) → ফল পাকে; "নিয়ত" (21.73)-এ বীজ জ্বলে, "অনুযায়ী" (22.21)-এ বাড়ে, "ফল পাবে" (22.80)-এ ফল উজ্জ্বল | `SceneFruit.tsx` (svg9) |
| `hijra` | C৩ | 49–66 | 23.86 – 30.89 | তাই যার হিজরত হবে … প্রাপ্য। | **হিজরতের উট-কাফেলা:** বামে কাবার সিলুয়েট (কালো ঘন + সোনালি পট্টি), বালিয়াড়ির ওপর দিয়ে উটের কাফেলা ডানে হেঁটে চলে (সময়-নির্ভর অবস্থান), ডানের দিগন্তে মদিনার গম্বুজ; তারা মিটমিট (সিড-ভিত্তিক) | `SceneHijra.tsx` (svg10) |
| `duniyaNari` | C৩ (উপরে-স্তর) | 53–66 | 25.34 – 30.89 | দুনিয়া লাভের অথবা কোনো নারীকে বিয়ে করার উদ্দেশ্যে, সেই উদ্দেশ্যই হবে তার হিজরতের প্রাপ্য। | **কাফেলার পথ বাঁক নেয়:** "দুনিয়া" (25.34)-এ পৃথিবী+মুদ্রা, "নারীকে বিয়ে করার" (26.92–28.07)-এ আংটি (নারীর কোনো অবয়ব নয়); "সেই উদ্দেশ্যই" (28.49)-এ কাফেলা থেকে তীর ঐ দুই আইকনে, মদিনা-লক্ষ্য ম্লান; "প্রাপ্য" (30.57)-এ আইকন জ্বলে | `SceneDuniyaNari.tsx` (svg11) |
| `lesson` | D১ | 67–77 | 31.26 – 35.88 | মনে রাখবেন, আমল ছোট হোক, কিন্তু নিয়ত যদি আল্লাহর জন্য হয়, | **শিক্ষার ডায়াগ্রাম:** [ছোট আমল] + [আল্লাহর জন্য নিয়্যাত — হৃদয়+অর্ধচন্দ্র-আলো] = [আমল কবুল ✓]; নিচে লেখা "নিয়্যাত ঠিক = আমল কবুল" | `SceneLesson.tsx` (svg12) |
| `najat` | D২ | 78–82 | 35.88 – 38.32 | সেটাই হবে আখিরাতে নাজাতের কারণ। | **আখিরাত ও নাজাত:** ডায়াগ্রাম থেকে আলোর পথ খিলান-দরজায়; "আখিরাতে" (36.71)-এ দরজা খুলে আলো, "নাজাতের" (37.28)-এ আলো-বিস্ফোরণ ও কণা, "কারণ" (37.85)-এ স্থির | `SceneNajat.tsx` (svg13) |

**দৃশ্যের সীমানা (ক্রসফেড):** পাশের দুই দৃশ্যের কথার ফাঁকের **মাঝবিন্দুতে** সীমানা, ০.৫ সে. ক্রসফেড (±০.২৫): `sanad|minbar` 6.30 · `minbar|madina` 12.115 · `madina|niyyah` 15.545 (আরবি ব্লকের শুরুর সাথে মেলে) · `niyyah|amal` 17.80 · `amal|fruit` 20.49 · `fruit|hijra` 23.71 · `hijra|lesson` 31.075 · `lesson|najat` 35.88; প্রথম দৃশ্য ফ্রেম ০ থেকে, শেষ দৃশ্য অডিও-শেষ পর্যন্ত (তারপর আউটরো-ফেড)। `duniyaNari` আলাদা সময়-জানালায় `hijra`-র ওপরে।

### SVG-৩. কীওয়ার্ড পপ-আপ তালিকা (প্রস্তাবিত — svg1-এ চূড়ান্ত)

| শব্দ | ইনডেক্স | কথা শুরু (সে.) | আইকন | মন্তব্য |
|---|---|---|---|---|
| নিয়ত | 39 (নিয়তের) | 18.93 | হৃদয়+আলো | প্রথম পপ-আপ; আরবি ব্লক ১৮.৪৪-এ মিলিয়ে যায়, তাই ওভারল্যাপ নেই |
| হিজরত | 51 | 24.51 | পদচিহ্ন + তীর (পথ) | ০.৮৩ সে. দেখা যায় (ন্যূনতম ০.৭ ✓) |
| দুনিয়া | 53 | 25.34 | পৃথিবী + মুদ্রা | |
| নারী | 57 (নারীকে) | 26.92 | আংটি | অবয়ব নয় — D20 |
| আমল | 69 | 32.20 | দান-করা হাত | |
| আল্লাহর | 75 | 34.59 | অর্ধচন্দ্র + নরম আলো (লিপি/অবয়ব নেই) | |
| আখিরাত → নাজাত (একসাথে) | 80, 81 | 36.71 / 37.28 | খিলান-দরজা → আলোর রশ্মি | ব্যবধান মাত্র ০.৫৭ সে., তাই একটি যুগ্ম পপ-আপ |
| *(ঐচ্ছিক)* নিয়ত | 45, 73 | 21.73 / 33.76 | হৃদয়+আলো | দৃশ্যেই হৃদয় আছে — ডিফল্টে **বাদ**; চাইলে svg1-এ `enabled: true` |
| *(ঐচ্ছিক)* হিজরতের | 65 | 29.97 | পদচিহ্ন | ডিফল্টে বাদ |

**পপ-আপের নিয়ম:** শুরু = শব্দ-শুরু − ০.০৮ সে.; ধরে রাখা ১.৩ সে. (পরের পপ-আপ কাছে হলে আগেরটি আগে মিলিয়ে যায়, তবে ন্যূনতম ০.৭ সে.); স্প্রিং-পপ (০.৬→১.০৮→১.০) + ০.২৫ সে. ফেড-আউট; পর্দায় একসাথে সর্বোচ্চ ১টি।

### SVG-৪. জ্যামিতি (প্রস্তাবিত — svg16/svg18-এর স্টিলে মেপে ঠিক হবে; বর্তমান লেআউট S5.2–S5.5 থেকে)

| বিষয় | ১৬:৯ (1920×1080) | ৯:১৬ (1080×1920) |
|---|---|---|
| হেডারের নিচ | 359 | 633 |
| দৃশ্যের শিল্প-অঞ্চল | y 380–1010, পূর্ণ প্রস্থ | y 650–1620, পূর্ণ প্রস্থ |
| ক্যাপশন-ব্যান্ড (এখানে দৃশ্য ম্লান: `captionBandOpacity` ≈ 0.28, ৬০px ফেদার) | y ≈ 589–851 (শিক্ষা-কার্ডসহ) | y ≈ 936–1324 |
| কীওয়ার্ড পপ-আপ অঞ্চল (মাঝ-কেন্দ্র) | y 392–560 | y 665–900 |
| সেকশন D ডায়াগ্রাম-স্ট্রিপ (svg12) | y 860–1010 | y 1340–1620 |
| প্রগ্রেস বার | y 1032–1040 | y 1650–1660 |
| সেফ-জোন | — | উপর ১৫০, নিচ ২৫০ (y ≤ 1670) |

**কম্পোজিশন-নিয়ম:** আকাশ (চাঁদ, আলো, রশ্মি) **উপরে**, মাটি/সিলুয়েট (মদিনা, কাবা, বালিয়াড়ি, কাফেলা) **নিচে**, ক্যাপশন **মাঝে** — তাই ১৬:৯-এর সংকীর্ণ অঞ্চলেও ছবি ক্যাপশনের সাথে লড়ে না। অর্ধচন্দ্র (Background) ১৬:৯ (1744,138)/৯:১৬ (952,236) — শিল্প-অঞ্চলের বাইরে।

### SVG-৫. কাজের নিয়ম (সব svg ধাপের জন্য)

- সব ছবি **ইনলাইন SVG (React)**; কোনো বাইরের ছবি/ফন্ট/নেটওয়ার্ক নেই। শুধু লেখা: ডায়াগ্রামের "নিয়্যাত ঠিক = আমল কবুল" ও পপ-আপ লেবেল — `FONTS.sans` (Anek Bangla, আগে থেকেই লোড) দিয়ে।
- সব অ্যানিমেশন `useCurrentFrame`/`spring`/`interpolate` — `Math.random`/`Date`/CSS animation/transition নয় (কণা/তারা `mulberry32` সিড দিয়ে)।
- সময় সবসময় `svg-data.ts` → `WORDS` থেকে; দৃশ্য-ফাইলে হাতে-লেখা সেকেন্ড নয় (JSON আবার সংশোধন হলেও দৃশ্য মিলে থাকে)।
- ভারী SVG-ফিল্টার (`feGaussianBlur` বড় ব্যাসার্ধে) এড়িয়ে `radialGradient` দিয়ে আভা — ৪K রেন্ডার ধীর না হওয়ার জন্য (সমস্যা-সমাধান সারি দেখুন)।
- রঙ শুধু `theme.ts`-এর `COLORS` থেকে (এমারেল্ড/সোনালি/ক্রিম) — নতুন রঙ-পরিবার নয়।
- **কোনো মানুষ/নবী/সাহাবীর অবয়ব নয়** (D20) — প্রতীক, সিলুয়েট ও আলো।
- প্রতিটি দৃশ্য-কম্পোনেন্ট প্রপস: `localSec` (দৃশ্য-শুরু থেকে সেকেন্ড) বা `sec` (গ্লোবাল অডিও-সেকেন্ড), `width`, `height` — `useCurrentFrame()` সরাসরি নয়, যাতে বিশুদ্ধ ফাংশন হিসেবে টেস্ট করা যায় (S5.7-এর `audioSecAt` ধারা)।
- প্রতিটি ধাপ নিজের "ইনপুট" ফাইল থেকেই করা যাবে; ধাপ শেষে টিক + `**✅ বিবরণ:**` + হ্যান্ডঅফ/লগ/zip আপডেট (Section 0-এর নিয়মেই)।

---

### - [x] svg1 — `svg-data.ts` (দৃশ্য ও কীওয়ার্ড সংজ্ঞা)
**ইনপুট:** `hadis-data.ts` (`WORDS`, `getSectionTiming`), `config.ts`, এই ফেজের SVG-২/SVG-৩ টেবিল।
**করণীয়:**
- `SCENES`: `{id, first, last, bandOpacity?, layer}` — উপরের টেবিলের ১০টি দৃশ্য (শব্দ-ইনডেক্স রেঞ্জে; সময় নয়)। `bandOpacity` ডিফল্ট ০.২৮; `niyyah`-এর জন্য ০.৪৫ (ক্যাপশন ১ লাইন, ছোট)।
- `KEYWORDS`: `{id, wordIndex | wordIndices, icon, label, enabled, holdSec?}` — SVG-৩ টেবিল অনুযায়ী (ঐচ্ছিকগুলো `enabled: false`)।
- `SVG_TIMING`: `crossfadeSec` 0.5, `popupLeadSec` 0.08, `popupHoldSec` 1.3, `popupMinSec` 0.7, `popupOutSec` 0.25, `popupInSec`।
- হেলপার (বিশুদ্ধ, কোনো কম্পোনেন্ট ইম্পোর্ট নেই): `sceneWindow(id)` → `{startSec, endSec, wordStartSec, wordEndSec}`; `sceneBoundaries()` (পাশের দৃশ্যের ফাঁকের মাঝবিন্দু); `sceneOpacityAt(id, sec)` (ক্রসফেড); `activeScenes(sec)` → `[{id, opacity, localSec}]`; `popupWindows()`/`popupAt(sec)` → `{keywordId, localSec, opacity} | null`; `validateSvgData()` → ত্রুটির তালিকা।
- `validateSvgData()`: দৃশ্যগুলো ইনডেক্সে ক্রমানুসারে ও ফাঁকহীন (`duniyaNari` ছাড়া — সেটি `hijra`-র ভেতরে); ০ থেকে অডিও-শেষ পর্যন্ত যেকোনো সময়ে অন্তত একটি দৃশ্য দৃশ্যমান; ক্রসফেডে `opacity` যোগফল ≈ ১; কীওয়ার্ড-ইনডেক্স ০–৮২-এর মধ্যে; দুই পপ-আপের মধ্যে ফাঁক ≥ নিয়ম; পপ-আপ অডিও-শেষের বাইরে যায় না।
**টেস্ট (শেষ করার শর্ত):** `tsc --strict`; Node-টেস্ট: ১০ দৃশ্যের সময় টেবিলের সাথে হুবহু মেলে (±০.০০১); ৮টি সীমানা উপরের মানের সাথে মেলে; ০–৩৮.৩২ জুড়ে ফ্রেম-ধরে স্ক্যানে ফাঁকা-দৃশ্য ০টি; `validateSvgData()` ফাঁকা; ডিটারমিনিজম।
**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি/বদলানো ফাইল:** `svg-data.ts` (নতুন, রুটে; ৫৭০ লাইন, ≈৩৩ KB)। ইম্পোর্ট শুধু `./hadis-data` (`WORDS`, `SPEECH_START_SEC`, `SPEECH_END_SEC`, `WORD_COUNT`, `getSectionTiming` + টাইপ `HadisWord`, `SectionId`) — কোনো কম্পোনেন্ট/`remotion`/`theme` নয়, `config.ts`-ও নয় (দরকার পড়েনি; যাচাই-স্ক্যানের ৩০ fps ফাইলের ভেতর লোকাল ধ্রুবক)। অন্য কোনো সোর্স/অ্যাসেট বদলায়নি; zip-এ শুধু `svg-data.ts` যোগ ও `Hadis.md` প্রতিস্থাপিত।

**২) কী আছে (এক্সপোর্ট):**

| অংশ | বিষয়বস্তু |
|---|---|
| ডেটা | `SCENES` (১০টি: `sanad`, `minbar`, `madina`, `niyyah` [`bandOpacity` 0.45], `amal`, `fruit`, `hijra`, `duniyaNari` [`overlay`, `parent: 'hijra'`], `lesson`, `najat`) — প্রতিটি শব্দ-ইনডেক্স রেঞ্জে (`first`/`last`), সময় নয়; `KEYWORDS` (১০টি: চালু ৭ — `niyyah` 39, `hijra` 51, `duniya` 53, `nari` 57, `amal` 69, `allah` 75, `akhirahNajat` [80, 81]; ঐচ্ছিক বন্ধ ৩ — `niyyah2` 45, `niyyah3` 73, `hijratei` 65); `KEYWORD_ICON_NAMES` (৮টি) |
| টিউনিং | `SVG_TIMING` {`crossfadeSec` 0.5, `overlayLeadSec` 0.3, `overlayInSec` 0.4, `popupLeadSec` 0.08, `popupHoldSec` 1.3, `popupMinSec` 0.7, `popupFadeInSec` 0.12, `popupInSec` 0.35, `popupOutSec` 0.25}; `DEFAULT_BAND_OPACITY` 0.28; `ARABIC_ZONE` {leadSec 0.25, tailSec 0.9} |
| দৃশ্য-হেলপার | `computeSceneWindows()`/`SCENE_WINDOWS`/`sceneWindow(id)`, `getScene(id)`, `sceneBandOpacity(id)`, `sceneBoundaries()` (৮টি), `sceneOpacityAt(id, sec)`, `activeScenes(sec)` |
| পপ-আপ-হেলপার | `computePopupWindows()`, `popupWindows()` (কপি ফেরত), `getKeyword(id)`, `popupAt(sec)` |
| যাচাই | `validateSvgData(scenes?, keywords?, words?)` → ত্রুটির তালিকা; **ফাইল লোডের সময় নিজে চলে, ভুল হলে throw** |

**৩) দৃশ্য-জানালা (সত্যিই মাপা, `WORDS` থেকে; সে.):**

| দৃশ্য | শব্দ | `startSec`→`endSec` (সীমানা) | কথা | ব্যান্ড |
|---|---|---|---|---|
| `sanad` | 0–13 | 0.000 → 6.300 | 0.000–6.072 | 0.28 |
| `minbar` | 14–24 | 6.300 → 12.111 | 6.527–11.836 | 0.28 |
| `madina` | 25–33 | 12.111 → 15.548 | 12.387–15.301 | 0.28 |
| `niyyah` | 34–36 | 15.548 → 17.804 | 15.795–17.544 | **0.45** |
| `amal` | 37–41 | 17.804 → 20.489 | 18.064–20.489 | 0.28 |
| `fruit` | 42–48 | 20.489 → 23.712 | 20.489–23.560 | 0.28 |
| `hijra` | 49–66 | 23.712 → 31.078 | 23.864–30.893 | 0.28 |
| `duniyaNari` (ওভারলে) | 53–66 | 25.044 → 31.078 | 25.344–30.893 | 0.28 |
| `lesson` | 67–77 | 31.078 → 35.882 | 31.264–35.882 | 0.28 |
| `najat` | 78–82 | 35.882 → 38.320 | 35.882–38.320 | 0.28 |

ক্রসফেড ±০.২৫ সে. (smoothstep, দুই দৃশ্যের অপাসিটি পরিপূরক)। প্রথম দৃশ্যের ফেড-ইন নেই (শুরুর ৫ ফ্রেম ফেড-ইন `HadisVideo`-র কনটেন্ট-র‍্যাপারে); শেষ দৃশ্য অডিও-শেষের পরেও ১ (আউটরো-ফেড `SvgLayer`-এ)। **পপ-আপ জানালা:** `niyyah` 18.846→20.146 · `hijra` 24.431→25.264 (০.৮৩ ✓ ≥ ০.৭) · `duniya` 25.264→26.564 · `nari` 26.836→28.136 · `amal` 32.118→33.418 · `allah` 34.505→35.805 · `akhirahNajat` 36.632→38.132। প্রথম পপ-আপ (18.846) আরবি ব্লকের ফেড-আউটের (≈18.44) পরে ✓।

**৪) পরিকল্পনা থেকে পরিবর্তন/সংযোজন (সৎ তালিকা):**
- **কীওয়ার্ডের গঠন:** পরিকল্পনার `{wordIndex | wordIndices, icon, label}` → **শুধু `wordIndices[]`, `icons[]`, `labels[]`** (১–২টি, সমান সংখ্যা)। কারণ যুগ্ম পপ-আপ (আখিরাত → নাজাত) একটি এন্ট্রিতে দুই আইকন পাশাপাশি রাখা সহজ ও "একসাথে ≤ ১টি" নিয়ম ভাঙে না। svg14/svg15-এর বর্ণনায় নোট যোগ করা হয়েছে।
- `SceneDef`-এ বাড়তি ক্ষেত্র: `parent` (ওভারলের জন্য), `sectionId`, `label` (বাংলা, লগ/টেস্টের জন্য — ভিডিওতে দেখানো হয় না)।
- **ওভারলে-যুক্তি স্পষ্ট করা:** `duniyaNari`-র জানালা = প্রথম শব্দ − ০.৩ সে. (`overlayLeadSec`), ফেড-ইন ০.৪ সে. (`overlayInSec`), অপাসিটি = ফেড-ইন × `hijra`-র অপাসিটি (পরিকল্পনায় শুধু "আলাদা সময়-জানালায়" ছিল)। এতে ওভারলে মূল দৃশ্যের চেয়ে বেশি দৃশ্যমান কখনো হয় না।
- `SVG_TIMING`-এ বাড়তি: `overlayLeadSec`, `overlayInSec`, `popupFadeInSec` (পরিকল্পনার `popupInSec` রাখা — স্প্রিং-পপের সময়কাল ০.৩৫, `KeywordPopup` `localSec` থেকে আঁকবে)।
- **পপ-আপ জানালা ফেড-আউটসহ** এবং পরেরটির শুরুতে ছাঁটা (তাই `hijra`-র জানালা ০.৮৩ সে. — পরিকল্পনার হিসাব ✓)।
- **`akhirahNajat`-এ `holdSec: 1.5`** (ডিফল্ট ১.৩-এর বদলে): যুগ্ম পপ-আপে "নাজাতের" (37.28) পরেও যথেষ্ট সময় থাকে; শেষ 38.132 < অডিও-শেষ 38.32।
- **লেবেল "নিয়্যাত"** (আপনার বানান; পরিকল্পনার টেবিলের "নিয়ত" ছিল কথার শব্দ, লেবেল নির্দিষ্ট ছিল না)। বদলাতে চাইলে `KEYWORDS`-এর `labels`।
- নতুন `ARABIC_ZONE` ধ্রুবক — `ArabicBlock`-এর সময়ের প্রতিচ্ছায়া, কম্পোনেন্ট import না করে পপ-আপ-ছেদ যাচাইয়ের জন্য (হাতে-মেলানো; নোট ফাইলে ও হ্যান্ডঅফে)।
- SVG-২-র "দৃশ্যের সীমানা" টেবিলের মান ২–৩ দশমিকে আনুমানিক ছিল (12.115, 15.545, 31.075 …); কোড সূত্র (দুই দৃশ্যের মাঝের ফাঁকের মাঝবিন্দু) থেকে আসল মান 12.1115, 15.5480, 31.0785 — তফাত ≤ 0.0035, টেস্টে ±0.005 সহনসীমা।
- `validateSvgData` প্যারামিটার-যুক্ত (ভুল ডেটা ঢুকিয়ে নেগেটিভ টেস্টের জন্য) ও ফাইল-লোডে স্বয়ংক্রিয় (hadis-data.ts-এর ধারা); ছোট `SVG_WORD_COUNT` এক্সপোর্ট।

**৫) টেস্ট (এই সেশনে সত্যিই চালানো):**
- ✅ `tsc --strict --noUnusedLocals --noUnusedParameters` (`svg-data.ts` + `hadis-data.ts` + `timing.ts`, TypeScript 6.0.3 — ফাইলগুলো আলাদা করে): **এরর ০**। প্রজেক্টের নিজস্ব `tsconfig.json` ফ্ল্যাগেও (`isolatedModules` ইত্যাদি) এই ফাইলগুলোতে **এরর ০**; বাকি ফাইলে `remotion`/`react`/ফন্ট-মডিউল ইনস্টল না থাকার প্রত্যাশিত এরর আগের মতোই (আসল `npm install`/`tsc` CI-তে)।
- ✅ **Node-টেস্ট ১০৬/১০৬ পাস** (আসল `hadis0101.synced.json`-এ): `validateSvgData()` ফাঁকা; ১০ দৃশ্য (৯ main + ১ overlay); প্রতিটি দৃশ্যের কথার সময় `WORDS` থেকে হুবহু ও SVG-২ টেবিলের ±০.০০৫১ (টেবিল ২ দশমিকে গোল); ৮টি সীমানা টেবিলের ±০.০০৫; **ফ্রেম ০–১২৯৯-এর প্রতিটিতে**: ফাঁকা-দৃশ্য ০, main অপাসিটি-যোগফল ১ (±১e-৯), main ≤ ২, ওভারলে ≤ মূল দৃশ্য; নির্দিষ্ট মুহূর্ত (০/৩/সীমানা ৬.২৯৯৫-এ ০.৫-০.৫/২৪.০/২৮/৩১.০৭৮৫-এ ৩ স্তর/৩৩/৪০ সে.), `najat` ৪২ সে.-এও ১, `duniyaNari` শুরুতে ০ ও ৩১.৩৪-এ ০, `localSec` ক্রসফেডে ঋণাত্মক ≥ −০.২৫; ৭টি পপ-আপ জানালা (±০.০০০৬), ≥ ০.৭, অডিও-শেষের ভেতরে, ওভারল্যাপহীন, প্রথমটি আরবির পরে; `popupAt` (জানালার বাইরে null, অপাসিটি ০..১ সব ফ্রেমে, শুরুতে ০, ফেড-আউটে ০<ক<১, পূর্ণ ১); ঐচ্ছিক ৩টি চালু করলেও যাচাই ফাঁকা (১০টি পপ-আপ); **১৬টি নেগেটিভ টেস্ট** (দৃশ্যে ফাঁক, শেষ শব্দ বাদ, ওভারলে বাইরে/ভুল parent, ডুপ্লিকেট আইডি, `bandOpacity` > ১, পপ-আপ খুব কাছে, আরবি জানালায়, ইনডেক্স ৯৯৯, labels ≠ icons, অজানা আইকন, ৩টি আইকন, ক্রম অ-বর্ধমান, ফাঁকা `wordIndices`, `holdSec` < ০.৭, শেষ শব্দে পপ-আপ) — সবগুলোতে সঠিক ত্রুটি; ডিটারমিনিজম (দুইবার একই; উল্টো ক্রমে একই)।
- ✅ সোর্সে `Math.random`/`Date`/CSS animation/transition কোড-লাইনে ০টি (শুধু মন্তব্যে "নেই" শব্দ); ইম্পোর্ট শুধু `./hadis-data`।
- ✅ রিগ্রেশন: `npm run check` (`node check-sync.mjs --file hadis0101.synced.json`, `ffmpeg`) **PASS** — `sync-report.json` বাইট-একই; অন্য কোনো ফাইল অপরিবর্তিত।
- নোট: Node-টেস্ট কপিতে চলেছে — `hadis-data.ts`-এ JSON-ইম্পোর্টে `with {type: 'json'}` ও লোকাল ইম্পোর্টে `.ts` এক্সটেনশন যোগ করে (আগের ধাপগুলোর পদ্ধতি); কিটের আসল ফাইলে এসব নেই। প্রথম চেষ্টা টেস্ট-পরিবেশের ত্রুটিতে (শেল `sh`-এ ব্রেস-এক্সপ্যানশন চলে না) চালুই হয়নি — পরিবেশ ঠিক করে আবার চালানো; কোডে সমস্যা ছিল না।

**৬) বাধা/সতর্কতা:**
- ⚠️ এই ধাপে কোনো কম্পোনেন্ট নেই, তাই দৃশ্য/পপ-আপের **চেহারা** যাচাই হয়নি (স্টিল svg4 থেকে শুরু); যা যাচাই হয়েছে তা সময়/ক্রসফেড/যোগফল-লজিক ও ডেটা-কাঠামো। আসল `remotion`/GitHub-এ এখনো কিছু চালানো হয়নি।
- ⚠️ `ARABIC_ZONE` হাতে-মেলানো — `ArabicBlock.tsx`-এর `ARABIC_TIMING` বদলালে এই ফাইলের মানও বদলান, নইলে আরবি-ছেদ যাচাই ভুল জানালায় চলবে।
- ⚠️ শব্দ-ইনডেক্স হাতে লেখা (সময় নয়): synced JSON-এর শব্দ-সংখ্যা/ক্রম বদলালে `validateSvgData()` লোডেই থামবে (বার্তায় কোন দৃশ্য/কীওয়ার্ড ভুল তা লেখা) — তখন `SCENES`/`KEYWORDS` মেলাতে হবে।
- ⚠️ কীওয়ার্ডে `icons[]`/`labels[]` (একবচন `icon`/`label` নয়) — svg14/svg15 লেখার সময় মনে রাখুন (হ্যান্ডঅফের নতুন সারিতে বিস্তারিত)।
- `render.yml` অপরিবর্তিত (মোট দৈর্ঘ্য ১৩০০ ফ্রেম, `EXPECTED_SEC` একই)। পরের ধাপ: **svg2** (`SvgKit.tsx`)।

### - [x] svg2 — `SvgKit.tsx` (সাধারণ SVG হেলপার ও ফ্রেম)
**ইনপুট:** `svg-data.ts`, `theme.ts` (`COLORS`, `getLayout`), `Background.tsx` (`mulberry32`), `timing.ts`।
**করণীয়:**
- `SceneFrame`: দৃশ্যের পূর্ণ-পর্দা `<svg>` র‍্যাপার — `viewBox` = ফ্রেমের মাপ, `opacity` প্রপ, ক্যাপশন-ব্যান্ডে ম্লান করার **SVG `<mask>`** (লিনিয়ার গ্রেডিয়েন্ট; `getLayout` থেকে ব্যান্ড y-পরিসর; `bandOpacity` ও ফেদার প্রপ)।
- হেলপার: `drawOn(length, progress)` (stroke-dash), `smoothstep`, `popIn(sec, startSec)` (স্প্রিং-সদৃশ বিশুদ্ধ ফাংশন), `pulse(sec, periodSec)`, `Glow` (radialGradient-ভিত্তিক আভা — ফিল্টার নয়), `Sparkles` (সিড-ভিত্তিক কণা), `artZone(width,height)` (শিল্প-অঞ্চল y-পরিসর, SVG-৪ অনুযায়ী), `popupZone(width,height)`।
- `SVG_LOOK` (টিউনিং-মান): `captionBandOpacity` 0.28, `featherPx` 60, গ্লো-তীব্রতা, লাইন-পুরুত্ব।
**টেস্ট:** `tsc --strict`; দুই অনুপাতে `SceneFrame`-এ খালি দৃশ্যের স্টিল (মাস্কের ব্যান্ড হেডার/ক্যাপশন-মাপের সাথে মেলে); `drawOn`/`popIn`/`pulse` মান-টেস্ট; ডিটারমিনিজম (ফ্রেম ক্রম-নিরপেক্ষ); সোর্সে `Math.random`/`Date` ০টি (grep)।
**✅ বিবরণ (সম্পন্ন — 2026-11-06):**

**১) তৈরি/বদলানো ফাইল:** `SvgKit.tsx` (নতুন, রুটে; ৫২৬ লাইন)। ইম্পোর্ট শুধু `react` (`useMemo`), `./theme` (`COLORS`, `LINE_HEIGHT`, `getLayout`, `getUnit`, `orientationOf`), `./Background` (`mulberry32`), `./svg-data` (`DEFAULT_BAND_OPACITY`) — `remotion`-এর কোনো হুক সরাসরি নয় (`Background` নিজে `remotion` ইম্পোর্ট করে, তাই ট্রানজিটিভ নির্ভরতা আছে; `SvgKit`-এর ফাংশন/কম্পোনেন্ট সেগুলো কল করে না)। `timing.ts` ইম্পোর্ট দরকার পড়েনি (পরিকল্পনার ইনপুট-তালিকায় ছিল)। অন্য কোনো সোর্স/অ্যাসেট বদলায়নি — আসল zip-এর সাথে `diff -r`: শুধু `SvgKit.tsx` যোগ; `Hadis.md` প্রতিস্থাপিত।

**২) কী আছে (এক্সপোর্ট):**

| অংশ | বিষয়বস্তু |
|---|---|
| টিউনিং | `SVG_LOOK` {`captionBandOpacity` (= `DEFAULT_BAND_OPACITY` 0.28), `featherPx` 60, `glow` {0.3/0.5/0.78}, `lineWidth` {1.5/2.5/4/6}, `pop` {from 0.6, overshoot 0.08, durationSec 0.35, peakAt 0.55, fadeInSec 0.12}, `sparkle`, `guides`}; `LESSON_SIZE_FACTOR` 0.92; `SVG_GEOMETRY` (দুই অভিমুখে `headerBottom`/`artTop`/`artBottom`/`popupTop`/`popupBottom`/`stripTop`/`stripBottom`) |
| জ্যামিতি | `artZone`, `skyZone`, `stripZone` (= `groundZone`), `captionBand`, `popupZone`, `chromeEdges`, `zonesOf`, `artPoint`, `px`; টাইপ `Zone`, `ZoneSet` |
| গণিত (বিশুদ্ধ) | `clamp`, `clamp01`, `lerp`, `smoothstep`, `easeOutCubic`, `easeInOutCubic`, `rangeProgress`, `localClamp`, `drawOn`, `popIn` (+ `PopOptions`), `popOpacity`, `pulse`, `wave`, `svgId` |
| মাস্ক | `bandMaskStops(width, height, bandOpacity, featherPx)` → ৬টি `{offset, gray}`; `SceneFrame` |
| আলো/কণা | `Glow` (radialGradient), `makeSparkles`, `sparkleAlpha`, `starPath`, `Sparkles` |
| QA | `SvgGuides` (শুধু স্টিল; `SceneFrame guides`) |
| টাইপ | `SceneProps` = `{localSec, sec, width, height, idPrefix?}` — svg4–svg13-র সাধারণ প্রপস |

**৩) জ্যামিতি (সত্যিই চালিয়ে মাপা; ডিজাইন px):**

| অঞ্চল | ১৬:৯ (1920×1080) | ৯:১৬ (1080×1920) |
|---|---|---|
| `artZone` | y 380–1010 | y 650–1620 |
| `skyZone` (আকাশ) | 380–588.8 (≈২০৯) | 650–936 (≈২৮৬) |
| `captionBand` | **588.8–851.2** (Hadis.md: ≈589–851 ✓) | **936–1324** (✓) |
| `stripZone`/`groundZone` (মাটি) | 860–1010 (≈১৫০) | 1340–1620 (≈২৮০) |
| `popupZone` | 392–560 | 665–900 |
| `chromeEdges` | হেডারের নিচ 359 · বার 1032–1040 | 633 · 1650–1660 |

সম্পর্ক-টেস্ট (দুই অনুপাতে): হেডার < শিল্প; শিল্প-নিচ < প্রগ্রেস-ওপর (২২ / ৩০px ফাঁক); পপ-আপ ⊂ শিল্প ও ব্যান্ডের ওপরে; স্ট্রিপ ≥ ব্যান্ড-নিচ; ৯:১৬ শিল্প-অঞ্চল সেফ-জোনের ভেতরে (১৫০–১৬৭০); আধা-মাপে (৯৬০×৫৪০) সব ঠিক অর্ধেক (`getUnit`)।

**৪) পরিকল্পনা থেকে পরিবর্তন/সংযোজন (সৎ তালিকা):**
- **ক্যাপশন-ব্যান্ড হাতে-লেখা নয়, গণনা:** পরিকল্পনা বলেছিল "`getLayout` থেকে ব্যান্ড y-পরিসর"; `getLayout()` সরাসরি ব্যান্ড দেয় না, তাই `captionBand()` লেসন-কার্ডের স্থির আকারের সূত্র (`centerY ± (maxLines × size × 0.92 × 1.55 + ২ × padding)/২`) ব্যবহার করে — `Karaoke.tsx`-এর সাথে একই। `0.92` = `LESSON_SIZE_FACTOR` **হাতে-মেলানো** (টেস্ট `Karaoke.tsx`-এর সোর্স-লাইন পড়ে মেলায়)।
- **মাস্কের আকার:** ব্যান্ডের ভেতরে ধ্রুব `bandOpacity`, ফেদার (৬০px) **ব্যান্ডের বাইরে** — মানে উপরে ও নিচে ৬০px পর্যন্ত রূপান্তর। ফলে ব্যান্ডের ভেতরে ঠিক ০.২৮ (০.৪৫ `niyyah`-এ), শিল্প-অঞ্চলের বাকি অংশ পূর্ণ। নোট: ১৬:৯-এ পপ-আপ অঞ্চলের নিচের অংশ (y ≈ 529–560) উপরের ফেদারে পড়ে — দৃশ্য ওখানে ওপর থেকে নিচে ১০০% → ≈৬৩% পর্যন্ত ক্রমে ম্লান; পপ-আপ আলাদা স্তরে ওপরে বসে, তাই সমস্যা নেই।
- **`SceneFrame` বাড়তি প্রপ:** `idPrefix` (আইডি-সংঘর্ষ এড়াতে — ক্রসফেডে দুই দৃশ্য একসাথে), `guides` (QA), `featherPx`; এবং `bandOpacity ≥ ১` হলে মাস্ক বাদ। `opacity ≤ ০` → `null` (হুকের **পরে** চেক, হুক-ক্রম অটুট)।
- **`popIn` Remotion-`spring` নয়:** বন্ধ-রূপ অবমন্দিত দোলক (ওভারশুট-অনুপাত থেকে ζ ≈ 0.456; শিখর ~০.৫৫·দৈর্ঘ্যে) + শেষ ১৫%-এ ১-এ মসৃণ মিশ্রণ — যাতে বিশুদ্ধ/`sec`-ভিত্তিক থাকে ও শেষে লাফ না দেয়। **`sec < startSec` → ০** (এখনো নেই; `popOpacity` ফেড-ইনের সাথে ব্যবহার্য)।
- **যোগ (পরিকল্পনায় ছিল না):** `SceneProps` টাইপ ও `localClamp` (ক্রসফেডে ঋণাত্মক `localSec` সামলাতে — svg1-এর নোট অনুযায়ী), `svgId`, `skyZone`/`groundZone`/`chromeEdges`/`zonesOf`/`artPoint`/`px`, `bandMaskStops` (বিশুদ্ধ — আলাদা টেস্টযোগ্য), `Sparkles`-এর `riseSpeed`, `makeSparkles`/`sparkleAlpha`/`starPath`, `SvgGuides`।
- `Sparkles` আকৃতি = ৪-কোনা বাঁকা তারা (বৃত্ত নয়) — পরে বদলাতে `starPath` এক জায়গায়।
- `SVG_LOOK.captionBandOpacity` নিজে ০.২৮ লেখা নয় — `svg-data.ts`-এর `DEFAULT_BAND_OPACITY` থেকে (দুই জায়গায় দুই মান হওয়ার ঝুঁকি এড়াতে; টেস্ট ০.২৮ নিশ্চিত করে)।

**৫) টেস্ট (এই সেশনে সত্যিই চালানো):**
- ✅ `tsc --strict --noUnusedLocals --noUnusedParameters` (`SvgKit.tsx` + `svg-data.ts`, `theme.ts`, `Background.tsx`, `hadis-data.ts`, `timing.ts`; TypeScript 6.0.3): **এরর ০**। ⚠️ `react`/`remotion`/ফন্ট-মডিউলের **ন্যূনতম স্টাব-টাইপে** — তাই JSX-অ্যাট্রিবিউটের টাইপ-ভুল (যেমন SVG প্রপের বানান) এখানে ধরা পড়ে না; আসল `npm install`/`tsc` CI-তে (S7.1 `check` জব)।
- ✅ **Node-টেস্ট ৩৪/৩৪ পাস** (`tsx`; `react-dom/server` দিয়ে SSR): জ্যামিতি (ব্যান্ড ১৬:৯ 588.8–851.2 ও ৯:১৬ 936–1324 ±০.৬, অঞ্চল-মান, সম্পর্ক, সেফ-জোন, আধা-মাপ, `artPoint`, `LESSON_SIZE_FACTOR` = `Karaoke.tsx`-এর সোর্স-লাইন, `captionBandOpacity` = ০.২৮ = `DEFAULT_BAND_OPACITY`); গণিত (`clamp`/`lerp`; `smoothstep` প্রান্ত/মাঝ/পরিপূরক `s(x)+s(1−x)=1` ১e-১২; ইজিং একঘেয়ে; `rangeProgress`; `localClamp`; `drawOn` p=0/0.5/1/অবৈধ দৈর্ঘ্য; **`popIn`**: আগে ০, শুরুতে 0.6, শিখর 1.08 ±0.003 ও τ ≈ 0.55 ±0.06, শেষে ঠিক ১ ও `τ = ০.৯৯৯`-এ ১ ±০.০০৫, পুরো পরিসর 0.59–1.09, ওভারশুট ০ হলে একঘেয়ে, কাস্টম `from`/`overshoot`; `popOpacity`; `pulse` ০→১→০ পিরিয়ডিক ও ফেজ; `wave`; `svgId`); মাস্ক-স্টপ (১৬:৯ গ্রে `[255,255,71,71,255,255]`, অফসেট ব্যান্ড থেকে ±৬০px; ৯:১৬ ও `niyyah` ০.৪৫ → ১১৫; ৪×৪ সংমিশ্রণে অফসেট অ-হ্রাসমান [০,১]); `SceneFrame` HTML (দুই অনুপাতে `viewBox`/মাপ/মাস্ক/গ্রেডিয়েন্ট/অপাসিটি/৬ স্টপ; `opacity ≤ ০` → খালি; `bandOpacity ≥ ১` → মাস্ক নেই; `guides`); **দুই `SceneFrame` একসাথে (`hijra`+`lesson`) — আইডি সব অনন্য**; `Glow` (`radialGradient`, ৩ স্টপ, `ratio`, ফিল্টার নেই, শূন্যে `null`); `Sparkles` (সিড-নির্ধারিত, অঞ্চলের ভেতরে, আকার/পিরিয়ড সীমায়, ভিন্ন সিডে ভিন্ন, `count ≤ ০` → খালি, **ফ্রেম উল্টো ক্রমে রেন্ডার করলেও একই HTML**, `riseSpeed` মোডে y অঞ্চলের ভেতরে); `starPath`; **ডিটারমিনিজম:** পূর্ণ দৃশ্য (`SceneFrame` + `Glow` + `Sparkles` + `drawOn` + `popIn`) ১১টি ফ্রেম × ২ অনুপাত, এলোমেলো ক্রমে ও আলাদা করে রেন্ডার — হুবহু একই, ভিন্ন ফ্রেমে ভিন্ন।
- ✅ **সোর্স-grep** (কোড-লাইনে, মন্তব্য বাদে): `Math.random`, `Date`, `performance.now`, `animation`, `transition`, `@keyframes`, `feGaussianBlur`, `filter`, `useCurrentFrame`, `from 'remotion'`, টাইমার/`requestAnimationFrame` — সব **০টি**; ইম্পোর্ট-তালিকা ঠিক প্রত্যাশিত।
- ✅ **আসল Chromium পিক্সেল-টেস্ট ৫০/৫০ পাস** (Playwright; কালো পর্দায় সাদা আয়তক্ষেত্র, মাস্কের পিক্সেল মাপা; ১৬:৯ ও ৯:১৬ × ১× ও **4K (`deviceScaleFactor` ২)** × ব্যান্ড ০.২৮/০.৪৫): স্ক্রিনশটের মাপ (১×: ১৯২০×১০৮০/১০৮০×১৯২০; ২×: ৩৮৪০×২১৬০/২১৬০×৩৮৪০) ✓; ব্যান্ড-কেন্দ্র ≈ ২৫৫ × ব্যান্ড-অপাসিটি (±৩) ✓; ব্যান্ডের প্রান্তের ভেতরে (top+৪, bottom−৪) ✓; ফেদার-মাঝ (top−৩০, bottom+৩০) ≈ গড় (±৬) ✓; ব্যান্ড থেকে ৬৫px বাইরে ও ফ্রেমের প্রান্তে = ২৫৫ ✓; বাম/ডান প্রান্ত একই (অনুভূমিকভাবে সমান) ✓। **ক্রসফেড:** ০.৫+০.৫ অপাসিটির দুই `SceneFrame` (ভিন্ন `idPrefix`, ব্যান্ড ০.২৮ ও ০.৪৫) — ব্যান্ডে মিশ্রণ গণনার সাথে মেলে (±৩), বাইরে ০.৭৫ → ১৯১ ✓ (আইডি-সংঘর্ষ নেই)।
- ✅ **মিউটেশন-যাচাই:** ইচ্ছা করে তিনটি মান বদলে (`LESSON_SIZE_FACTOR`, `popIn`-এর `peakAt`, `artBottom`) **৭টি টেস্ট ফেইল** দেখেছি — মানে টেস্টগুলো সত্যিই ধরে; মান ফিরিয়ে আবার ৩৪/৩৪।
- ✅ **স্টিল (চোখে দেখা, দুই অনুপাতে):** আকাশ-গ্রেডিয়েন্ট + `Glow` + ৬০টি কণা + মাটি-ব্লক + শিল্প-অঞ্চলজুড়ে সোনালি ডোরা + আঁকা পাথ + `guides`; কমলা ব্যান্ড-রেখার ভেতরে ডোরা স্পষ্ট ম্লান, উপরে/নিচে নরম ফেদার, আকাশি পপ-আপ-বাক্স ব্যান্ডের ওপরে, গোলাপি স্ট্রিপ ব্যান্ডের নিচে, সাদা রেখা হেডারের নিচ ও প্রগ্রেস বারের ওপরে — দুই অনুপাতেই মাপ ও অবস্থান Hadis.md-এর সংখ্যার সাথে মেলে। (স্টিল-ফাইল zip-এ নেই — এগুলো টেস্ট-আর্টিফ্যাক্ট।)
- ✅ রিগ্রেশন: `npm run check` (`node check-sync.mjs --file hadis0101.synced.json`, `ffmpeg`) **PASS** — `sync-report.json` বাইট-একই; `svg-data.ts` লোডে `validateSvgData()` ফাঁকা (টেস্ট ইম্পোর্ট করে চলেছে)।

**৬) বাধা/সতর্কতা:**
- ⚠️ আসল `remotion`/GitHub-এ এখনো কিছু চালানো হয়নি — টেস্ট স্টাব-`remotion`/`react`-টাইপে; আসল Remotion রেন্ডারার একই Chromium-ইঞ্জিন, তাই `<mask>`/`radialGradient` আচরণ একই হওয়ার কথা, তবু আসল রেন্ডার CI-তে (S7.1 `preview`/S8.1) দেখতে হবে। মাস্ক/গ্রেডিয়েন্ট ভেক্টর, তাই 4K-তেও পিক্সেল-টেস্টে একই; রেন্ডার-সময় এখনো মাপা হয়নি (ক্রসফেডে একসাথে ≤ ২–৩ `SceneFrame` = ≤ ৩টি মাস্ক)।
- ⚠️ দৃশ্য-কম্পোনেন্ট এখনো নেই (svg4 থেকে) — আসল দৃশ্যের চেহারা/পড়ার-যোগ্যতা এখনো যাচাই হয়নি; এই ধাপে শুধু ফ্রেম, মাস্ক ও হেলপার।
- ⚠️ **হাতে-মেলানো দুটি মান:** `LESSON_SIZE_FACTOR` (0.92 — `Karaoke.tsx`-এর `sizeFactor.lesson`; টেস্ট ধরবে) ও `SVG_GEOMETRY.*.headerBottom` (359/633 — S5.2-এ নকল-ফন্টে মাপা; আসল ফন্টে হেডারের উচ্চতা সামান্য বদলাতে পারে, svg18/S8.1 স্টিলে `guides` দিয়ে মেলান)।
- ⚠️ `SceneFrame`-এর `idPrefix` ও `Glow`-এর `id` **অনন্য রাখা দৃশ্য-লেখকের দায়িত্ব** (টেস্ট শুধু `SceneFrame`/`Glow`-এর নিজস্ব আইডি যাচাই করে; svg3–svg13-র ভেতরের গ্রেডিয়েন্ট-আইডিও `svgId(idPrefix, …)` দিয়ে লিখতে হবে)।
- ⚠️ `popIn` `sec < startSec`-এ ০ ফেরত দেয় — স্কেল ০ মানে অদৃশ্য; `startSec`-এ হঠাৎ ০ → ০.৬ লাফ `popOpacity`-র ফেড-ইন (০.১২ সে.) ঢেকে দেয়, তাই দুটি একসাথে ব্যবহার করুন।
- `render.yml` অপরিবর্তিত (মোট দৈর্ঘ্য ১৩০০ ফ্রেম, `EXPECTED_SEC` একই)। পরের ধাপ: **svg3** (`SvgShapes.tsx`)।

### - [ ] svg3 — `SvgShapes.tsx` (পুনর্ব্যবহারযোগ্য আকৃতি)
**ইনপুট:** `SvgKit.tsx`, `theme.ts`, লোগো-বিবরণ (S0.1: সোনালি অর্ধচন্দ্র, কাবা, সবুজ গম্বুজ, মিনার)।
**করণীয়:** স্থির-জ্যামিতির ছোট কম্পোনেন্ট (প্রতিটি `progress`/`sec` প্রপে আঁকা/জ্বলা সমর্থন করে): `Heart` (পথ + ভেতরের আলো), `Crescent`, `Star8` (৮-কোনা), `Dome`, `Minaret`, `MosqueSkyline` (মদিনা), `Kaaba`, `PalmTree`, `Camel` (সিলুয়েট, ২-ফ্রেম পা-দোলা — `sec` থেকে), `Scroll` (পাণ্ডুলিপি), `MinbarShape`, `Archway`, `Coin`, `Globe`, `Ring` (যুগল আংটি), `Footsteps`, `OpenHand`, `Sparkle`, `Tree` (বৃদ্ধি `progress` দিয়ে), `CheckMark` (আঁকা হয়)। সব রঙ `COLORS` থেকে; কোনো মানুষের অবয়ব নেই (D20)।
**নোট (svg2 সম্পন্ন হওয়ার পর):** `SvgKit.tsx`-এর হেলপার (`drawOn`, `popIn`/`popOpacity`, `pulse`, `Glow`, `svgId`, `SVG_LOOK.lineWidth`, `artPoint`/`zonesOf`) ব্যবহার করুন; আইডি `svgId(idPrefix, name)`; বিস্তারিত হ্যান্ডঅফের "svg2 সম্পন্ন — svg3 থেকে…" সারিতে।
**টেস্ট:** `tsc --strict`; প্রতিটি আকৃতি `progress` 0/0.5/1-এ রেন্ডার (SSR) ও একটি কন্ট্যাক্ট-শিট স্টিল চোখে দেখা; `viewBox` ও আকার ঠিক; কোনো আকৃতি অন্যের `id` (গ্রেডিয়েন্ট/মাস্ক) ধাক্কা দেয় না (প্রতিটি `useId`/প্রেফিক্স); ডিটারমিনিজম।
**✅ বিবরণ:** _( )_

### - [ ] svg4 — `SceneSanad.tsx` (A১: সনদ/বর্ণনাকারীর চেইন)
**ইনপুট:** `svg-data.ts` (`sanad` জানালা), `SvgKit.tsx`, `SvgShapes.tsx` (`Scroll`, `Sparkle`)।
**করণীয়:** SVG-২-এর `sanad` সারির বর্ণনা অনুযায়ী — ৩টি `Scroll`-নোড (বাম → ডানে, ১৬:৯-এ শিল্প-অঞ্চলের উপরের/নিচের ব্যান্ডে, ৯:১৬-এ উপরের ব্যান্ডে), সোনালি সুতো `drawOn` দিয়ে আঁকা, নোডে আলো জ্বলা (হুমায়দী 0.00, আলকামা 2.42, তৃতীয় 5.48 — সবই `WORDS` থেকে), সুতো বেয়ে আলোর বিন্দু; শেষে তৃতীয় নোড `minbar`-এর দিকে ক্রসফেডে মিশে যায়। লেখা নেই।
**টেস্ট:** `tsc --strict`; দুই অনুপাতে ৬টি করে স্টিল (জানালার শুরু/মাঝ/শেষ সহ); শিল্প ক্যাপশন-ব্যান্ডের বাইরে; ডিটারমিনিজম; জানালার বাইরে `null`।
**✅ বিবরণ:** _( )_

### - [ ] svg5 — `SceneMinbar.tsx` (A২: মিম্বর)
**ইনপুট:** `svg-data.ts` (`minbar`), `SvgKit.tsx`, `SvgShapes.tsx` (`MinbarShape`, `Archway`)।
**করণীয়:** মসজিদ-খিলানের ভেতরে তিন ধাপের মিম্বর-সিলুয়েট; দুই পাশে ঝুলন্ত বাতি (সিড-ভিত্তিক দোল নয় — `sin` দোল); "মিম্বরের" (9.65–10.16)-এ ধাপ ১→২→৩ ক্রমে জ্বলে; "বলতে শুনেছি" (11.00–11.84)-এ ওপরের ধাপ থেকে ৩টি সোনালি শব্দ-তরঙ্গ-বৃত্ত বেরোয়। কোনো মানুষ নেই (D20)।
**টেস্ট:** `tsc --strict`; দুই অনুপাতে ৬টি করে স্টিল; ধাপ-জ্বলার সময় `WORDS`-এর সাথে মেলে (মান-টেস্ট); ডিটারমিনিজম।
**✅ বিবরণ:** _( )_

### - [ ] svg6 — `SceneMadina.tsx` (A৩: মদিনার সিলুয়েট)
**ইনপুট:** `svg-data.ts` (`madina`), `SvgKit.tsx`, `SvgShapes.tsx` (`MosqueSkyline`, `Dome`, `Minaret`, `PalmTree`, `Crescent`)।
**করণীয়:** নিচের ব্যান্ডে মদিনার সিলুয়েট (সবুজ গম্বুজ কেন্দ্রে, মিনার, খেজুর গাছ), উপরের ব্যান্ডে অর্ধচন্দ্র ও তারা; "ইরশাদ" (14.35)-এ গম্বুজ থেকে আলোর স্তম্ভ ওপরে ওঠে (রেডিয়াল/লিনিয়ার গ্রেডিয়েন্ট, ফিল্টার নয়); শেষে `niyyah`-এ ক্রসফেড।
**টেস্ট:** `tsc --strict`; দুই অনুপাতে ৬টি করে স্টিল; আলোর স্তম্ভ ক্যাপশন-ব্যান্ডে ম্লান থাকে (মাস্ক কাজ করছে); ডিটারমিনিজম।
**✅ বিবরণ:** _( )_

### - [ ] svg7 — `SceneNiyyah.tsx` (B: নিয়্যাতের প্রতীক — হৃদয় ও আলো)
**ইনপুট:** `svg-data.ts` (`niyyah`, `bandOpacity` 0.45), `SvgKit.tsx`, `SvgShapes.tsx` (`Heart`, `Star8`, `Sparkle`), `ArabicBlock.tsx`-এর `getArabicWindow()` (আরবি ব্লকের জায়গা জানতে)।
**করণীয়:** কেন্দ্রে বড় হৃদয় — রেখা আঁকা (15.79), আলোর গোলক জ্বলে (16.38), "বিন-নিয়্যাত" (16.86)-এ রশ্মি ছড়ায় ও ৮-কোনা তারার বলয় এক পাক ঘোরে; আরবি ব্লক (ওপরে, ১৬:৯ y 392–574 / ৯:১৬ y 675–879) ঢাকবে না — হৃদয় আরবির নিচে/পেছনে (ম্লান), রশ্মি আরবির পেছনে ম্লান।
**টেস্ট:** `tsc --strict`; দুই অনুপাতে ৬টি করে স্টিল (আরবি ব্লকসহ — `Background + SvgLayer + Header + ArabicBlock + Karaoke` একসাথে); আরবির হারাকাত পড়া যায়; ডিটারমিনিজম।
**✅ বিবরণ:** _( )_

### - [ ] svg8 — `SceneAmal.tsx` (C১: হৃদয় ↔ কাজের সম্পর্ক)
**ইনপুট:** `svg-data.ts` (`amal`), `SvgKit.tsx`, `SvgShapes.tsx` (`Heart`, `OpenHand`, `Footsteps`, `Scroll`, `Sparkle`)।
**করণীয়:** বামে ছোট জ্বলন্ত হৃদয়, ডানে কাজের আইকন-সারি (দান-হাত, পদচিহ্ন, কিতাব) "প্রত্যেক কাজ" (18.06–18.93)-এ একে একে ওঠে; "নিয়তের" (18.93)-এ হৃদয় থেকে আলোর সুতো `drawOn` দিয়ে আইকনগুলোর সাথে বাঁধে ও দপদপ করে; "সম্পর্কিত" (19.90)-এ গিঁট-ঝলক।
**টেস্ট:** `tsc --strict`; দুই অনুপাতে ৬টি করে স্টিল; সুতো-আঁকার সময় শব্দ-সময়ের সাথে মেলে (মান-টেস্ট); ডিটারমিনিজম।
**✅ বিবরণ:** _( )_

### - [ ] svg9 — `SceneFruit.tsx` (C২: নিয়ত অনুযায়ী ফল — বীজ → গাছ → ফল)
**ইনপুট:** `svg-data.ts` (`fruit`), `SvgKit.tsx`, `SvgShapes.tsx` (`Tree`, `Heart`, `Sparkle`)।
**করণীয়:** মাটি-রেখার ওপর আলো-বীজ ("আর মানুষ" 20.49); "নিয়ত" (21.73)-এ বীজ জ্বলে; "অনুযায়ী" (22.21–22.80)-এ `Tree` `progress` ০→১ (অঙ্কুর → ডালপালা); "ফল পাবে" (22.80–23.56)-এ ৩টি সোনালি ফল পাকে ও জ্বলে (ফল-গ্লো `pulse`)।
**টেস্ট:** `tsc --strict`; দুই অনুপাতে ৬টি করে স্টিল (বীজ/অঙ্কুর/গাছ/ফল); `progress` একঘেয়ে বাড়ে (মান-টেস্ট); ডিটারমিনিজম।
**✅ বিবরণ:** _( )_

### - [ ] svg10 — `SceneHijra.tsx` (C৩: হিজরতের উট-কাফেলা)
**ইনপুট:** `svg-data.ts` (`hijra`), `SvgKit.tsx`, `SvgShapes.tsx` (`Kaaba`, `Camel`, `MosqueSkyline`, `Dome`, `Crescent`), `Background.tsx` (`mulberry32`)।
**করণীয়:** রাতের মরু-দৃশ্য: বামে `Kaaba` সিলুয়েট, ডানের দিগন্তে মদিনার গম্বুজ-সারি, মাঝে ২–৩ স্তরের বালিয়াড়ি (প্যারালাক্স), ৩–৪টি উটের কাফেলা `x(sec)` রেখাবদ্ধ হাঁটে — 24.51 ("হিজরত") থেকে 30.89 পর্যন্ত বাম থেকে ডানে ≈ ৬০% দূরত্ব (শব্দ-সময় থেকে `interpolate`); সিড-ভিত্তিক মিটমিট তারা; ১৬:৯-এ কাফেলা নিচের ব্যান্ডে (y ≈ 850–1000), ৯:১৬-এ নিচের ব্যান্ডে (y ≈ 1340–1600)।
**টেস্ট:** `tsc --strict`; দুই অনুপাতে ৮টি করে স্টিল (কাফেলা-অবস্থান শুরু/মাঝ/শেষে); কাফেলা ক্যাপশন-ব্যান্ডে ঢোকে না; `x(sec)` একঘেয়ে; ডিটারমিনিজম (ফ্রেম ক্রম-নিরপেক্ষ — রেন্ডার-চাঙ্কে নিরাপদ)।
**✅ বিবরণ:** _( )_

### - [ ] svg11 — `SceneDuniyaNari.tsx` (C৩-র উপরে-স্তর: দুনিয়া/নারীর উদ্দেশ্যে হিজরত)
**ইনপুট:** `svg-data.ts` (`duniyaNari`), `SvgKit.tsx`, `SvgShapes.tsx` (`Globe`, `Coin`, `Ring`, `Sparkle`), `SceneHijra.tsx` (কাফেলার `x(sec)` ফাংশন — এক্সপোর্ট করা থাকলে ব্যবহার, নইলে এখানে একই সূত্রে)।
**করণীয়:** কাফেলার সামনে পথ দুই ভাগ; "দুনিয়া লাভের" (25.34–26.18)-এ ডানে-ওপরে পৃথিবী + মুদ্রা ওঠে; "নারীকে বিয়ে করার" (26.92–28.07)-এ আংটি-যুগল (নারীর কোনো অবয়ব নয় — D20); "উদ্দেশ্যে," (28.07–28.49)-এ দুটি আইকনই স্পন্দিত; "সেই উদ্দেশ্যই" (28.49)-এ কাফেলা থেকে সোনালি তীর ঐ আইকনে, মদিনা-লক্ষ্য ম্লান (`hijra`-র দিগন্ত-গম্বুজের অপাসিটি কমে — এই স্তরের নিজস্ব অ্যালফা-ঢাকনা দিয়ে, `SceneHijra` অপরিবর্তিত); "প্রাপ্য" (30.57)-এ আইকন-জোড়া জ্বলে।
**টেস্ট:** `tsc --strict`; দুই অনুপাতে ৮টি করে স্টিল; তীর কাফেলার অবস্থানের সাথে সংযুক্ত; ক্যাপশন ঢাকে না; ডিটারমিনিজম।
**✅ বিবরণ:** _( )_

### - [ ] svg12 — `SceneLesson.tsx` (D১: "নিয়্যাত ঠিক = আমল কবুল" ডায়াগ্রাম)
**ইনপুট:** `svg-data.ts` (`lesson`), `SvgKit.tsx`, `SvgShapes.tsx` (`Heart`, `Crescent`, `CheckMark`, `Sparkle`), `theme.ts` (`FONTS.sans`), `Karaoke.tsx`-এর শিক্ষা-কার্ডের মাপ (S5.4: ১৬:৯ y 589–851, ৯:১৬ y 936–1324)।
**করণীয়:** কার্ডের **নিচে** কমপ্যাক্ট স্ট্রিপ (১৬:৯ y 860–1010, ৯:১৬ y 1340–1620): **[ছোট আমল]** (ছোট জ্বলন্ত বিন্দু/খেজুর-দানা) "আমল ছোট হোক" (32.20–33.39)-এ পপ; **+** ও **[নিয়্যাত — হৃদয়]** "কিন্তু নিয়ত" (33.39–34.22)-এ; "যদি আল্লাহর জন্য হয়" (34.22–35.88)-এ অর্ধচন্দ্র-আলো নেমে হৃদয় সোনালি করে; **=** আঁকা, **[আমল কবুল ✓]** `CheckMark` আঁকা (≈ 35.5); নিচে/পাশে লেখা **"নিয়্যাত ঠিক = আমল কবুল"** (Anek Bangla ৮০০, সোনালি)। পুরো ডায়াগ্রাম শব্দ-সময়ে ধাপে ধাপে বাড়ে; আগে-আসা অংশ জ্বলন্ত থাকে।
**টেস্ট:** `tsc --strict`; দুই অনুপাতে ৮টি করে স্টিল (প্রতি ধাপ); লেখার যুক্তাক্ষর ঠিক (S8.1-এ আসল ফন্টে দেখা বাকি); স্ট্রিপ শিক্ষা-কার্ড বা প্রগ্রেস বারের সাথে ওভারল্যাপ করে না (জ্যামিতি-টেস্ট); ডিটারমিনিজম।
**✅ বিবরণ:** _( )_

### - [ ] svg13 — `SceneNajat.tsx` (D২: আখিরাত ও নাজাত)
**ইনপুট:** `svg-data.ts` (`najat`), `SvgKit.tsx`, `SvgShapes.tsx` (`Archway`, `Sparkle`, `Crescent`), `SceneLesson.tsx` (স্ট্রিপের অবস্থান)।
**করণীয়:** ডায়াগ্রামের ফলাফল থেকে আলোর পথ ওপরে খিলান-দরজায় (শিল্প-অঞ্চলের উপরের ব্যান্ড); "আখিরাতে" (36.71)-এ দরজার দুই পাল্লা সরে আলো; "নাজাতের" (37.28)-এ আলোর বিস্ফোরণ ও সিড-ভিত্তিক কণা; "কারণ" (37.85)-এ স্থির, ধীর স্পন্দন; অডিও-শেষের পর আউটরো-ফেডে (`SvgLayer`-এর `opacity`) মিলিয়ে যায়।
**টেস্ট:** `tsc --strict`; দুই অনুপাতে ৬টি করে স্টিল; আউটরো-ফেডে (ফ্রেম ১১৫০–১১৬৮) অদৃশ্য; ডিটারমিনিজম।
**✅ বিবরণ:** _( )_

### - [ ] svg14 — `KeywordIcons.tsx` (কীওয়ার্ড আইকন সেট)
**ইনপুট:** `SvgShapes.tsx`, `svg-data.ts` (`KEYWORDS`-এর `icon` নাম), `theme.ts`।
**করণীয়:** ডার্ক-এমারেল্ড গোল/রাউন্ডেড টাইলে সোনালি লাইন-আইকন (১৬০×১৬০ `viewBox`): `niyyah` (হৃদয়+আলো), `hijra` (পদচিহ্ন+তীর), `duniya` (পৃথিবী+মুদ্রা), `nari` (আংটি), `amal` (দান-করা হাত), `allah` (অর্ধচন্দ্র+নরম আলো — লিপি নয়), `akhirah` (খিলান-দরজা), `najat` (আলোর রশ্মি); প্রতিটি `progress`-এ আঁকা হয়। `KEYWORD_ICONS` ম্যাপ (নাম → কম্পোনেন্ট) এক্সপোর্ট; `svg-data.ts`-এর প্রতিটি `icon` নামের জন্য কম্পোনেন্ট আছে কি `validateKeywordIcons()` যাচাই করে। **(svg1-এর বাস্তবায়ন অনুযায়ী: কীওয়ার্ডে `icons[]` অ্যারে; নামের তালিকা `KEYWORD_ICON_NAMES` (৮টি) — এটি দিয়ে যাচাই।)**
**টেস্ট:** `tsc --strict`; ৮টি আইকনের কন্ট্যাক্ট-শিট (দুই আকারে); `validateKeywordIcons()` ফাঁকা; ডিটারমিনিজম।
**✅ বিবরণ:** _( )_

### - [ ] svg15 — `KeywordPopup.tsx` (কীওয়ার্ড পপ-আপ)
**ইনপুট:** `svg-data.ts` (`popupAt`, `KEYWORDS`), `KeywordIcons.tsx`, `SvgKit.tsx` (`popupZone`), `theme.ts` (`FONTS.sans`), `timing.ts` (`audioSecAt`)।
**করণীয়:** `popupAt(sec)` যে কীওয়ার্ড দেয় তার আইকন + নিচে বাংলা লেবেল (Anek Bangla ৭০০) টাইলে — SVG-৪-এর পপ-আপ অঞ্চলে (১৬:৯ y 392–560; ৯:১৬ y 665–900, মাঝ-কেন্দ্র); স্প্রিং-পপ ও ০.২৫ সে. ফেড-আউট; টাইল আধা-অস্বচ্ছ গাঢ় (পেছনের দৃশ্য মিশলেও পড়া যায়); প্রপস `opacity`, `timeOffsetSec` (S5.7 নিয়ম); যুগ্ম পপ-আপ (আখিরাত → নাজাত) দুই আইকন পাশাপাশি। **(svg1 অনুযায়ী: `KeywordDef.icons`/`labels` অ্যারে; `popupAt(sec)` → `{keywordId, localSec, durationSec, opacity}`।)**
**টেস্ট:** `tsc --strict`; প্রতিটি পপ-আপের দুই অনুপাতে ৩টি করে স্টিল; **ওভারল্যাপ-টেস্ট:** প্রতিটি পপ-আপ-ফ্রেমে টাইলের বাউন্ডিং-বক্স ক্যাপশন-বক্স/আরবি-বক্স/হেডার-বক্সের সাথে ছেদ করে না (জ্যামিতি থেকে); পর্দায় একসাথে ≤ ১টি; জানালার বাইরে `null`; ডিটারমিনিজম।
**✅ বিবরণ:** _( )_

### - [ ] svg16 — `SvgLayer.tsx` (দৃশ্য-অর্কেস্ট্রেটর)
**ইনপুট:** `svg-data.ts` (`activeScenes`), সব `Scene*.tsx`, `SvgKit.tsx` (`SceneFrame`), `timing.ts`, `config.ts`।
**করণীয়:** `activeScenes(sec)` থেকে (সর্বোচ্চ ২টি — ক্রসফেডে; `duniyaNari` আলাদা স্তরে) প্রতিটি সক্রিয় দৃশ্যের কম্পোনেন্ট `SceneFrame`-এ আঁকে; `id → কম্পোনেন্ট` ম্যাপ; প্রপস `opacity` (আউটরো/ইন্ট্রো ফেড), `timeOffsetSec` (ডিফল্ট ০); জানালার বাইরের দৃশ্য আঁকে না (পারফরম্যান্স)।
**নোট (svg2 সম্পন্ন হওয়ার পর):** `SceneFrame`-এর `idPrefix` = দৃশ্য-আইডি (ক্রসফেডে দুই দৃশ্য একসাথে — আইডি-সংঘর্ষ এড়াতে), `bandOpacity={sceneBandOpacity(id)}`, `opacity` = `activeScenes`-এর `opacity × (আউটরো/ইন্ট্রো ফেড)`; দৃশ্য-কম্পোনেন্ট শুধু `<g>` ফেরত দেয় (`SceneProps`)।
**টেস্ট:** `tsc --strict`; সব ১২০০ ফ্রেম স্ক্যান: প্রতি ফ্রেমে ≥ ১ দৃশ্য, ≤ ২ (`duniyaNari` ছাড়া); ক্রসফেডে মোট অপাসিটি ≈ ১; `timeOffsetSec` সমতা (S5.7 ধারা: `<Sequence>`-ভেতরে ≡ গ্লোবাল ফ্রেম); ডিটারমিনিজম; দুই অনুপাতে সব দৃশ্য-জানালার একটি করে স্টিল।
**✅ বিবরণ:** _( )_

### - [ ] svg17 — `HadisVideo.tsx` ও `config.ts` (একীকরণ)
**ইনপুট:** `HadisVideo.tsx` (S6.1), `config.ts`, `SvgLayer.tsx`, `KeywordPopup.tsx`, `Outro.tsx` (`previousLayersOpacity`)।
**করণীয়:** (ক) `HadisVideo.tsx`-এ `<SvgLayer/>` `Background`-এর পরে, `Header`-এর আগে; `<KeywordPopup/>` `ProgressBar`-এর পরে, `Outro`-র আগে; দুটিতেই `previousLayersOpacity(frame/fps − audioSec)` ও শুরুর ফেড-ইন (কনটেন্ট-র‍্যাপারের ভেতরে — `Background` ছাড়া)। (খ) `config.ts`-এ `SVG_LAYERS = {scenes: true, keywords: true}` সুইচ (`false` দিলে ঐ স্তর আঁকা হয় না — দ্রুত বন্ধ করার উপায়)। (গ) S6.1/S6.2-এর টেস্ট (১৯৫/১৯৫, ২২/২২) পুনরায় চালিয়ে পাস রাখা; স্তর-ক্রমের মন্তব্য/ডক আপডেট।
**টেস্ট:** `tsc --strict` সব ফাইলে এরর ০; পুরনো টেস্ট-স্যুট পাস; `SVG_LAYERS` দুটি `false` করলে আউটপুট ঠিক আগের ভিডিওর HTML-এর সাথে **হুবহু একই** (রিগ্রেশন-প্রমাণ); ফ্রেম ১১৬৮-এ নতুন স্তরসহ সব অদৃশ্য; `npm run check` PASS অপরিবর্তিত।
**✅ বিবরণ:** _( )_

### - [ ] svg18 — QA: স্টিল, পড়ার-যোগ্যতা, `render.yml` প্রিভিউ-ফ্রেম
**ইনপুট:** সব ফাইল, `.github/workflows/render.yml` (S7.1 `preview` জব), Hadis.md-এর S8.1 চেকলিস্ট।
**করণীয়:**
- দুই অনুপাতে স্টিল (নকল-ফন্টে/উপলব্ধ ফন্টে): প্রতিটি দৃশ্যের মাঝ-ফ্রেম ও প্রতিটি পপ-আপ — প্রস্তাবিত ফ্রেম (÷৩০ = সে.): **90, 300, 420, 510, 585, 675, 744, 810, 885, 1050, 1128** (+ বিদ্যমান 0, 60, 480, 560, 700, 1000, 1160, 1190, 1250, 1299)।
- ক্যাপশনের ওপর দৃশ্য মিশলে কনট্রাস্ট: ক্যাপশন-ব্যান্ডের সবচেয়ে উজ্জ্বল দৃশ্য-পিক্সেলে `CAPTION_COLORS` কনট্রাস্ট ≥ ৪.৫ (D12 ধরে রাখা); না মিললে `SVG_LOOK.captionBandOpacity` কমানো।
- `render.yml`-এর `preview` জবের ফ্রেম-তালিকায় নতুন ফ্রেম যোগ (প্রতিটি ≤ ১২৯৯); স্টিল সংখ্যা বাড়ায় `timeout-minutes` (এখন ৪৫) বাড়ানো বা তালিকা ছাঁটা (সমস্যা-সমাধান সারি দেখুন); `check`/`prepare`/`render` জব অপরিবর্তিত।
- S8.1 চেকলিস্টে যোগ হওয়া SVG-আইটেমগুলো (নিচে ফেজ ৮-এ আগেই যোগ করা) প্রথম দফা মিলিয়ে দেখা; সমস্যা পেলে সংশ্লিষ্ট `svgN`-এর বিবরণে লিখে ঠিক করা।
**টেস্ট:** সব স্টিলে — জ্যামিতি-ওভারল্যাপ ০; ডিটারমিনিজম (এলোমেলো ফ্রেম-ক্রমে একই আউটপুট); `SVG_LAYERS` বন্ধ করলে আগের আউটপুট; YAML বৈধ।
**✅ বিবরণ:** _( )_

---

## ফেজ 8 — QA, রেন্ডার, রিলিজ

### - [ ] S8.1 — প্রিভিউ স্টিল পর্যালোচনা
**চেকলিস্ট (দুই অনুপাতে):**
- [ ] লোগো উপরে, কাটা নয়; "S2" দৃশ্যমান
- [ ] "আজকের হাদিস" ও "সহিহ বুখারী • হাদিস নং: ০১" পড়া যায়
- [ ] বাংলা যুক্তাক্ষর (ক্ষ, ত্র, স্ত, ্য ইত্যাদি) ভাঙা নয়
- [ ] আরবি হারাকাত কাটা নয়, RTL ঠিক
- [ ] ৯:১৬-তে উপর ১৫০px/নিচ ২৫০px সেফ-জোনে গুরুত্বপূর্ণ টেক্সট নেই
- [ ] টেক্সট ও ব্যাকগ্রাউন্ডের কনট্রাস্ট যথেষ্ট
- [ ] ক্যাপশন কালারফুল (প্রতি শব্দে আলাদা রঙ), সক্রিয় শব্দের পপ/পিল/আন্ডারলাইন দেখা যাচ্ছে, ফন্ট Anek Bangla (ফলব্যাক নয়) — **এবং "S2"/সোর্স-পিলও Anek Bangla (Hind Siliguri নয়)**
- [ ] *(S5.4 থেকে)* আসল Anek Bangla-য় সক্রিয় শব্দের পিল পাশের শব্দে ঠেকছে না (`KARAOKE_LOOK.columnGapEm` ০.৫৫); ১৬:৯-তে ≤ ২ লাইন, ৯:১৬-তে ≤ ৩ লাইন; আন্ডারলাইন/পিল অক্ষরের সাথে মানানসই (`pillInsetYEm`/`underlineBottomEm`)
- [ ] *(S5.4 থেকে)* সেকশন D-র "শিক্ষা" কার্ডের ভেতরে বেশি ফাঁকা দেখালে `maxLines`/`lesson.padding` কমানো; আউটরোতে ক্যাপশন ফেড-আউট হচ্ছে (`holdLastPage`)
- [ ] *(S5.6 থেকে)* আউটরো: লোগো + "আজই প্লে স্টোর থেকে ডাউনলোড করুন:" + "ইসলামী বিশ্বকোষ ও আল হাদিস S2 অ্যাপ।" পড়া যায়, যুক্তাক্ষর ঠিক; আসল ফন্টে ৯:১৬-এ অ্যাপ-লাইন ≤ ২ লাইন ও S2 চিপ লাইনের মাঝে ভাঙছে না
- [ ] *(S5.6 থেকে)* Google Play badge স্পষ্ট (কাটা/ঝাপসা নয়), পপ → শ্বাস → shine চলছে, shine badge-আকৃতির বাইরে ছড়াচ্ছে না; ৯:১৬ সেফ-জোনের (উপর ১৫০/নিচ ২৫০) ভেতরে
- [ ] *(S5.6 থেকে)* আউটরোতে আগের স্তর (হেডার/ক্যাপশন/প্রগ্রেস) ০.৬ সে.-এ পুরো ফেড-আউট, কোনো ওভারল্যাপ নেই

**SVG ফেজ থেকে যোগ হওয়া আইটেম (ফেজ SVG শেষ হলে):**
- [ ] *(svg4–svg13)* দৃশ্যগুলো ক্যাপশনের পেছনে ম্লান, ক্যাপশন স্পষ্ট পড়া যায় (দুই অনুপাতে); কোনো মানুষের অবয়ব নেই; দৃশ্য-বদলে ক্রসফেড মসৃণ (০.৫ সে.)
- [ ] *(svg7)* আরবি ব্লকের (১৫.৫৭–১৮.৪০ সে.) হারাকাত হৃদয়-দৃশ্যের পেছনে ঢাকা পড়ে না
- [ ] *(svg12)* "নিয়্যাত ঠিক = আমল কবুল" লেখার যুক্তাক্ষর ঠিক (আসল Anek Bangla-য়); ডায়াগ্রাম-স্ট্রিপ শিক্ষা-কার্ড/প্রগ্রেস বারে ঠেকছে না; ৯:১৬ সেফ-জোনের (নিচ ২৫০) ভেতরে
- [ ] *(svg15)* কীওয়ার্ড পপ-আপ ক্যাপশন/আরবি/হেডার ঢাকছে না; শব্দের সময়ে আসছে; একসাথে একটির বেশি নয়
- [ ] *(svg16–svg17)* আউটরোতে দৃশ্য ও পপ-আপ আগের স্তরের মতোই ফেড-আউট (ফ্রেম ১১৬৮-এ অদৃশ্য); `SVG_LAYERS` বন্ধ করলে আগের ভিডিও

**✅ বিবরণ:** _( )_

### - [ ] S8.2 — HD রেন্ডার ও সিঙ্ক পর্যালোচনা
**করণীয:** `16x9-HD` ও `9x16-HD` রেন্ডার; ডাউনলোড করে দেখা: শব্দ হাইলাইট কণ্ঠের সাথে মিলছে কি না (বিশেষত ১১.৮–১২.৪, ১৭.৫–১৮.১, ৩০.৯–৩১.৩ সে.-এর বিরতিতে)। অমিল থাকলে S3.3 পুনরায়। **(SVG ফেজের পর)** দৃশ্য-পরিবর্তন ও কীওয়ার্ড পপ-আপ কণ্ঠের সাথে মিলছে কি না দেখা — বিশেষত `minbar` (৯.৬৫ "মিম্বরের"), `hijra`/`duniyaNari` (২৪.৫–৩০.৯), `lesson` (৩২.২–৩৫.৯) ও `najat` (৩৬.৭–৩৮.৩); অমিল থাকলে `svg-data.ts`-এর ইনডেক্স/`SVG_TIMING` ঠিক করুন (সময় `WORDS` থেকেই আসে, তাই আগে synced JSON মিলিয়ে নিন)।

**✅ বিবরণ:** _( )_

### - [ ] S8.3 — 4K রেন্ডার
**করণীয়:** `16x9-4K` ও `9x16-4K` রেন্ডার; ফাইল সাইজ (আনুমানিক ২০–৬০ MB) ও রেজোলিউশন যাচাই।

**✅ বিবরণ:** _( )_

### - [ ] S8.4 — চূড়ান্ত বিতরণ
**করণীয়:** ৪টি MP4 আর্টিফ্যাক্ট/রিলিজ থেকে ডাউনলোড; ফাইলনাম নিয়ম নিশ্চিত; পরবর্তী হাদিসের জন্য কিট পুনর্ব্যবহারের নোট (শুধু `hadisXXXX.json/.wav` বদল + `config.ts`-এর `HADIS_ID` ও `hadis-data.ts`-এর মেটা)।

**✅ বিবরণ:** _( )_

---

## 9. সম্ভাব্য সমস্যা ও সমাধান

| সমস্যা | কারণ | সমাধান |
|---|---|---|
| বাংলা অক্ষর ভাঙা/ফাঁকা | ফন্ট লোড হয়নি | `loadFont()` ব্যবহার ও `delayRender` অপেক্ষা; subsets-এ `bengali` আছে কি দেখুন |
| রেন্ডারে শব্দ ঝিকমিক | `Math.random`/CSS animation | সিড-ভিত্তিক র‍্যান্ডম, শুধু `useCurrentFrame` |
| `Cannot find module './logo.jpg'` | টাইপ ডিক্লারেশন নেই | `declaration.d.ts` লাগবে না — বদলে `tsconfig`-এ `types` বা রুটে ছোট `global.d.ts` (এটি আলাদা ধাপে যোগ হবে, ফাইল রুটেই) |
| Remotion ভার্সন মিসম্যাচ | `^` রেঞ্জ | সব প্যাকেজ exact pin |
| 4K জব টাইমআউট | ধীর রেন্ডার | `--concurrency` কমানো/`timeout-minutes` বাড়ানো, `--jpeg-quality=90` |
| সিঙ্ক ফেইল | JSON আনুমানিক টাইমিং | S3.3 `sync-fix.mjs` |
| Chrome ডাউনলোড ফেইল | নেটওয়ার্ক | রি-রান; `npx remotion browser ensure` আগে |
| ক্যাপশন/লেবেল ফন্ট লোড/মডিউল-নাম ত্রুটি | `@remotion/google-fonts/AnekBangla` নাম/weights (৫০০–৮০০) অযাচাইকৃত | `theme.ts`-এ import ঠিক করুন; বিকল্প: `BalooDa2` / `NotoSansBengali` (**`HindSiliguri` নয় — আপনি চান না, D13**) (শুধু `loadAnekBangla` লাইন ও `FONTS.caption` বদলাবে) |
| ক্যাপশন রঙ পড়া কঠিন | উজ্জ্বল ব্যাকগ্রাউন্ড অংশে রঙ মিশে যাওয়া | `CAPTION.stroke.em` বাড়ান (০.০৬→০.০৮) বা `CAPTION_COLORS` গাঢ় করুন; `check` হিসেবে `CONTRAST_PAIRS` চালান |
| আউটরোর badge-এ shine ছড়িয়ে যায়/দেখা যায় না | `mask-image` সমর্থন/URL | `Outro.tsx`-এ shine-ব্লকের `WebkitMaskImage`/`maskImage` দেখুন; ব্যর্থ হলে shine মুছে শুধু পপ+শ্বাস রাখা যায় (badge নিজে অক্ষত থাকে) |
| আউটরো ছোট/বড় করতে চাই | `OUTRO_SECONDS` | `config.ts`-এ সংখ্যা বদলান (`Outro` ৩.২ সে.-এর নিচে আনুপাতিক সংকুচিত হয়); মোট ফ্রেম স্বয়ংক্রিয় |
| `HadisVideo: format "…" … কিন্তু কম্পোজিশনের মাপ …` ত্রুটি | `Root.tsx`-এ কম্পোজিশনের `defaultProps.format` মাপের সাথে মেলেনি (যেমন `Hadis-16x9`-এ `'9x16'`) | `Hadis-16x9` → `'16x9'`, `Hadis-9x16` → `'9x16'` দিন (S6.2) |
| কম্পোজিশনের দৈর্ঘ্য ১৩০০ নয়/অডিও-দৈর্ঘ্য পড়া যাচ্ছে না | `getAudioDurationInSeconds` ব্যর্থ (ফলব্যাক ৩৮.৩২ চলছে) বা `hadis0101.wav` বদলানো | `remotion compositions`-এর আউটপুটে `durationInFrames` দেখুন; ফাইল ঠিক থাকলে `@remotion/media-utils` ভার্সন (4.0.340 পিন) মিলিয়ে নিন; ফলব্যাকেও রেন্ডার চলে |
| Actions: `Unable to locate package libasound2t64` | রানার `ubuntu-latest` ২৪.০৪-এর আগের (২২.০৪) ইমেজে চলছে | `env.CHROME_LIBS`-এ `libasound2t64` → `libasound2` করুন (বা `runs-on: ubuntu-24.04` দিন) |
| Actions `preview`/`check` ধীর বা Chrome ডাউনলোডে ব্যর্থ | `npx remotion browser ensure` নেটওয়ার্ক/ক্যাশ | রি-রান করুন; প্রতিটি স্টিল আলাদা বান্ডল করে বলে `preview` ১৫–৩০ মিনিট নিতে পারে (`timeout-minutes: 45`) |
| `render` জবে `ffprobe` যাচাই ফেইল: `রেজোলিউশন মেলেনি` | `--scale` ফ্ল্যাগ কাজ করেনি বা কম্পোজিশন-মাপ বদলেছে | `config.ts`-এর `FORMATS`/`QUALITIES` ও `prepare`-এর `w/h` মিলিয়ে দেখুন; লগে `remotion render`-এর আউটপুট মাপ দেখুন |
| `render` জবে `ffprobe` যাচাই ফেইল: `দৈর্ঘ্য প্রত্যাশার বাইরে` | অডিও/`OUTRO_SECONDS` বদলেছে বা রেন্ডার মাঝপথে কেটেছে | অডিও বদলালে জব-`env`-এর `EXPECTED_SEC` = অডিও সেকেন্ড + আউটরো করুন (`remotion compositions`-এর ফ্রেম ÷ ৩০); নয়তো রেন্ডারের লগ দেখুন |
| `render` জবে `ffprobe` যাচাই ফেইল: `অডিও স্ট্রিম নেই` | `--audio-codec`/`Audio` সমস্যা বা `.wav` ইম্পোর্ট ব্যর্থ | লগে `Audio` সংক্রান্ত সতর্কতা দেখুন; `HadisVideo.tsx`-এ `Audio` ও `hadis0101.wav` পথ যাচাই করুন |
| 4K রেন্ডার ৯০ মিনিটে শেষ হয় না / মেমরি-ত্রুটি / Chrome ক্র্যাশ | ৪K ফ্রেম ভারী; `--concurrency=4` রানারে বেশি | `render.yml`-এ `--concurrency=2` (বা ১) করুন; `--jpeg-quality=90` যোগ; `timeout-minutes` বাড়ান; আগে HD চালিয়ে সময় মাপুন |
| `render` জব Skipped | `formats=preview` দিয়েছেন (`has_video=false`) | `formats`-এ একটি ভিডিও-মান বা `all` বাছুন |
| লাইসেন্স | Remotion কোম্পানি-ব্যবহার শর্ত | ব্যক্তিগত/ছোট টিম ফ্রি; ৪+ জনের কোম্পানি হলে Remotion-এর লাইসেন্স শর্ত দেখে নিন |
| SVG দৃশ্যে ক্যাপশন পড়া কঠিন | দৃশ্য ক্যাপশন-ব্যান্ডে বেশি উজ্জ্বল | `SVG_LOOK.captionBandOpacity` 0.28 → 0.2 (বা দৃশ্য-ভিত্তিক `bandOpacity` কমান); দ্রুত বন্ধ: `config.ts`-এ `SVG_LAYERS.scenes = false` (svg17) |
| 4K রেন্ডার SVG-এর পর অনেক ধীর | ভারী `feGaussianBlur`/মাস্ক/অনেক কণা | ফিল্টার বাদ দিয়ে `radialGradient`; কণা-সংখ্যা কমান; `--concurrency` কমান; আগে HD দিয়ে সময় মাপুন |
| কীওয়ার্ড পপ-আপ ক্যাপশন/ডায়াগ্রামে ঠেকছে | পপ-আপ অঞ্চল (১৬:৯ y 392–560, ৯:১৬ y 665–900) আর ক্যাপশন-বক্স ছেদ করছে (আসল ফন্টে লাইন বেশি) | `SvgKit.tsx`-এর `popupZone` ছোট/উপরে সরান; পপ-আপ টাইলের আকার কমান; দ্রুত বন্ধ: `SVG_LAYERS.keywords = false` |
| দৃশ্য/পপ-আপ কণ্ঠের সাথে মেলে না | synced JSON আবার বদলেছে বা ইনডেক্স-রেঞ্জ ভুল | `svg-data.ts`-এর `SCENES`/`KEYWORDS` ইনডেক্স দেখুন; `validateSvgData()` চালান (সময় নয়, ইনডেক্স ঠিক করতে হয়) |
| দৃশ্য ঝিকমিক/রেন্ডার-চাঙ্কে ভিন্ন | `Math.random`/`Date`/CSS animation ঢুকেছে | `grep` করে সরান; কণা শুধু `mulberry32(seed)`; ফ্রেম ক্রম-নিরপেক্ষ ডিটারমিনিজম-টেস্ট |
| প্রিভিউ জব `timeout-minutes: 45`-এ শেষ হয় না | SVG-সহ স্টিল-সংখ্যা ~৪২ (২১ ফ্রেম × ২ অনুপাত) | `render.yml`-এ `timeout-minutes` ৯০; বা ফ্রেম-তালিকা ছাঁটুন; বা `remotion bundle` একবার + serve-url (S7.1 নোট) |
| `svg-data.ts যাচাই ব্যর্থ` ত্রুটি (Studio/রেন্ডার শুরুতেই) | `SCENES`/`KEYWORDS`-এর শব্দ-ইনডেক্স synced JSON-এর সাথে মেলেনি (শব্দ-সংখ্যা/ক্রম বদলেছে) বা কোনো পপ-আপ আরবি জানালায়/আরেক পপ-আপের খুব কাছে পড়েছে | ত্রুটির বার্তায় কোন দৃশ্য/কীওয়ার্ড ভুল তা লেখা আছে — `svg-data.ts`-এ ইনডেক্স ঠিক করুন; সন্দেহ হলে ঐচ্ছিক কীওয়ার্ডে `enabled: false`; আরবির সময় বদলালে `ARABIC_ZONE` মেলান |
| ক্রসফেডে এক দৃশ্যের আভা/মাস্ক হঠাৎ উধাও বা অন্য দৃশ্যে ঢুকে যায় | দুই দৃশ্য একসাথে দৃশ্যমান, কিন্তু `SceneFrame idPrefix` বা `Glow id` একই (SVG `id` সংঘর্ষ) | `SceneFrame idPrefix={sceneId}` ও `Glow id={svgId(idPrefix, 'নাম')}`; `SvgKit`-এর টেস্ট দুই `SceneFrame`-এর আইডি-অনন্যতা দেখে |
| ক্যাপশন-ব্যান্ডের ম্লান অংশ ক্যাপশন/লেসন-কার্ডের সাথে মেলে না (ফাঁক বা কাটা) | `Karaoke.tsx`/`theme.ts`-এর `maxLines`/`size`/`lesson.padding`/`sizeFactor.lesson` বদলেছে কিন্তু `SvgKit.tsx`-এর `LESSON_SIZE_FACTOR` (0.92) বা `SVG_GEOMETRY` মেলেনি | `LESSON_SIZE_FACTOR` মেলান (টেস্ট সোর্স-লাইন ধরে); `<SceneFrame guides>`-এ স্টিল নিয়ে কমলা ব্যান্ড-রেখা কার্ডের সাথে মিলিয়ে দেখুন; হেডারের নিচ (359/633) আসল ফন্টে বদলালে `SVG_GEOMETRY.headerBottom` |

---

## 10. কাজের লগ (শুধু যোগ হবে, মুছবে না)

| তারিখ | ধাপ | কে | সংক্ষিপ্ত ফলাফল |
|---|---|---|---|
| 2026-11-06 | svg2 (D25) | AI | `SvgKit.tsx` তৈরি (৫২৬ লাইন; ইম্পোর্ট শুধু `react`, `./theme`, `./Background` (`mulberry32`), `./svg-data` (`DEFAULT_BAND_OPACITY`)) — `SceneFrame` (পূর্ণ-পর্দা `<svg>` + ক্যাপশন-ব্যান্ড SVG `<mask>`), `SVG_LOOK`, অঞ্চল-জ্যামিতি (`artZone`/`skyZone`/`groundZone`/`captionBand`/`popupZone`/`chromeEdges`/`zonesOf`/`artPoint`/`px`), বিশুদ্ধ গণিত (`smoothstep`, `drawOn`, `popIn`/`popOpacity`, `pulse`, `wave`, `rangeProgress`, `localClamp`, `svgId` …), `Glow` (radialGradient), `Sparkles` (সিড-ভিত্তিক), `SvgGuides` (QA); `SceneProps` টাইপ। `tsc --strict --noUnusedLocals --noUnusedParameters` এরর ০; **Node-টেস্ট ৩৪/৩৪**; **Chromium পিক্সেল-টেস্ট ৫০/৫০** (১৬:৯ ও ৯:১৬ × ১×/4K ২× × ব্যান্ড ০.২৮/০.৪৫ + ক্রসফেড); ইচ্ছাকৃত ভুল ঢুকিয়ে ৭টি টেস্ট ফেইল দেখে মিউটেশন-যাচাই; দুই অনুপাতের স্টিল চোখে দেখা; `npm run check` PASS, `sync-report.json` বাইট-একই; আগের কোনো ফাইল অপরিবর্তিত; zip-এ শুধু `SvgKit.tsx` যোগ ও `Hadis.md` প্রতিস্থাপিত; পরের ধাপ svg3 |
| 2026-11-06 | svg1 (D24) | AI | `svg-data.ts` তৈরি (৫৭০ লাইন; শুধু `./hadis-data` import) — `SCENES` ১০টি (৯ main + ১ overlay `duniyaNari`, শব্দ-ইনডেক্স রেঞ্জে), `KEYWORDS` ১০টি (৭ চালু, ৩ ঐচ্ছিক বন্ধ; `icons[]`/`labels[]` — যুগ্ম আখিরাত→নাজাত), `SVG_TIMING`, জানালা/ক্রসফেড (smoothstep, যোগফল ১)/ওভারলে/পপ-আপের বিশুদ্ধ ফাংশন, `validateSvgData()` (লোডে চলে); সীমানা 6.2995 · 12.1115 · 15.5480 · 17.8040 · 20.4890 · 23.7120 · 31.0785 · 35.8820; পপ-আপ ৭টি (hijra ০.৮৩ সে.); `tsc --strict` এরর ০ (প্রজেক্ট কনফিগেও); Node ১০৬/১০৬ পাস (ফ্রেম ০–১২৯৯ স্ক্যান, ১৬ নেগেটিভ, ঐচ্ছিক চালু, ডিটারমিনিজম); `npm run check` PASS; পরিকল্পনা থেকে পরিবর্তন (icons/labels অ্যারে, ওভারলে-যুক্তি, `ARABIC_ZONE`, `holdSec` 1.5) বিবরণে; আসল কম্পোনেন্ট/Remotion রেন্ডার এখনো বাকি; zip ও Hadis.md আপডেট। ফেজ SVG: ১/১৮ |
| 2026-11-06 | ফেজ SVG — পরিকল্পনা (D19–D23) | AI | আপনার নির্দেশে নতুন **ফেজ SVG `svg1 – svg18`** যোগ (সিনভিত্তিক SVG: সনদ-চেইন, মিম্বর, মদিনা, হৃদয়-আলো, হৃদয়↔কাজ, বীজ→ফল, উট-কাফেলা, দুনিয়া/নারীর উদ্দেশ্য, "নিয়্যাত ঠিক = আমল কবুল" ডায়াগ্রাম, আখিরাত/নাজাত; কীওয়ার্ড আইকন ও পপ-আপ; `SvgLayer` ও `HadisVideo` একীকরণ; QA); synced JSON থেকে ১০টি দৃশ্যের শব্দ-ইনডেক্স/সময় ও ৭টি পপ-আপের সময় মাপা (ফেজের টেবিলে); স্তর-ক্রম, জ্যামিতি (S5.2–S5.5-এর মান থেকে), কম্পোজিশন-নিয়ম, ৫টি নতুন সিদ্ধান্ত D19–D23, ৬টি সমস্যা-সমাধান সারি, S8.1 চেকলিস্টে ৫টি SVG-আইটেম, S8.2-তে SVG-সিঙ্ক নোট, হ্যান্ডঅফ ২টি নতুন সারি; **কোনো কোড/অ্যাসেট/পুরনো ধাপ বদলায়নি, কোনো পুরনো টিক পরিবর্তন হয়নি**; zip-এ শুধু `Hadis.md` প্রতিস্থাপিত |
| 2026-11-06 | S7.2 (D18) | AI | `render.yml`-এ জব `render` যোগ — `needs: [check, prepare]`, `if: has_video == 'true'`, `matrix: fromJSON(...)`, `fail-fast: false`, `timeout-minutes: 90`; ধাপ: checkout, Node 22, npm ক্যাশ, ffprobe-যাচাই/ইনস্টল, `npm install`, Chrome-লাইব্রেরি + `browser ensure`, `remotion render` (spec-এর সব ফ্ল্যাগ হুবহু; মান `env` দিয়ে), **`ffprobe` যাচাই** (h264 · মাপ `matrix.w×h` · yuv420p · aac অডিও · দৈর্ঘ্য ৪৩.৩৩ ± ০.৫; ফেইলে জব ফেইল; স্টেপ-সারাংশ), `upload-artifact@v4` `hadis0101-<id>` ১৪ দিন (`compression-level: 0`); গিটহাব-রিলিজ বাদ (D18); টেস্ট: YAML বৈধ ও ৪ জব; `all`-এর ৪টি এন্ট্রি দিয়ে রেন্ডার-ধাপ স্টাব `npx`-এ ৪/৪ হুবহু কমান্ড; ffprobe-যাচাই আসল `ffmpeg`-এ বানানো MP4-তে ২ পাস + ৬ ফেইল-কেস সঠিক; ⚠️ GitHub-এ ও আসল `remotion render` এখনো চালানো হয়নি; ফেজ ৭ সম্পূর্ণ; সমস্যা-সমাধানে ৫টি সারি; zip ও Hadis.md আপডেট |
| 2026-11-06 | S7.1 (D17) | AI | `.github/workflows/render.yml` তৈরি — `workflow_dispatch` + `formats` choice; জব `check` (ffmpeg, `npm install`, `npm run check`, `tsc`, Chrome, `remotion compositions` + আইডি-গ্রেপ), `prepare` (শুধু bash; আউটপুট `matrix`/`has_video`/`run_preview`; ম্যাট্রিক্স `config.ts`-এর `RENDER_TARGETS`-এর সাথে হুবহু মিলিয়ে টেস্ট), `preview` (২২টি স্টিল → আর্টিফ্যাক্ট `hadis0101-preview`); spec থেকে ২টি পরিবর্তন: `cache: npm` বাদ (লকফাইল নেই → `actions/cache`), `check`-এ Chrome যোগ; `.gitignore`-এ `preview/`, `compositions.log`; ৪২/৪২ লজিক-টেস্ট পাস (bash স্ক্রিপ্ট ও স্টাব `npx` দিয়ে); ⚠️ GitHub-এ এখনো চালানো হয়নি; ফেজ ৭: ১/২; zip ও Hadis.md আপডেট |
| 2026-11-06 | S6.3 | AI | একীভূত চেক: ১৫ ফাইলের রিলেটিভ ও প্যাকেজ ইম্পোর্ট যাচাই (অমীমাংসিত/অনুপস্থিত ০); স্টাব-টাইপে `tsc --strict --noUnusedLocals --noUnusedParameters` ও প্রজেক্টের নিজস্ব `tsconfig` ফ্ল্যাগে **এরর ০**; `HadisVideo` ১৯৫/১৯৫ ও `Root` ২২/২২ টেস্ট পুনরায় পাস; `npm run check` (ffmpeg) **PASS** (৮/৮, `sync-report.json` বাইট-একই); কোনো সোর্স বদলায়নি; ⚠️ আসল `npx tsc`/`remotion compositions` নেটওয়ার্ক-বন্ধ সেশনে অসম্ভব ⇒ S7.1 `check` জবে; ফেজ ৬ সম্পূর্ণ; zip ও Hadis.md আপডেট |
| 2026-11-06 | S6.2 | AI | `Root.tsx` তৈরি — `RemotionRoot` (নাম `index.ts`-এর সাথে হুবহু); `FORMATS` থেকে দুটি `<Composition>` (`Hadis-16x9` 1920×1080, `Hadis-9x16` 1080×1920, fps ৩০, `defaultProps {format, audioSec}`); `calculateMetadata` → `getAudioDurationInSeconds(wav)` → `calcDurationInFrames` (১৩০০) + `props.audioSec`, ব্যর্থ/অবৈধ হলে ফলব্যাক ৩৮.৩২; `metadataFor`/`sanitizeAudioSec` বিশুদ্ধ এক্সপোর্ট; `tsc --strict` **সব ফাইলে এরর ০** (`index.ts`-সহ; স্টাবে), ২২/২২ টেস্ট পাস (শিমে); আসল `remotion compositions` CI-তে; zip ও Hadis.md আপডেট। ফেজ ৬: ২/৩ |
| 2026-11-06 | S6.1 (D16) | AI | `HadisVideo.tsx` তৈরি — `Audio` (ফ্রেম ০ থেকে, ভলিউম ১) + `Background → Header → ArabicBlock → Karaoke → ProgressBar` (সব Sequence-এর বাইরে, গ্লোবাল ফ্রেম) + `<Sequence from={audioEnd} durationInFrames={outroFrames}><Outro durationSec={OUTRO_SECONDS}/></Sequence>`; আগের চার স্তরে `previousLayersOpacity(frame/fps − audioSec)` (ফ্রেম ১১৬৮-এ অদৃশ্য); শুরুর ৫ ফ্রেম ফেড-ইন শুধু কনটেন্ট স্তরে (`Background` পূর্ণ — প্রথম ফ্রেম কালো নয়); প্রপস `format` (মাপের সাথে না মিললে ত্রুটি) ও `audioSec` (ডিফল্ট ৩৮.৩২); `introOpacity`/`outroTiming`/`HADIS_VIDEO` এক্সপোর্ট; `tsc --strict` পাস (সব ফাইল, শুধু `index.ts`→`./Root` বাকি — S6.2), SSR টেস্ট ১৯৫/১৯৫ পাস (শিমে); zip ও Hadis.md আপডেট। ফেজ ৬: ১/৩ |
| 2026-11-06 | S5.7 | AI | সিঙ্ক যাচাই: `Outro` সরাসরি `frame / fps` ব্যবহার করছিল ও `<Sequence>`-অফসেটে ফ্লোট-শব্দ (১e-১৬) স্টাইল-স্ট্রিং বদলাচ্ছিল → `timing.ts`-এ কেন্দ্রীয় `audioSecAt(frame, fps, offset)` (১e-৬ গোল), `Karaoke`/`ProgressBar`/`ArabicBlock`/`Outro` চারটিই এটি ব্যবহার করে; ১০,৪৬৮/১০,৪৬৮ টেস্ট (Sequence-সমতা ৫টি N × দুই অনুপাত, ৮৩ শব্দে Karaoke-active ≡ ProgressBar ≡ JSON সময়, আউটরো-সীমা); আগের ১২৫/১২৫ পাস; tsc strict পাস; ফেজ ৫ সম্পূর্ণ; zip ও Hadis.md আপডেট |
| 2026-11-06 | S5.6 + S2.4 (D14, D15) | AI | `Outro.tsx` তৈরি — আপনার নির্দেশে: লোগো ↵ "আজই প্লে স্টোর থেকে ডাউনলোড করুন:" ↵ "ইসলামী বিশ্বকোষ ও আল হাদিস [S2 চিপ] অ্যাপ।" ↵ **অ্যানিমেটেড Google Play badge** (স্প্রিং-পপ → শ্বাস → সোনালি আভা → badge-আকৃতিতে মাস্ক-করা shine ঝলক); গাঢ় সবুজ আবরণ + ৩৪টি সোনালি কণা (সিড-ভিত্তিক); `previousLayersOpacity` (আগের স্তর ০.৬ সে.-এ ফেড-আউট), `compressFactor`, `opacity`/`durationSec`/`timeOffsetSec` প্রপ; **`OUTRO_SECONDS` ১.৫ → ৫** (মোট ১৩০০ ফ্রেম); নতুন অ্যাসেট `google-play-badge.png` (৫০০০² স্বচ্ছ ছবি → ক্রপ ১৬০০×৪৭৪) + `.gitignore` ব্যতিক্রম; `theme.ts` `outro` টোকেনে `badgeWidth`/`gap`; `hadis-data.ts`-এ আউটরো টেক্সট; শুদ্ধ বানান "স্টোর"/"অ্যাপ"; `tsc --strict --noUnused*` পাস (স্টাবে); ১২৫/১২৫ টেস্ট; ১০ ফ্রেম × ২ অনুপাতের স্টিল (আসল স্তর-ক্রমে); স্টিলে ধরা ১ সমস্যা ঠিক (৯:১৬-এ অ্যাপ-লাইন মার্জিনে ঘেঁষা → `titleSize` ৬২); আসল ফন্ট/`remotion render` CI-তে; zip ও Hadis.md আপডেট |
| 2026-11-06 | S5.5 | AI | `ProgressBar.tsx` তৈরি (ম্লান ট্র্যাক + সোনালি ভরা অংশ + ডগায় স্পন্দিত উজ্জ্বল বিন্দু; `currentSec/audioSec`; ০.৪ সে. ফেড-ইন; `opacity`/`timeOffsetSec`/`audioSec` প্রপ; `progressAt()`); ৯:১৬-তে y 1650–1660 (সেফ-জোনের ওপরে); `tsc --strict` পাস (স্টাবে); ২০/২০ টেস্ট + ২৮/২৮ Karaoke পুনঃটেস্ট পাস; ৪টি স্টিল; গ্লো-মান গোল করে চাঙ্ক-নিরাপদ; zip ও Hadis.md আপডেট |
| 2026-11-06 | S5.4 + ফন্ট (D13) | AI | `Karaoke.tsx` তৈরি (প্রতি শব্দে নিজস্ব রঙ; সক্রিয় শব্দে স্প্রিং পপ ১.০→১.১৮→১.০৮ + রঙিন পিল + আন্ডারলাইন-wipe + গ্লো; বলা শব্দ রঙ ধরে রাখে; নিচ থেকে ওঠা এন্ট্রান্স + ৫ ফ্রেম ক্রসফেড; সেকশন D-তে সোনালি "শিক্ষা" কার্ড; `holdLastPage`; `opacity`/`timeOffsetSec` প্রপ); **আপনার নির্দেশে Hind Siliguri বাদ** — `theme.ts`-এ ইম্পোর্ট/লোড/`waitUntilDone` মুছে `FONTS.sans` = Anek Bangla (৫০০/৬০০/৭০০/৮০০), `Header.tsx` অপরিবর্তিত; `tsc --strict` (টাইপ-স্টাবে) পাস; ২৮/২৮ লজিক-টেস্ট; ১৬+১৯ পেজের জ্যামিতি মাপ (ওভারফ্লো ০); ১৪টি স্টিল (নকল ফন্টে — আসল Anek Bangla CI-তে); স্টিলে ধরা ২ সমস্যা ঠিক (`columnGap` ০.৪→০.৫৫, "আসছে" আউটলাইন হালকা); সক্রিয় শব্দে ওজন ৮০০ বাদ (প্রস্থ নড়ত); zip ও Hadis.md আপডেট |
| 2026-11-06 | S5.3 | AI | `ArabicBlock.tsx` তৈরি (শুধু সেকশন B, `getSectionTiming('B')` থেকে ১৫.৫৪৫–১৮.৪৪ সে.: স্প্রিং স্কেল+ফেড-ইন, সোনালি গ্লো-হ্যালো, উচ্চারিত শব্দ সোনালি-উজ্জ্বল, লেখার নিচে SVG হীরা-ডিভাইডার আঁকা, ০.৮ সে. ধীর ফেড-আউট; জানালার বাইরে `null`); `opacity` ও `timeOffsetSec` প্রপ, `ARABIC_TIMING`/`getArabicWindow()` এক্সপোর্ট; `theme.ts`-এ `arabic.top` ১৬:৯ 372→392, ৯:১৬ 640→675 (হেডার-ফাঁক ≈৪০/≈৫৫px, কারাওকের সাথে ওভারল্যাপ নেই); `tsc --strict` পাস (আসল remotion টাইপ); ৩২টি স্টিল আসল Amiri-তে Chromium-এ; ১৫/১৫ লজিক-টেস্ট (জানালা ফ্রেম ৪৬৭–৫৫২, ডিটারমিনিজম, প্রপস); আসল রেন্ডার/গুগল-ফন্ট CI-তে; zip ও Hadis.md আপডেট |
| 2026-11-06 | S5.2 | AI | `Header.tsx` তৈরি (সাদা রাউন্ডেড লোগো-ব্যাজ + সোনালি বর্ডার/গ্লো, ডানে "S2" সোনালি চিপ, সোনালি-গ্রেডিয়েন্ট শিরোনাম "আজকের হাদিস", সোর্স পিল "সহিহ বুখারী • হাদিস নং: ০১"; এন্ট্রান্স: লোগো স্প্রিং ০–০.৮ সে., শিরোনাম ০.৩–১.০, পিল ০.৬–১.২, চিপ ০.৫–); `opacity` প্রপ ও `HEADER_TIMING` এক্সপোর্ট; লোগো ১৫০px (theme অনুযায়ী, নোটের ১৭০ নয়); `tsc --strict` পাস (আসল remotion টাইপ); ১৬টি স্টিল আসল বাংলা ফন্টে Chromium-এ দেখা; হেডারের নিচ ১৬:৯ = 359 (আরবি top 372), ৯:১৬ = 633 (আরবি top 640 — ফাঁক ৭px, S5.3-এ নজর); ডিটারমিনিজম পাস; zip আপডেট |
| 2026-11-06 | S5.1 | AI | `Background.tsx` তৈরি (গ্রেডিয়েন্ট-ড্রিফট, ৮-কোনা ইসলামী তারা-গ্রিড অপাসিটি ০.০৪৫–০.০৮, আলোকরশ্মি, সিড-ভিত্তিক মিটমিট তারা, ভাসমান সোনালি অর্ধচন্দ্র + গ্লো, মসজিদ-সিলুয়েট + দূরের স্কাইলাইন + কুয়াশা, ভিনিয়েট; ক্যাপশনের পেছনে তারা ম্লান); আসল remotion 4.0.340 টাইপে `tsc --strict` পাস; ১০টি স্টিল (দুই অনুপাত × ৫ ফ্রেম) Chromium-এ দেখা; ডিটারমিনিজম পাস, `Math.random`/`Date`/CSS-অ্যানিমেশন ০টি; কনট্রাস্ট মাপ → রশ্মি ০.১→০.০৫৫, আভা ০.৫৫→০.৩ করা (প্রবাল: মিডিয়ান ৫.৩+, ৯৯% ≥৪.২৭); আসল `remotion render` CI-তে; zip আপডেট |
| 2026-11-06 | S4.4 | AI | `timing.ts` তৈরি (secToFrame, wordState/Progress, activeWordIndex, `buildPages` — সেকশন/বিরতি/সমান-ভাগ নিয়ম, lead 0.15, ফাঁকে আগের পেজ ধরে রাখা; `visiblePages` ক্রসফেড, `sectionSpans`, `validatePages`); ১৬:৯ = ১৬ পেজ, ৯:১৬ = ১৯ পেজ; tsc strict + ৩৪/৩৪ টেস্ট পাস, ১১৫০ ফ্রেমে ফাঁকা পর্দা ০; ফেজ ৪ সম্পূর্ণ; S5.4/S5.7 সংশোধিত; zip আপডেট |
| 2026-11-06 | S4.3 + D11 | AI | `hadis-data.ts` তৈরি (synced JSON, সেকশন A–D, উপ-বাক্য C1–C3, ১৪ বিরতি-শব্দ, আংশিক আরবি, আত্ম-যাচাই); tsc strict + ১২/১২ Node টেস্ট পাস। নতুন নির্দেশে **কালারফুল অ্যানিমেটেড ক্যাপশন (D11)**: `theme.ts`-এ Anek Bangla ফন্ট, ৮-রঙা `CAPTION_COLORS`, `captionColor`, `withAlpha`, `CAPTION` টোকেন (কনট্রাস্ট ≥৪.৮৩; tsc + ১১/১১ টেস্ট পাস); S4.4, S5.3 (B-সময় ১৫.৭৯৫–১৭.৫৪৪), S5.4, S8.1, সমস্যা-টেবিল সংশোধিত; zip আপডেট |
| 2026-11-06 | S4.2 | AI | `theme.ts` তৈরি (রঙ, গ্রেডিয়েন্ট, ৩ ফন্ট, স্পেসিং, ২ লেআউট টোকেন-সেট, maxWords 9/6, নিরাপদ অঞ্চল); tsc strict + Node রান (ফন্ট-স্টাব) পাস; কনট্রাস্ট ≥৪.৩; ফন্ট সাবসেট-নাম CI-তে নিশ্চিত হবে; zip আপডেট |
| 2026-11-06 | S4.1 | AI | `config.ts` তৈরি (FPS 30, ২ ফরম্যাট, QUALITIES, ৪ RENDER_TARGETS, দৈর্ঘ্য ফাংশন, ফলব্যাক 1195 ফ্রেম); `tsc --strict` ও Node-রান টেস্ট পাস; zip আপডেট |
| 2026-11-06 | S3.3 | AI | `sync-fix.mjs` তৈরি; `hadis0101.synced.json` (৮টি অ্যাঙ্কর, ফাঁকসহ) → check-sync PASS (−35/−40 dB); `check-sync.mjs` ফাঁক-বোধ যুক্ত; `package.json` `check` → synced; ৩টি অ্যাঙ্কর S8.2-তে মানব-যাচাই; ফেজ ৩ সম্পূর্ণ; zip আপডেট |
| 2026-11-06 | S3.2 | AI | `check-sync.mjs` তৈরি ও চালানো (−35dB/0.25s/±0.3s); ক্যালিব্রেশন −30…−50dB; ফল FAIL: C2 (−1.32 সে.), কণ্ঠ ০–৩৮.৩২ সে. পুরো; ৪/৮ বিরতি অমিল; S3.3 বাধ্যতামূলক; `sync-report.json` রুটে; zip আপডেট |
| 2026-11-06 | S2.1 + S2.2 + S2.3 | AI | `hadis0101.json` (৮৩ শব্দ, বৈধ), `hadis0101.wav` (38.32 সে.), `logo.jpg` (720×720) অপরিবর্তিত কপি রুটে; পুনঃসংযুক্ত ফাইল আগেরগুলোর সাথে বাইট-একই; ফেজ ২ সম্পূর্ণ; zip-এ অ্যাসেটসহ |
| 2026-11-06 | S1.4 + S1.5 + S1.6 | AI | `.gitignore`, `index.ts`, `global.d.ts` তৈরি; ফেজ ১ সম্পূর্ণ; `index.ts` `Root.tsx`-এর `RemotionRoot` এক্সপোর্টের উপর নির্ভরশীল; zip আপডেট |
| 2026-11-06 | S1.3 + S3.1 | AI | `remotion.config.ts` তৈরি (jpeg q92, h264, yuv420p, entry ./index.ts); আপনার নির্দেশে আরবি পূর্ণ পাঠ বাতিল — শুধু আংশিক আরবি; S3.1 সম্পন্ন, S4.3/S5.3 সংশোধিত; zip আপডেট |
| 2026-11-06 | S1.2 | AI | `tsconfig.json` তৈরি (strict, resolveJsonModule, react-jsx, include *.ts/*.tsx); নতুন ধাপ S1.6 `global.d.ts` যোগ; zip আপডেট |
| 2026-11-06 | S1.1 | AI | `package.json` তৈরি; Remotion 4.0.340 exact pin; `@remotion/media`/`captions` বাদ; ইনস্টল CI-তে |
| 2026-11-06 | S0.1 | AI | ইনপুট বিশ্লেষণ সম্পন্ন; অডিও ৩৮.৩২ সে., JSON ৩৭.০০ সে., ৮৩ শব্দ, প্রাথমিক সাইলেন্সে অমিলের আভাস; পরিকল্পনা `Hadis.md` তৈরি |

---

## 11. পরিশিষ্ট — দ্রুত রেফারেন্স

**রেজোলিউশন টেবিল**

| ফরম্যাট | HD | 4K (`--scale=2`) |
|---|---|---|
| ১৬:৯ | 1920×1080 | 3840×2160 |
| ৯:১৬ | 1080×1920 | 2160×3840 |

**দরকারি কমান্ড**

```bash
npm install
npm run dev                                   # Remotion Studio (লোকাল ডিভাইস সক্ষম হলে)
npm run check                                 # সাইলেন্স দিয়ে অডিও↔JSON যাচাই
npx remotion compositions index.ts            # কম্পোজিশন তালিকা
npx remotion still index.ts Hadis-16x9 --frame=300 --scale=1 preview.png
npx remotion render index.ts Hadis-16x9 hadis0101-16x9-HD.mp4 --scale=1
npx remotion render index.ts Hadis-9x16 hadis0101-9x16-4K.mp4 --scale=2
```

**সিঙ্ক যাচাইয়ের মূল ffmpeg কমান্ড**

```bash
ffmpeg -hide_banner -i hadis0101.wav -af silencedetect=noise=-35dB:d=0.25 -f null - 2>&1 | grep silence_
```
