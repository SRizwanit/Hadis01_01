// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — ফেজ SVG: দৃশ্য ও কীওয়ার্ড সংজ্ঞা এবং সময়-হেলপার (svg1)
//
// নিয়ম:
//  • দৃশ্য ও কীওয়ার্ডের সময় **কখনো হাতে-লেখা সেকেন্ড নয়** — সবসময় hadis-data.ts-এর `WORDS` (শব্দ-ইনডেক্স) থেকে।
//    তাই hadis0101.synced.json আবার সংশোধন হলেও এই ফাইলে হাত দিতে হয় না (যতক্ষণ শব্দ-সংখ্যা/ক্রম একই)।
//  • দৃশ্য-সীমানা = পাশের দুই দৃশ্যের কথার ফাঁকের মাঝবিন্দু; ক্রসফেড `SVG_TIMING.crossfadeSec` (০.৫ সে., ±০.২৫)।
//    দুই দৃশ্যের অপাসিটি পরিপূরক (smoothstep), তাই যোগফল সবসময় ১।
//  • `duniyaNari` একটি **ওভারলে** (`layer: 'overlay'`): `hijra`-র ওপরে নিজস্ব জানালায় ওঠে; অপাসিটি = নিজের ফেড-ইন × মূল
//    দৃশ্য `hijra`-র অপাসিটি — তাই `hijra` যখন `lesson`-এ ক্রসফেড হয় এটিও আপনাআপনি মিলিয়ে যায়।
//  • কীওয়ার্ড পপ-আপ: জানালা = [শব্দ-শুরু − ০.০৮, +ধরে রাখা ১.৩]; **ফেড-আউটসহ** এই জানালা; পরের পপ-আপ কাছে হলে জানালা
//    তার শুরুতে ছাঁটা (ন্যূনতম ০.৭ সে.) — তাই একসাথে ≤ ১টি।
//  • এই ফাইল শুধু hadis-data.ts import করে (কোনো কম্পোনেন্ট/remotion/theme নয়) — স্বাধীনভাবে টেস্টযোগ্য।
//  • সব ফাংশন বিশুদ্ধ; Math.random/Date নেই (রেন্ডার ডিটারমিনিস্টিক)। enum/parameter-property নেই
//    (Node type-stripping দিয়ে টেস্ট করা যায়)।
//  • লোডের সময় `validateSvgData()` নিজে চলে; ভুল হলে throw করে (রেন্ডার শুরুতেই থামে) — hadis-data.ts-এর ধারা।
//
// নতুন হাদিসের জন্য: নিচের `SCENES`/`KEYWORDS`-এর শব্দ-ইনডেক্স হাতে মেলাতে হবে (S8.4); `validateSvgData` ভুল ধরবে।

import {SPEECH_END_SEC, SPEECH_START_SEC, WORDS, WORD_COUNT, getSectionTiming} from './hadis-data';
import type {HadisWord, SectionId} from './hadis-data';

// ---------------------------------------------------------------- টাইপ
export type SceneId =
  | 'sanad'
  | 'minbar'
  | 'madina'
  | 'niyyah'
  | 'amal'
  | 'fruit'
  | 'hijra'
  | 'duniyaNari'
  | 'lesson'
  | 'najat';

/** `main` = টাইমলাইনে একটির পর একটি (ক্রসফেড); `overlay` = কোনো `main` দৃশ্যের ওপরে বাড়তি স্তর */
export type SceneLayer = 'main' | 'overlay';

export type SceneDef = {
  id: SceneId;
  layer: SceneLayer;
  /** শুধু `overlay`-এর জন্য: যে `main` দৃশ্যের ওপরে বসে (শব্দ-রেঞ্জ তার ভেতরে থাকতে হবে) */
  parent?: SceneId;
  /** হাদিসের কোন সেকশনের অংশ (তথ্যের জন্য) */
  sectionId: SectionId;
  /** বাংলা লেবেল (লগ/টেস্টের জন্য; ভিডিওতে দেখানো হয় না) */
  label: string;
  /** প্রথম শব্দের ইনডেক্স (০-ভিত্তিক, ইনক্লুসিভ) */
  first: number;
  /** শেষ শব্দের ইনডেক্স (ইনক্লুসিভ) */
  last: number;
  /** ক্যাপশন-ব্যান্ডে দৃশ্য কতটা ম্লান (০–১; কম = বেশি ম্লান); না দিলে `DEFAULT_BAND_OPACITY` */
  bandOpacity?: number;
};

