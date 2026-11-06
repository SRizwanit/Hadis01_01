// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — ফেজ SVG: সাধারণ SVG হেলপার ও দৃশ্য-ফ্রেম (svg2)
//
// এই ফাইলে যা আছে (সব দৃশ্য-ফাইল svg3–svg16 এটি ব্যবহার করবে):
//   ১) `SVG_LOOK` — টিউনিং-মান (ক্যাপশন-ব্যান্ডের ম্লানতা, ফেদার, গ্লো-তীব্রতা, লাইন-পুরুত্ব, পপ-স্প্রিং, স্পার্কল)
//   ২) জ্যামিতি — `artZone`, `skyZone`, `groundZone`, `captionBand`, `popupZone`, `stripZone`, `zonesOf`, `artPoint`, `px`
//      (SVG-৪ টেবিল অনুযায়ী; ক্যাপশন-ব্যান্ড `theme.ts` লেআউট থেকে গণনা — Karaoke-র লেসন-কার্ডের সূত্রে)
//   ৩) বিশুদ্ধ গণিত — `clamp`, `lerp`, `smoothstep`, `easeOutCubic`, `easeInOutCubic`, `rangeProgress`, `drawOn`, `popIn`,
//      `popOpacity`, `pulse`, `wave`, `localClamp`
//   ৪) কম্পোনেন্ট — `SceneFrame` (পূর্ণ-পর্দা `<svg>` + ক্যাপশন-ব্যান্ডে ম্লান করার SVG `<mask>`), `Glow` (radialGradient-ভিত্তিক আভা),
//      `Sparkles` (সিড-ভিত্তিক মিটমিট কণা), `SvgGuides` (শুধু QA-স্টিলের জন্য অঞ্চল-রেখা; ভিডিওতে ব্যবহার নয়)
//
// নিয়ম (Hadis.md ফেজ SVG — SVG-৫):
//  • সব অ্যানিমেশন ফাংশন `sec`/`localSec` (সেকেন্ড) নেয় — `useCurrentFrame()`/`remotion` সরাসরি নয়, তাই ফ্রেম-ক্রম-নিরপেক্ষ ও টেস্টযোগ্য।
//  • `Math.random`/`Date`/CSS animation/transition নেই; কণা `mulberry32` সিডে (Background.tsx থেকে)।
//  • ভারী SVG-ফিল্টার (`feGaussianBlur`) নেই — আভা `radialGradient` দিয়ে (4K রেন্ডার ধীর না হওয়ার জন্য)।
//  • রঙ শুধু `theme.ts`-এর `COLORS` থেকে।
//  • একই `<svg>`-এ/একসাথে দৃশ্যমান একাধিক দৃশ্যে `id` সংঘর্ষ এড়াতে প্রতিটি `Glow`-এ আলাদা `id` ও প্রতিটি `SceneFrame`-এ আলাদা `idPrefix`
//    (SvgLayer দৃশ্য-আইডি দেবে) — ক্রসফেডে দুই দৃশ্য একসাথে থাকে।
//
// ইম্পোর্ট: `react`, `./theme` (COLORS, LINE_HEIGHT, getLayout, getUnit, orientationOf), `./Background` (mulberry32),
// `./svg-data` (DEFAULT_BAND_OPACITY — একটিই সত্য-উৎস, ০.২৮)। `remotion`-এর হুক এখানে সরাসরি ব্যবহার হয় না।

import React, {useMemo} from 'react';
import {mulberry32} from './Background';
import {DEFAULT_BAND_OPACITY} from './svg-data';
import {COLORS, LINE_HEIGHT, getLayout, getUnit, orientationOf} from './theme';
import type {Orientation} from './theme';

const TAU = Math.PI * 2;

