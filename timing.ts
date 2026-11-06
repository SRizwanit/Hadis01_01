// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — টাইমিং হেলপার: সেকেন্ড↔ফ্রেম, সক্রিয় শব্দ, পেজ-ভাগ (S4.4)
//
// নিয়ম:
//  • শুধু `import type` — hadis-data.ts/theme.ts-এর কোনো রানটাইম কোড লোড হয় না (স্বাধীনভাবে টেস্টযোগ্য)।
//  • সবকিছু বিশুদ্ধ ফাংশন; Math.random/Date নেই (রেন্ডার ডিটারমিনিস্টিক)।
//  • সময় সবসময় সেকেন্ডে; ফ্রেমে বদলাতে secToFrame। `<Sequence>` অফসেট ব্যবহার করলে currentSec থেকে অফসেট বিয়োগ
//    করে দিতে হবে (S5.7) — এই ফাইলের ফাংশনগুলো সবসময় "অডিওর শুরু থেকে সেকেন্ড" ধরে।
//  • enum/parameter-property নেই (Node type-stripping দিয়ে টেস্ট করা যায়)।

import type {HadisWord, Section, SectionId, SectionKind} from './hadis-data';

// ---------------------------------------------------------------- ধ্রুবক
/** পেজ প্রথম শব্দের এত সেকেন্ড আগে দেখা দেয় (পাঠক আগে চোখ রাখতে পারে) */
export const PAGE_LEAD_SEC = 0.15;

// ---------------------------------------------------------------- সেকেন্ড ↔ ফ্রেম
export function secToFrame(sec: number, fps: number): number {
  if (!(fps > 0)) throw new Error(`fps ধনাত্মক হতে হবে, পাওয়া গেছে ${fps}`);
  return Math.round(sec * fps);
}

export function frameToSec(frame: number, fps: number): number {
  if (!(fps > 0)) throw new Error(`fps ধনাত্মক হতে হবে, পাওয়া গেছে ${fps}`);
  return frame / fps;
}

/**
 * S5.7 — সব কম্পোনেন্টের (Karaoke, ProgressBar, ArabicBlock, Outro) **একই** "অডিওর শুরু থেকে সেকেন্ড":
 * `frame/fps + offsetSec`, ১e-৬-এ গোল (অফসেটসহ/ছাড়া ফ্লোট-শব্দে ১e-১৬ তফাত যেন স্টাইল-স্ট্রিং বদলাতে না পারে)।
 * `<Sequence from={N}>`-এর ভেতরে `offsetSec = N/fps`।
 */
