#!/usr/bin/env node
// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — সাইলেন্স-অ্যাঙ্কর পদ্ধতিতে JSON টাইমিং সংশোধন
//
// ব্যবহার:
//   node sync-fix.mjs                       # hadis0101.json + hadis0101.wav → hadis0101.synced.json
//   node sync-fix.mjs --noise -35 --dur 0.25 --maxd 0.6 --bonus 0.6 --init orig
//
// পদ্ধতি (স্পিচ-রিকগনিশন ছাড়া, শুধু সাইলেন্স):
//   ১. কণ্ঠ-শুরু ও কণ্ঠ-শেষ = অডিওর প্রথম/শেষ শব্দযুক্ত মুহূর্ত (সাইলেন্স থেকে)।
//   ২. প্রতিটি সাইলেন্সকে একটি শব্দ-সীমানায় বসানো ("অ্যাঙ্কর"):
//        পাস ১: শুধু বিরতি-চিহ্নিত শব্দের (। , : ? ! ;) পরে
//        পাস ২: বাকি সাইলেন্স যেকোনো শব্দ-সীমানায় (নিম্ন আস্থা)
//   ৩. দুই অ্যাঙ্করের মাঝের শব্দগুলোর সময় অক্ষর-সংখ্যার অনুপাতে ভাগ।
//   ৪. সাইলেন্সের সময়ে কোনো শব্দ থাকে না (ফাঁক) — তাই শব্দ কখনো নীরবতায় পড়ে না।
// মূল JSON অপরিবর্তিত; ফলাফল আলাদা ফাইলে।

import {spawnSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';

// ---------- আর্গুমেন্ট ----------
function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    const next = argv[i + 1];
    if (next === undefined || (next.startsWith('--') && isNaN(Number(next)))) out[key] = true;
    else {
      out[key] = next;
      i++;
    }
  }
  return out;
}
const args = parseArgs(process.argv.slice(2));
const WAV = args.wav ?? 'hadis0101.wav';
const IN = args.in ?? 'hadis0101.json';
const OUT = args.out ?? 'hadis0101.synced.json';
const REPORT = args.report ?? 'sync-fix-report.json';
const NOISE = Number(args.noise ?? -35);
const MIN_DUR = Number(args.dur ?? 0.25);
const MAXD = Number(args.maxd ?? 0.6); // অ্যাঙ্কর বসাতে সর্বোচ্চ দূরত্ব (সে.)
const BONUS = Number(args.bonus ?? 0.6); // বিরতি-চিহ্নিত শব্দের অগ্রাধিকার (সে.)
const MIN_WORD = Number(args['min-word'] ?? 0.12); // প্রতি শব্দের ন্যূনতম সময় (সে.)
const INIT = args.init ?? 'orig'; // orig | weighted — পাস ১-এর প্রাথমিক সময়ের ভিত্তি

// ---------- ffmpeg/অডিও (check-sync.mjs-এর সাথে একই যুক্তি) ----------
function wavDuration(path) {
  const buf = readFileSync(path);
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WAVE') return null;
  let off = 12;
  let byteRate = 0;
  while (off + 8 <= buf.length) {
    const id = buf.toString('ascii', off, off + 4);
    let size = buf.readUInt32LE(off + 4);
    const body = off + 8;
    if (id === 'fmt ') byteRate = buf.readUInt32LE(body + 8);
    if (id === 'data') {
      if (size === 0xffffffff || body + size > buf.length) size = buf.length - body;
      return byteRate ? size / byteRate : null;
    }
    off = body + size + (size % 2);
  }
  return null;
}

function runSilenceDetect(wav, noise, minDur) {
  const tail = ['-hide_banner', '-nostats', '-i', wav, '-af', `silencedetect=noise=${noise}dB:d=${minDur}`, '-f', 'null', '-'];
  let lastErr = 'ffmpeg পাওয়া যায়নি';
  for (const [cmd, ...pre] of [['ffmpeg'], ['npx', '--no-install', 'remotion', 'ffmpeg']]) {
    const r = spawnSync(cmd, [...pre, ...tail], {encoding: 'utf8', maxBuffer: 64 * 1024 * 1024});
    if (r.error) {
      lastErr = `${cmd}: ${r.error.message}`;
      continue;
    }
    const text = `${r.stderr ?? ''}\n${r.stdout ?? ''}`;
    if (r.status !== 0 && !text.includes('silencedetect')) {
      lastErr = `${cmd} exit ${r.status}`;
      continue;
    }
    return text;
  }
  throw new Error(`সাইলেন্স ডিটেকশন চালানো যায়নি — ${lastErr}`);
}