// ---------------------------------------------------------------- টিউনিং-মান
export const SVG_LOOK = {
  /** ক্যাপশন-ব্যান্ডে দৃশ্যের অপাসিটি (ম্লান) — `svg-data.ts`-এর `DEFAULT_BAND_OPACITY` (০.২৮); `niyyah` দৃশ্যে ০.৪৫ (`sceneBandOpacity`) */
  captionBandOpacity: DEFAULT_BAND_OPACITY,
  /** ব্যান্ডের ওপরে/নিচে পূর্ণ → ম্লান নরম রূপান্তরের দৈর্ঘ্য (ডিজাইন px) */
  featherPx: 60,
  /** আভার (Glow) তীব্রতা — কেন্দ্রের স্টপ-অ্যালফা */
  glow: {soft: 0.3, normal: 0.5, strong: 0.78},
  /** লাইনের পুরুত্ব (ডিজাইন px; `px(width,height,n)` দিয়ে মাপ বদলান) */
  lineWidth: {hair: 1.5, thin: 2.5, base: 4, bold: 6},
  /** স্প্রিং-পপ: `from` → `from + (1−from)·(১+overshootRatio)` শিখর → ১.০ ; মোট `durationSec` */
  pop: {from: 0.6, overshoot: 0.08, durationSec: 0.35, peakAt: 0.55, fadeInSec: 0.12},
  /** `Sparkles`-এর ডিফল্ট */
  sparkle: {sizeMin: 5, sizeMax: 13, periodMin: 1.6, periodMax: 3.6, sharpness: 2},
  /** QA-গাইডের রঙ (শুধু `SvgGuides`) */
  guides: {art: '#00FF99', band: '#FF9F1C', popup: '#27C7FF', strip: '#FF4FD8', header: '#FFFFFF'},
} as const;

// ---------------------------------------------------------------- জ্যামিতি (SVG-৪; ডিজাইন px: ১৬:৯ = ১৯২০×১০৮০, ৯:১৬ = ১০৮০×১৯২০)
/** `Karaoke.tsx`-এর `KARAOKE_LOOK.sizeFactor.lesson` (০.৯২)-এর প্রতিচ্ছায়া — হাতে-মেলানো; বদলালে এখানেও বদলান (টেস্ট সোর্স-লাইন মেলায়) */
export const LESSON_SIZE_FACTOR = 0.92;

/**
 * দৃশ্যের শিল্প-অঞ্চল, পপ-আপ অঞ্চল ও ডায়াগ্রাম-স্ট্রিপের y-সীমা (ডিজাইন px)।
 * `headerBottom` `Header.tsx`-এর পিল-বক্সের নিচের প্রান্ত (S5.2-এ মাপা: ১৬:৯ = 359, ৯:১৬ = 633)।
 * শিল্প-অঞ্চলের নিচ = প্রগ্রেস বারের ওপর থেকে ২২ / ৩০px ফাঁক (বার y 1032 / 1650)।
 */
export const SVG_GEOMETRY: Record<
  Orientation,
  {headerBottom: number; artTop: number; artBottom: number; popupTop: number; popupBottom: number; stripTop: number; stripBottom: number}
> = {
  landscape: {headerBottom: 359, artTop: 380, artBottom: 1010, popupTop: 392, popupBottom: 560, stripTop: 860, stripBottom: 1010},
  portrait: {headerBottom: 633, artTop: 650, artBottom: 1620, popupTop: 665, popupBottom: 900, stripTop: 1340, stripBottom: 1620},
};

export type Zone = {left: number; top: number; right: number; bottom: number; width: number; height: number; cx: number; cy: number};

function zoneOf(left: number, top: number, right: number, bottom: number): Zone {
  return {left, top, right, bottom, width: right - left, height: bottom - top, cx: (left + right) / 2, cy: (top + bottom) / 2};
}

/** দৃশ্যের শিল্প-অঞ্চল — পূর্ণ প্রস্থ, y = headerBottom + ~২০ … প্রগ্রেস বারের ওপর */
export function artZone(width: number, height: number): Zone {
  const g = SVG_GEOMETRY[orientationOf(width, height)];
  const u = getUnit(width, height);
  return zoneOf(0, g.artTop * u, width, g.artBottom * u);
}

