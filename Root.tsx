// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — কম্পোজিশন রেজিস্টার (S6.2)
//
// • দুটি `<Composition>`: `Hadis-16x9` (1920×1080) ও `Hadis-9x16` (1080×1920), fps = `FPS` (৩০)।
//   আইডি/মাপ `config.ts`-এর `FORMATS` থেকে — এক জায়গায় সত্য।
// • `calculateMetadata`: `getAudioDurationInSeconds(wav)` দিয়ে আসল অডিও-দৈর্ঘ্য পড়ে
//     durationInFrames = calcDurationInFrames(audioSec)  (= ceil((অডিও + OUTRO_SECONDS) × fps); বর্তমানে ১৩০০)
//   এবং `props.audioSec` ফেরত দেয় — `HadisVideo` এটি ProgressBar/আউটরো-শুরুতে ব্যবহার করে।
//   পড়া ব্যর্থ হলে (বা অবৈধ মান এলে) `AUDIO_SECONDS_FALLBACK` (৩৮.৩২) ধরা হয়, রেন্ডার থামে না।
// • `index.ts` এই ফাইলের `RemotionRoot` ইম্পোর্ট করে (নাম হুবহু এটাই)।

import React from 'react';
import {Composition} from 'remotion';
import type {CalculateMetadataFunction} from 'remotion';
import {getAudioDurationInSeconds} from '@remotion/media-utils';
import {AUDIO_SECONDS_FALLBACK, FORMATS, FPS, calcDurationInFrames} from './config';
import type {FormatKey} from './config';
import {HadisVideo} from './HadisVideo';
import type {HadisVideoProps} from './HadisVideo';
import wav from './hadis0101.wav';

// ---------------------------------------------------------------- বিশুদ্ধ ফাংশন (টেস্টযোগ্য)
/** অডিও-দৈর্ঘ্য বৈধ (সসীম ও > ০) হলে সেটি, নইলে ফলব্যাক */
export function sanitizeAudioSec(sec: unknown): number {
  return typeof sec === 'number' && Number.isFinite(sec) && sec > 0 ? sec : AUDIO_SECONDS_FALLBACK;
}

/** অডিও-দৈর্ঘ্য থেকে মেটাডেটা: মোট ফ্রেম + `HadisVideo`-র প্রপস (`audioSec` বসানো) */
export function metadataFor(audioSec: number, props: HadisVideoProps, fps: number = FPS): {durationInFrames: number; props: HadisVideoProps} {
  const sec = sanitizeAudioSec(audioSec);
  return {durationInFrames: calcDurationInFrames(sec, undefined, fps), props: {...props, audioSec: sec}};
}

/** `getAudioDurationInSeconds` ব্যর্থ হলেও রেন্ডার চলে — ফলব্যাক দৈর্ঘ্যে */
export const calculateHadisMetadata: CalculateMetadataFunction<HadisVideoProps> = async ({props}) => {
  let sec = AUDIO_SECONDS_FALLBACK;
  try {
    sec = sanitizeAudioSec(await getAudioDurationInSeconds(wav));
  } catch {
    sec = AUDIO_SECONDS_FALLBACK;
  }
  return metadataFor(sec, props);
};

// ---------------------------------------------------------------- রুট
const FORMAT_KEYS: readonly FormatKey[] = ['16x9', '9x16'];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {FORMAT_KEYS.map((key) => {
        const f = FORMATS[key];
        return (
          <Composition
            key={f.id}
            id={f.id}
            component={HadisVideo}
            width={f.width}
            height={f.height}
            fps={FPS}
            durationInFrames={calcDurationInFrames(AUDIO_SECONDS_FALLBACK)}
            defaultProps={{format: key, audioSec: AUDIO_SECONDS_FALLBACK} satisfies HadisVideoProps}
            calculateMetadata={calculateHadisMetadata}
          />
        );
      })}
    </>
  );
};
