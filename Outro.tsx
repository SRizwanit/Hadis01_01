// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — আউটরো: অ্যাপ লোগো + প্লে-স্টোর আহ্বান + অ্যানিমেটেড Google Play badge (S5.6)
//
// লেআউট (উপর থেকে নিচে, মাঝ-সারিবদ্ধ; ৯:১৬-তে সেফ-জোনের ভেতরে মাঝখানে):
//   ১) অ্যাপ লোগো — সাদা রাউন্ডেড ব্যাজে (D8), সোনালি বর্ডার/গ্লো (≤ `outro.logoHeight` ৩২০/৩৬০)
//   ২) লাইন ব্রেক
//   ৩) "আজই প্লে স্টোর থেকে ডাউনলোড করুন:"
//   ৪) লাইন ব্রেক
//   ৫) "ইসলামী বিশ্বকোষ ও আল হাদিস [S2] অ্যাপ।"   (S2 সোনালি চিপ)
//   ৬) Google Play badge — অ্যানিমেটেড: স্প্রিং-পপ এন্ট্রান্স → ধীর "শ্বাস" (স্কেল) + স্পন্দিত সোনালি আভা + পর্যায়ক্রমিক আলোর ঝলক (shine)
//   পেছনে: গাঢ় সবুজ আবরণ (scrim) ধীরে ওঠে + সোনালি কণা ওপরে ভাসে (সিড-ভিত্তিক ডিটারমিনিস্টিক)
//
// সময়: `<Sequence from={audioEndFrame(...)}>`-এর ভেতরে রাখুন — তখন স্থানীয় ফ্রেম ০ = অডিও শেষ।
//   Sequence-এর বাইরে (গ্লোবাল ফ্রেমে) রাখলে `timeOffsetSec = -audioEndSec` দিন।
//   আউটরো ছোট হলে (`durationSec` < ৩.২) এন্ট্রান্স আনুপাতিক সংকুচিত হয়।
// আগের স্তরগুলো (Header/ArabicBlock/Karaoke/ProgressBar) ফেড-আউট করতে `previousLayersOpacity(secSinceAudioEnd)` ব্যবহার করুন (S6.1)।
//
// নিয়ম: শুধু useCurrentFrame()/spring/interpolate — CSS transition/animation, Math.random, Date নয় (রেন্ডারে ঝিলমিল এড়াতে)।