/**
 * ক্যাপশন-ব্যান্ড = লেসন-কার্ডের (সেকশন D) স্থির আকার, কারণ সেটিই কারাওকের সর্বোচ্চ উচ্চতা:
 * `centerY ± (maxLines × size × ০.৯২ × lineHeight + ২ × padding) / ২` — ১৬:৯ ≈ 588.8–851.2, ৯:১৬ ≈ 936–1324।
 * পূর্ণ প্রস্থ (বাক্সের প্রস্থ নয়) — মাস্ক অনুভূমিক-ভাবে সমান।
 */
export function captionBand(width: number, height: number): Zone {
  const lay = getLayout(width, height);
  const u = getUnit(width, height);
  const k = lay.karaoke;
  const textArea = k.maxLines * (k.size * LESSON_SIZE_FACTOR) * LINE_HEIGHT.bengali;
  const cardH = textArea + lay.lesson.padding * 2;
  const cy = k.centerY * u;
  return zoneOf(0, cy - (cardH * u) / 2, width, cy + (cardH * u) / 2);
}

/** আকাশ (চাঁদ, আলো, রশ্মি) — শিল্প-অঞ্চলের উপরের অংশ: শিল্প-অঞ্চলের উপর থেকে ক্যাপশন-ব্যান্ডের উপর পর্যন্ত */
export function skyZone(width: number, height: number): Zone {
  const a = artZone(width, height);
  const b = captionBand(width, height);
  return zoneOf(0, a.top, width, b.top);
}

/** মাটি/সিলুয়েট (মদিনা, কাবা, বালিয়াড়ি, কাফেলা) — ডায়াগ্রাম-স্ট্রিপ, ক্যাপশন-ব্যান্ডের নিচে */
export function stripZone(width: number, height: number): Zone {
  const g = SVG_GEOMETRY[orientationOf(width, height)];
  const u = getUnit(width, height);
  return zoneOf(0, g.stripTop * u, width, g.stripBottom * u);
}

/** `stripZone`-এর সমার্থক নাম — কম্পোজিশন-নিয়মে "মাটি নিচে" */
export const groundZone = stripZone;

/** কীওয়ার্ড পপ-আপ অঞ্চল — হেডার ও ক্যাপশনের মাঝে, মাঝ-কেন্দ্র (আরবি ব্লকের জায়গা; B-সময়ের বাইরে ফাঁকা) */
export function popupZone(width: number, height: number): Zone {
  const g = SVG_GEOMETRY[orientationOf(width, height)];
  const u = getUnit(width, height);
  return zoneOf(0, g.popupTop * u, width, g.popupBottom * u);
}

/** `Header`-এর নিচের প্রান্ত ও প্রগ্রেস বারের ওপরের প্রান্ত (পড়ার-সংঘর্ষ যাচাই ও গাইডের জন্য) */
export function chromeEdges(width: number, height: number): {headerBottom: number; progressTop: number; progressBottom: number} {
  const lay = getLayout(width, height);
  const u = getUnit(width, height);
  const g = SVG_GEOMETRY[orientationOf(width, height)];
  const progressBottom = height - lay.progress.bottom * u;
  return {headerBottom: g.headerBottom * u, progressTop: progressBottom - lay.progress.height * u, progressBottom};
}

export type ZoneSet = {art: Zone; sky: Zone; band: Zone; ground: Zone; popup: Zone};

export function zonesOf(width: number, height: number): ZoneSet {
  return {
    art: artZone(width, height),
    sky: skyZone(width, height),
    band: captionBand(width, height),
    ground: stripZone(width, height),
    popup: popupZone(width, height),
  };
}

/** অঞ্চলের ভগ্নাংশ-স্থানাঙ্ক (০–১) → পর্দার (x, y) */
export function artPoint(zone: Zone, fx: number, fy: number): {x: number; y: number} {
  return {x: zone.left + zone.width * fx, y: zone.top + zone.height * fy};
}

/** ডিজাইন px → বাস্তব px (Studio-তে ভিন্ন মাপে খুললে আনুপাতিক; রেন্ডারে সবসময় ১×) */
export function px(width: number, height: number, n: number): number {
  return n * getUnit(width, height);
}

// ---------------------------------------------------------------- বিশুদ্ধ গণিত
export function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}

