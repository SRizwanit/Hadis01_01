// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — ভিডিও কনফিগ (ফরম্যাট, FPS, দৈর্ঘ্য, রেন্ডার টার্গেট)
// নোট: এই ফাইলে enum/parameter-property ব্যবহার করা হয়নি, যাতে Node-এর type-stripping দিয়েও টেস্ট করা যায়।

/** ফ্রেম প্রতি সেকেন্ড (সোশ্যাল মিডিয়ার জন্য যথেষ্ট, রেন্ডার সময় কম) */
export const FPS = 30;

/** অডিও শেষের পর আউটরো (সেকেন্ড) — S5.6: প্লে-স্টোর CTA ও অ্যানিমেটেড badge দেখাতে ১.৫ → ৫.০ */
export const OUTRO_SECONDS = 5;

/** বর্তমান হাদিসের আইডি — আউটপুট ফাইলের নামে ব্যবহৃত হয় */
export const HADIS_ID = 'hadis0101';

/** ইনপুট অডিওর যাচাইকৃত দৈর্ঘ্য (সে.) — S2.2/S3.2-তে WAV হেডার থেকে নেওয়া; calculateMetadata ব্যর্থ হলে ফলব্যাক */
export const AUDIO_SECONDS_FALLBACK = 38.32;

export type FormatKey = '16x9' | '9x16';
export type QualityKey = 'HD' | '4K';

export type FormatConfig = {
  /** Remotion কম্পোজিশন আইডি */
  id: string;
  /** HD (scale 1) পিক্সেল মাপ */
  width: number;
  height: number;
  /** সাধারণ লেআউট সিদ্ধান্তের জন্য */
  orientation: 'landscape' | 'portrait';
};

/** মাত্র ২টি কম্পোজিশন; 4K = ২× স্কেল (নিচে RENDER_TARGETS) */
export const FORMATS: Record<FormatKey, FormatConfig> = {
  '16x9': {id: 'Hadis-16x9', width: 1920, height: 1080, orientation: 'landscape'},
  '9x16': {id: 'Hadis-9x16', width: 1080, height: 1920, orientation: 'portrait'},
};

/** কোয়ালিটি → `remotion render --scale` ও `--crf` */
export const QUALITIES: Record<QualityKey, {scale: number; crf: number}> = {
  HD: {scale: 1, crf: 20},
  '4K': {scale: 2, crf: 18},
};

export type RenderTarget = {
  /** render.yml ম্যাট্রিক্স আইডি, যেমন "16x9-HD" */
  key: string;
  format: FormatKey;
  quality: QualityKey;
  /** কম্পোজিশন আইডি */
  composition: string;
  scale: number;
  crf: number;
  /** আউটপুট ফাইলের নাম (রুটে তৈরি হয়) */
  output: string;
  /** আউটপুটের চূড়ান্ত পিক্সেল মাপ */
  width: number;
  height: number;
};

const FORMAT_KEYS: FormatKey[] = ['16x9', '9x16'];
const QUALITY_KEYS: QualityKey[] = ['HD', '4K'];

/** ৪টি রেন্ডার টার্গেট: 16x9-HD, 16x9-4K, 9x16-HD, 9x16-4K */
export const RENDER_TARGETS: RenderTarget[] = FORMAT_KEYS.flatMap((format) =>
  QUALITY_KEYS.map((quality) => {
    const f = FORMATS[format];
    const q = QUALITIES[quality];
    return {
      key: `${format}-${quality}`,
      format,
      quality,
      composition: f.id,
      scale: q.scale,
      crf: q.crf,
      output: `${HADIS_ID}-${format}-${quality}.mp4`,
      width: f.width * q.scale,
      height: f.height * q.scale,
    };
  }),
);

/**
 * মোট ফ্রেম = ceil((অডিও সেকেন্ড + OUTRO_SECONDS) × FPS)
 * অডিও দৈর্ঘ্য শূন্য/ঋণাত্মক/অসীম হলে ত্রুটি ছোড়ে।
 */
export function calcDurationInFrames(audioSeconds: number, outroSeconds: number = OUTRO_SECONDS, fps: number = FPS): number {
  if (!Number.isFinite(audioSeconds) || audioSeconds <= 0) {
    throw new Error(`অবৈধ অডিও দৈর্ঘ্য: ${audioSeconds}`);
  }
  // ফ্লোটিং-পয়েন্ট ত্রুটি (যেমন 1194.0000000002) এড়াতে ছোট ইপসিলন বিয়োগ
  return Math.ceil((audioSeconds + outroSeconds) * fps - 1e-6);
}

/** ফলব্যাক মোট ফ্রেম (বর্তমান অডিওর জন্য ১১৯৫) */
export const FALLBACK_DURATION_FRAMES = calcDurationInFrames(AUDIO_SECONDS_FALLBACK);

/** অডিও শেষ হওয়ার ফ্রেম (এরপর আউটরো শুরু) */
export function audioEndFrame(audioSeconds: number, fps: number = FPS): number {
  return Math.round(audioSeconds * fps);
}