import React from 'react';
import {Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import logo from './logo.jpg';
import playBadge from './google-play-badge.png';
import {mulberry32} from './Background';
import {OUTRO_APP_SUFFIX, OUTRO_DOWNLOAD_LINE, APP_NAME, SEASON} from './hadis-data';
import {OUTRO_SECONDS} from './config';
import {audioSecAt} from './timing';
import {COLORS, FONTS, FONT_WEIGHTS, GRADIENTS, RADIUS, getLayout, getUnit} from './theme';

const TAU = Math.PI * 2;

/** badge ছবির মাপ (google-play-badge.png = 1600×474, স্বচ্ছ ক্রপ) */
export const BADGE_ASPECT = 1600 / 474;

/** এন্ট্রান্স/অ্যানিমেশন সময় (আউটরোর স্থানীয় সেকেন্ডে; পূর্ণ নকশা ≈ ৩.২ সে. — তারপর হোল্ড) */
export const OUTRO_TIMING = {
  /** পূর্ণ এন্ট্রান্স শেষ হওয়ার সময়; আউটরো এর চেয়ে ছোট হলে সংকুচিত */
  fullSec: 3.2,
  scrim: {start: 0, end: 0.6},
  logo: {start: 0.15, duration: 0.9},
  line1: {start: 0.55, end: 1.15},
  line2: {start: 0.85, end: 1.45},
  badge: {start: 1.5, duration: 0.9},
  /** badge "শ্বাস": স্কেল ±, পিরিয়ড (সে.) */
  breathe: {amp: 0.018, period: 2.4},
  /** আলোর ঝলক: প্রথম ঝলকের সময়, পুনরাবৃত্তির পিরিয়ড, একবার ঝলকের সময়কাল */
  shine: {first: 2.4, period: 2.4, duration: 0.9},
  /** আগের স্তর (Header/Karaoke/…) ফেড-আউটের সময়কাল (সে.) */
  prevFadeSec: 0.6,
} as const;

/** টিউনিং-মান */
export const OUTRO_LOOK = {
  /** আবরণের সর্বোচ্চ অপাসিটি */
  scrimOpacity: 0.88,
  riseY: 26,
  particleCount: 34,
  logoSpring: {damping: 11, stiffness: 110, mass: 0.8},
  badgeSpring: {damping: 9, stiffness: 140, mass: 0.7},
} as const;

const ease = Easing.out(Easing.cubic);
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

// ---------------------------------------------------------------- বিশুদ্ধ ফাংশন (টেস্টযোগ্য)
/** আগের স্তরগুলোর অপাসিটি: অডিও শেষের পর `prevFadeSec`-এ ১ → ০ (S6.1 এটি Header/ArabicBlock/Karaoke/ProgressBar-এ দেবে) */
export function previousLayersOpacity(secSinceAudioEnd: number, fadeSec: number = OUTRO_TIMING.prevFadeSec): number {
  if (!(fadeSec > 0)) return secSinceAudioEnd > 0 ? 0 : 1;
  return 1 - clamp01(secSinceAudioEnd / fadeSec);
}

/** আউটরোর সময়-সংকোচন গুণক (১ = পূর্ণ নকশা; ছোট আউটরোতে ১-এর কম) */
export function compressFactor(durationSec: number): number {
  if (!(durationSec > 0)) return 1;
  return Math.min(1, durationSec / OUTRO_TIMING.fullSec);
}

/** badge-এর আলোর ঝলকের অগ্রগতি ০..১ (ঝলক চলছে না হলে `null`) */
export function shineAt(t: number): number | null {
  const s = OUTRO_TIMING.shine;
  if (t < s.first) return null;
  const phase = (t - s.first) % s.period;
  if (phase > s.duration) return null;
  return phase / s.duration;
}

export type Particle = {x: number; y0: number; r: number; speed: number; phase: number; period: number; color: string; star: boolean};

/** সোনালি কণা — একই (width,height) → সবসময় একই বিন্যাস (Math.random নয়) */
export function getOutroParticles(width: number, height: number, count: number = OUTRO_LOOK.particleCount): Particle[] {
  const portrait = height > width;
  const rnd = mulberry32(20261106 + (portrait ? 9 : 16));
  const palette = [COLORS.goldSoft, COLORS.gold, COLORS.cream, COLORS.goldSoft];
  const out: Particle[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: rnd() * width,
      y0: rnd() * height,
      r: 2 + rnd() * 4.5,
      speed: 12 + rnd() * 30,
      phase: rnd() * TAU,
      period: 1.8 + rnd() * 2.4,
      color: palette[Math.floor(rnd() * palette.length)],
      star: rnd() < 0.22,
    });
  }
  return out;
}

/** কণার (x, y, অপাসিটি) সময় t-তে; ওপরে ভাসে, প্রান্তে ঘুরে আসে */
export function particleAt(p: Particle, t: number, height: number): {x: number; y: number; opacity: number} {
  const span = height + 80;
  const y = ((((p.y0 - p.speed * t) % span) + span) % span) - 40;
  const tw = 0.5 + 0.5 * Math.sin(TAU * (t / p.period) + p.phase);
  return {x: p.x + 10 * Math.sin(TAU * (t / (p.period * 2.6)) + p.phase), y, opacity: 0.18 + 0.62 * tw};
}

// ---------------------------------------------------------------- কম্পোনেন্ট
export type OutroProps = {
  /** পুরো আউটরোর অপাসিটি (০–১) */
  opacity?: number;
  /** আউটরোর মোট দৈর্ঘ্য (সে.) — এন্ট্রান্স সংকোচনের জন্য; ডিফল্ট `OUTRO_SECONDS` */
  durationSec?: number;
  /** স্থানীয় ফ্রেমের সময়ে যোগ হবে (সে.). `<Sequence from=অডিও-শেষ>`-এর ভেতরে ০; বাইরে হলে `-অডিও-শেষ-সেকেন্ড` */
  timeOffsetSec?: number;
};