/** কীওয়ার্ড আইকনের নাম — svg14 `KeywordIcons.tsx`-এ প্রতিটির জন্য একটি কম্পোনেন্ট থাকতে হবে */
export type KeywordIconName =
  | 'niyyah' // হৃদয় + আলো
  | 'hijra' // পদচিহ্ন + তীর
  | 'duniya' // পৃথিবী + মুদ্রা
  | 'nari' // আংটি (নারীর অবয়ব নয় — D20)
  | 'amal' // দান-করা হাত
  | 'allah' // অর্ধচন্দ্র + নরম আলো (লিপি/অবয়ব নয় — D20)
  | 'akhirah' // খিলান-দরজা
  | 'najat'; // আলোর রশ্মি

export type KeywordId =
  | 'niyyah'
  | 'hijra'
  | 'duniya'
  | 'nari'
  | 'amal'
  | 'allah'
  | 'akhirahNajat'
  | 'niyyah2'
  | 'niyyah3'
  | 'hijratei';

export type KeywordDef = {
  id: KeywordId;
  /** কথার যে শব্দ(গুলো)-তে পপ-আপ ওঠে (০-ভিত্তিক ইনডেক্স, ক্রমবর্ধমান); সময় প্রথম শব্দের শুরু থেকে */
  wordIndices: readonly number[];
  /** পপ-আপের আইকন (১–২টি; ২টি হলে পাশাপাশি) */
  icons: readonly KeywordIconName[];
  /** প্রতিটি আইকনের নিচের বাংলা লেবেল — `icons`-এর সমান সংখ্যক */
  labels: readonly string[];
  /** false হলে পপ-আপ আসে না (ঐচ্ছিকগুলো ডিফল্টে বন্ধ) */
  enabled: boolean;
  /** ধরে রাখার সময় (সে., ফেড-আউটসহ); না দিলে `SVG_TIMING.popupHoldSec` */
  holdSec?: number;
};

// ---------------------------------------------------------------- টিউনিং-মান
export const SVG_TIMING = {
  /** দৃশ্য-বদলের ক্রসফেড (সীমানা ± অর্ধেক) */
  crossfadeSec: 0.5,
  /** ওভারলে (duniyaNari) প্রথম শব্দের এত আগে ঢুকতে শুরু করে */
  overlayLeadSec: 0.3,
  /** ওভারলের ফেড-ইনের সময়কাল */
  overlayInSec: 0.4,
  /** পপ-আপ কীওয়ার্ড-শব্দের এত আগে শুরু (পাঠক আগে চোখ রাখতে পারে) */
  popupLeadSec: 0.08,
  /** পপ-আপ ধরে রাখা (ফেড-আউটসহ) */
  popupHoldSec: 1.3,
  /** পরের পপ-আপ কাছে হলে ছাঁটার পরেও ন্যূনতম এতক্ষণ দেখা যাবে */
  popupMinSec: 0.7,
  /** পপ-আপ ফেড-ইন */
  popupFadeInSec: 0.12,
  /** স্প্রিং-পপের সময়কাল (০.৬→১.০৮→১.০ — svg15 `KeywordPopup` `localSec` থেকে আঁকে) */
  popupInSec: 0.35,
  /** পপ-আপ ফেড-আউট (জানালার শেষ এত সেকেন্ড) */
  popupOutSec: 0.25,
} as const;

/** ক্যাপশন-ব্যান্ডে দৃশ্যের ডিফল্ট অপাসিটি (D21) */
export const DEFAULT_BAND_OPACITY = 0.28;

/**
 * আরবি ব্লকের পর্দা-জানালার সাথে মিল রাখা মান (ArabicBlock.tsx-এর `ARABIC_TIMING`: leadIn 0.25; outDelay 0.1 + out 0.8):
 * কোনো কীওয়ার্ড পপ-আপ এই জানালায় পড়তে পারবে না (আরবি ব্লক ও পপ-আপের জায়গা একই — D22)।
 * ArabicBlock-এর সময় বদলালে এখানেও বদলান।
 */
export const ARABIC_ZONE = {leadSec: 0.25, tailSec: 0.9} as const;

