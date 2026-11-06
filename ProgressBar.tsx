// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — নিচের প্রগ্রেস বার (S5.5)
//
// • পাতলা সোনালি বার: প্রগ্রেস = currentSec / audioSec (০..১), ডানে ছোট উজ্জ্বল বিন্দু (গ্লো ধীরে স্পন্দিত)।
// • পেছনে ম্লান ট্র্যাক (`COLORS.line`)। প্রথম ০.৪ সে.-এ বার ফেড-ইন।
// • মাপ/অবস্থান `theme.ts`-এর `getLayout().progress` (bottom/height/side) — ৯:১৬-তে নিচ থেকে ২৬০px (সেফ-জোনের ওপরে)।
// • `audioSec` প্রপ না দিলে `AUDIO_SECONDS_FALLBACK` (৩৮.৩২)। S6.1 আসল অডিও-দৈর্ঘ্য দিলে সেটাই চলবে।
// • `timeOffsetSec`: `<Sequence from={N}>`-এর ভেতরে রাখলে `N/fps` (Karaoke/ArabicBlock-এর মতো — S5.7-এ একই `currentSec` নিয়ম)।
// • `opacity`: আউটরোতে ফেড-আউটের জন্য (ডিফল্ট ১)। অডিও শেষের পর বার ১০০% ধরা থাকে।
// নিয়ম: শুধু `useCurrentFrame()`-ভিত্তিক গণিত; Math.random/Date/CSS transition/animation নেই।

import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {AUDIO_SECONDS_FALLBACK} from './config';
import {COLORS, GRADIENTS, getLayout, getUnit} from './theme';
import {audioSecAt} from './timing';

export const PROGRESS_LOOK = {
  fadeInSec: 0.4,
  /** বিন্দুর ব্যাস = বারের উচ্চতার গুণক */
  dotFactor: 2.4,
  /** বিন্দুর গ্লো-স্পন্দনের পিরিয়ড (সেকেন্ড) */
  pulsePeriod: 1.6,
} as const;

export type ProgressBarProps = {
  /** পুরো বারের অপাসিটি (০–১) */
  opacity?: number;
  /** `<Sequence>` অফসেট (সেকেন্ড) */
  timeOffsetSec?: number;
  /** অডিওর মোট দৈর্ঘ্য (সে.); ডিফল্ট ৩৮.৩২ */
  audioSec?: number;
};

/** প্রগ্রেস ০..১ (বিশুদ্ধ ফাংশন) */
export function progressAt(currentSec: number, audioSec: number): number {
  if (!(audioSec > 0)) return 0;
  const p = currentSec / audioSec;
  return p < 0 ? 0 : p > 1 ? 1 : p;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({opacity = 1, timeOffsetSec = 0, audioSec = AUDIO_SECONDS_FALLBACK}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const lay = getLayout(width, height);
  const u = getUnit(width, height);
  const pr = lay.progress;

  const currentSec = audioSecAt(frame, fps, timeOffsetSec);
  const env = Math.min(1, Math.max(0, currentSec / PROGRESS_LOOK.fadeInSec)) * opacity;
  if (env <= 0.001) return null;

  const p = progressAt(currentSec, audioSec);
  const barH = pr.height * u;
  const trackW = width - pr.side * 2 * u;
  const dot = barH * PROGRESS_LOOK.dotFactor;
  const pulse = +(0.75 + 0.25 * Math.sin((2 * Math.PI * currentSec) / PROGRESS_LOOK.pulsePeriod)).toFixed(4);

  return (
    <div
      data-part="progress"
      data-progress={p.toFixed(4)}
      style={{
        position: 'absolute',
        left: pr.side * u,
        width: trackW,
        bottom: pr.bottom * u,
        height: barH,
        opacity: env,
      }}
    >
      {/* ট্র্যাক */}
      <div style={{position: 'absolute', inset: 0, borderRadius: barH, background: COLORS.line, opacity: 0.6}} />
      {/* ভরা অংশ */}
      <div
        data-part="progress-fill"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${(p * 100).toFixed(3)}%`,
          borderRadius: barH,
          background: GRADIENTS.gold,
          boxShadow: `0 0 ${barH * 2}px ${COLORS.glowGold}`,
        }}
      />
      {/* ডগার উজ্জ্বল বিন্দু */}
      <div
        data-part="progress-dot"
        style={{
          position: 'absolute',
          left: `${(p * 100).toFixed(3)}%`,
          top: '50%',
          width: dot,
          height: dot,
          marginLeft: -dot / 2,
          marginTop: -dot / 2,
          borderRadius: '50%',
          background: COLORS.goldSoft,
          boxShadow: `0 0 ${(dot * 1.6 * pulse).toFixed(2)}px ${(dot * 0.5 * pulse).toFixed(2)}px ${COLORS.glowGold}`,
        }}
      />
    </div>
  );
};