export const Outro: React.FC<OutroProps> = ({opacity = 1, durationSec = OUTRO_SECONDS, timeOffsetSec = 0}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const lay = getLayout(width, height);
  const o = lay.outro;
  const u = getUnit(width, height);
  const rawSec = audioSecAt(frame, fps, timeOffsetSec); // S5.7: Karaoke/ProgressBar/ArabicBlock-এর মতো একই audioSecAt
  if (opacity <= 0.001 || rawSec < 0) return null;

  const k = compressFactor(durationSec);
  const t = rawSec / k; // নকশা-সময়
  const T = OUTRO_TIMING;
  const seg = (a: number, b: number) => interpolate(t, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});

  // ---- আবরণ (scrim)
  const scrimP = seg(T.scrim.start, T.scrim.end);

  // ---- লোগো
  const logoFrame = Math.max(0, (t - T.logo.start) * fps * k);
  const logoScale = spring({frame: logoFrame, fps, config: OUTRO_LOOK.logoSpring, durationInFrames: Math.max(2, Math.round(T.logo.duration * fps * k))});
  const logoOpacity = interpolate(t, [T.logo.start, T.logo.start + 0.25], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glow = 0.34 + 0.14 * Math.sin(TAU * (t / 3.5));

  // ---- দুই টেক্সট লাইন
  const l1 = seg(T.line1.start, T.line1.end);
  const l2 = seg(T.line2.start, T.line2.end);

  // ---- Google Play badge
  const badgeFrame = Math.max(0, (t - T.badge.start) * fps * k);
  const popSpring = spring({frame: badgeFrame, fps, config: OUTRO_LOOK.badgeSpring, durationInFrames: Math.max(2, Math.round(T.badge.duration * fps * k))});
  const badgeOpacity = interpolate(t, [T.badge.start, T.badge.start + 0.25], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const breathe = t > T.badge.start + T.badge.duration ? 1 + T.breathe.amp * Math.sin(TAU * ((t - T.badge.start - T.badge.duration) / T.breathe.period)) : 1;
  const badgeScale = (0.55 + 0.45 * popSpring) * breathe;
  const aura = 0.28 + 0.22 * (0.5 + 0.5 * Math.sin(TAU * ((t - T.badge.start) / T.breathe.period)));
  const shine = shineAt(t);

  // ---- মাপ
  const logoSize = o.logoHeight * u;
  const logoPad = lay.header.logoPad * u * (o.logoHeight / lay.header.logoHeight);
  const borderW = Math.max(3, o.logoHeight * 0.027) * u;
  const badgeRadius = Math.min(RADIUS.badge * 1.4, o.logoHeight * 0.24) * u;
  const innerSize = logoSize - 2 * (logoPad + borderW);
  const bw = o.badgeWidth * u;
  const bh = bw / BADGE_ASPECT;

  const particles = getOutroParticles(width, height);

  const rise = (p: number) => `translateY(${((1 - p) * OUTRO_LOOK.riseY * u).toFixed(2)}px)`;
  const textShadow = `0 ${3 * u}px ${12 * u}px rgba(0,0,0,0.5)`;

  return (
    <div data-part="outro" style={{position: 'absolute', inset: 0, opacity, overflow: 'hidden'}}>
      {/* আবরণ: ব্যাকগ্রাউন্ড ম্লান করে লেখা ফোটায় */}
      <div
        data-part="outro-scrim"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 48%, rgba(11,74,51,0.55) 0%, rgba(5,46,33,0.95) 78%)`,
          opacity: scrimP * OUTRO_LOOK.scrimOpacity,
        }}
      />

      {/* সোনালি কণা */}
      <svg data-part="outro-particles" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position: 'absolute', inset: 0, opacity: scrimP}}>
        {particles.map((p, i) => {
          const a = particleAt(p, t, height);
          const r = p.r * u;
          return (
            <g key={i} opacity={+a.opacity.toFixed(3)}>
              <circle cx={+a.x.toFixed(2)} cy={+a.y.toFixed(2)} r={+(r * 3).toFixed(2)} fill={p.color} opacity={0.14} />
              {p.star ? (
                <path
                  d={`M ${a.x.toFixed(2)} ${(a.y - r * 2.6).toFixed(2)} L ${(a.x + r * 0.7).toFixed(2)} ${(a.y - r * 0.7).toFixed(2)} L ${(a.x + r * 2.6).toFixed(2)} ${a.y.toFixed(2)} L ${(a.x + r * 0.7).toFixed(2)} ${(a.y + r * 0.7).toFixed(2)} L ${a.x.toFixed(2)} ${(a.y + r * 2.6).toFixed(2)} L ${(a.x - r * 0.7).toFixed(2)} ${(a.y + r * 0.7).toFixed(2)} L ${(a.x - r * 2.6).toFixed(2)} ${a.y.toFixed(2)} L ${(a.x - r * 0.7).toFixed(2)} ${(a.y - r * 0.7).toFixed(2)} Z`}
                  fill={p.color}
                />
              ) : (
                <circle cx={+a.x.toFixed(2)} cy={+a.y.toFixed(2)} r={+r.toFixed(2)} fill={p.color} />
              )}
            </g>
          );
        })}
      </svg>

      {/* কনটেন্ট কলাম */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxSizing: 'border-box',
          paddingTop: lay.safe.top * u,
          paddingBottom: lay.safe.bottom * u,
          paddingLeft: lay.safe.side * u,
          paddingRight: lay.safe.side * u,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* ১) লোগো-ব্যাজ */}
        <div
          data-part="outro-logo"
          style={{
            boxSizing: 'border-box',
            width: logoSize,
            height: logoSize,
            background: COLORS.white,
            border: `${borderW}px solid ${COLORS.gold}`,
            borderRadius: badgeRadius,
            padding: logoPad,
            boxShadow: `0 ${12 * u}px ${34 * u}px ${COLORS.shadow}, 0 0 ${54 * u}px rgba(224,184,92,${glow.toFixed(3)})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${logoScale.toFixed(4)})`,
            opacity: logoOpacity,
          }}
        >
          <Img src={logo} style={{width: innerSize, height: innerSize, objectFit: 'contain', borderRadius: badgeRadius * 0.45}} />
        </div>

        {/* ২) লাইন ১ */}
        <div
          data-part="outro-line1"
          style={{
            marginTop: o.gap * u,
            fontFamily: FONTS.sans,
            fontWeight: FONT_WEIGHTS.semibold,
            fontSize: o.captionSize * u,
            lineHeight: 1.5,
            letterSpacing: 0,
            color: COLORS.goldSoft,
            textShadow,
            whiteSpace: 'nowrap',
            opacity: l1,
            transform: rise(l1),
          }}
        >
          {OUTRO_DOWNLOAD_LINE}
        </div>

        {/* ৩) লাইন ২: অ্যাপ-নাম + S2 চিপ + "অ্যাপ।" */}
        <div
          data-part="outro-line2"
          style={{
            marginTop: o.gap * 0.2 * u,
            fontFamily: FONTS.serif,
            fontWeight: FONT_WEIGHTS.bold,
            fontSize: o.titleSize * u,
            lineHeight: 1.5,
            letterSpacing: 0,
            fontKerning: 'normal',
            color: COLORS.cream,
            textShadow,
            textWrap: 'balance',
            opacity: l2,
            transform: rise(l2),
          }}
        >
          {APP_NAME}{' '}
          <span
            data-part="outro-s2"
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              background: GRADIENTS.gold,
              color: COLORS.ink,
              fontFamily: FONTS.sans,
              fontWeight: FONT_WEIGHTS.semibold,
              fontSize: '0.62em',
              lineHeight: 1.2,
              padding: `${0.1 * o.titleSize * u}px ${0.3 * o.titleSize * u}px`,
              borderRadius: RADIUS.pill,
              textShadow: 'none',
              boxShadow: `0 ${4 * u}px ${14 * u}px ${COLORS.shadow}`,
            }}
          >
            {SEASON}
          </span>{' '}
          {OUTRO_APP_SUFFIX}
        </div>

        {/* ৪) Google Play badge (অ্যানিমেটেড) */}
        <div
          data-part="outro-badge"
          style={{
            position: 'relative',
            marginTop: o.gap * 1.15 * u,
            width: bw,
            height: bh,
            opacity: badgeOpacity,
            transform: `scale(${badgeScale.toFixed(4)})`,
          }}
        >
          {/* স্পন্দিত সোনালি আভা */}
          <div
            style={{
              position: 'absolute',
              left: -bw * 0.06,
              right: -bw * 0.06,
              top: -bh * 0.3,
              bottom: -bh * 0.3,
              borderRadius: bh * 0.7,
              background: `radial-gradient(ellipse at 50% 50%, rgba(224,184,92,${(aura * 0.9).toFixed(3)}) 0%, rgba(224,184,92,0) 68%)`,
            }}
          />
          <Img src={playBadge} style={{position: 'relative', width: '100%', height: '100%', display: 'block', filter: `drop-shadow(0 ${8 * u}px ${20 * u}px rgba(0,0,0,0.45))`}} />
          {/* আলোর ঝলক — badge-এর আকৃতিতেই মাস্ক করা */}
          {shine !== null ? (
            <div
              data-part="outro-shine"
              data-shine={shine.toFixed(4)}
              style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                WebkitMaskImage: `url(${playBadge})`,
                maskImage: `url(${playBadge})`,
                WebkitMaskSize: '100% 100%',
                maskSize: '100% 100%',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-20%',
                  bottom: '-20%',
                  width: '26%',
                  left: `${(-35 + 160 * interpolate(shine, [0, 1], [0, 1], {easing: Easing.inOut(Easing.quad)})).toFixed(2)}%`,
                  transform: 'skewX(-22deg)',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)',
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