export function clamp01(x: number): number {
  return clamp(x, 0, 1);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** `smoothstep(e0, e1, x)`: x ≤ e0 → ০, x ≥ e1 → ১, মাঝে ৩t²−২t³ (`svg-data.ts`-এর ক্রসফেড-ফাংশনের মতোই) */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge1 === edge0) return x < edge0 ? 0 : 1;
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function easeOutCubic(t: number): number {
  const c = clamp01(t);
  return 1 - Math.pow(1 - c, 3);
}

export function easeInOutCubic(t: number): number {
  const c = clamp01(t);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

/** `sec` ∈ [start, end] → রৈখিক ০..১ (বাইরে ক্ল্যাম্প) — `end ≤ start` হলে ধাপ-ফাংশন */
export function rangeProgress(sec: number, startSec: number, endSec: number): number {
  if (endSec <= startSec) return sec >= startSec ? 1 : 0;
  return clamp01((sec - startSec) / (endSec - startSec));
}

/**
 * ক্রসফেডে দৃশ্যে ঢোকার মুহূর্তে `localSec` ঋণাত্মক (≥ −০.২৫) হয় (svg-data.ts-এর `activeScenes`)।
 * দৃশ্য-কম্পোনেন্ট এটি দিয়ে সামলাবে: `const t = localClamp(localSec)` — আঁকা শুরু ০ সে. থেকে।
 */
export function localClamp(localSec: number): number {
  return localSec > 0 ? localSec : 0;
}

/**
 * stroke-dash দিয়ে "আঁকা হচ্ছে" প্রভাব: `<path {...drawOn(len, p)} />`।
 * `length` = পাথের দৈর্ঘ্য; পাথে `pathLength={1}` দিলে `drawOn(1, p)` — দৈর্ঘ্য মাপতে হয় না।
 * `progress ≤ 0` হলে `strokeOpacity: 0` (গোল ক্যাপের বিন্দু যাতে না দেখা যায়)।
 */
export function drawOn(length: number, progress: number): {strokeDasharray: string; strokeDashoffset: number; strokeOpacity: number} {
  const len = length > 0 ? length : 1;
  const p = clamp01(progress);
  return {strokeDasharray: `${len} ${len}`, strokeDashoffset: len * (1 - p), strokeOpacity: p <= 0 ? 0 : 1};
}

export type PopOptions = {
  /** মোট সময়কাল (সে.) — ডিফল্ট `SVG_LOOK.pop.durationSec` (০.৩৫) */
  durationSec?: number;
  /** শুরুর স্কেল — ডিফল্ট ০.৬ */
  from?: number;
  /** শিখরের অতিরিক্ত অংশ, ১-এর ওপর — ডিফল্ট ০.০৮ (শিখর ≈ ১.০৮); ০ বা ঋণাত্মক হলে ওভারশুট ছাড়া easeOutCubic */
  overshoot?: number;
};

/**
 * স্প্রিং-সদৃশ পপ-ইন স্কেল (বিশুদ্ধ, বন্ধ-রূপ): `sec < startSec` → ০ (এখনো নেই);
 * `startSec`-এ `from` (০.৬) → ~০.৫৫·দৈর্ঘ্যে শিখর `১ + overshoot` (১.০৮) → দৈর্ঘ্যের শেষে ঠিক ১.০, তারপর ১.০।
 * অন্তর্নিহিত: অবমন্দিত দোলক (ζ ওভারশুট-অনুপাত থেকে), শেষ ১৫%-এ ১-এ মসৃণ মিশ্রণ (লাফ নেই)।
 * `popOpacity` দিয়ে একই সাথে ফেড-ইন করুন।
 */
export function popIn(sec: number, startSec: number, opts: PopOptions = {}): number {
  const dur = opts.durationSec ?? SVG_LOOK.pop.durationSec;
  const from = opts.from ?? SVG_LOOK.pop.from;
  const over = opts.overshoot ?? SVG_LOOK.pop.overshoot;
  if (sec < startSec) return 0;
  const tau = (sec - startSec) / dur;
  if (tau >= 1) return 1;
  const gain = 1 - from;
  if (over <= 0 || gain <= 0) return from + gain * easeOutCubic(tau);
  const ratio = Math.min(0.95, over / gain); // s-এর শিখর = ১ + ratio
  const lnr = Math.log(ratio);
  const zeta = -lnr / Math.sqrt(Math.PI * Math.PI + lnr * lnr);
  const root = Math.sqrt(1 - zeta * zeta);
  const wd = Math.PI / SVG_LOOK.pop.peakAt; // τ-সময়ে অবমন্দিত কোণীয় গতি; শিখর τ = peakAt
  const wn = wd / root;
  const s = 1 - Math.exp(-zeta * wn * tau) * (Math.cos(wd * tau) + (zeta / root) * Math.sin(wd * tau));
  const blend = smoothstep(0.85, 1, tau);
  return from + gain * lerp(s, 1, blend);
}

/** পপ-ইনের সাথে ফেড-ইন: `startSec` থেকে `fadeSec` (ডিফল্ট ০.১২) সে.-এ রৈখিক ০ → ১ */
export function popOpacity(sec: number, startSec: number, fadeSec: number = SVG_LOOK.pop.fadeInSec): number {
  return rangeProgress(sec, startSec, startSec + fadeSec);
}

/** নরম স্পন্দন ০..১: `sec = 0`-তে ০, `periodSec/২`-এ ১ (`phase` = পিরিয়ডের ভগ্নাংশ)। `periodSec ≤ 0` → ০ */
export function pulse(sec: number, periodSec: number, phase: number = 0): number {
  if (!(periodSec > 0)) return 0;
  return 0.5 - 0.5 * Math.cos(TAU * (sec / periodSec + phase));
}

/** সাইন-ঢেউ −১..১ (`sec = 0`-তে ০) — ভাসা/দোলার জন্য */
export function wave(sec: number, periodSec: number, phase: number = 0): number {
  if (!(periodSec > 0)) return 0;
  return Math.sin(TAU * (sec / periodSec + phase));
}

// ---------------------------------------------------------------- আইডি-সাহায্য
/** `url(#…)` ও `id`-এর জন্য নিরাপদ, সংঘর্ষহীন আইডি: `svgId('minbar', 'sky')` → `minbar-sky` */
export function svgId(prefix: string, name: string): string {
  return `${prefix}-${name}`.replace(/[^A-Za-z0-9_-]/g, '_');
}

// ---------------------------------------------------------------- দৃশ্যের সাধারণ প্রপস
/**
 * প্রতিটি দৃশ্য-কম্পোনেন্ট (svg4–svg13) এই প্রপস নেবে — `useCurrentFrame()` সরাসরি নয় (বিশুদ্ধ ফাংশন-রূপে টেস্টযোগ্য)।
 *  • `localSec` = দৃশ্যের জানালা-শুরু থেকে সেকেন্ড (ক্রসফেডে ঢোকার সময় ঋণাত্মক ≥ −০.২৫ — `localClamp`)
 *  • `sec` = গ্লোবাল অডিও-সেকেন্ড (`audioSecAt`); শব্দ-সময়ে মেলানো অ্যানিমেশনের জন্য (`WORDS`-এর `startSec`)
 *  • `idPrefix` = দৃশ্যের নিজস্ব `id`-উপসর্গ (`SceneFrame` ও ভেতরের `Glow` সংঘর্ষ এড়াতে) — ডিফল্ট দৃশ্য-আইডি
 */
export type SceneProps = {
  localSec: number;
  sec: number;
  width: number;
  height: number;
  idPrefix?: string;
};

// ---------------------------------------------------------------- ব্যান্ড-মাস্কের স্টপ (বিশুদ্ধ, টেস্টযোগ্য)
export type MaskStop = {offset: number; gray: number};

/**
 * ক্যাপশন-ব্যান্ডে ম্লান করার মাস্ক-গ্রেডিয়েন্টের স্টপ (লিনিয়ার, উপর → নিচ, `userSpaceOnUse` y: ০ → height):
 * পূর্ণ (২৫৫) → ব্যান্ডের `featherPx` ওপরে থেকে নামা → ব্যান্ডের ভেতরে `bandOpacity × ২৫৫` (ধ্রুব) → ব্যান্ডের নিচে `featherPx`-এ আবার ২৫৫।
 * (ব্যান্ডের ভেতরটাই পুরো ম্লান; ফেদার ব্যান্ডের বাইরে — তাই শিল্প-অঞ্চলের বাকি অংশ পূর্ণ উজ্জ্বল থাকে।)
 * অফসেট অ-হ্রাসমান ও [০,১]-এ ক্ল্যাম্প করা।
 */
export function bandMaskStops(width: number, height: number, bandOpacity: number, featherPx: number = SVG_LOOK.featherPx): MaskStop[] {
  const band = captionBand(width, height);
  const f = Math.max(0, featherPx) * getUnit(width, height);
  const g = Math.round(255 * clamp01(bandOpacity));
  const off = (y: number) => clamp01(y / height);
  const raw: MaskStop[] = [
    {offset: 0, gray: 255},
    {offset: off(band.top - f), gray: 255},
    {offset: off(band.top), gray: g},
    {offset: off(band.bottom), gray: g},
    {offset: off(band.bottom + f), gray: 255},
    {offset: 1, gray: 255},
  ];
  let prev = 0;
  return raw.map((s) => {
    const offset = Math.max(prev, s.offset);
    prev = offset;
    return {offset, gray: s.gray};
  });
}

function grayHex(v: number): string {
  const h = clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0');
  return `#${h}${h}${h}`;
}

// ---------------------------------------------------------------- SceneFrame
export type SceneFrameProps = {
  width: number;
  height: number;
  /** দৃশ্যের সামগ্রিক অপাসিটি (ক্রসফেড/ফেড-ইন-আউট) — ≤ ০ হলে কিছুই আঁকে না */
  opacity?: number;
  /** ক্যাপশন-ব্যান্ডে অপাসিটি — ডিফল্ট `SVG_LOOK.captionBandOpacity`; `≥ ১` হলে মাস্ক বাদ */
  bandOpacity?: number;
  /** ফেদার (ডিজাইন px) — ডিফল্ট `SVG_LOOK.featherPx` */
  featherPx?: number;
  /** `<defs>`-এর আইডি-উপসর্গ — একসাথে দৃশ্যমান দৃশ্যে আলাদা হতে হবে (SvgLayer দৃশ্য-আইডি দেবে) */
  idPrefix?: string;
  /** QA: অঞ্চল-গাইড আঁকা (শুধু স্টিলে) */
  guides?: boolean;
  children?: React.ReactNode;
};

/**
 * দৃশ্যের পূর্ণ-পর্দা `<svg>` র‍্যাপার: `viewBox` = ফ্রেমের মাপ, `opacity` প্রপ, এবং **SVG `<mask>`** যা ক্যাপশন-ব্যান্ডে ছবি ম্লান করে
 * (লিনিয়ার গ্রেডিয়েন্ট — `bandMaskStops`) যাতে ক্যাপশন (D12-র কনট্রাস্ট ≥ ৪.৫) পড়া যায়। ভেতরের কনটেন্ট `children`।
 * কোনো ফিল্টার/CSS-অ্যানিমেশন নেই। `pointer-events: none`।
 */
export const SceneFrame: React.FC<SceneFrameProps> = ({
  width,
  height,
  opacity = 1,
  bandOpacity = SVG_LOOK.captionBandOpacity,
  featherPx = SVG_LOOK.featherPx,
  idPrefix = 'sf',
  guides = false,
  children,
}) => {
  const useMask = bandOpacity < 1;
  const stops = useMemo(() => bandMaskStops(width, height, bandOpacity, featherPx), [width, height, bandOpacity, featherPx]);
  if (!(opacity > 0)) return null; // হুকের পরে — হুক-ক্রম বদলায় না
  const gradId = svgId(idPrefix, 'band-grad');
  const maskId = svgId(idPrefix, 'band-mask');
  return (
    <svg
      data-part="scene-frame"
      data-scene={idPrefix}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{position: 'absolute', left: 0, top: 0, width, height, display: 'block', overflow: 'hidden', opacity, pointerEvents: 'none'}}
    >
      {useMask && (
        <defs>
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={0} y2={height}>
            {stops.map((s, i) => (
              <stop key={i} offset={s.offset} stopColor={grayHex(s.gray)} />
            ))}
          </linearGradient>
          <mask id={maskId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x={0} y={0} width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} fill={`url(#${gradId})`} />
          </mask>
        </defs>
      )}
      <g data-part="scene-content" mask={useMask ? `url(#${maskId})` : undefined}>
        {children}
      </g>
      {guides && <SvgGuides width={width} height={height} />}
    </svg>
  );
};

