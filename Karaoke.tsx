// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — কালারফুল অ্যানিমেটেড বাংলা ক্যাপশন (S5.4, D11)
//
// কী করে:
//   • বর্তমান পেজের শব্দগুলো মাঝ-সারিবদ্ধ (লাইন র‍্যাপ) — বাংলা গুগল ফন্ট Anek Bangla (`FONTS.caption`)।
//   • প্রতিটি শব্দের নিজস্ব রঙ: `captionColor(word.index)` — পেজ বদলালেও শব্দের রঙ একই থাকে।
//   • শব্দের অবস্থা (`wordState`):
//       আসছে       → সাদা ~৫৫%
//       বলা হচ্ছে   → নিজের রঙে উজ্জ্বল + স্প্রিং পপ (১.০ → ১.১৮ → ১.০৮) + রঙিন পিল + আন্ডারলাইন-wipe (শব্দের start→end) + গ্লো
//       বলা হয়েছে  → নিজের রঙ ধরে রাখে; পপ/পিল/আন্ডারলাইন মসৃণভাবে মিলিয়ে যায়, গ্লো কমে (ক্যাপশন যত এগোয় তত রঙিন)
//   • এন্ট্রান্স: নতুন পেজে শব্দ একে একে নিচ থেকে উঠে + ফেড-ইন (stagger/duration `CAPTION.wordIn`);
//     পেজ বদলে ক্রসফেড `CAPTION.pageFade` ফ্রেম (`visiblePages`)।
//   • সেকশন-স্টাইল: narration সামান্য ছোট, translation/arabic(B) মূল মাপ, lesson (D) → সোনালি-বর্ডার কার্ড + "শিক্ষা" লেবেল;
//     কার্ড সেকশন D জুড়ে স্থির থাকে (`sectionSpans`), শুধু ভেতরের শব্দ পেজ বদলায়।
//   • ফাঁকে (সাইলেন্সে) কোনো শব্দ সক্রিয় নয়; আগের পেজ ধরা থাকে, শব্দগুলো "বলা হয়েছে" অবস্থায়।
//   • শেষ পেজের পর (অডিও শেষ ৩৮.৩২ সে. থেকে) শেষ পেজ ধরে রাখা হয় (`holdLastPage`, ডিফল্ট true) — আউটরো (S5.6/S6.1)
//     `opacity` প্রপ দিয়ে ফেড-আউট করবে; নইলে অডিও শেষের ফ্রেমেই ক্যাপশন হঠাৎ উধাও হতো।
//
// পড়ার যোগ্যতা: গাঢ় `ink` আউটলাইন (`paint-order: stroke fill`) + নরম ছায়া; সব রঙ bgMid-এর ওপর কনট্রাস্ট ≥ ৪.৮৩ (theme.ts)।
// বাংলা: `letter-spacing: 0`, `font-kerning: normal`, শব্দ `white-space: nowrap` (শব্দের ভেতর কখনো লাইন-ভাঙা নয়)।
// ওজন: সব শব্দ একই ওজন (৭০০) — সক্রিয় শব্দে ৮০০ দিলে অক্ষরের প্রস্থ বদলে লাইন নড়ে যেত; জোর দেওয়া হয় পপ/পিল/গ্লো দিয়ে।
//
// নিয়ম: শুধু `useCurrentFrame()`/`spring`/`interpolate`-ভিত্তিক গণিত — CSS transition/animation, Math.random, Date নেই।
// `<Sequence>` অফসেট: `timeOffsetSec` (ডিফল্ট ০) — `<Sequence from={N}>`-এর ভেতরে রাখলে `N/fps` দিন (ArabicBlock/S5.7-এর মতোই)।

import React, {useMemo} from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {LESSON_LABEL, SECTIONS, SPEECH_END_SEC, WORDS} from './hadis-data';
import type {HadisWord} from './hadis-data';
import {CAPTION, COLORS, FONTS, GRADIENTS, LINE_HEIGHT, RADIUS, captionColor, getLayout, getUnit, withAlpha} from './theme';
import {audioSecAt, buildPages, sectionSpans, visiblePages, wordProgress, wordState} from './timing';
import type {Page, VisiblePage} from './timing';