export function audioSecAt(frame: number, fps: number, offsetSec: number = 0): number {
  return Math.round((frameToSec(frame, fps) + offsetSec) * 1e6) / 1e6;
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

// ---------------------------------------------------------------- শব্দের অবস্থা
export type WordState = 'upcoming' | 'active' | 'spoken';

type Timed = {start: number; end: number};

/** `start ≤ t < end` → active; আগে → upcoming; শেষ হওয়ার পর (ফাঁকসহ) → spoken */
export function wordState(w: Timed, currentSec: number): WordState {
  if (currentSec < w.start) return 'upcoming';
  if (currentSec < w.end) return 'active';
  return 'spoken';
}

/** শব্দটি বলার অগ্রগতি ০..১ (আন্ডারলাইন-wipe/পপের জন্য); শুরুর আগে ০, শেষের পর ১ */
export function wordProgress(w: Timed, currentSec: number): number {
  const d = w.end - w.start;
  if (!(d > 0)) return currentSec >= w.end ? 1 : 0;
  return clamp01((currentSec - w.start) / d);
}

/** এই মুহূর্তে যে শব্দ বলা হচ্ছে তার ইনডেক্স (array-র ভেতরে); ফাঁক/শুরুর আগে/শেষের পর → -1 */
export function activeWordIndex(words: readonly Timed[], currentSec: number): number {
  for (let i = 0; i < words.length; i++) {
    if (currentSec >= words[i].start && currentSec < words[i].end) return i;
  }
  return -1;
}

/** কয়টি শব্দ বলা শেষ (end ≤ t) */
export function spokenCount(words: readonly Timed[], currentSec: number): number {
  let n = 0;
  for (const w of words) if (currentSec >= w.end) n++;
  return n;
}

// ---------------------------------------------------------------- পেজ
export type Page = {
  /** পেজের ক্রম (০-ভিত্তিক) */
  index: number;
  words: readonly HadisWord[];
  /** পুরো হাদিসে প্রথম/শেষ শব্দের `index` */
  firstWordIndex: number;
  lastWordIndex: number;
  /** পেজ দেখানো শুরু (সে.) = প্রথম শব্দ − lead (আগের পেজের কথা শেষের আগে নয়) */
  startSec: number;
  /** পেজ দেখানো শেষ (সে.) = পরের পেজের শুরু; শেষ পেজে অডিও শেষ। মাঝের ফাঁকে আগের পেজ ধরে রাখা হয় */
  endSec: number;
  /** প্রথম শব্দের শুরু / শেষ শব্দের শেষ */
  speechStartSec: number;
  speechEndSec: number;
  sectionId: SectionId;
  sectionKind: SectionKind;
  /** `sections` অপশন দিলে সেকশনের পূর্ণ তথ্য, নইলে null */
  section: Section | null;
  isFirstInSection: boolean;
  isLastInSection: boolean;
};

export type BuildPagesOptions = {
  /** প্রতি পেজে সর্বোচ্চ শব্দ (theme.ts: ১৬:৯ = ৯, ৯:১৬ = ৬) */
  maxWords: number;
  /** ঐচ্ছিক: পেজে `section` অবজেক্ট বসাতে */
  sections?: readonly Section[];
  /** ডিফল্ট PAGE_LEAD_SEC (০.১৫) */
  leadSec?: number;
  /** শেষ পেজ কতক্ষণ থাকবে — ডিফল্ট শেষ শব্দের শেষ; অডিও বেশি লম্বা হলে সেটি দিন (যেমন ৩৮.৩২) */
  audioEndSec?: number;
};

/** n শব্দকে ≤ max করে সমান-সমান টুকরোয় (৯+২ নয়, ৬+৫); বড় টুকরো আগে */
function splitBalanced<T>(items: readonly T[], max: number): T[][] {
  const n = items.length;
  const k = Math.ceil(n / max);
  const base = Math.floor(n / k);
  const extra = n % k;
  const out: T[][] = [];
  let pos = 0;
  for (let i = 0; i < k; i++) {
    const size = base + (i < extra ? 1 : 0);
    out.push(items.slice(pos, pos + size));
    pos += size;
  }
  return out;
}

/**
 * পেজ ভাঙার নিয়ম (অগ্রাধিকার ক্রমে):
 *  (ক) সেকশন সীমানা — পেজ কখনো দুই সেকশনে ছড়ায় না
 *  (খ) বিরতি-শব্দের (`isPause`) পরে — বিরতি-শব্দ সবসময় পেজের শেষ শব্দ
 *  (গ) `maxWords` পূর্ণ হলে — লম্বা অংশ সমান টুকরোয় ভাগ (৯+২ নয়, ৬+৫)
 * পেজের সময়: শুরু = প্রথম শব্দ − lead (তবে আগের পেজের শেষ শব্দের শেষের আগে নয়); শেষ = পরের পেজের শুরু।
 * মাঝে সাইলেন্স থাকলে আগের পেজ সেই ফাঁক পর্যন্ত ধরে রাখা হয় — ফাঁকা পর্দা হয় না।
 */
export function buildPages(words: readonly HadisWord[], opts: BuildPagesOptions): Page[] {
  const {maxWords, sections, leadSec = PAGE_LEAD_SEC, audioEndSec} = opts;
  if (!Number.isInteger(maxWords) || maxWords < 1) throw new Error(`maxWords ধনাত্মক পূর্ণসংখ্যা হতে হবে: ${maxWords}`);
  if (leadSec < 0) throw new Error(`leadSec ঋণাত্মক হতে পারে না: ${leadSec}`);
  if (words.length === 0) return [];

  // ১) সেকশন সীমানা + বিরতি-শব্দ দিয়ে অংশ
  const segments: HadisWord[][] = [];
  let cur: HadisWord[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    const next = words[i + 1];
    if (!next || w.isPause || next.sectionId !== w.sectionId) {
      segments.push(cur);
      cur = [];
    }
  });

  // ২) maxWords-এর বেশি হলে সমান টুকরো
  const chunks: HadisWord[][] = [];
  for (const seg of segments) {
    if (seg.length <= maxWords) chunks.push(seg);
    else chunks.push(...splitBalanced(seg, maxWords));
  }

  // ৩) সময় বসানো
  const lastSpeechEnd = words[words.length - 1].end;
  const finalEnd = Math.max(audioEndSec ?? lastSpeechEnd, lastSpeechEnd);
  const pages: Page[] = chunks.map((ws, index) => {
    const first = ws[0];
    const last = ws[ws.length - 1];
    const prevSpeechEnd = index > 0 ? chunks[index - 1][chunks[index - 1].length - 1].end : 0;
    const startSec = Math.max(0, first.start - leadSec, prevSpeechEnd);
    const section = sections ? (sections.find((s) => s.id === first.sectionId) ?? null) : null;
    return {
      index,
      words: ws,
      firstWordIndex: first.index,
      lastWordIndex: last.index,
      startSec,
      endSec: 0, // নিচে বসবে
      speechStartSec: first.start,
      speechEndSec: last.end,
      sectionId: first.sectionId,
      sectionKind: first.sectionKind,
      section,
      isFirstInSection: index === 0 || chunks[index - 1][0].sectionId !== first.sectionId,
      isLastInSection: index === chunks.length - 1 || chunks[index + 1][0].sectionId !== first.sectionId,
    };
  });
  pages.forEach((p, i) => {
    p.endSec = i < pages.length - 1 ? pages[i + 1].startSec : finalEnd;
  });
  return pages;
}