// ---------------------------------------------------------------- Glow (radialGradient — ফিল্টার নয়)
export type GlowProps = {
  /** গ্রেডিয়েন্টের আইডি — দৃশ্যে অনন্য (`svgId(idPrefix, 'moon-glow')`) */
  id: string;
  cx: number;
  cy: number;
  /** ব্যাসার্ধ (px; অনুভূমিক) */
  r: number;
  /** উল্লম্ব/অনুভূমিক অনুপাত (ডিফল্ট ১ = গোল) */
  ratio?: number;
  color?: string;
  /** কেন্দ্রের অ্যালফা — ডিফল্ট `SVG_LOOK.glow.normal` */
  intensity?: number;
  /** সামগ্রিক অপাসিটি গুণক (ফেড/স্পন্দনের জন্য) */
  opacity?: number;
};

/** নরম আভা: কেন্দ্রে `intensity` → ০.৪-এ ~৪৫% → প্রান্তে ০ (তিন-স্টপ `radialGradient`); `intensity`/`opacity` ≤ ০ হলে `null` */
export const Glow: React.FC<GlowProps> = ({id, cx, cy, r, ratio = 1, color = COLORS.gold, intensity = SVG_LOOK.glow.normal, opacity = 1}) => {
  const a = clamp01(intensity);
  if (!(a > 0) || !(opacity > 0) || !(r > 0)) return null;
  return (
    <g data-part="glow" opacity={clamp01(opacity)}>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={color} stopOpacity={a} />
          <stop offset="0.4" stopColor={color} stopOpacity={a * 0.45} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={r} ry={r * ratio} fill={`url(#${id})`} />
    </g>
  );
};

