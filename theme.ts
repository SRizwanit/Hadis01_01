// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — থিম: রঙ, ফন্ট, স্পেসিং, লেআউট টোকেন
//
// ডিজাইন নিয়ম:
//  • সব পিক্সেল মান "ডিজাইন পিক্সেল": ১৬:৯ = ১৯২০×১০৮০, ৯:১৬ = ১০৮০×১৯২০।
//  • 4K = `remotion render --scale=2` — কম্পোজিশনের মাপ বদলায় না, তাই কোডে আলাদা 4K মান নেই।
//  • এই ফাইলে অন্য লোকাল ফাইল import করা হয়নি (স্বাধীনভাবে টেস্টযোগ্য রাখতে)।

import {loadFont as loadAmiri} from '@remotion/google-fonts/Amiri';
import {loadFont as loadAnekBangla} from '@remotion/google-fonts/AnekBangla';
import {loadFont as loadNotoSerifBengali} from '@remotion/google-fonts/NotoSerifBengali';

export type Orientation = 'landscape' | 'portrait';

// ---------------------------------------------------------------- রঙ
export const COLORS = {
  bgDeep: '#052E21',
  bgMid: '#0B4A33',
  emerald: '#1FA34A',
  gold: '#E0B85C',
  goldSoft: '#F3DDA0',
  goldDeep: '#B8893A', // গ্রেডিয়েন্ট/বর্ডারের গাঢ় প্রান্ত
  cream: '#FFF8E7',
  ink: '#0A1F17',
  white: '#FFFFFF',
  // স্বচ্ছতা-ভিত্তিক
  textDim: 'rgba(255,255,255,0.55)', // "আসছে" শব্দ
  textFaint: 'rgba(255,248,231,0.45)',
  line: 'rgba(224,184,92,0.35)', // ডিভাইডার/বর্ডার
  glowGold: 'rgba(224,184,92,0.55)',
  glowEmerald: 'rgba(31,163,74,0.35)',
  shadow: 'rgba(0,0,0,0.35)',
} as const;

export const GRADIENTS = {
  background: `radial-gradient(ellipse at 50% 35%, ${COLORS.bgMid} 0%, ${COLORS.bgDeep} 75%)`,
  gold: `linear-gradient(135deg, ${COLORS.goldSoft} 0%, ${COLORS.gold} 50%, ${COLORS.goldDeep} 100%)`,
  lessonCard: `linear-gradient(160deg, rgba(11,74,51,0.85) 0%, rgba(5,46,33,0.9) 100%)`,
} as const;

// ---------------------------------------------------------------- ফন্ট
// loadFont নিজে রেন্ডার আটকে রাখে ফন্ট লোড না হওয়া পর্যন্ত (v4.0.135+).
// ট্রাফিক কমাতে weights/subsets সীমিত; ২০+ অনুরোধের সতর্কতা বন্ধ।
const bengaliSerif = loadNotoSerifBengali('normal', {
  weights: ['400', '600', '700'],
  subsets: ['bengali', 'latin'],
  ignoreTooManyRequestsWarning: true,
});

const arabicSerif = loadAmiri('normal', {
  weights: ['400', '700'],
  subsets: ['arabic', 'latin'],
  ignoreTooManyRequestsWarning: true,
});

// বাংলা গুগল ফন্ট: Anek Bangla — কালারফুল ক্যাপশন (৭০০/৮০০) এবং ছোট লেবেল/পিল (৫০০/৬০০) দুটোতেই।
// (Hind Siliguri আপনার নির্দেশে বাদ — S5.4 সেশনে; আর কোথাও লোড হয় না। একটিই লোড, তাই ট্রাফিকও কম।)
const bengaliCaption = loadAnekBangla('normal', {
  weights: ['500', '600', '700', '800'],
  subsets: ['bengali', 'latin'],
  ignoreTooManyRequestsWarning: true,
});

export const FONTS = {
  /** শিরোনাম ও কারাওকে সাবটাইটেল */
  serif: `${bengaliSerif.fontFamily}, 'Noto Serif Bengali', serif`,
  /** ছোট লেবেল/পিল — Anek Bangla (Hind Siliguri নয়) */
  sans: `${bengaliCaption.fontFamily}, 'Anek Bangla', ${bengaliSerif.fontFamily}, 'Noto Serif Bengali', sans-serif`,
  /** আরবি */
  arabic: `${arabicSerif.fontFamily}, 'Amiri', serif`,
  /** কালারফুল অ্যানিমেটেড ক্যাপশন (Karaoke) — ফন্ট বদলাতে চাইলে শুধু উপরের loadAnekBangla লাইন বদলান */
  caption: `${bengaliCaption.fontFamily}, 'Anek Bangla', ${bengaliSerif.fontFamily}, 'Noto Serif Bengali', sans-serif`,
} as const;

