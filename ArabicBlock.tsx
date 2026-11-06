// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — আরবি ব্লক: শুধু সেকশন B-তে আংশিক আরবি (S5.3)
//
// সিদ্ধান্ত (S3.1): পূর্ণ আরবি পাঠ বাতিল — অডিওতে যতটুকু উচ্চারিত (\"إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ\") শুধু ততটুকু।
//   • অন্য সময় এই কম্পোনেন্ট **কিছুই আঁকে না** (`null`)।
//   • সময় হাতে লেখা নেই — `getSectionTiming('B')` (hadis-data.ts) থেকে; টাইমিং আবার সংশোধন হলেও এখানে হাত দিতে হবে না।
//   • আরবির ৩ শব্দ ↔ সেকশন B-র ৩ বাংলা-উচ্চারণ শব্দ (ইন্নামাল / আ'মালু / বিন-নিয়্যাত) একই ক্রমে মেলানো
//     (hadis-data.ts-এর validateHadisData() গণনা মিলিয়ে দেখে)। যে শব্দ এখন উচ্চারিত হচ্ছে সেটি উজ্জ্বল সোনালি + গ্লো।
//
// অ্যানিমেশন (সব `useCurrentFrame()`/`spring`/`interpolate` — CSS transition/animation, Math.random, Date নেই):
//   ঢোকা   : সেকশন B শুরুর `leadInSec` আগে থেকে — স্প্রিং স্কেল ০.৮২→১ + ফেড-ইন + পেছনে সোনালি গ্লো-হ্যালো
//   ধরে রাখা: সেকশন B-র শেষ পর্যন্ত; গ্লো ধীরে ওঠানামা করে
//   যাওয়া  : B শেষের `outDelaySec` পরে `outSec` ধরে ধীর ফেড-আউট (+ সামান্য বড় হয়ে মিলিয়ে যাওয়া)
//   ডিভাইডার: লেখার নিচে সোনালি রেখা (SVG) — মাঝখান থেকে দুই পাশে আঁকা হয়, মাঝে ছোট হীরা
//
// মাপ/অবস্থান `theme.ts`-এর `getLayout().arabic` (top, size, boxWidthRatio) থেকে; ১৬:৯ ও ৯:১৬ আলাদা।
//
// Sequence নিয়ে সতর্কতা (S5.7): `<Sequence>`-এর ভেতরে রাখলে `timeOffsetSec`-এ সেই Sequence-এর শুরুর সেকেন্ড দিন
// (যেমন `<Sequence from={30}>` → `timeOffsetSec={1}`), নইলে সময় ভুল হবে। S6.1-এ Sequence-এর বাইরে (ফ্রেম ০ থেকে) রাখাই সবচেয়ে সহজ।
//
// `opacity` প্রপ: আউটরোতে পুরো ব্লক একসাথে ফেড-আউট করতে (ডিফল্ট ১)।

import React from 'react';
import {interpolate, interpolateColors, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ARABIC_PARTIAL, WORDS, getSection, getSectionTiming} from './hadis-data';
import {COLORS, FONTS, FONT_WEIGHTS, LINE_HEIGHT, getLayout, getUnit} from './theme';
import {audioSecAt, wordProgress, wordState} from './timing';

const TAU = Math.PI * 2;

/** সময়-টোকেন (সেকেন্ড) — সেকশন B-র সময়ের সাপেক্ষে */
export const ARABIC_TIMING = {
  /** সেকশন B-র প্রথম শব্দের এত আগে ঢুকতে শুরু করে (পাঠক আগে চোখ রাখতে পারে) */
  leadInSec: 0.25,
  /** ফেড-ইনের সময়কাল */
  fadeInSec: 0.5,
  /** সেকশন B শেষের এত পরে ফেড-আউট শুরু */
  outDelaySec: 0.1,
  /** ধীর ফেড-আউটের সময়কাল */
  outSec: 0.8,
} as const;

/** এই ব্লক কখন দেখা যায় (সেকেন্ড; অডিওর শুরু থেকে) — S6.1/S5.7-এ কাজে লাগে */
export function getArabicWindow(): {showStartSec: number; showEndSec: number; sectionStartSec: number; sectionEndSec: number} {
  const {startSec, endSec} = getSectionTiming('B');
  return {
    showStartSec: Math.max(0, startSec - ARABIC_TIMING.leadInSec),
    showEndSec: endSec + ARABIC_TIMING.outDelaySec + ARABIC_TIMING.outSec,
    sectionStartSec: startSec,
    sectionEndSec: endSec,
  };
}