// ---------------------------------------------------------------- Sparkles (সিড-ভিত্তিক)
export type Sparkle = {x: number; y: number; size: number; period: number; phase: number};

export type SparkleField = {
  seed: number;
  count: number;
  zone: Pick<Zone, 'left' | 'top' | 'width' | 'height'>;
  sizeMin?: number;
  sizeMax?: number;
  periodMin?: number;
  periodMax?: number;
};

/** একই সিড → সবসময় একই বিন্যাস (ফ্রেম/চাঙ্ক-নিরপেক্ষ); `mulberry32` */
export function makeSparkles(f: SparkleField): Sparkle[] {
  const rnd = mulberry32(f.seed);
  const sMin = f.sizeMin ?? SVG_LOOK.sparkle.sizeMin;
  const sMax = f.sizeMax ?? SVG_LOOK.sparkle.sizeMax;
  const pMin = f.periodMin ?? SVG_LOOK.sparkle.periodMin;
  const pMax = f.periodMax ?? SVG_LOOK.sparkle.periodMax;
  const out: Sparkle[] = [];
  const n = Math.max(0, Math.floor(f.count));
  for (let i = 0; i < n; i++) {
    out.push({
      x: f.zone.left + rnd() * f.zone.width,
      y: f.zone.top + rnd() * f.zone.height,
      size: lerp(sMin, sMax, rnd()),
      period: lerp(pMin, pMax, rnd()),
      phase: rnd(),
    });
  }
  return out;
}