// ---------------------------------------------------------------- দৃশ্য (শব্দ-ইনডেক্স রেঞ্জে — Hadis.md SVG-২)
export const SCENES: readonly SceneDef[] = [
  {id: 'sanad', layer: 'main', sectionId: 'A', label: 'সনদ-চেইন', first: 0, last: 13},
  {id: 'minbar', layer: 'main', sectionId: 'A', label: 'মিম্বর', first: 14, last: 24},
  {id: 'madina', layer: 'main', sectionId: 'A', label: 'মদিনার সিলুয়েট', first: 25, last: 33},
  // নিয়্যাত দৃশ্যে ক্যাপশন ছোট (১ লাইন), তাই ব্যান্ডে ম্লানতা কম (D21)
  {id: 'niyyah', layer: 'main', sectionId: 'B', label: 'হৃদয় ও আলো', first: 34, last: 36, bandOpacity: 0.45},
  {id: 'amal', layer: 'main', sectionId: 'C', label: 'হৃদয় ↔ কাজ', first: 37, last: 41},
  {id: 'fruit', layer: 'main', sectionId: 'C', label: 'বীজ → গাছ → ফল', first: 42, last: 48},
  {id: 'hijra', layer: 'main', sectionId: 'C', label: 'উট-কাফেলা', first: 49, last: 66},
  {id: 'duniyaNari', layer: 'overlay', parent: 'hijra', sectionId: 'C', label: 'দুনিয়া/নারীর উদ্দেশ্য', first: 53, last: 66},
  {id: 'lesson', layer: 'main', sectionId: 'D', label: 'নিয়্যাত ঠিক = আমল কবুল', first: 67, last: 77},
  {id: 'najat', layer: 'main', sectionId: 'D', label: 'আখিরাত ও নাজাত', first: 78, last: 82},
];

// ---------------------------------------------------------------- কীওয়ার্ড পপ-আপ (Hadis.md SVG-৩)
export const KEYWORD_ICON_NAMES: readonly KeywordIconName[] = [
  'niyyah',
  'hijra',
  'duniya',
  'nari',
  'amal',
  'allah',
  'akhirah',
  'najat',
];

export const KEYWORDS: readonly KeywordDef[] = [
  {id: 'niyyah', wordIndices: [39], icons: ['niyyah'], labels: ['নিয়্যাত'], enabled: true}, // "নিয়তের"
  {id: 'hijra', wordIndices: [51], icons: ['hijra'], labels: ['হিজরত'], enabled: true},
  {id: 'duniya', wordIndices: [53], icons: ['duniya'], labels: ['দুনিয়া'], enabled: true},
  {id: 'nari', wordIndices: [57], icons: ['nari'], labels: ['নারী'], enabled: true}, // "নারীকে" — আংটি, অবয়ব নয়
  {id: 'amal', wordIndices: [69], icons: ['amal'], labels: ['আমল'], enabled: true},
  {id: 'allah', wordIndices: [75], icons: ['allah'], labels: ['আল্লাহ'], enabled: true}, // "আল্লাহর"
  // আখিরাত (36.71) → নাজাত (37.28): ব্যবধান মাত্র ০.৫৭ সে., তাই একটি যুগ্ম পপ-আপ; অডিও-শেষের (38.32) আগে শেষ হতে ১.৫ সে.
  {
    id: 'akhirahNajat',
    wordIndices: [80, 81],
    icons: ['akhirah', 'najat'],
    labels: ['আখিরাত', 'নাজাত'],
    enabled: true,
    holdSec: 1.5,
  },
  // ---- ঐচ্ছিক (ডিফল্টে বন্ধ — দৃশ্যেই হৃদয়/পদচিহ্ন আছে); চাইলে `enabled: true`
  {id: 'niyyah2', wordIndices: [45], icons: ['niyyah'], labels: ['নিয়্যাত'], enabled: false}, // "নিয়ত" ২য় বার (21.73)
  {id: 'niyyah3', wordIndices: [73], icons: ['niyyah'], labels: ['নিয়্যাত'], enabled: false}, // "নিয়ত" ৩য় বার (33.76)
  {id: 'hijratei', wordIndices: [65], icons: ['hijra'], labels: ['হিজরত'], enabled: false}, // "হিজরতের" (29.97)
];