/** টিউনিং-মান */
const LOOK = {
  scaleFrom: 0.82,
  /** ফেড-আউটে সামান্য বড় হয়ে মিলিয়ে যাওয়া */
  scaleOut: 1.05,
  spring: {damping: 13, stiffness: 120, mass: 0.8},
  /** শব্দের মাঝের ফাঁক (em) */
  wordGapEm: 0.22,
  /** সক্রিয় শব্দের সামান্য বড় হওয়া */
  activeScale: 1.06,
  /** আরবি লেখার ওজন (Amiri: ৪০০/৭০০ লোড করা) */
  weight: FONT_WEIGHTS.bold,
  /** হ্যালোর পিরিয়ড (সেকেন্ড) */
  haloPeriod: 3,
  /** ডিভাইডারের চওড়া (লেখার ঘরের ভগ্নাংশ) ও আঁকার সময় */
  dividerWidthRatio: 0.55,
  dividerDrawSec: 0.55,
} as const;

export type ArabicBlockProps = {
  /** পুরো ব্লকের অপাসিটি (০–১); আউটরোতে ফেড-আউটের জন্য */
  opacity?: number;
  /** `<Sequence>`-এর ভেতরে রাখলে সেই Sequence-এর শুরুর সেকেন্ড (অডিওর শুরু থেকে); ডিফল্ট ০ */
  timeOffsetSec?: number;
};

/** আরবি লেখা শব্দে ভাগ (স্পেস দিয়ে) — হারাকাত অক্ষত */
const ARABIC_WORDS: readonly string[] = ARABIC_PARTIAL.trim().split(/\s+/);

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