/** একটি কণার উজ্জ্বলতা ০..১ — `pulse`-এর ঘাত (`sharpness`) বাড়িয়ে ছোট ঝলক; `sec` যেকোনো মান */
export function sparkleAlpha(s: Sparkle, sec: number, sharpness: number = SVG_LOOK.sparkle.sharpness): number {
  return Math.pow(pulse(sec, s.period, s.phase), sharpness);
}

/** ৪-কোনা তারার পাথ (কেন্দ্র ০,০; বাহু `s`) — বাঁকা, ফাঁপা পাশ */
export function starPath(s: number): string {
  return `M0 ${-s}Q0 0 ${s} 0Q0 0 0 ${s}Q0 0 ${-s} 0Q0 0 0 ${-s}Z`;
}

export type SparklesProps = SparkleField & {
  /** গ্লোবাল/স্থানীয় সেকেন্ড (যেকোনো একটি ধারাবাহিক ঘড়ি) */
  sec: number;
  color?: string;
  /** সামগ্রিক অপাসিটি গুণক */
  opacity?: number;
  /** ওপরে ভেসে ওঠার গতি (px/সে.; ০ = স্থির) — অঞ্চলের ভেতরে মোড়ানো */
  riseSpeed?: number;
};

/** সিড-ভিত্তিক মিটমিট ৪-কোনা কণা-ক্ষেত্র; `count = ০` বা `opacity ≤ ০` হলে `null` */
export const Sparkles: React.FC<SparklesProps> = ({sec, color = COLORS.goldSoft, opacity = 1, riseSpeed = 0, ...field}) => {
  const {seed, count, zone, sizeMin, sizeMax, periodMin, periodMax} = field;
  const list = useMemo(
    () => makeSparkles({seed, count, zone, sizeMin, sizeMax, periodMin, periodMax}),
    [seed, count, zone.left, zone.top, zone.width, zone.height, sizeMin, sizeMax, periodMin, periodMax],
  );
  if (list.length === 0 || !(opacity > 0)) return null;
  const H = zone.height > 0 ? zone.height : 1;
  return (
    <g data-part="sparkles" fill={color} opacity={clamp01(opacity)}>
      {list.map((s, i) => {
        const a = sparkleAlpha(s, sec);
        if (a < 0.02) return null;
        let y = s.y;
        if (riseSpeed !== 0) {
          const rel = (((s.y - zone.top - riseSpeed * sec) % H) + H) % H;
          y = zone.top + rel;
        }
        const k = 0.55 + 0.45 * a;
        return (
          <path
            key={i}
            d={starPath(s.size)}
            transform={`translate(${s.x.toFixed(2)} ${y.toFixed(2)}) scale(${k.toFixed(3)})`}
            opacity={a}
          />
        );
      })}
    </g>
  );
};

