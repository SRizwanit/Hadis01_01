// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — হেডার: অ্যাপ লোগো + "S2" চিপ + শিরোনাম + সোর্স পিল (S5.2)
//
// লেআউট (উপর থেকে নিচে, মাঝ-সারিবদ্ধ):
//   ১) লোগো — **সাদা রাউন্ডেড ব্যাজে** (D8), সোনালি বর্ডার, নরম শ্যাডো/গ্লো; ব্যাজের পাশে "S2" সোনালি চিপ
//   ২) "আজকের হাদিস" — বড়, সোনালি গ্রেডিয়েন্ট লেখা
//   ৩) পিল-ট্যাগ "সহিহ বুখারী • হাদিস নং: ০১"
//
// মাপ/অবস্থান সব `theme.ts`-এর `getLayout().header` থেকে (১৬:৯ ও ৯:১৬ আলাদা; ৯:১৬-তে শীর্ষে ১৫০px সেফ-জোন বজায়)।
// টেক্সট `hadis-data.ts` (`TITLE`, `SOURCE_LINE`, `SEASON`) থেকে — এই ফাইলে হাতে লেখা নেই।
//
// এন্ট্রান্স (সেকেন্ডে, `HEADER_TIMING`):
//   লোগো  ০–০.৮   স্প্রিং স্কেল-ইন
//   চিপ   ০.৫–    লোগোর পর স্প্রিং পপ
//   শিরোনাম ০.৩–১.০ নিচ থেকে ফেড-আপ
//   পিল   ০.৬–১.২  ডানদিক থেকে স্লাইড
//
// নিয়ম: শুধু useCurrentFrame()/spring/interpolate — CSS transition/animation, Math.random, Date নয় (রেন্ডারে ঝিলমিল এড়াতে)।
// `opacity` প্রপ: HadisVideo (S6.1) আউটরোতে হেডার ফেড-আউট করতে এটি দেবে (ডিফল্ট ১)।
// `useCurrentFrame()` স্থানীয় ফ্রেম — হেডারকে `<Sequence>`-এর ভেতরে রাখলে এন্ট্রান্স সেই Sequence-এর শুরু থেকে চলবে।