// ---------------------------------------------------------------- ছোট গাণিতিক হেলপার
function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/** smoothstep: ০→১; `smooth01(t) + smooth01(1 − t) = 1` (ক্রসফেডের অপাসিটি পরিপূরক) */
function smooth01(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

// ---------------------------------------------------------------- দৃশ্য-জানালা
export type SceneWindow = {
  id: SceneId;
  layer: SceneLayer;
  /** দৃশ্যের নিজস্ব শুরু: `main` — আগের দৃশ্যের সাথে সীমানা (প্রথমটির ০); `overlay` — প্রথম শব্দ − `overlayLeadSec`। `localSec` এখান থেকে মাপা */
  startSec: number;
  /** দৃশ্যের নিজস্ব শেষ: পরের দৃশ্যের সাথে সীমানা (শেষটির অডিও-শেষ; `overlay`-এর মূল দৃশ্যের `endSec`) */
  endSec: number;
  /** প্রথম দৃশ্যমান মুহূর্ত (ক্রসফেডে ঢোকা শুরু = `startSec − ০.২৫`; প্রথম দৃশ্য/ওভারলের `startSec`) */
  visibleFromSec: number;
  /** শেষ দৃশ্যমান মুহূর্ত (ক্রসফেড শেষ = `endSec + ০.২৫`); শেষ দৃশ্য অডিও-শেষের পরেও থাকে → `Infinity` (আউটরো-ফেড SvgLayer-এর `opacity` দিয়ে) */
  visibleToSec: number;
  /** দৃশ্যের প্রথম শব্দের শুরু / শেষ শব্দের শেষ (কথার সময়) */
  wordStartSec: number;
  wordEndSec: number;
};

export type SceneBoundary = {fromId: SceneId; toId: SceneId; sec: number};

/** যেকোনো দৃশ্য-তালিকা থেকে জানালা বের করে (যাচাই-টেস্টে ভুল ডেটা ঢোকানোর জন্য প্যারামিটার-যুক্ত) */
export function computeSceneWindows(
  scenes: readonly SceneDef[] = SCENES,
  words: readonly HadisWord[] = WORDS,
  startOfAudioSec: number = SPEECH_START_SEC,
  endOfAudioSec: number = SPEECH_END_SEC,
): Map<SceneId, SceneWindow> {
  const half = SVG_TIMING.crossfadeSec / 2;
  const mains = scenes.filter((s) => s.layer === 'main');
  const windows = new Map<SceneId, SceneWindow>();

  mains.forEach((s, i) => {
    const prev = mains[i - 1];
    const next = mains[i + 1];
    const startSec = prev ? (words[prev.last].end + words[s.first].start) / 2 : startOfAudioSec;
    const endSec = next ? (words[s.last].end + words[next.first].start) / 2 : endOfAudioSec;
    windows.set(s.id, {
      id: s.id,
      layer: 'main',
      startSec,
      endSec,
      visibleFromSec: prev ? startSec - half : startSec,
      visibleToSec: next ? endSec + half : Infinity,
      wordStartSec: words[s.first].start,
      wordEndSec: words[s.last].end,
    });
  });

  for (const s of scenes) {
    if (s.layer !== 'overlay') continue;
    const parent = s.parent ? windows.get(s.parent) : undefined;
    if (!parent) throw new Error(`ওভারলে "${s.id}": মূল দৃশ্য "${s.parent}" পাওয়া যায়নি`);
    const startSec = words[s.first].start - SVG_TIMING.overlayLeadSec;
    windows.set(s.id, {
      id: s.id,
      layer: 'overlay',
      startSec,
      endSec: parent.endSec,
      visibleFromSec: startSec,
      visibleToSec: parent.visibleToSec,
      wordStartSec: words[s.first].start,
      wordEndSec: words[s.last].end,
    });
  }
  return windows;
}

export const SCENE_WINDOWS: ReadonlyMap<SceneId, SceneWindow> = computeSceneWindows();

/** দৃশ্যের জানালা (`SCENES` থেকে) */
export function sceneWindow(id: SceneId): SceneWindow {
  const w = SCENE_WINDOWS.get(id);
  if (!w) throw new Error(`অজানা দৃশ্য: ${id}`);
  return w;
}

export function getScene(id: SceneId): SceneDef {
  const s = SCENES.find((x) => x.id === id);
  if (!s) throw new Error(`অজানা দৃশ্য: ${id}`);
  return s;
}

/** দৃশ্যের ক্যাপশন-ব্যান্ড অপাসিটি (দৃশ্য-ভিত্তিক বা ডিফল্ট ০.২৮) */
export function sceneBandOpacity(id: SceneId): number {
  const b = getScene(id).bandOpacity;
  return b === undefined ? DEFAULT_BAND_OPACITY : b;
}

/** পাশাপাশি `main` দৃশ্যের সীমানাগুলো (কথার ফাঁকের মাঝবিন্দু) — বর্তমান ডেটায় ৮টি */
export function sceneBoundaries(): SceneBoundary[] {
  const mains = SCENES.filter((s) => s.layer === 'main');
  const out: SceneBoundary[] = [];
  for (let i = 1; i < mains.length; i++) {
    out.push({fromId: mains[i - 1].id, toId: mains[i].id, sec: sceneWindow(mains[i].id).startSec});
  }
  return out;
}

function opacityOf(
  scenes: readonly SceneDef[],
  windows: ReadonlyMap<SceneId, SceneWindow>,
  id: SceneId,
  sec: number,
): number {
  const scene = scenes.find((s) => s.id === id);
  const win = windows.get(id);
  if (!scene || !win) throw new Error(`অজানা দৃশ্য: ${id}`);

  if (scene.layer === 'overlay') {
    if (!scene.parent) throw new Error(`ওভারলে "${id}"-এর parent নেই`);
    const fadeIn = smooth01((sec - win.startSec) / SVG_TIMING.overlayInSec);
    return fadeIn * opacityOf(scenes, windows, scene.parent, sec);
  }

  const mains = scenes.filter((s) => s.layer === 'main');
  const i = mains.findIndex((s) => s.id === id);
  const cf = SVG_TIMING.crossfadeSec;
  const half = cf / 2;
  const fadeIn = i === 0 ? 1 : smooth01((sec - (win.startSec - half)) / cf);
  const fadeOut = i === mains.length - 1 ? 1 : 1 - smooth01((sec - (win.endSec - half)) / cf);
  return fadeIn * fadeOut;
}

/**
 * কোনো মুহূর্তে (অডিওর শুরু থেকে সেকেন্ড) দৃশ্যের অপাসিটি ০..১।
 * প্রথম দৃশ্যের ফেড-ইন নেই (শুরুর ৫ ফ্রেম ফেড-ইন HadisVideo-র কনটেন্ট-র‍্যাপারে); শেষ দৃশ্য অডিও-শেষের পরেও ১ (আউটরো-ফেড SvgLayer-এ)।
 */
export function sceneOpacityAt(id: SceneId, sec: number): number {
  return opacityOf(SCENES, SCENE_WINDOWS, id, sec);
}

export type ActiveScene = {
  id: SceneId;
  layer: SceneLayer;
  /** ০..১ (> ০ শুধু) */
  opacity: number;
  /** `sec − sceneWindow(id).startSec` — ক্রসফেডে ঢোকার সময় ঋণাত্মক (≥ −০.২৫) হতে পারে */
  localSec: number;
};

/**
 * এই মুহূর্তে আঁকার দৃশ্যগুলো (`opacity > 0`): আগে `main` (টাইমলাইন-ক্রমে — ক্রসফেডে ≤ ২টি), তারপর `overlay` (সবার ওপরে)।
 */
export function activeScenes(sec: number): ActiveScene[] {
  const out: ActiveScene[] = [];
  for (const layer of ['main', 'overlay'] as const) {
    for (const s of SCENES) {
      if (s.layer !== layer) continue;
      const opacity = sceneOpacityAt(s.id, sec);
      if (opacity > 0) out.push({id: s.id, layer, opacity, localSec: sec - sceneWindow(s.id).startSec});
    }
  }
  return out;
}

// ---------------------------------------------------------------- কীওয়ার্ড পপ-আপ জানালা
export type PopupWindow = {
  keywordId: KeywordId;
  /** পপ-আপ শুরু (প্রথম শব্দের শুরু − `popupLeadSec`) */
  startSec: number;
  /** পপ-আপ শেষ — ফেড-আউটসহ; পরের পপ-আপের শুরুর সাথে সর্বোচ্চ মিলে যায়, কখনো পেরোয় না */
  endSec: number;
  /** কীওয়ার্ড-শব্দ(গুলো)র শুরু/শেষ (কথার সময়) */
  wordStartSec: number;
  wordEndSec: number;
};

/** চালু কীওয়ার্ডগুলোর পপ-আপ জানালা (সময়ক্রমে) — প্যারামিটার-যুক্ত যাতে যাচাই-টেস্টে ভুল ডেটা ঢোকানো যায় */
export function computePopupWindows(
  keywords: readonly KeywordDef[] = KEYWORDS,
  words: readonly HadisWord[] = WORDS,
  endOfAudioSec: number = SPEECH_END_SEC,
): PopupWindow[] {
  const items = keywords
    .filter((k) => k.enabled)
    .map((k) => {
      const first = words[k.wordIndices[0]];
      const last = words[k.wordIndices[k.wordIndices.length - 1]];
      const startSec = Math.max(0, first.start - SVG_TIMING.popupLeadSec);
      return {k, startSec, wordStartSec: first.start, wordEndSec: last.end};
    })
    .sort((a, b) => a.startSec - b.startSec);

  return items.map((it, i) => {
    const hold = it.k.holdSec === undefined ? SVG_TIMING.popupHoldSec : it.k.holdSec;
    let endSec = Math.min(it.startSec + hold, endOfAudioSec);
    const next = items[i + 1];
    if (next) endSec = Math.min(endSec, next.startSec);
    return {keywordId: it.k.id, startSec: it.startSec, endSec, wordStartSec: it.wordStartSec, wordEndSec: it.wordEndSec};
  });
}

const POPUP_WINDOWS: readonly PopupWindow[] = computePopupWindows();

/** চালু পপ-আপগুলোর জানালা (সময়ক্রমে) */
export function popupWindows(): PopupWindow[] {
  return POPUP_WINDOWS.map((w) => ({...w}));
}

export function getKeyword(id: KeywordId): KeywordDef {
  const k = KEYWORDS.find((x) => x.id === id);
  if (!k) throw new Error(`অজানা কীওয়ার্ড: ${id}`);
  return k;
}

export type PopupState = {
  keywordId: KeywordId;
  /** `sec − startSec` (স্প্রিং-পপ এটি থেকে) */
  localSec: number;
  /** জানালার মোট দৈর্ঘ্য */
  durationSec: number;
  /** ফেড-ইন × ফেড-আউট, ০..১ */
  opacity: number;
};

/** এই মুহূর্তে যে পপ-আপ দেখা যাচ্ছে (একসাথে ≤ ১টি); না থাকলে null */
export function popupAt(sec: number): PopupState | null {
  const w = POPUP_WINDOWS.find((x) => sec >= x.startSec && sec < x.endSec);
  if (!w) return null;
  const fadeIn = smooth01((sec - w.startSec) / SVG_TIMING.popupFadeInSec);
  const fadeOut = smooth01((w.endSec - sec) / SVG_TIMING.popupOutSec);
  return {keywordId: w.keywordId, localSec: sec - w.startSec, durationSec: w.endSec - w.startSec, opacity: fadeIn * fadeOut};
}

// ---------------------------------------------------------------- যাচাই (লোডের সময় চলে)
/** ফ্রেম-স্ক্যানের ধাপ — ভিডিওর FPS (config.ts-এর `FPS`) এর সাথে মিল; এই ফাইল config import করে না */
const SCAN_FPS = 30;
/** স্ক্যান অডিও-শেষের পর আউটরো (৫ সে.) পর্যন্ত — শেষ দৃশ্য সেখানেও ধরা থাকার প্রমাণ */
const SCAN_PAST_AUDIO_SEC = 5;
const EPS = 1e-9;

/** ত্রুটির তালিকা ফেরত দেয়; ফাঁকা = ঠিক আছে */
export function validateSvgData(
  scenes: readonly SceneDef[] = SCENES,
  keywords: readonly KeywordDef[] = KEYWORDS,
  words: readonly HadisWord[] = WORDS,
): string[] {
  const errors: string[] = [];
  const lastIndex = words.length - 1;

  // ---- সময়-টিউনিং-এর যুক্তিসংগতি
  if (!(SVG_TIMING.popupMinSec <= SVG_TIMING.popupHoldSec)) errors.push('popupMinSec > popupHoldSec');
  if (!(SVG_TIMING.popupFadeInSec + SVG_TIMING.popupOutSec <= SVG_TIMING.popupMinSec + EPS)) {
    errors.push('popupFadeInSec + popupOutSec > popupMinSec (ন্যূনতম জানালায় ফেড-ইন/আউট ঢোকে না)');
  }

  // ---- দৃশ্য: আইডি অনন্য, রেঞ্জ বৈধ
  const ids = new Set<string>();
  for (const s of scenes) {
    if (ids.has(s.id)) errors.push(`দৃশ্য "${s.id}" একাধিকবার`);
    ids.add(s.id);
    if (!Number.isInteger(s.first) || !Number.isInteger(s.last)) errors.push(`দৃশ্য "${s.id}": ইনডেক্স পূর্ণসংখ্যা নয়`);
    if (s.first < 0 || s.last > lastIndex) errors.push(`দৃশ্য "${s.id}": ইনডেক্স ০–${lastIndex}-এর বাইরে (${s.first}–${s.last})`);
    if (s.last < s.first) errors.push(`দৃশ্য "${s.id}": last < first`);
    if (s.bandOpacity !== undefined && !(s.bandOpacity >= 0 && s.bandOpacity <= 1)) {
      errors.push(`দৃশ্য "${s.id}": bandOpacity ০–১-এর বাইরে (${s.bandOpacity})`);
    }
  }

  // ---- main দৃশ্য: ইনডেক্সে ক্রমানুসারে ও ফাঁকহীন, ০ থেকে শেষ শব্দ পর্যন্ত
  const mains = scenes.filter((s) => s.layer === 'main');
  if (mains.length === 0) errors.push('কোনো main দৃশ্য নেই');
  let expectFirst = 0;
  for (const s of mains) {
    if (s.first !== expectFirst) errors.push(`main দৃশ্য "${s.id}": শুরু ${s.first}, প্রত্যাশিত ${expectFirst}`);
    expectFirst = s.last + 1;
  }
  if (mains.length > 0 && expectFirst !== words.length) {
    errors.push(`main দৃশ্যগুলো ${expectFirst} শব্দ ঢাকে, মোট ${words.length}`);
  }

  // ---- overlay: parent একটি main দৃশ্য, রেঞ্জ তার ভেতরে
  for (const s of scenes) {
    if (s.layer !== 'overlay') continue;
    const parent = mains.find((m) => m.id === s.parent);
    if (!parent) {
      errors.push(`ওভারলে "${s.id}": মূল main দৃশ্য "${s.parent}" নেই`);
      continue;
    }
    if (s.first < parent.first || s.last > parent.last) {
      errors.push(`ওভারলে "${s.id}" (${s.first}–${s.last}) মূল দৃশ্য "${parent.id}" (${parent.first}–${parent.last})-এর বাইরে`);
    }
  }

  // ---- কীওয়ার্ড: গঠন
  const kwIds = new Set<string>();
  let kwShapeOk = true;
  for (const k of keywords) {
    if (kwIds.has(k.id)) errors.push(`কীওয়ার্ড "${k.id}" একাধিকবার`);
    kwIds.add(k.id);
    if (k.wordIndices.length === 0) {
      errors.push(`কীওয়ার্ড "${k.id}": wordIndices ফাঁকা`);
      kwShapeOk = false;
    }
    k.wordIndices.forEach((wi, j) => {
      if (!Number.isInteger(wi) || wi < 0 || wi > lastIndex) {
        errors.push(`কীওয়ার্ড "${k.id}": শব্দ-ইনডেক্স ${wi} ০–${lastIndex}-এর বাইরে`);
        kwShapeOk = false;
      }
      if (j > 0 && !(wi > k.wordIndices[j - 1])) {
        errors.push(`কীওয়ার্ড "${k.id}": wordIndices ক্রমবর্ধমান নয়`);
        kwShapeOk = false;
      }
    });
    if (k.icons.length < 1 || k.icons.length > 2) errors.push(`কীওয়ার্ড "${k.id}": আইকন ১–২টি হতে হবে, পাওয়া গেছে ${k.icons.length}`);
    if (k.labels.length !== k.icons.length) errors.push(`কীওয়ার্ড "${k.id}": labels (${k.labels.length}) ≠ icons (${k.icons.length})`);
    for (const ic of k.icons) {
      if (!KEYWORD_ICON_NAMES.includes(ic)) errors.push(`কীওয়ার্ড "${k.id}": অজানা আইকন "${ic}"`);
    }
    for (const lb of k.labels) {
      if (lb.trim().length === 0) errors.push(`কীওয়ার্ড "${k.id}": ফাঁকা লেবেল`);
    }
    if (k.holdSec !== undefined && !(k.holdSec >= SVG_TIMING.popupMinSec)) {
      errors.push(`কীওয়ার্ড "${k.id}": holdSec ${k.holdSec} < ন্যূনতম ${SVG_TIMING.popupMinSec}`);
    }
  }

  // ---- কীওয়ার্ড: জানালা (গঠন ঠিক থাকলেই)
  if (kwShapeOk) {
    const wins = computePopupWindows(keywords, words, words[lastIndex].end);
    const arabic = getSectionTiming('B');
    const arabicFrom = arabic.startSec - ARABIC_ZONE.leadSec;
    const arabicTo = arabic.endSec + ARABIC_ZONE.tailSec;
    wins.forEach((w, i) => {
      const dur = w.endSec - w.startSec;
      if (dur < SVG_TIMING.popupMinSec - EPS) {
        errors.push(`পপ-আপ "${w.keywordId}": দেখা যায় মাত্র ${dur.toFixed(3)} সে. (ন্যূনতম ${SVG_TIMING.popupMinSec})`);
      }
      if (w.endSec > words[lastIndex].end + EPS) errors.push(`পপ-আপ "${w.keywordId}": অডিও-শেষের বাইরে`);
      if (w.startSec > w.wordStartSec + EPS) errors.push(`পপ-আপ "${w.keywordId}": কীওয়ার্ড-শব্দের পরে শুরু`);
      if (w.endSec < w.wordStartSec - EPS) errors.push(`পপ-আপ "${w.keywordId}": কীওয়ার্ড-শব্দের আগেই শেষ`);
      if (i > 0 && w.startSec < wins[i - 1].endSec - EPS) errors.push(`পপ-আপ "${w.keywordId}": আগেরটির সাথে ওভারল্যাপ`);
      if (w.startSec < arabicTo && w.endSec > arabicFrom) {
        errors.push(
          `পপ-আপ "${w.keywordId}" [${w.startSec.toFixed(2)}, ${w.endSec.toFixed(2)}] আরবি ব্লকের জানালা [${arabicFrom.toFixed(2)}, ${arabicTo.toFixed(2)}]-এর সাথে ছেদ করে`,
        );
      }
    });
  }

  // ---- ফ্রেম-স্ক্যান: ০ থেকে অডিও-শেষ + আউটরো পর্যন্ত যেকোনো ফ্রেমে ঠিক ১টি/ক্রসফেডে ২টি main দৃশ্য, যোগফল ১
  const structuralOk = errors.length === 0;
  if (structuralOk) {
    const windows = computeSceneWindows(scenes, words, words[0].start, words[lastIndex].end);
    const frames = Math.ceil((words[lastIndex].end + SCAN_PAST_AUDIO_SEC) * SCAN_FPS);
    let reported = 0;
    for (let f = 0; f < frames && reported < 5; f++) {
      const sec = f / SCAN_FPS;
      let sum = 0;
      let count = 0;
      for (const s of mains) {
        const o = opacityOf(scenes, windows, s.id, sec);
        if (o > 0) count++;
        sum += o;
      }
      if (Math.abs(sum - 1) > 1e-9 || count < 1 || count > 2) {
        errors.push(`ফ্রেম ${f} (${sec.toFixed(3)} সে.): main দৃশ্য ${count}টি, অপাসিটি-যোগফল ${sum.toFixed(6)} (প্রত্যাশিত ≈ ১, ১–২টি দৃশ্য)`);
        reported++;
      }
      for (const s of scenes) {
        if (s.layer !== 'overlay' || !s.parent) continue;
        const o = opacityOf(scenes, windows, s.id, sec);
        const p = opacityOf(scenes, windows, s.parent, sec);
        if (o > p + 1e-9) {
          errors.push(`ফ্রেম ${f}: ওভারলে "${s.id}" (${o.toFixed(3)}) মূল দৃশ্যের (${p.toFixed(3)}) চেয়ে বেশি দৃশ্যমান`);
          reported++;
        }
      }
    }
    // ক্রসফেড মূল দৃশ্যের দৈর্ঘ্যের চেয়ে ছোট হতে হবে
    for (const s of mains) {
      const w = windows.get(s.id);
      if (w && w.endSec - w.startSec < SVG_TIMING.crossfadeSec) {
        errors.push(`main দৃশ্য "${s.id}" (${(w.endSec - w.startSec).toFixed(3)} সে.) ক্রসফেডের (${SVG_TIMING.crossfadeSec}) চেয়ে ছোট`);
      }
    }
  }

  return errors;
}

/** বর্তমান শব্দ-সংখ্যা (৮৩) — SCENES-এর শেষ ইনডেক্স এর সাথে মেলে কি না দ্রুত দেখতে (টেস্ট-হেলপার) */
export const SVG_WORD_COUNT = WORD_COUNT;

const _errors = validateSvgData();
if (_errors.length > 0) {
  throw new Error(`svg-data.ts যাচাই ব্যর্থ:\n - ${_errors.join('\n - ')}`);
}