// ---------------------------------------------------------------- টিউনিং-মান (এই ফাইলের নিজস্ব; অ্যানিমেশনের মূল মান theme.ts-এর CAPTION-এ)
export const KARAOKE_LOOK = {
  /** সেকশন-ভেদে ফন্ট-মাপের গুণক (theme.ts-এর karaoke.size-এর সাপেক্ষে) */
  sizeFactor: {narration: 0.88, translation: 1, arabic: 1, lesson: 0.92} as const,
  /** শব্দের মাঝের ফাঁক (em) — সক্রিয় শব্দ ১.১৮× বড় হয় ও পিল দুই পাশে `pill.padXEm` বেরোয়, তাই সাধারণ স্পেসের চেয়ে বেশি (স্টিলে পাশের শব্দে ঠেকছিল) */
  columnGapEm: 0.55,
  /** পিলের ওপর/নিচের গুটানো অংশ (লাইন-বক্সের ভেতরে, em) — পিল অক্ষরের উচ্চতার কাছাকাছি থাকে */
  pillInsetYEm: 0.1,
  /** আন্ডারলাইনের নিচের দূরত্ব (লাইন-বক্সের নিচ থেকে, em) */
  underlineBottomEm: 0.1,
  /** শব্দ "আসছে" → নিজের রঙে বদলাতে সময় (সেকেন্ড, শব্দ শুরুর পর) */
  colorInSec: 0.12,
  /** সক্রিয়তার ধাপে ধাপে ঢোকা (পিল/আন্ডারলাইন/গ্লো) ও বেরোনোর সময় (সেকেন্ড) */
  activeRampInSec: 0.08,
  activeRampOutSec: 0.25,
  /** পপের পর আবার ১.০-তে নামতে সময় (সেকেন্ড) */
  scaleOutSec: 0.2,
  /** পপের প্রথম ধাপ (১.০ → popScale) ফ্রেমে */
  popRiseFrames: 3,
  /** "বলা হয়েছে" শব্দের গ্লো-র অবশিষ্ট অংশ (০–১) */
  spokenGlow: 0.35,
  /** লেসন-কার্ড */
  card: {fadeInSec: 0.3, riseY: 24, scaleFrom: 0.96, borderPx: 3, innerInsetPx: 12},
  /** সাধারণ ছায়া (পড়ার সুবিধার জন্য) */
  shadow: 'rgba(0,0,0,0.5)',
} as const;