export const FONT_WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/** সব ফন্ট লোড হওয়ার প্রতিশ্রুতি (স্টিল/টেস্টে অপেক্ষার জন্য) */
export function waitForFonts(): Promise<unknown> {
  return Promise.all([
    bengaliSerif.waitUntilDone(),
    arabicSerif.waitUntilDone(),
    bengaliCaption.waitUntilDone(),
  ]);
}

// ---------------------------------------------------------------- কালারফুল অ্যানিমেটেড ক্যাপশন (S5.4 এগুলো পড়বে)
/**
 * প্রতিটি শব্দের নিজস্ব উজ্জ্বল রঙ — ক্রম গরম/ঠান্ডা মিশিয়ে সাজানো, যাতে পাশাপাশি দুই শব্দ একরঙা না হয়।
 * সব রঙ bgMid (#0B4A33)-এর ওপর WCAG কনট্রাস্ট ≥ ৪.৫ (নিচে CONTRAST_PAIRS)।
 */
export const CAPTION_COLORS = [
  '#FFD34D', // সূর্য-সোনালি
  '#6CCBFF', // আকাশি
  '#FF9580', // প্রবাল
  '#C3F26B', // লাইম
  '#C0A8FF', // ল্যাভেন্ডার
  '#FFB259', // কমলা
  '#6EE7B7', // পুদিনা
  '#FF9BD2', // গোলাপি
] as const;

/** শব্দ-ইনডেক্স থেকে ডিটারমিনিস্টিক রঙ (Math.random নয় — রেন্ডারে ঝিলমিল এড়াতে) */
export function captionColor(wordIndex: number): string {
  const n = CAPTION_COLORS.length;
  return CAPTION_COLORS[((wordIndex % n) + n) % n];
}

/** `#RRGGBB` → `rgba(r,g,b,a)` (গ্লো/হাইলাইট পিলের স্বচ্ছ রঙের জন্য) */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = Math.min(1, Math.max(0, alpha));
  return `rgba(${r},${g},${b},${a})`;
}

/** ক্যাপশন অ্যানিমেশনের মান (ফ্রেমে, ৩০ fps) ও স্টাইল — সবই useCurrentFrame/spring/interpolate-ভিত্তিক হবে */
export const CAPTION = {
  weights: {normal: 700, active: 800, lesson: 700},
  /** পেজ বদলে ফেড (ফ্রেম) */
  pageFade: 5,
  /** প্রতিটি শব্দ পেজে ঢোকে নিচ থেকে উঠে + ফেড-ইন; শব্দ-প্রতি দেরি (ফ্রেম) ও ঢোকার সময়কাল */
  wordIn: {stagger: 2, duration: 8, riseY: 18},
  /** "এখন বলা হচ্ছে" শব্দের পপ: স্প্রিং থেকে popScale-এ উঠে settleScale-এ থিতু */
  pop: {popScale: 1.18, settleScale: 1.08, damping: 11, stiffness: 180, mass: 0.6},
  /** সক্রিয় শব্দের পেছনে রঙিন পিল (শব্দের রঙের স্বচ্ছ রূপ) */
  pill: {alpha: 0.22, padXEm: 0.28, padYEm: 0.04, radiusEm: 0.32},
  /** রঙিন আন্ডারলাইন: শব্দ বলার সময়ের সাথে বাঁ থেকে ডানে ঢোকে (wipe) */
  underline: {heightEm: 0.07, offsetEm: 0.06},
  /** শব্দের চারপাশে গ্লো ও গাঢ় আউটলাইন (যেকোনো ব্যাকগ্রাউন্ডে পড়া যাওয়ার জন্য) */
  glow: {blurEm: 0.45, alpha: 0.7},
  stroke: {em: 0.06, color: COLORS.ink},
  /** "আসছে" (এখনো বলা হয়নি) শব্দ: সাদা, কম অপাসিটি */
  upcoming: {color: COLORS.white, opacity: 0.55},
} as const;

// ---------------------------------------------------------------- স্পেসিং/আকৃতি
export const SPACE = {xs: 8, sm: 16, md: 32, lg: 56, xl: 96} as const;
export const RADIUS = {pill: 999, card: 28, badge: 36} as const;

/** টেক্সটের জন্য সাধারণ লাইন-হাইট (বাংলা যুক্তাক্ষর ও আরবি হারাকাত কাটা এড়াতে বড়) */
export const LINE_HEIGHT = {bengali: 1.55, arabic: 2.0, tight: 1.25} as const;