function parseSilences(text, duration) {
  const out = [];
  let pending = null;
  for (const line of text.split('\n')) {
    const s = line.match(/silence_start:\s*(-?[\d.]+)/);
    if (s) pending = Math.max(0, parseFloat(s[1]));
    const e = line.match(/silence_end:\s*(-?[\d.]+)/);
    if (e && pending !== null) {
      out.push({start: pending, end: parseFloat(e[1])});
      pending = null;
    }
  }
  if (pending !== null) out.push({start: pending, end: duration});
  return out;
}

// ---------- সহায়ক ----------
const r3 = (n) => Math.round(n * 1000) / 1000;
const isPunct = (w) => /[।,:?!;]$/.test(w.trim());
const seg = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('bn', {granularity: 'grapheme'}) : null;
function weight(word) {
  const clean = word.replace(/[।,:?!;'"’‘.\-]/g, '');
  const n = seg ? [...seg.segment(clean)].length : clean.length;
  return Math.max(1, n) + 1.5; // সংক্ষিপ্ত শব্দ যেন খুব ছোট না হয়
}

// ---------- মূল ----------
function main() {
  const words = JSON.parse(readFileSync(IN, 'utf8'));
  const N = words.length;
  const W = words.map((w) => weight(w.word));
  const duration = wavDuration(WAV);
  if (duration === null) throw new Error('WAV দৈর্ঘ্য পাওয়া যায়নি');

  const silencesAll = parseSilences(runSilenceDetect(WAV, NOISE, MIN_DUR), duration).map((s) => ({...s, start: Math.max(0, s.start)}));
  const leading = silencesAll.find((s) => s.start <= 0.05);
  const trailing = silencesAll.find((s) => s.end >= duration - 0.05 && s.start > 0.05);
  const speechStart = leading ? leading.end : 0;
  const speechEnd = trailing ? trailing.start : duration;
  const silences = silencesAll.filter((s) => s !== leading && s !== trailing).map((s, i) => ({...s, id: i}));

  // সময় তৈরি: অ্যাঙ্কর অনুযায়ী (b = ওই সাইলেন্সের আগের শেষ শব্দের ০-ভিত্তিক ইনডেক্স)
  function build(anchors) {
    const A = [...anchors].sort((x, y) => x.b - y.b);
    const cur = new Array(N);
    for (let k = 0; k <= A.length; k++) {
      const wi = k === 0 ? 0 : A[k - 1].b + 1;
      const wj = k === A.length ? N - 1 : A[k].b;
      const t0 = k === 0 ? speechStart : A[k - 1].e;
      const t1 = k === A.length ? speechEnd : A[k].s;
      const total = W.slice(wi, wj + 1).reduce((x, y) => x + y, 0);
      let acc = 0;
      const edges = [];
      for (let i = wi; i <= wj; i++) {
        edges.push(t0 + ((t1 - t0) * acc) / total);
        acc += W[i];
      }
      edges.push(t1);
      for (let i = wi; i <= wj; i++) {
        const st = i === wi ? r3(t0) : r3(edges[i - wi]);
        const en = i === wj ? r3(t1) : r3(edges[i - wi + 1]);
        cur[i] = {start: st, end: en};
      }
    }
    return cur;
  }

  function feasible(anchors) {
    const A = [...anchors].sort((x, y) => x.b - y.b);
    for (let k = 0; k <= A.length; k++) {
      const wi = k === 0 ? 0 : A[k - 1].b + 1;
      const wj = k === A.length ? N - 1 : A[k].b;
      const t0 = k === 0 ? speechStart : A[k - 1].e;
      const t1 = k === A.length ? speechEnd : A[k].s;
      if (wj < wi) return false; // দুই অ্যাঙ্করের মাঝে শব্দ নেই
      if (t1 - t0 < MIN_WORD * (wj - wi + 1)) return false;
    }
    return true;
  }

  const anchors = [];
  const used = new Set();
  const assigned = new Set();

  function pass(punctOnly, cur, label) {
    const pairs = [];
    for (const s of silences) {
      if (assigned.has(s.id)) continue;
      for (let b = 0; b < N - 1; b++) {
        if (used.has(b)) continue;
        const p = isPunct(words[b].word);
        if (punctOnly && !p) continue;
        const dist = Math.abs(cur[b].end - s.start);
        if (dist > MAXD) continue;
        pairs.push({s, b, dist, p, cost: dist - (p ? BONUS : 0)});
      }
    }
    pairs.sort((x, y) => x.cost - y.cost);
    for (const c of pairs) {
      if (assigned.has(c.s.id) || used.has(c.b)) continue;
      const ordered = anchors.every((x) => x.b !== c.b && x.s !== c.s.start && (c.s.start < x.s) === (c.b < x.b));
      if (!ordered) continue;
      const cand = {id: c.s.id, b: c.b, s: c.s.start, e: c.s.end, dist: c.dist, punct: c.p, pass: label};
      if (!feasible([...anchors, cand])) continue;
      anchors.push(cand);
      used.add(c.b);
      assigned.add(c.s.id);
    }
  }

  // প্রাথমিক আনুমানিক সময় (পাস ১-এর জন্য)
  let cur0;
  if (INIT === 'weighted') cur0 = build([]);
  else {
    const o0 = words[0].start;
    const o1 = words[N - 1].end;
    const k = (speechEnd - speechStart) / (o1 - o0);
    cur0 = words.map((w) => ({start: speechStart + (w.start - o0) * k, end: speechStart + (w.end - o0) * k}));
  }
  pass(true, cur0, 1);
  pass(false, build(anchors), 2);

  const synced = build(anchors);
  const out = words.map((w, i) => ({word: w.word, start: synced[i].start, end: synced[i].end}));

  // নিজস্ব যাচাই
  for (let i = 0; i < N; i++) {
    if (!(out[i].end > out[i].start)) throw new Error(`শব্দ #${i + 1} এর সময় অবৈধ`);
    if (i > 0 && out[i].start < out[i - 1].end - 1e-9) throw new Error(`শব্দ #${i + 1} ওভারল্যাপ করছে`);
  }

  writeFileSync(
    OUT,
    '[\n' + out.map((w) => `  {"word": ${JSON.stringify(w.word)}, "start": ${w.start}, "end": ${w.end}}`).join(',\n') + '\n]\n',
  );

  const A = [...anchors].sort((x, y) => x.b - y.b);
  const anchorReport = A.map((a) => ({
    silence: [r3(a.s), r3(a.e)],
    afterWordIndex: a.b + 1,
    afterWord: words[a.b].word,
    nextWord: words[a.b + 1].word,
    originalEnd: words[a.b].end,
    newEnd: out[a.b].end,
    newNextStart: out[a.b + 1].start,
    distanceUsed: r3(a.dist),
    pass: a.pass,
    // আস্থা: পাস ১ + বিরতি-চিহ্ন + কাছাকাছি = high; পাস ২ (সংশোধিত সময়ের ভিত্তিতে) সর্বোচ্চ medium; বিরতি-চিহ্নহীন = low
    confidence: a.punct ? (a.pass === 1 && a.dist <= 0.45 ? 'high' : 'medium') : 'low',
  }));
  const unassigned = silences.filter((s) => !assigned.has(s.id)).map((s) => [r3(s.start), r3(s.end)]);

  console.log('━━ সাইলেন্স-অ্যাঙ্কর সিঙ্ক সংশোধন ━━');
  console.log(`ইনপুট: ${IN} (${N} শব্দ) | অডিও: ${WAV} (${r3(duration)} সে.)`);
  console.log(`সেটিং: noise ${NOISE}dB, ন্যূনতম ${MIN_DUR} সে., maxd ${MAXD}, bonus ${BONUS}, init ${INIT}`);
  console.log(`কণ্ঠ: ${r3(speechStart)} – ${r3(speechEnd)} সে. | JSON আগে: ${words[0].start} – ${words[N - 1].end}\n`);
  console.table(
    anchorReport.map((a) => ({
      'সাইলেন্স': `${a.silence[0]}–${a.silence[1]}`,
      'কোন শব্দের পরে': `#${a.afterWordIndex} ${a.afterWord}`,
      'পরের শব্দ': a.nextWord,
      'আগে শেষ': a.originalEnd,
      'নতুন শেষ': a.newEnd,
      'পাস': a.pass,
      'আস্থা': a.confidence,
    })),
  );
  if (unassigned.length) console.log(`অ্যাঙ্কর ছাড়া সাইলেন্স (${unassigned.length}টি): ${unassigned.map((u) => u.join('–')).join(', ')}`);
  console.log(`\nলেখা হয়েছে: ${OUT}, ${REPORT}`);
  console.log(`পরবর্তী: node check-sync.mjs --file ${OUT}`);

  writeFileSync(
    REPORT,
    JSON.stringify(
      {
        generatedBy: 'sync-fix.mjs',
        params: {wav: WAV, input: IN, output: OUT, noiseDb: NOISE, minSilence: MIN_DUR, maxDistance: MAXD, punctuationBonus: BONUS, minWordSeconds: MIN_WORD, init: INIT},
        audioDuration: r3(duration),
        speech: {start: r3(speechStart), end: r3(speechEnd)},
        originalJson: {start: words[0].start, end: words[N - 1].end},
        anchors: anchorReport,
        unassignedSilences: unassigned,
        needsHumanReview: anchorReport.filter((a) => a.confidence !== 'high'),
      },
      null,
      2,
    ) + '\n',
  );
  return 0;
}

try {
  process.exit(main());
} catch (err) {
  console.error('ত্রুটি:', err.message);
  process.exit(2);
}
