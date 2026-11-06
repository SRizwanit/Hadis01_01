// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — অ্যানিমেটেড ব্যাকগ্রাউন্ড (S5.1)
//
// পুরোপুরি কোডে আঁকা ২D (SVG + CSS গ্রেডিয়েন্ট); কোনো ছবি/ফাইল লাগে না।
// স্তর (নিচ থেকে উপরে):
//   ১) ধীরে নড়া গাঢ়-সবুজ রেডিয়াল গ্রেডিয়েন্ট + ভাসমান এমারেল্ড আভা
//   ২) ইসলামী জ্যামিতিক ৮-কোনা তারা (অষ্টভুজাকার তারকা) প্যাটার্ন — ধীরে ঘোরে, অপাসিটি ০.০৪৫–০.০৮
//   ৩) ধীরগতির সোনালি আলোকরশ্মি (অর্ধচন্দ্র থেকে নিচে-বামে)
//   ৪) মিটমিট করা তারা (সিড-ভিত্তিক — Math.random নয়)
//   ৫) উপরে-ডানে সোনালি অর্ধচন্দ্র: নরম গ্লো + ভাসমান ওঠানামা
//   ৬) নিচে মসজিদ-সিলুয়েট (গম্বুজ + ২ মিনার + পাশের গম্বুজ), দূরের স্কাইলাইন, জানালার মৃদু আলো, সবুজ কুয়াশা
//   ৭) কোণায় হালকা ভিনিয়েট
//
// নিয়ম (Hadis.md ফেজ ৫):
//  • শুধু useCurrentFrame()/useVideoConfig() থেকে আসা মান — CSS transition/animation নয়, Math.random/Date নয়।
//    (ফ্রেম N-এর ছবি সবসময় হুবহু একই — রেন্ডার ঝিলমিল ও চাঙ্ক-রেন্ডার-নিরাপদ)
//  • মাপ সবসময় useVideoConfig() থেকে: 16:9 = 1920×1080, 9:16 = 1080×1920 (4K = --scale=2, কোডে আলাদা কিছু নয়)।
//  • কনটেন্ট-পড়ার কনট্রাস্ট রক্ষা: ক্যাপশন-ব্লকের পেছনে তারা ম্লান (QUIET), আলোকরশ্মি ও প্যাটার্ন খুব হালকা।
//  • কোনো প্রপস লাগে না: `<Background />`।

import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, getLayout, type Orientation} from './theme';

const TAU = Math.PI * 2;

// ---------------------------------------------------------------- ডিটারমিনিস্টিক র‍্যান্ডম (সিড-ভিত্তিক)
/** mulberry32: একই সিড → সবসময় একই ক্রম। রেন্ডারের প্রতিটি ফ্রেম/চাঙ্কে একই তারা-বিন্যাস। */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BG_SEED = 20260611;

// ---------------------------------------------------------------- টিউনিং (সব মান এক জায়গায়)
export const BG = {
  /** তারা-গ্রিডের অপাসিটি পরিসর (বলা আছে ০.০৫–০.০৮; ঢেউয়ের জন্য সামান্য নিচ থেকে) */
  patternOpacity: {min: 0.045, max: 0.08},
  /** তারা ঘোরার গতি (ডিগ্রি/সেকেন্ড) */
  patternDegPerSec: 2.4,
  /** তারা-গ্রিডের ঢেউ-পিরিয়ড (সেকেন্ড) */
  patternWavePeriod: 9,
  /** আলোকরশ্মির সর্বোচ্চ আলফা (কেন্দ্রে) — পড়ার কনট্রাস্ট নষ্ট না করতে ছোট */
  beamAlpha: 0.055,
  /** গ্রেডিয়েন্ট-ড্রিফটের পিরিয়ড (সেকেন্ড) */
  driftPeriod: {x: 14, y: 17},
  /** অর্ধচন্দ্র ভাসার পিরিয়ড (সেকেন্ড) ও উচ্চতা (px) */
  crescentFloat: {period: 6, amp: 9, tiltDeg: 3.5},
  /** ক্যাপশন-ব্লকের পেছনের তারার অপাসিটি গুণক */
  quietFactor: 0.3,
} as const;