// ---------------------------------------------------------------- SvgGuides (শুধু QA-স্টিল)
/**
 * অঞ্চল-রেখা (শিল্প-অঞ্চল, আকাশ, ক্যাপশন-ব্যান্ড, পপ-আপ, ডায়াগ্রাম-স্ট্রিপ, হেডারের নিচ ও প্রগ্রেস বারের ওপর) — svg16/svg18-এর স্টিলে মাপ মেলাতে।
 * **ভিডিওতে ব্যবহার নয়** (`SceneFrame`-এর `guides` প্রপ ডিফল্ট `false`)।
 */
export const SvgGuides: React.FC<{width: number; height: number}> = ({width, height}) => {
  const z = zonesOf(width, height);
  const e = chromeEdges(width, height);
  const G = SVG_LOOK.guides;
  const sw = Math.max(2, 3 * getUnit(width, height));
  const box = (zn: Zone, c: string, k: string) => (
    <rect key={k} x={zn.left + sw / 2} y={zn.top} width={zn.width - sw} height={zn.height} fill="none" stroke={c} strokeWidth={sw} strokeDasharray={`${sw * 4} ${sw * 2}`} />
  );
  const hline = (y: number, c: string, k: string) => <line key={k} x1={0} x2={width} y1={y} y2={y} stroke={c} strokeWidth={sw} />;
  return (
    <g data-part="svg-guides" opacity={0.9}>
      {box(z.art, G.art, 'art')}
      {box(z.band, G.band, 'band')}
      {box(z.popup, G.popup, 'popup')}
      {box(z.ground, G.strip, 'ground')}
      {hline(e.headerBottom, G.header, 'hb')}
      {hline(e.progressTop, G.header, 'pt')}
    </g>
  );
};
