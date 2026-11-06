// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — মূল কম্পোজিশন (S6.1)
//
// স্তর (নিচ থেকে উপরে): Background → Header → ArabicBlock → Karaoke → ProgressBar → Outro
//
// সময়ের নিয়ম (S5.7-এ যাচাইকৃত):
//  • `Background`/`Header`/`ArabicBlock`/`Karaoke`/`ProgressBar` সবই `<Sequence>`-এর বাইরে, গ্লোবাল ফ্রেমে
//    (ফ্রেম ০ = অডিওর শুরু) — তাই কারো `timeOffsetSec` লাগে না।
//  • শুধু `Outro` `<Sequence from={audioEndFrame(audioSec)}>`-এর ভেতরে (স্থানীয় ফ্রেম ০ = অডিও শেষ), তাই তারও
//    `timeOffsetSec` ০।
//  • `<Audio src={wav}/>` Sequence-এর বাইরে ⇒ ফ্রেম ০ থেকে শুরু, ভলিউম ১.০।
//
// আউটরো ফেড: `previousLayersOpacity(frame/fps − audioSec)` (১ → ০, ০.৬ সে.-এ) আগের চার স্তর
//  (Header/ArabicBlock/Karaoke/ProgressBar)-এ `opacity` হিসেবে যায়; Karaoke-র `holdLastPage` তাই আউটরোতে ফেড-আউট হয়।
//
// শুরুর ৫ ফ্রেমের ফেড-ইন: শুধু **কনটেন্ট স্তরগুলোয়** (Header…ProgressBar)। `Background` সবসময় পূর্ণ অপাসিটিতে —
// তাই প্রথম ফ্রেমও কালো/ফাঁকা নয় (গাঢ় সবুজ ব্যাকগ্রাউন্ড আগে থেকেই আছে)।
//
// প্রপস: `format` ('16x9' | '9x16') — কম্পোজিশনের মাপের সাথে মেলে কি না যাচাই (ভুল প্রপে ভুল লেআউটে নীরবে রেন্ডার
//  হওয়ার চেয়ে স্পষ্ট ত্রুটি ভালো); `audioSec` — আসল অডিও-দৈর্ঘ্য (S6.2 `calculateMetadata` থেকে দেবে; না দিলে
//  `AUDIO_SECONDS_FALLBACK` = ৩৮.৩২)।
// নিয়ম: শুধু `useCurrentFrame()`-ভিত্তিক গণিত; Math.random/Date/CSS transition/animation নেই।

import React from 'react';
import {AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {ArabicBlock} from './ArabicBlock';
import {Background} from './Background';
import {AUDIO_SECONDS_FALLBACK, FORMATS, OUTRO_SECONDS, audioEndFrame} from './config';
import type {FormatKey} from './config';
import {Header} from './Header';
import {Karaoke} from './Karaoke';
import {Outro, previousLayersOpacity} from './Outro';
import {ProgressBar} from './ProgressBar';
import {orientationOf} from './theme';
import wav from './hadis0101.wav';

// ---------------------------------------------------------------- ধ্রুবক
export const HADIS_VIDEO = {
  /** শুরুতে কনটেন্ট স্তরের ফেড-ইন (ফ্রেম) */
  introFadeFrames: 5,
  /** অডিও ভলিউম */
  audioVolume: 1,
} as const;

// ---------------------------------------------------------------- বিশুদ্ধ ফাংশন (টেস্টযোগ্য)
/** শুরুর ফেড-ইন: ফ্রেম ০ → ০, `introFadeFrames`-এ ১ (লিনিয়ার, ক্ল্যাম্পড) */
export function introOpacity(frame: number, fadeFrames: number = HADIS_VIDEO.introFadeFrames): number {
  if (!(fadeFrames > 0)) return 1;
  const t = frame / fadeFrames;
  return t <= 0 ? 0 : t >= 1 ? 1 : t;
}

/**
 * আউটরো-সময়: কোন ফ্রেমে শুরু ও কত ফ্রেম চলবে। কম্পোজিশন অডিওর শেষ পর্যন্তই (বা আগেই) শেষ হলে `outroFrames` ০
 * (আউটরো আঁকা হয় না — অবৈধ `durationInFrames` যায় না)।
 */
export function outroTiming(audioSec: number, durationInFrames: number, fps: number): {audioEnd: number; outroFrames: number} {
  const audioEnd = audioEndFrame(audioSec, fps);
  return {audioEnd, outroFrames: Math.max(0, durationInFrames - audioEnd)};
}

// ---------------------------------------------------------------- কম্পোজিশন
export type HadisVideoProps = {
  /** কম্পোজিশনের অনুপাত; মাপের সাথে না মিললে ত্রুটি */
  format: FormatKey;
  /** আসল অডিও-দৈর্ঘ্য (সে.) — আউটরো শুরু, প্রগ্রেস বার ও আগের স্তরের ফেড-আউট এর ওপর নির্ভর করে */
  audioSec?: number;
};

export const HadisVideo: React.FC<HadisVideoProps> = ({format, audioSec = AUDIO_SECONDS_FALLBACK}) => {
  const frame = useCurrentFrame();
  const {width, height, fps, durationInFrames} = useVideoConfig();

  const expected = FORMATS[format];
  if (!expected) {
    throw new Error(`HadisVideo: অজানা format "${String(format)}" (প্রত্যাশিত: ${Object.keys(FORMATS).join(' | ')})`);
  }
  if (orientationOf(width, height) !== expected.orientation) {
    throw new Error(`HadisVideo: format "${format}" (${expected.orientation}) কিন্তু কম্পোজিশনের মাপ ${width}×${height} (${orientationOf(width, height)})`);
  }

  const {audioEnd, outroFrames} = outroTiming(audioSec, durationInFrames, fps);
  const prev = previousLayersOpacity(frame / fps - audioSec);
  const intro = introOpacity(frame);

  return (
    <AbsoluteFill data-format={format}>
      {/* অডিও: ফ্রেম ০ থেকে, Sequence-এর বাইরে */}
      <Audio src={wav} volume={HADIS_VIDEO.audioVolume} />

      {/* ১) ব্যাকগ্রাউন্ড — সবসময় পূর্ণ অপাসিটি */}
      <Background />

      {/* ২–৫) কনটেন্ট স্তর — শুরুতে ৫ ফ্রেম ফেড-ইন; আউটরোতে `prev` দিয়ে ফেড-আউট */}
      <AbsoluteFill style={intro < 1 ? {opacity: intro} : undefined}>
        <Header opacity={prev} />
        <ArabicBlock opacity={prev} />
        <Karaoke opacity={prev} />
        <ProgressBar opacity={prev} audioSec={audioSec} />
      </AbsoluteFill>

      {/* ৬) আউটরো — অডিও শেষের পর; Sequence-এর ভেতরে স্থানীয় ফ্রেম ০ = অডিও শেষ */}
      {outroFrames > 0 ? (
        <Sequence from={audioEnd} durationInFrames={outroFrames} name="Outro">
          <Outro durationSec={OUTRO_SECONDS} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