// ---------------------------------------------------------------- জ্যামিতি (শুধু width/height-এর ওপর নির্ভর)
type Twinkle = {x: number; y: number; r: number; period: number; phase: number; sparkle: boolean; color: string};
type SkyItem = {kind: 'dome' | 'minaret'; x: number; w: number; h: number};
type QuietZone = {x0: number; x1: number; y0: number; y1: number};

type Geo = {
  orientation: Orientation;
  gridS: number;
  starR: number;
  strokeW: number;
  crescent: {x: number; y: number; R: number};
  mosqueScale: number;
  twinkles: Twinkle[];
  sky: SkyItem[];
  quiet: QuietZone;
  beamLen: number;
};

/** মসজিদ-সিলুয়েটের ভিউবক্স (লোকাল কোঅর্ডিনেট) */
const MOSQUE = {w: 1200, h: 320};

function buildGeo(width: number, height: number): Geo {
  const lay = getLayout(width, height);
  const portrait = lay.orientation === 'portrait';
  const rnd = mulberry32(BG_SEED + (portrait ? 9 : 16));

  const gridS = portrait ? 180 : 190;
  const starR = gridS * 0.44;
  const strokeW = Math.max(1.6, gridS * 0.0125);

  const crescent = portrait
    ? {x: width - 128, y: 236, R: 58}
    : {x: width - 176, y: 138, R: 64};

  const mosqueScale = portrait ? width / MOSQUE.w : 1.0;

  // ক্যাপশন-ব্লকের "শান্ত অঞ্চল": তারা এখানে ম্লান থাকে, যাতে রঙিন শব্দ স্পষ্ট পড়া যায়
  const k = lay.karaoke;
  const bandHalf = (k.maxLines * k.size * k.lineHeight) / 2 + 60;
  const sideM = (width * (1 - k.boxWidthRatio)) / 2 - 40;
  const quiet: QuietZone = {x0: sideM, x1: width - sideM, y0: k.centerY - bandHalf, y1: k.centerY + bandHalf};

  // মিটমিট করা তারা — উপরের ~৭২% জায়গায় (নিচে মসজিদ)
  const count = Math.round((width * height) / 45000);
  const palette = [COLORS.cream, COLORS.goldSoft, COLORS.white];
  const twinkles: Twinkle[] = [];
  for (let i = 0; i < count; i++) {
    const sparkle = rnd() < 0.18;
    twinkles.push({
      x: rnd() * width,
      y: rnd() * height * 0.72,
      r: sparkle ? 5 + rnd() * 5 : 1.4 + rnd() * 2.6,
      period: 2.2 + rnd() * 4.2,
      phase: rnd(),
      sparkle,
      color: palette[Math.floor(rnd() * palette.length)],
    });
  }

  // দূরের স্কাইলাইন (মূল মসজিদের জায়গা বাদ দিয়ে, পুরো প্রস্থে)
  const sky: SkyItem[] = [];
  const mosqueHalf = (MOSQUE.w * mosqueScale) / 2 - 40;
  let x = -20;
  while (x < width + 20) {
    const isMinaret = rnd() < 0.38;
    const w = isMinaret ? 11 : 70 + rnd() * 60;
    const h = isMinaret ? 120 + rnd() * 70 : 50 + rnd() * 70;
    const cx = x + w / 2;
    if (Math.abs(cx - width / 2) > mosqueHalf) sky.push({kind: isMinaret ? 'minaret' : 'dome', x, w, h});
    x += w + 24 + rnd() * 60;
  }

  return {
    orientation: lay.orientation,
    gridS,
    starR,
    strokeW,
    crescent,
    mosqueScale,
    twinkles,
    sky,
    quiet,
    beamLen: Math.hypot(width, height) * 0.95,
  };
}

// ---------------------------------------------------------------- আকৃতি-সহায়ক
/** অষ্টভুজাকার তারা {8/2}: ১৬ কোণ — বাইরের ব্যাসার্ধ R, ভেতরের ≈ ০.৭৬৫৪·R; ০° = সোজা ওপরে */
function octagramPoints(R: number): string {
  const inner = R * 0.7654;
  const pts: string[] = [];
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 4 - Math.PI / 2;
    const b = a + Math.PI / 8;
    pts.push(`${(R * Math.cos(a)).toFixed(2)},${(R * Math.sin(a)).toFixed(2)}`);
    pts.push(`${(inner * Math.cos(b)).toFixed(2)},${(inner * Math.sin(b)).toFixed(2)}`);
  }
  return pts.join(' ');
}