// ---------------------------------------------------------------- ছোট হেলপার
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
const smooth = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/** "আসছে" রঙ (সাদা, `CAPTION.upcoming.opacity`) থেকে শব্দের রঙে রৈখিক মিশ্রণ, m = ০..১ */
export function mixUpcomingToWord(wordHex: string, m: number): string {
  const [r, g, b] = hexToRgb(wordHex);
  const [ur, ug, ub] = hexToRgb(CAPTION.upcoming.color);
  const t = clamp01(m);
  const a = CAPTION.upcoming.opacity + (1 - CAPTION.upcoming.opacity) * t;
  const mix = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgba(${mix(ur, r)},${mix(ug, g)},${mix(ub, b)},${a.toFixed(3)})`;
}

/**
 * পপ-স্কেল (শব্দ বলা শুরুর `f` ফ্রেম পরে): ১.০ → `popScale` (দ্রুত) → স্প্রিং-এ `settleScale`-এ থিতু।
 * স্প্রিং কম-ড্যাম্পড, তাই settle-এর একটু নিচে নেমে আবার ওঠে (জীবন্ত অনুভূতি)।
 */
export function popScaleAt(f: number, fps: number): number {
  const {popScale, settleScale, damping, stiffness, mass} = CAPTION.pop;
  if (f <= 0) return 1;
  const R = KARAOKE_LOOK.popRiseFrames;
  if (f < R) return 1 + (popScale - 1) * (1 - Math.pow(1 - f / R, 2));
  const s = spring({frame: f - R, fps, config: {damping, stiffness, mass}});
  return popScale + (settleScale - popScale) * s;
}

// ---------------------------------------------------------------- শব্দের দৃশ্যগত অবস্থা (বিশুদ্ধ ফাংশন — টেস্টযোগ্য)
export type WordVisual = {
  state: 'upcoming' | 'active' | 'spoken';
  /** টেক্সটের রঙ (rgba) */
  color: string;
  /** শব্দের নিজের রঙ (hex) — পিল/গ্লো/আন্ডারলাইনের ভিত্তি */
  baseColor: string;
  /** আউটলাইনের অপাসিটি ০..১ — "আসছে" শব্দে হালকা (৫৫% সাদা ভরাটের নিচে গাঢ় আউটলাইন ঘোলাটে দেখাত) */
  strokeAlpha: number;
  /** এন্ট্রান্স অপাসিটি ০..১ */
  opacity: number;
  /** এন্ট্রান্স রাইজ (ডিজাইন px; নিচ থেকে ওপরে ওঠে, ০-তে থামে) */
  rise: number;
  /** পপ-স্কেল */
  scale: number;
  /** রঙিন পিলের অপাসিটি ০..১ */
  pill: number;
  /** আন্ডারলাইনের চওড়া ০..১ (wipe) */
  underline: number;
  /** পিল/আন্ডারলাইনের অপাসিটি (সক্রিয়তার এনভেলপ) ০..১ */
  activeEnv: number;
  /** গ্লো-এর তীব্রতা ০..১ */
  glow: number;
};

/**
 * @param w        শব্দ (`index` দিয়ে রঙ)
 * @param pos      পেজের ভেতরে শব্দের ক্রম (০-ভিত্তিক) — stagger-এর জন্য
 * @param page     পেজ (`startSec` থেকে এন্ট্রান্সের সীমা)
 * @param ageSec   পেজ শুরুর পর কত সেকেন্ড (`visiblePages`-এর `ageSec`)
 * @param currentSec অডিওর শুরু থেকে সেকেন্ড
 */
export function computeWordVisual(w: HadisWord, pos: number, page: Page, ageSec: number, currentSec: number, fps: number): WordVisual {
  const state = wordState(w, currentSec);
  const baseColor = captionColor(w.index);
  const {stagger, duration, riseY} = CAPTION.wordIn;

  // --- এন্ট্রান্স: প্রতি শব্দ stagger-এ ঢোকে, তবে বলার আগেই ঢোকা শেষ হওয়ার চেষ্টা (শব্দ-শুরুর ৩ ফ্রেম আগে)
  const leadFrames = (w.start - page.startSec) * fps;
  const delay = Math.min(pos * stagger, Math.max(0, leadFrames - 3));
  let p = clamp01((ageSec * fps - delay) / duration);
  // যে শব্দ বলা শুরু হয়ে গেছে তা ০.১ সে.-র মধ্যে পুরো দৃশ্যমান
  if (state !== 'upcoming') p = Math.max(p, clamp01((currentSec - w.start) / 0.1));
  const e = easeOutCubic(p);

  // --- রঙ
  const m = state === 'upcoming' ? 0 : clamp01((currentSec - w.start) / KARAOKE_LOOK.colorInSec);
  const color = mixUpcomingToWord(baseColor, m);

  // --- সক্রিয়তার এনভেলপ (পিল/আন্ডারলাইন/গ্লো/স্কেল)
  let env = 0;
  if (state === 'active') env = clamp01((currentSec - w.start) / KARAOKE_LOOK.activeRampInSec);
  else if (state === 'spoken') env = 1 - smooth((currentSec - w.end) / KARAOKE_LOOK.activeRampOutSec);

  // --- পপ-স্কেল
  let scale = 1;
  if (state === 'active') {
    scale = popScaleAt((currentSec - w.start) * fps, fps);
  } else if (state === 'spoken') {
    const atEnd = popScaleAt((w.end - w.start) * fps, fps);
    scale = 1 + (atEnd - 1) * (1 - smooth((currentSec - w.end) / KARAOKE_LOOK.scaleOutSec));
  }

  // --- আন্ডারলাইন wipe: শব্দের start→end-এ ০→১; বলা শেষে ১ (অপাসিটি এনভেলপে মিলায়)
  const underline = state === 'upcoming' ? 0 : wordProgress(w, currentSec);

  // --- গ্লো
  const glow = state === 'upcoming' ? 0 : KARAOKE_LOOK.spokenGlow + (1 - KARAOKE_LOOK.spokenGlow) * env;

  return {
    state,
    color,
    baseColor,
    strokeAlpha: 0.35 + 0.65 * m,
    opacity: e,
    rise: (1 - e) * riseY,
    scale,
    pill: env,
    underline,
    activeEnv: env,
    glow,
  };
}

// ---------------------------------------------------------------- পেজ-তালিকা (মেমো)
const PAGES_CACHE = new Map<number, Page[]>();

/** `maxWords`-ভেদে পেজ-তালিকা (১৬:৯ = ৯, ৯:১৬ = ৬; theme.ts) — S5.7/S6.x টেস্টেও কাজে লাগে */
export function getKaraokePages(maxWords: number): Page[] {
  let pages = PAGES_CACHE.get(maxWords);
  if (!pages) {
    pages = buildPages(WORDS, {maxWords, sections: SECTIONS, audioEndSec: SPEECH_END_SEC});
    PAGES_CACHE.set(maxWords, pages);
  }
  return pages;
}

export type KaraokeProps = {
  /** পুরো ক্যাপশন-স্তরের অপাসিটি (০–১); আউটরোতে ফেড-আউটের জন্য */
  opacity?: number;
  /** `<Sequence>`-এর ভেতরে রাখলে সেই Sequence-এর শুরুর সেকেন্ড (অডিওর শুরু থেকে); ডিফল্ট ০ */
  timeOffsetSec?: number;
  /** শেষ পেজ শেষ হওয়ার পরও সেটি ধরে রাখা (ডিফল্ট true) — আউটরোতে `opacity` দিয়ে ফেড-আউট করার জন্য */
  holdLastPage?: boolean;
};

// ---------------------------------------------------------------- UI অংশ
type PageViewProps = {
  vp: VisiblePage;
  currentSec: number;
  fps: number;
  u: number;
  fontPx: number;
  /** true হলে পেজ লেসন-কার্ডের টেক্সট-এরিয়ায় `absolute inset 0` হয়ে বসে; false হলে স্ক্রিনে `centerY`-তে */
  inCard: boolean;
  boxWidthPx: number;
  centerYPx: number;
};

const PageView: React.FC<PageViewProps> = ({vp, currentSec, fps, u, fontPx, inCard, boxWidthPx, centerYPx}) => {
  const {page} = vp;
  const L = KARAOKE_LOOK;

  const containerStyle: React.CSSProperties = inCard
    ? {position: 'absolute', inset: 0, display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center'}
    : {
        position: 'absolute',
        left: '50%',
        top: centerYPx,
        width: boxWidthPx,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
      };

  return (
    <div
      data-part="caption-page"
      data-page={page.index}
      data-leaving={vp.leaving ? '1' : '0'}
      style={{
        ...containerStyle,
        columnGap: `${L.columnGapEm}em`,
        rowGap: 0,
        fontSize: fontPx,
        fontFamily: FONTS.caption,
        fontWeight: CAPTION.weights.normal,
        lineHeight: LINE_HEIGHT.bengali,
        letterSpacing: 0,
        fontKerning: 'normal',
        textAlign: 'center',
        opacity: vp.opacity,
      }}
    >
      {page.words.map((w, pos) => {
        const v = computeWordVisual(w, pos, page, vp.ageSec, currentSec, fps);
        const glowShadow =
          v.glow > 0.001
            ? `0 0 ${CAPTION.glow.blurEm}em ${withAlpha(v.baseColor, CAPTION.glow.alpha * v.glow)}, `
            : '';
        return (
          <span
            key={w.index}
            data-word={w.index}
            data-state={v.state}
            style={{
              position: 'relative',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              opacity: v.opacity,
              transform: `translateY(${(v.rise * u).toFixed(2)}px) scale(${v.scale.toFixed(4)})`,
              transformOrigin: '50% 60%',
            }}
          >
            {/* রঙিন পিল (সক্রিয় শব্দের পেছনে) */}
            {v.pill > 0.003 && (
              <span
                data-part="pill"
                style={{
                  position: 'absolute',
                  left: `${-CAPTION.pill.padXEm}em`,
                  right: `${-CAPTION.pill.padXEm}em`,
                  top: `${L.pillInsetYEm}em`,
                  bottom: `${L.pillInsetYEm}em`,
                  borderRadius: `${CAPTION.pill.radiusEm}em`,
                  background: withAlpha(v.baseColor, CAPTION.pill.alpha),
                  border: `0.03em solid ${withAlpha(v.baseColor, 0.5 * v.pill)}`,
                  boxShadow: `0 0 0.5em ${withAlpha(v.baseColor, 0.3 * v.pill)}`,
                  opacity: v.pill,
                }}
              />
            )}
            {/* রঙিন আন্ডারলাইন — শব্দ বলার সময়ে বাঁ থেকে ডানে ঢোকে */}
            {v.underline > 0.002 && v.activeEnv > 0.003 && (
              <span
                data-part="underline"
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: `${L.underlineBottomEm}em`,
                  height: `${CAPTION.underline.heightEm}em`,
                  width: `${(v.underline * 100).toFixed(2)}%`,
                  borderRadius: `${CAPTION.underline.heightEm}em`,
                  background: v.baseColor,
                  boxShadow: `0 0 0.35em ${withAlpha(v.baseColor, 0.8 * v.activeEnv)}`,
                  opacity: v.activeEnv,
                }}
              />
            )}
            <span
              data-part="text"
              style={{
                position: 'relative',
                color: v.color,
                WebkitTextStroke: `${CAPTION.stroke.em}em ${withAlpha(CAPTION.stroke.color, v.strokeAlpha)}`,
                paintOrder: 'stroke fill',
                textShadow: `${glowShadow}0 0.05em 0.12em ${L.shadow}`,
              }}
            >
              {w.word}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** সোনালি হীরা (লেবেলের পাশে) */
const Diamond: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 10 10" style={{display: 'block'}} aria-hidden>
    <path d="M5 0 L10 5 L5 10 L0 5 Z" fill={color} />
  </svg>
);

type LessonCardProps = {
  currentSec: number;
  spanStartSec: number;
  u: number;
  widthPx: number;
  centerYPx: number;
  padPx: number;
  textAreaPx: number;
  labelPx: number;
  children: React.ReactNode;
};

const LessonCard: React.FC<LessonCardProps> = ({currentSec, spanStartSec, u, widthPx, centerYPx, padPx, textAreaPx, labelPx, children}) => {
  const C = KARAOKE_LOOK.card;
  const p = easeOutCubic((currentSec - spanStartSec) / C.fadeInSec);
  if (p <= 0.001) return null;
  const scale = C.scaleFrom + (1 - C.scaleFrom) * p;
  const height = textAreaPx + padPx * 2;
  return (
    <div
      data-part="lesson-card"
      style={{
        position: 'absolute',
        left: '50%',
        top: centerYPx,
        width: widthPx,
        height,
        transform: `translate(-50%, -50%) translateY(${((1 - p) * C.riseY * u).toFixed(2)}px) scale(${scale.toFixed(4)})`,
        opacity: p,
        borderRadius: RADIUS.card * u,
        background: GRADIENTS.lessonCard,
        border: `${C.borderPx * u}px solid ${COLORS.gold}`,
        boxShadow: `0 ${12 * u}px ${44 * u}px rgba(0,0,0,0.42), 0 0 ${46 * u}px ${COLORS.glowGold}`,
        boxSizing: 'border-box',
      }}
    >
      {/* ভেতরের সরু সোনালি রেখা */}
      <div
        style={{
          position: 'absolute',
          inset: C.innerInsetPx * u,
          borderRadius: (RADIUS.card - 10) * u,
          border: `${1.5 * u}px solid ${COLORS.line}`,
          pointerEvents: 'none',
        }}
      />
      {/* "শিক্ষা" লেবেল — কার্ডের উপরের বর্ডারে বসা */}
      <div
        data-part="lesson-label"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          gap: labelPx * 0.4,
          background: GRADIENTS.gold,
          color: COLORS.ink,
          fontFamily: FONTS.caption,
          fontWeight: 800,
          fontSize: labelPx,
          lineHeight: 1.3,
          letterSpacing: 0,
          padding: `${labelPx * 0.2}px ${labelPx * 0.9}px`,
          borderRadius: RADIUS.pill,
          boxShadow: `0 ${4 * u}px ${14 * u}px ${COLORS.shadow}`,
          whiteSpace: 'nowrap',
        }}
      >
        <Diamond size={labelPx * 0.32} color={COLORS.ink} />
        <span>{LESSON_LABEL}</span>
        <Diamond size={labelPx * 0.32} color={COLORS.ink} />
      </div>
      {/* টেক্সট-এরিয়া (স্থির উচ্চতা; পেজ বদলালেও কার্ড নড়ে না) */}
      <div style={{position: 'absolute', left: padPx, right: padPx, top: padPx, height: textAreaPx}}>{children}</div>
    </div>
  );
};

// ---------------------------------------------------------------- মূল কম্পোনেন্ট
export const Karaoke: React.FC<KaraokeProps> = ({opacity = 1, timeOffsetSec = 0, holdLastPage = true}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const lay = getLayout(width, height);
  const k = lay.karaoke;
  const u = getUnit(width, height);

  const pages = useMemo(() => getKaraokePages(k.maxWords), [k.maxWords]);
  const spans = useMemo(() => sectionSpans(pages), [pages]);

  const currentSec = audioSecAt(frame, fps, timeOffsetSec);
  if (opacity <= 0.001 || pages.length === 0) return null;

  // ---- কোন পেজ/পেজগুলো আঁকতে হবে
  let vps = visiblePages(pages, currentSec, CAPTION.pageFade / fps);
  const last = pages[pages.length - 1];
  if (vps.length === 0 && holdLastPage && currentSec >= last.endSec) {
    vps = [{page: last, opacity: 1, ageSec: currentSec - last.startSec, leaving: false}];
  }
  if (vps.length === 0) return null;

  const boxWidthPx = width * k.boxWidthRatio;
  const centerYPx = k.centerY * u;
  const baseSize = k.size * u;
  const fontFor = (kind: Page['sectionKind']) => baseSize * KARAOKE_LOOK.sizeFactor[kind];

  // ---- লেসন-কার্ড (সেকশন D): kind === 'lesson'
  const lessonSection = SECTIONS.find((s) => s.kind === 'lesson');
  const lessonSpan = lessonSection ? spans.find((s) => s.sectionId === lessonSection.id) : undefined;
  const lessonFont = fontFor('lesson');
  const lessonTextArea = k.maxLines * lessonFont * LINE_HEIGHT.bengali;
  const cardPad = lay.lesson.padding * u;
  const cardWidth = boxWidthPx;
  const innerWidth = cardWidth - cardPad * 2;

  const plain = vps.filter((vp) => vp.page.sectionKind !== 'lesson');
  const lesson = vps.filter((vp) => vp.page.sectionKind === 'lesson');
  const showCard = !!lessonSpan && currentSec >= lessonSpan.startSec && lesson.length > 0;

  return (
    <div data-part="karaoke" style={{position: 'absolute', inset: 0, opacity}}>
      {plain.map((vp) => (
        <PageView
          key={`p${vp.page.index}`}
          vp={vp}
          currentSec={currentSec}
          fps={fps}
          u={u}
          fontPx={fontFor(vp.page.sectionKind)}
          inCard={false}
          boxWidthPx={boxWidthPx}
          centerYPx={centerYPx}
        />
      ))}
      {showCard && lessonSpan && (
        <LessonCard
          currentSec={currentSec}
          spanStartSec={lessonSpan.startSec}
          u={u}
          widthPx={cardWidth}
          centerYPx={centerYPx}
          padPx={cardPad}
          textAreaPx={lessonTextArea}
          labelPx={lay.lesson.labelSize * u}
        >
          {lesson.map((vp) => (
            <PageView
              key={`l${vp.page.index}`}
              vp={vp}
              currentSec={currentSec}
              fps={fps}
              u={u}
              fontPx={lessonFont}
              inCard
              boxWidthPx={innerWidth}
              centerYPx={0}
            />
          ))}
        </LessonCard>
      )}
    </div>
  );
};