// ---------------------------------------------------------------- পেজ খোঁজা/ক্রসফেড
/** কোন পেজ দেখানো হচ্ছে; শুরুর আগে বা শেষের পর → -1 */
export function pageIndexAtTime(pages: readonly Page[], currentSec: number): number {
  for (let i = pages.length - 1; i >= 0; i--) {
    if (currentSec >= pages[i].startSec) return currentSec < pages[i].endSec ? i : -1;
  }
  return -1;
}

export type VisiblePage = {
  page: Page;
  /** ০..১ — ক্রসফেডের অপাসিটি */
  opacity: number;
  /** পেজ শুরুর পর কত সেকেন্ড গেছে (শব্দের stagger/এন্ট্রান্স অ্যানিমেশনের জন্য) */
  ageSec: number;
  /** true = আগের পেজ, ফেড-আউট হচ্ছে */
  leaving: boolean;
};

/**
 * এই মুহূর্তে যেসব পেজ আঁকতে হবে। নতুন পেজ শুরুর `fadeSec` সময়ে নতুনটি ফেড-ইন ও আগেরটি ফেড-আউট (ক্রসফেড);
 * তার পর শুধু বর্তমান পেজ। পেজের ভেতরে কখনো ফাঁকা পর্দা নেই।
 */
export function visiblePages(pages: readonly Page[], currentSec: number, fadeSec: number): VisiblePage[] {
  const i = pageIndexAtTime(pages, currentSec);
  if (i < 0) return [];
  const page = pages[i];
  const age = currentSec - page.startSec;
  const t = fadeSec > 0 ? clamp01(age / fadeSec) : 1;
  const out: VisiblePage[] = [];
  if (i > 0 && t < 1) {
    const prev = pages[i - 1];
    out.push({page: prev, opacity: 1 - t, ageSec: currentSec - prev.startSec, leaving: true});
  }
  out.push({page, opacity: t, ageSec: age, leaving: false});
  return out;
}

/** পেজের ফ্রেম-পরিসর (from ইনক্লুসিভ, to এক্সক্লুসিভ) */
export function pageFrameRange(page: Page, fps: number): {from: number; to: number; durationInFrames: number} {
  const from = secToFrame(page.startSec, fps);
  const to = Math.max(from + 1, secToFrame(page.endSec, fps));
  return {from, to, durationInFrames: to - from};
}

/** সেকশনভিত্তিক দেখানোর সময় — লেসন-কার্ড পেজ বদলালেও টিকিয়ে রাখতে (প্রথম পেজের শুরু → শেষ পেজের শেষ) */
export function sectionSpans(pages: readonly Page[]): {sectionId: SectionId; startSec: number; endSec: number}[] {
  const out: {sectionId: SectionId; startSec: number; endSec: number}[] = [];
  for (const p of pages) {
    const last = out[out.length - 1];
    if (last && last.sectionId === p.sectionId) last.endSec = p.endSec;
    else out.push({sectionId: p.sectionId, startSec: p.startSec, endSec: p.endSec});
  }
  return out;
}

// ---------------------------------------------------------------- যাচাই
/** পেজ-তালিকার ত্রুটি (ফাঁকা = ঠিক আছে) */
export function validatePages(pages: readonly Page[], words: readonly HadisWord[], maxWords: number): string[] {
  const errors: string[] = [];
  let expect = words.length ? words[0].index : 0;
  pages.forEach((p, i) => {
    if (p.words.length === 0) errors.push(`পেজ ${i}: ফাঁকা`);
    if (p.words.length > maxWords) errors.push(`পেজ ${i}: ${p.words.length} শব্দ > maxWords ${maxWords}`);
    if (p.firstWordIndex !== expect) errors.push(`পেজ ${i}: শুরু #${p.firstWordIndex}, প্রত্যাশিত #${expect}`);
    expect = p.lastWordIndex + 1;
    p.words.forEach((w, k) => {
      if (w.sectionId !== p.sectionId) errors.push(`পেজ ${i}: শব্দ #${w.index} ভিন্ন সেকশনের`);
      if (w.isPause && k !== p.words.length - 1) errors.push(`পেজ ${i}: বিরতি-শব্দ #${w.index} পেজের শেষে নয়`);
    });
    if (p.startSec > p.speechStartSec + 1e-9) errors.push(`পেজ ${i}: startSec প্রথম শব্দের পরে`);
    if (i > 0 && p.startSec < pages[i - 1].speechEndSec - 1e-9) errors.push(`পেজ ${i}: আগের পেজের কথা শেষের আগেই শুরু`);
    if (i > 0 && Math.abs(pages[i - 1].endSec - p.startSec) > 1e-9) errors.push(`পেজ ${i}: আগের পেজের endSec ≠ এর startSec (ফাঁকা পর্দা/ওভারল্যাপ)`);
    if (p.endSec < p.speechEndSec - 1e-9) errors.push(`পেজ ${i}: endSec শেষ শব্দের আগে`);
  });
  if (words.length && expect !== words[words.length - 1].index + 1) errors.push(`পেজগুলো সব শব্দ ঢাকে না (শেষ #${expect - 1})`);
  return errors;
}