/** ৪-কোনা ঝিলিক (sparkle) */
function sparklePoints(s: number): string {
  const q = s * 0.2;
  return [
    [0, -s], [q, -q], [s, 0], [q, q], [0, s], [-q, q], [-s, 0], [-q, -q],
  ].map(([px, py]) => `${px.toFixed(2)},${py.toFixed(2)}`).join(' ');
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// ---------------------------------------------------------------- স্তর ১: ইসলামী তারা-গ্রিড
const StarGrid: React.FC<{width: number; height: number; t: number; geo: Geo}> = ({width, height, t, geo}) => {
  const {gridS, starR, strokeW} = geo;
  const outer = useMemo(() => octagramPoints(starR), [starR]);
  const inner = useMemo(() => octagramPoints(starR * 0.5), [starR]);
  const rowH = gridS * 0.866; // হেক্স-ইট ব্যবস্থা
  const rows = Math.ceil(height / rowH) + 2;
  const cols = Math.ceil(width / gridS) + 2;
  const {min, max} = BG.patternOpacity;
  const wavePhase = (t / BG.patternWavePeriod) * TAU;

  const items: React.ReactNode[] = [];
  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const x = c * gridS + (r % 2 === 0 ? 0 : gridS / 2) + gridS / 2;
      const y = r * rowH + gridS / 2;
      const dir = (r + c) % 2 === 0 ? 1 : -1; // পাশাপাশি তারা উল্টো দিকে ঘোরে
      const ang = dir * BG.patternDegPerSec * t + ((r * 7 + c * 13) % 8) * 5.625; // প্রতিটির আলাদা শুরুর কোণ (৮-ভাঁজ প্রতিসম, তাই স্বাভাবিক)
      // কোণ-বরাবর ভাসমান ঢেউ — অপাসিটি [min, max]
      const wave = 0.5 + 0.5 * Math.sin(wavePhase - ((x + y) / (width + height)) * TAU * 1.5);
      const op = min + (max - min) * wave;
      items.push(
        <g key={`${r}_${c}`} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(2)})`} opacity={op.toFixed(4)}>
          <polygon points={outer} />
          <polygon points={inner} opacity={0.7} />
          <circle r={starR * 0.08} fill={COLORS.gold} stroke="none" />
        </g>,
      );
    }
  }
  return (
    <g fill="none" stroke={COLORS.gold} strokeWidth={strokeW} strokeLinejoin="round">
      {items}
    </g>
  );
};

// ---------------------------------------------------------------- স্তর ২: আলোকরশ্মি
const BEAMS: ReadonlyArray<{angle: number; half: number; speed: number}> = [
  {angle: 104, half: 3.2, speed: 0.0},
  {angle: 120, half: 4.6, speed: 0.21},
  {angle: 136, half: 3.4, speed: 0.43},
  {angle: 151, half: 5.2, speed: 0.64},
  {angle: 167, half: 3.0, speed: 0.85},
];

const LightBeams: React.FC<{t: number; geo: Geo}> = ({t, geo}) => {
  const {x, y} = geo.crescent;
  const L = geo.beamLen;
  return (
    <g transform={`translate(${x} ${y})`}>
      {BEAMS.map((b, i) => {
        // গড-অ্যাঙ্গেল-ব্লেন্ড: কোণ ধীরে দুলে, উজ্জ্বলতা ধীরে ওঠানামা করে
        const sway = 2.4 * Math.sin(TAU * (t / 12 + b.speed));
        const breathe = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(TAU * (t / 9 + b.speed * 1.7)));
        const spread = Math.tan((b.half * Math.PI) / 180) * L;
        return (
          <polygon
            key={i}
            points={`0,0 ${L.toFixed(1)},${(-spread).toFixed(1)} ${L.toFixed(1)},${spread.toFixed(1)}`}
            fill="url(#hbg-beam)"
            opacity={breathe.toFixed(3)}
            transform={`rotate(${(b.angle + sway).toFixed(3)})`}
          />
        );
      })}
    </g>
  );
};

// ---------------------------------------------------------------- স্তর ৩: মিটমিট করা তারা
const Twinkles: React.FC<{t: number; geo: Geo}> = ({t, geo}) => {
  const {quiet, twinkles} = geo;
  return (
    <g>
      {twinkles.map((s, i) => {
        const wave = 0.5 + 0.5 * Math.sin(TAU * (t / s.period + s.phase));
        let op = 0.18 + 0.82 * wave * wave;
        const inQuiet = s.x > quiet.x0 && s.x < quiet.x1 && s.y > quiet.y0 && s.y < quiet.y1;
        if (inQuiet) op *= BG.quietFactor;
        if (s.sparkle) {
          const sc = 0.75 + 0.25 * wave;
          return (
            <polygon
              key={i}
              points={sparklePoints(s.r)}
              fill={s.color}
              opacity={(op * 0.9).toFixed(3)}
              transform={`translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) scale(${sc.toFixed(3)})`}
            />
          );
        }
        return <circle key={i} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r.toFixed(2)} fill={s.color} opacity={(op * 0.85).toFixed(3)} />;
      })}
    </g>
  );
};

// ---------------------------------------------------------------- স্তর ৪: অর্ধচন্দ্র
const Crescent: React.FC<{t: number; geo: Geo}> = ({t, geo}) => {
  const {x, y, R} = geo.crescent;
  const f = BG.crescentFloat;
  const dy = f.amp * Math.sin(TAU * (t / f.period));
  const tilt = -22 + f.tiltDeg * Math.sin(TAU * (t / (f.period * 1.7)));
  const starPulse = 0.8 + 0.2 * Math.sin(TAU * (t / 3.2));
  return (
    <g transform={`translate(${x} ${(y + dy).toFixed(2)}) rotate(${tilt.toFixed(2)})`}>
      <defs>
        <mask id="hbg-crescent-mask" maskUnits="userSpaceOnUse" x={-R * 1.5} y={-R * 1.5} width={R * 3} height={R * 3}>
          <rect x={-R * 1.5} y={-R * 1.5} width={R * 3} height={R * 3} fill="#fff" />
          <circle cx={R * 0.34} cy={0} r={R * 0.8} fill="#000" />
        </mask>
      </defs>
      <circle r={R} fill="url(#hbg-gold)" mask="url(#hbg-crescent-mask)" />
      {/* চন্দ্রের ভেতরে ছোট ঝিলিক-তারা */}
      <polygon points={sparklePoints(R * 0.2)} fill={COLORS.goldSoft} opacity={starPulse.toFixed(3)} transform={`translate(${(R * 0.5).toFixed(1)} ${(-R * 0.02).toFixed(1)})`} />
    </g>
  );
};

// ---------------------------------------------------------------- স্তর ৫: মসজিদ-সিলুয়েট ও দূরের স্কাইলাইন
/** লোকাল কোঅর্ডিনেট ১২০০×৩২০; ভূমি y=৩২০; কেন্দ্রীয় গম্বুজ x=৬০০ */
const MOSQUE_SHAPES: ReadonlyArray<string> = [
  // নিচের চওড়া দেয়াল
  'M0 285 H1200 V320 H0 Z',
  // দুই পাশের ডানা
  'M150 240 H380 V285 H150 Z',
  'M820 240 H1050 V285 H820 Z',
  // মূল হল
  'M380 215 H820 V285 H380 Z',
  // ড্রাম
  'M540 183 H660 V215 H540 Z',
  // মূল গম্বুজ
  'M512 185 C512 118 558 94 600 94 C642 94 688 118 688 185 Z',
  // পাশের দুই ছোট গম্বুজ
  'M395 215 C395 176 420 160 440 160 C460 160 485 176 485 215 Z',
  'M715 215 C715 176 740 160 760 160 C780 160 805 176 805 215 Z',
  // ডানার ছোট গম্বুজ
  'M200 240 C200 214 214 204 230 204 C246 204 260 214 260 240 Z',
  'M940 240 C940 214 954 204 970 204 C986 204 1000 214 1000 240 Z',
  // বাম মিনার: খুঁটি, বারান্দা, মাথা
  'M288 108 H312 V285 H288 Z',
  'M280 140 H320 V151 H280 Z',
  'M288 108 C288 86 300 74 300 48 C300 74 312 86 312 108 Z',
  // ডান মিনার
  'M888 108 H912 V285 H888 Z',
  'M880 140 H920 V151 H880 Z',
  'M888 108 C888 86 900 74 900 48 C900 74 912 86 912 108 Z',
];

/** জানালার আলো: [x, y, w, h] */
const WINDOWS: ReadonlyArray<readonly [number, number, number, number]> = [
  [408, 232, 9, 18], [448, 232, 9, 18], [488, 232, 9, 18], [528, 232, 9, 18],
  [663, 232, 9, 18], [703, 232, 9, 18], [743, 232, 9, 18], [783, 232, 9, 18],
  [296, 176, 8, 16], [896, 176, 8, 16],
  [200, 256, 8, 16], [250, 256, 8, 16], [950, 256, 8, 16], [1000, 256, 8, 16],
];

const Skyline: React.FC<{width: number; height: number; t: number; geo: Geo}> = ({width, height, t, geo}) => {
  const H = height;
  const s = geo.mosqueScale;
  const farFill = '#073A29';

  return (
    <g>
      {/* ভূমি-রেখা */}
      <rect x={0} y={H - 26} width={width} height={26} fill="#083826" />
      {/* দূরের স্কাইলাইন */}
      <g fill={farFill}>
        {geo.sky.map((it, i) => {
          if (it.kind === 'minaret') {
            const top = H - it.h;
            return (
              <g key={i}>
                <rect x={it.x} y={top} width={it.w} height={it.h} />
                <path d={`M${it.x - 2} ${top} C${it.x - 2} ${top - 16} ${it.x + it.w / 2} ${top - 20} ${it.x + it.w / 2} ${top - 40} C${it.x + it.w / 2} ${top - 20} ${it.x + it.w + 2} ${top - 16} ${it.x + it.w + 2} ${top} Z`} />
                <rect x={it.x - 5} y={top + it.h * 0.28} width={it.w + 10} height={5} />
              </g>
            );
          }
          const hb = it.h * 0.45;
          const dh = it.h * 0.55;
          const by = H - hb;
          return (
            <g key={i}>
              <rect x={it.x} y={by} width={it.w} height={hb} />
              <path d={`M${it.x} ${by} C${it.x} ${(by - dh * 1.3).toFixed(1)} ${it.x + it.w} ${(by - dh * 1.3).toFixed(1)} ${it.x + it.w} ${by} Z`} />
            </g>
          );
        })}
      </g>
      {/* মূল মসজিদ */}
      <g transform={`translate(${(width / 2 - (MOSQUE.w * s) / 2).toFixed(2)} ${(H - MOSQUE.h * s).toFixed(2)}) scale(${s})`}>
        {/* গম্বুজের পেছনে মৃদু আভা */}
        <ellipse cx={600} cy={150} rx={190} ry={120} fill="url(#hbg-dome-glow)" />
        <g fill="url(#hbg-mosque)">
          {MOSQUE_SHAPES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {/* চূড়া (ফিনিয়াল) */}
        <g fill={COLORS.gold} opacity={0.85}>
          <rect x={598.5} y={58} width={3} height={36} />
          <circle cx={600} cy={54} r={5} />
          <rect x={298.8} y={32} width={2.4} height={18} />
          <rect x={898.8} y={32} width={2.4} height={18} />
        </g>
        {/* জানালার মৃদু ঝিলিক (ডিটারমিনিস্টিক) */}
        <g fill={COLORS.goldSoft}>
          {WINDOWS.map(([wx, wy, ww, wh], i) => {
            const flick = 0.35 + 0.3 * Math.sin(TAU * (t / (4 + (i % 3)) + i * 0.37));
            return <rect key={i} x={wx} y={wy} width={ww} height={wh} rx={ww / 2} opacity={flick.toFixed(3)} />;
          })}
        </g>
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- মূল কম্পোনেন্ট
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const t = frame / fps;

  const geo = useMemo(() => buildGeo(width, height), [width, height]);

  // স্তর ১: গ্রেডিয়েন্ট-ড্রিফট ও ভাসমান আভা
  const gx = 50 + 5 * Math.sin(TAU * (t / BG.driftPeriod.x));
  const gy = 36 + 3 * Math.cos(TAU * (t / BG.driftPeriod.y));
  const blobSize = Math.max(width, height) * 0.9;
  const blobX = width * (0.3 + 0.12 * Math.sin(TAU * (t / 19)));
  const blobY = height * (0.55 + 0.1 * Math.cos(TAU * (t / 23)));

  // স্তর ৪: অর্ধচন্দ্রের হ্যালো
  const {x: cx, y: cy, R} = geo.crescent;
  const haloOp = 0.6 + 0.25 * Math.sin(TAU * (t / 5));
  const haloSize = R * 7;

  // স্তর ৬: ভূমির সবুজ কুয়াশা (হালকা ওঠানামা)
  const fogOp = clamp01(0.85 + 0.15 * Math.sin(TAU * (t / 7)));

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bgDeep, overflow: 'hidden'}}>
      {/* ১) গ্রেডিয়েন্ট */}
      <AbsoluteFill style={{background: `radial-gradient(ellipse at ${gx.toFixed(2)}% ${gy.toFixed(2)}%, ${COLORS.bgMid} 0%, ${COLORS.bgDeep} 75%)`}} />
      <div
        style={{
          position: 'absolute',
          left: blobX - blobSize / 2,
          top: blobY - blobSize / 2,
          width: blobSize,
          height: blobSize,
          background: `radial-gradient(circle, ${COLORS.glowEmerald} 0%, rgba(31,163,74,0) 60%)`,
          opacity: 0.3,
        }}
      />

      {/* ২–৪) তারা-গ্রিড, আলোকরশ্মি, মিটমিট তারা */}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <radialGradient id="hbg-beam" gradientUnits="userSpaceOnUse" cx={0} cy={0} r={geo.beamLen}>
            <stop offset="0" stopColor={COLORS.goldSoft} stopOpacity={BG.beamAlpha} />
            <stop offset="0.45" stopColor={COLORS.gold} stopOpacity={BG.beamAlpha * 0.4} />
            <stop offset="1" stopColor={COLORS.gold} stopOpacity={0} />
          </radialGradient>
        </defs>
        <StarGrid width={width} height={height} t={t} geo={geo} />
        <LightBeams t={t} geo={geo} />
        <Twinkles t={t} geo={geo} />
      </svg>

      {/* ৫) অর্ধচন্দ্রের নরম গ্লো */}
      <div
        style={{
          position: 'absolute',
          left: cx - haloSize / 2,
          top: cy - haloSize / 2,
          width: haloSize,
          height: haloSize,
          background: `radial-gradient(circle, ${COLORS.glowGold} 0%, rgba(224,184,92,0.18) 28%, rgba(224,184,92,0) 62%)`,
          opacity: haloOp,
        }}
      />

      {/* ৫–৬) অর্ধচন্দ্র + মসজিদ-সিলুয়েট */}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <linearGradient id="hbg-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={COLORS.goldSoft} />
            <stop offset="0.5" stopColor={COLORS.gold} />
            <stop offset="1" stopColor={COLORS.goldDeep} />
          </linearGradient>
          {/* y: মসজিদের লোকাল কোঅর্ডিনেট ০..৩২০ */}
          <linearGradient id="hbg-mosque" gradientUnits="userSpaceOnUse" x1={0} y1={40} x2={0} y2={320}>
            <stop offset="0" stopColor="#0F5C3C" />
            <stop offset="1" stopColor="#083826" />
          </linearGradient>
          <radialGradient id="hbg-dome-glow">
            <stop offset="0" stopColor={COLORS.emerald} stopOpacity={0.3} />
            <stop offset="1" stopColor={COLORS.emerald} stopOpacity={0} />
          </radialGradient>
        </defs>
        <Crescent t={t} geo={geo} />
        <Skyline width={width} height={height} t={t} geo={geo} />
      </svg>

      {/* ৬) ভূমির সবুজ কুয়াশা */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: height * 0.22,
          background: `radial-gradient(ellipse at 50% 100%, ${COLORS.glowEmerald} 0%, rgba(31,163,74,0.12) 45%, rgba(31,163,74,0) 75%)`,
          opacity: fogOp,
        }}
      />

      {/* ৭) ভিনিয়েট */}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.38) 100%)'}} />
    </AbsoluteFill>
  );
};