import React from 'react';
import {Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import logo from './logo.jpg';
import {SEASON, SOURCE_LINE, TITLE} from './hadis-data';
import {COLORS, FONTS, FONT_WEIGHTS, GRADIENTS, RADIUS, getLayout, getUnit} from './theme';

const TAU = Math.PI * 2;

/** এন্ট্রান্স সময় (সেকেন্ড) */
export const HEADER_TIMING = {
  logo: {start: 0, duration: 0.8},
  chip: {start: 0.5},
  title: {start: 0.3, end: 1.0},
  pill: {start: 0.6, end: 1.2},
} as const;

/** এন্ট্রান্স-অ্যানিমেশনের মান */
const MOTION = {
  titleRiseY: 40,
  pillSlideX: 140,
  logoSpring: {damping: 11, stiffness: 110, mass: 0.8},
  chipSpring: {damping: 10, stiffness: 160, mass: 0.6},
  /** ব্যাজের সোনালি গ্লো ধীরে ওঠানামার পিরিয়ড (সেকেন্ড) */
  glowPeriod: 3.5,
} as const;

export type HeaderProps = {
  /** পুরো হেডারের অপাসিটি (০–১); আউটরোতে ফেড-আউটের জন্য */
  opacity?: number;
};

const ease = Easing.out(Easing.cubic);

export const Header: React.FC<HeaderProps> = ({opacity = 1}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const lay = getLayout(width, height);
  const h = lay.header;
  const u = getUnit(width, height);
  const sec = frame / fps;

  // ---- লোগো: স্প্রিং স্কেল-ইন (০–০.৮ সে.)
  const logoScale = spring({
    frame,
    fps,
    config: MOTION.logoSpring,
    durationInFrames: Math.round(HEADER_TIMING.logo.duration * fps),
  });
  const logoOpacity = interpolate(sec, [0, 0.2], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // ---- "S2" চিপ: লোগোর পর পপ
  const chipFrame = Math.max(0, frame - Math.round(HEADER_TIMING.chip.start * fps));
  const chipScale = spring({frame: chipFrame, fps, config: MOTION.chipSpring});
  const chipOpacity = interpolate(sec, [HEADER_TIMING.chip.start, HEADER_TIMING.chip.start + 0.15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ---- শিরোনাম: নিচ থেকে ফেড-আপ (০.৩–১.০ সে.)
  const titleP = interpolate(sec, [HEADER_TIMING.title.start, HEADER_TIMING.title.end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

  // ---- পিল: ডানদিক থেকে স্লাইড (০.৬–১.২ সে.)
  const pillP = interpolate(sec, [HEADER_TIMING.pill.start, HEADER_TIMING.pill.end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

  // ---- ব্যাজের সোনালি গ্লো (ডিটারমিনিস্টিক ধীর ওঠানামা)
  const glow = 0.32 + 0.14 * Math.sin(TAU * (sec / MOTION.glowPeriod));

  // ---- মাপ
  const badgeSize = h.logoHeight * u;
  const borderW = Math.max(3, h.logoHeight * 0.027) * u;
  const badgeRadius = Math.min(RADIUS.badge, h.logoHeight * 0.24) * u;
  const innerSize = badgeSize - 2 * (h.logoPad * u + borderW);

  return (
    <div
      style={{
        position: 'absolute',
        top: h.top * u,
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: h.gap * u,
        opacity,
      }}
    >
      {/* ১) লোগো-ব্যাজ + S2 চিপ */}
      <div
        data-part="badge"
        style={{
          position: 'relative',
          width: badgeSize,
          height: badgeSize,
          transform: `scale(${logoScale.toFixed(4)})`,
          opacity: logoOpacity,
        }}
      >
        <div
          style={{
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            background: COLORS.white,
            border: `${borderW}px solid ${COLORS.gold}`,
            borderRadius: badgeRadius,
            padding: h.logoPad * u,
            boxShadow: `0 ${10 * u}px ${30 * u}px ${COLORS.shadow}, 0 0 ${44 * u}px rgba(224,184,92,${glow.toFixed(3)})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Img src={logo} style={{width: innerSize, height: innerSize, objectFit: 'contain', borderRadius: badgeRadius * 0.45}} />
        </div>

        {/* "S2" সোনালি পিল-চিপ — ব্যাজের ডানে (বাইরে), লেআউটের উচ্চতা বাড়ায় না */}
        <div
          data-part="chip"
          style={{
            position: 'absolute',
            left: `calc(100% + ${18 * u}px)`,
            bottom: 10 * u,
            transform: `scale(${chipScale.toFixed(4)})`,
            transformOrigin: 'left center',
            opacity: chipOpacity,
            background: GRADIENTS.gold,
            color: COLORS.ink,
            fontFamily: FONTS.sans,
            fontWeight: FONT_WEIGHTS.semibold,
            fontSize: h.chipSize * u,
            lineHeight: 1.2,
            letterSpacing: 0,
            padding: `${6 * u}px ${18 * u}px`,
            borderRadius: RADIUS.pill,
            boxShadow: `0 ${4 * u}px ${14 * u}px ${COLORS.shadow}`,
            whiteSpace: 'nowrap',
          }}
        >
          {SEASON}
        </div>
      </div>

      {/* ২) শিরোনাম "আজকের হাদিস" — সোনালি গ্রেডিয়েন্ট লেখা */}
      <div
        data-part="title"
        style={{
          fontFamily: FONTS.serif,
          fontWeight: FONT_WEIGHTS.bold,
          fontSize: h.titleSize * u,
          lineHeight: 1.4,
          letterSpacing: 0,
          fontKerning: 'normal',
          padding: '0.06em 0.12em',
          whiteSpace: 'nowrap',
          backgroundImage: GRADIENTS.gold,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          filter: `drop-shadow(0 ${4 * u}px ${10 * u}px ${COLORS.shadow})`,
          opacity: titleP,
          transform: `translateY(${((1 - titleP) * MOTION.titleRiseY * u).toFixed(2)}px)`,
        }}
      >
        {TITLE}
      </div>

      {/* ৩) সোর্স পিল-ট্যাগ "সহিহ বুখারী • হাদিস নং: ০১" */}
      <div
        data-part="pill"
        style={{
          fontFamily: FONTS.sans,
          fontWeight: FONT_WEIGHTS.medium,
          fontSize: h.pillSize * u,
          lineHeight: 1.4,
          letterSpacing: 0,
          color: COLORS.goldSoft,
          background: 'rgba(5,46,33,0.62)',
          border: `${2 * u}px solid ${COLORS.line}`,
          borderRadius: RADIUS.pill,
          padding: `${7 * u}px ${28 * u}px`,
          whiteSpace: 'nowrap',
          boxShadow: `0 ${4 * u}px ${14 * u}px ${COLORS.shadow}`,
          opacity: pillP,
          transform: `translateX(${((1 - pillP) * MOTION.pillSlideX * u).toFixed(2)}px)`,
        }}
      >
        {SOURCE_LINE}
      </div>
    </div>
  );
};