export const ArabicBlock: React.FC<ArabicBlockProps> = ({opacity = 1, timeOffsetSec = 0}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const lay = getLayout(width, height);
  const a = lay.arabic;
  const u = getUnit(width, height);

  const currentSec = audioSecAt(frame, fps, timeOffsetSec);
  const win = getArabicWindow();

  // ---- দৃশ্যমানতা: জানালার বাইরে কিছুই আঁকা হয় না
  if (currentSec < win.showStartSec || currentSec > win.showEndSec) return null;

  // ---- ঢোকা: ফেড-ইন + স্প্রিং স্কেল
  const fadeIn = interpolate(currentSec, [win.showStartSec, win.showStartSec + ARABIC_TIMING.fadeInSec], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const inFrame = Math.max(0, Math.round((currentSec - win.showStartSec) * fps));
  const springIn = spring({frame: inFrame, fps, config: LOOK.spring});
  const scaleIn = LOOK.scaleFrom + (1 - LOOK.scaleFrom) * springIn;

  // ---- যাওয়া: ধীর ফেড-আউট
  const outStart = win.sectionEndSec + ARABIC_TIMING.outDelaySec;
  const outP = clamp01((currentSec - outStart) / ARABIC_TIMING.outSec);
  const fadeOut = 1 - outP * outP * (3 - 2 * outP); // smoothstep
  const scaleOut = 1 + (LOOK.scaleOut - 1) * outP;

  const env = clamp01(fadeIn) * fadeOut * opacity;
  if (env <= 0.001) return null;
  const scale = scaleIn * scaleOut;

  // ---- গ্লো-হ্যালো (ধীর ওঠানামা, ডিটারমিনিস্টিক)
  const halo = 0.8 + 0.2 * Math.sin(TAU * (currentSec / LOOK.haloPeriod));

  // ---- ডিভাইডার আঁকা: মাঝখান থেকে দুই পাশে
  const dividerP = interpolate(currentSec, [win.showStartSec + 0.2, win.showStartSec + 0.2 + LOOK.dividerDrawSec], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ---- মাপ
  const fontSize = a.size * u;
  const boxWidth = width * a.boxWidthRatio;
  const dividerW = Math.min(boxWidth, width * a.boxWidthRatio) * LOOK.dividerWidthRatio;
  const dividerH = 22 * u;
  const half = dividerW / 2;
  const cx = dividerW / 2;
  const cy = dividerH / 2;
  const dia = 8 * u; // হীরার অর্ধ-ব্যাস
  const reach = (half - dia * 2.2) * dividerP; // রেখার দৈর্ঘ্য (মাঝ থেকে এক পাশে)

  return (
    <div
      data-part="arabic"
      style={{
        position: 'absolute',
        top: a.top * u,
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: env,
        transform: `scale(${scale.toFixed(4)})`,
        transformOrigin: '50% 40%',
      }}
    >
      {/* গ্লো-হ্যালো: লেখার পেছনে নরম সোনালি আভা */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: boxWidth * 0.95,
          height: fontSize * 2.6,
          transform: 'translate(-50%, -58%)',
          background: `radial-gradient(ellipse at center, rgba(224,184,92,${(0.3 * halo).toFixed(3)}) 0%, rgba(224,184,92,${(0.12 * halo).toFixed(3)}) 42%, rgba(224,184,92,0) 72%)`,
          pointerEvents: 'none',
        }}
      />

      {/* আরবি লেখা — RTL; প্রথম আরবি শব্দ ডানে */}
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: 'relative',
          width: boxWidth,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: `${LOOK.wordGapEm}em`,
          direction: 'rtl',
          fontFamily: FONTS.arabic,
          fontWeight: LOOK.weight,
          fontSize,
          lineHeight: LINE_HEIGHT.arabic,
          letterSpacing: 0,
          wordSpacing: 0,
          fontKerning: 'normal',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {ARABIC_WORDS.map((txt, i) => {
          const w = WORDS[getSection('B').first + i];
          // আরবি শব্দ ও বাংলা-উচ্চারণ শব্দ সংখ্যায় না মিললে (hadis-data যাচাই আগেই ধরে) শব্দ-হাইলাইট বাদ
          const st = w ? wordState(w, currentSec) : 'upcoming';
          const p = w ? wordProgress(w, currentSec) : 0;
          // হাইলাইট ০..১: সক্রিয় = ১ (ঢোকা-বেরোনো মসৃণ), বলা শেষ = ০.৩৫ (সামান্য সোনালি রেখে যায়), আসছে = ০
          const active = st === 'active' ? Math.min(1, Math.min(p, 1 - p) * 6 + 0.55) : 0;
          const h = st === 'spoken' ? 0.35 : st === 'active' ? active : 0;
          const color = interpolateColors(h, [0, 1], [COLORS.cream, COLORS.goldSoft]);
          const wScale = 1 + (LOOK.activeScale - 1) * (st === 'active' ? 1 : 0);
          const glowA = 0.25 + 0.55 * h;
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                color,
                transform: `scale(${wScale})`,
                textShadow: `0 0 ${(0.2 + 0.25 * h).toFixed(3)}em rgba(224,184,92,${glowA.toFixed(3)}), 0 ${0.04 * 1}em ${0.1}em ${COLORS.shadow}`,
              }}
            >
              {txt}
            </span>
          );
        })}
      </div>

      {/* সোনালি আলংকারিক ডিভাইডার: SVG রেখা + মাঝে ছোট হীরা */}
      <svg
        width={dividerW}
        height={dividerH}
        viewBox={`0 0 ${dividerW} ${dividerH}`}
        style={{marginTop: -fontSize * 0.1, overflow: 'visible'}}
        aria-hidden
      >
        <defs>
          <linearGradient id="hab-line-r" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={COLORS.gold} stopOpacity="1" />
            <stop offset="1" stopColor={COLORS.gold} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hab-line-l" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor={COLORS.gold} stopOpacity="1" />
            <stop offset="1" stopColor={COLORS.gold} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* ডান ও বাম রেখা — মাঝ থেকে বাইরে, প্রান্তে মিলিয়ে যায় */}
        <rect x={cx + dia * 2.2} y={cy - 1.75 * u} width={Math.max(0, reach)} height={3.5 * u} rx={1.75 * u} fill="url(#hab-line-r)" />
        <rect x={cx - dia * 2.2 - Math.max(0, reach)} y={cy - 1.75 * u} width={Math.max(0, reach)} height={3.5 * u} rx={1.75 * u} fill="url(#hab-line-l)" />
        {/* মাঝের হীরা + দুই পাশে ছোট বিন্দু */}
        <g opacity={clamp01(dividerP * 1.6)}>
          <polygon
            points={`${cx},${cy - dia} ${cx + dia},${cy} ${cx},${cy + dia} ${cx - dia},${cy}`}
            fill={COLORS.gold}
            stroke={COLORS.goldSoft}
            strokeWidth={1.5 * u}
          />
          <circle cx={cx - dia * 1.75} cy={cy} r={2.4 * u} fill={COLORS.goldSoft} />
          <circle cx={cx + dia * 1.75} cy={cy} r={2.4 * u} fill={COLORS.goldSoft} />
        </g>
      </svg>
    </div>
  );
};