// ---------------------------------------------------------------- লেআউট
export type Layout = {
  orientation: Orientation;
  baseWidth: number;
  baseHeight: number;
  /** নিরাপদ অঞ্চল (Reels/Shorts UI এড়াতে ৯:১৬-তে বেশি) */
  safe: {top: number; bottom: number; side: number};
  header: {
    top: number;
    logoHeight: number;
    logoPad: number;
    titleSize: number;
    pillSize: number;
    chipSize: number;
    gap: number;
  };
  arabic: {top: number; size: number; boxWidthRatio: number};
  karaoke: {
    centerY: number;
    size: number;
    lineHeight: number;
    maxLines: number;
    /** প্রতি পেজে সর্বোচ্চ শব্দ (S4.4 buildPages) */
    maxWords: number;
    boxWidthRatio: number;
  };
  lesson: {labelSize: number; padding: number};
  progress: {bottom: number; height: number; side: number};
  /** S5.6: logoHeight = লোগো-ব্যাজ; captionSize = "আজই প্লে স্টোর…" লাইন; titleSize = অ্যাপ-নাম লাইন; badgeWidth = Google Play badge-এর প্রস্থ */
  outro: {logoHeight: number; titleSize: number; captionSize: number; badgeWidth: number; gap: number};
};

/** প্রথম-খসড়া মান; S5.x-এ স্টিল দেখে সূক্ষ্ম-সমন্বয় হবে */
export const LAYOUTS: Record<Orientation, Layout> = {
  landscape: {
    orientation: 'landscape',
    baseWidth: 1920,
    baseHeight: 1080,
    safe: {top: 36, bottom: 40, side: 120},
    header: {top: 36, logoHeight: 150, logoPad: 12, titleSize: 56, pillSize: 30, chipSize: 28, gap: 14},
    arabic: {top: 392, size: 84, boxWidthRatio: 0.8},
    karaoke: {centerY: 720, size: 64, lineHeight: LINE_HEIGHT.bengali, maxLines: 2, maxWords: 9, boxWidthRatio: 0.78},
    lesson: {labelSize: 30, padding: 40},
    progress: {bottom: 40, height: 8, side: 120},
    outro: {logoHeight: 320, titleSize: 64, captionSize: 38, badgeWidth: 560, gap: 30},
  },
  portrait: {
    orientation: 'portrait',
    baseWidth: 1080,
    baseHeight: 1920,
    // উপরে ১৫০ ও নিচে ২৫০px গুরুত্বপূর্ণ কিছু রাখা যাবে না
    safe: {top: 150, bottom: 250, side: 60},
    header: {top: 170, logoHeight: 220, logoPad: 16, titleSize: 84, pillSize: 38, chipSize: 34, gap: 22},
    arabic: {top: 675, size: 96, boxWidthRatio: 0.88},
    karaoke: {centerY: 1130, size: 72, lineHeight: LINE_HEIGHT.bengali, maxLines: 3, maxWords: 6, boxWidthRatio: 0.88},
    lesson: {labelSize: 34, padding: 40},
    progress: {bottom: 260, height: 10, side: 60},
    outro: {logoHeight: 360, titleSize: 62, captionSize: 44, badgeWidth: 760, gap: 40},
  },
};

export function orientationOf(width: number, height: number): Orientation {
  return width >= height ? 'landscape' : 'portrait';
}

export function getLayout(width: number, height: number): Layout {
  return LAYOUTS[orientationOf(width, height)];
}

/**
 * ইউনিট = বাস্তব মাপ ÷ ডিজাইন মাপ। `--scale`-এ কম্পোজিশন মাপ বদলায় না, তাই রেন্ডারে সবসময় ১;
 * Studio-তে ভিন্ন মাপে খুললে লেআউট আনুপাতিকভাবে বাড়ে/কমে।
 */
export function getUnit(width: number, height: number): number {
  const l = getLayout(width, height);
  return Math.min(width / l.baseWidth, height / l.baseHeight);
}

/** কনট্রাস্ট টেস্টের জন্য মূল রঙ জোড়া (theme.test-এর মতো স্ক্রিপ্টে ব্যবহার) */
export const CONTRAST_PAIRS: ReadonlyArray<readonly [string, string, string]> = [
  ['সাদা (বলা হচ্ছে) / bgMid', COLORS.white, COLORS.bgMid],
  ['goldSoft (বলা হয়েছে) / bgDeep', COLORS.goldSoft, COLORS.bgDeep],
  ['gold (শিরোনাম) / bgDeep', COLORS.gold, COLORS.bgDeep],
  ['cream / bgMid', COLORS.cream, COLORS.bgMid],
  ['ink / white (লোগো ব্যাজের লেখা)', COLORS.ink, COLORS.white],
  ['ink / gold (S2 চিপ)', COLORS.ink, COLORS.gold],
  ...CAPTION_COLORS.map((c, i): readonly [string, string, string] => [`ক্যাপশন রঙ #${i + 1} ${c} / bgMid`, c, COLORS.bgMid]),
];
