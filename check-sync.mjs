#!/usr/bin/env node
// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — অডিও ↔ JSON সিঙ্ক যাচাই (শুধু সাইলেন্স ডিটেকশন)
//
// ব্যবহার:
//   node check-sync.mjs                              # ডিফল্ট: hadis0101.wav + hadis0101.json
//   node check-sync.mjs --file hadis0101.synced.json # সংশোধিত JSON যাচাই
//   node check-sync.mjs --noise -40 --dur 0.3 --tol 0.3
//   node check-sync.mjs --calibrate                  # বিভিন্ন dB থ্রেশহোল্ডে তুলনা
//
// যাচাই:
//   C1 শুরু | C2 শেষ | C3 মোট দৈর্ঘ্য  → ফেইল হলে exit code 1
//   C4 মাঝের বিরতি                      → শুধু WARN
// স্পিচ-রিকগনিশন/ট্রান্সক্রিপশন ব্যবহার করা হয় না।

import {spawnSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';

// ---------- আর্গুমেন্ট ----------
function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
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
const JSON_FILE = args.file ?? 'hadis0101.json';
const NOISE = Number(args.noise ?? -35); // dB
const MIN_DUR = Number(args.dur ?? 0.25); // সেকেন্ড
const TOL = Number(args.tol ?? 0.3); // সেকেন্ড
const REPORT = args.out ?? 'sync-report.json';
const OVERLAP_RATIO = 0.7;

// ---------- অডিও দৈর্ঘ্য (WAV হেডার) ----------
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

// ---------- ffmpeg silencedetect ----------
function runSilenceDetect(wav, noise, minDur) {
  const filter = `silencedetect=noise=${noise}dB:d=${minDur}`;
  const tail = ['-hide_banner', '-nostats', '-i', wav, '-af', filter, '-f', 'null', '-'];
  const candidates = [
    ['ffmpeg'],
    ['npx', '--no-install', 'remotion', 'ffmpeg'],
  ];
  let lastErr = 'ffmpeg পাওয়া যায়নি';
  for (const [cmd, ...pre] of candidates) {
    const r = spawnSync(cmd, [...pre, ...tail], {encoding: 'utf8', maxBuffer: 64 * 1024 * 1024});
    if (r.error) {
      lastErr = `${cmd}: ${r.error.message}`;
      continue;
    }
    const text = `${r.stderr ?? ''}\n${r.stdout ?? ''}`;
    if (r.status !== 0 && !text.includes('silencedetect')) {
      lastErr = `${cmd} exit ${r.status}: ${text.slice(-300)}`;
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
  if (pending !== null) out.push({start: pending, end: duration}); // ফাইলের শেষ পর্যন্ত সাইলেন্স
  return out.map((x) => ({...x, duration: +(x.end - x.start).toFixed(3)}));
}

function analyze(silences, duration) {
  const leading = silences.find((s) => s.start <= 0.05);
  const trailing = silences.find((s) => s.end >= duration - 0.05 && s.start > 0.05);
  const speechStart = leading ? leading.end : 0;
  const speechEnd = trailing ? trailing.start : duration;
  const internal = silences.filter((s) => s !== leading && s !== trailing);
  return {leading, trailing, speechStart, speechEnd, internal};
}

const r3 = (n) => Math.round(n * 1000) / 1000;
const isPause = (w) => /[।,:?!;]$/.test(w.trim());

// ---------- মূল ----------
function main() {
  let duration = wavDuration(WAV);
  if (duration === null) {
    const t = runSilenceDetect(WAV, NOISE, MIN_DUR);
    const m = [...t.matchAll(/Duration:\s*(\d+):(\d+):([\d.]+)/g)][0];
    if (!m) throw new Error('অডিওর দৈর্ঘ্য পাওয়া যায়নি');
    duration = +m[1] * 3600 + +m[2] * 60 + parseFloat(m[3]);
  }

  // --- ক্যালিব্রেশন মোড ---
  if (args.calibrate) {
    console.log(`অডিও দৈর্ঘ্য: ${r3(duration)} সে. | ন্যূনতম সাইলেন্স: ${MIN_DUR} সে.\n`);
    const rows = [-30, -35, -40, -45, -50].map((n) => {
      const sil = parseSilences(runSilenceDetect(WAV, n, MIN_DUR), duration);
      const a = analyze(sil, duration);
      return {
        'থ্রেশহোল্ড dB': n,
        'সাইলেন্স সংখ্যা': sil.length,
        'বলা শুরু': r3(a.speechStart),
        'বলা শেষ': r3(a.speechEnd),
        'শেষে নীরবতা': r3(duration - a.speechEnd),
        'মাঝের বিরতি': a.internal.map((s) => `${r3(s.start)}–${r3(s.end)}`).join(' | ') || '—',
      };
    });
    console.table(rows);
    return 0;
  }

  const words = JSON.parse(readFileSync(JSON_FILE, 'utf8'));
  const text = runSilenceDetect(WAV, NOISE, MIN_DUR);
  const silences = parseSilences(text, duration);
  const a = analyze(silences, duration);

  const jsonStart = words[0].start;
  const jsonEnd = words[words.length - 1].end;

  const checks = [];
  const add = (id, name, pass, detail) => checks.push({id, name, status: pass ? 'PASS' : 'FAIL', detail});

  const d1 = jsonStart - a.speechStart;
  add('C1', 'শুরু মিল', Math.abs(d1) <= TOL, `JSON শুরু ${r3(jsonStart)} বনাম অডিও বলা শুরু ${r3(a.speechStart)} (পার্থক্য ${r3(d1)} সে., সীমা ±${TOL})`);

  const d2 = jsonEnd - a.speechEnd;
  add('C2', 'শেষ মিল', Math.abs(d2) <= TOL, `JSON শেষ ${r3(jsonEnd)} বনাম অডিও বলা শেষ ${r3(a.speechEnd)} (পার্থক্য ${r3(d2)} সে., সীমা ±${TOL})`);

  add('C3', 'JSON অডিওর ভেতরে', jsonEnd <= duration + 0.001, `JSON শেষ ${r3(jsonEnd)} ≤ অডিও দৈর্ঘ্য ${r3(duration)}`);

  // C4 — মাঝের বিরতি
  const wordsInSilence = [];
  const pauseWords = words.map((w, i) => ({...w, i})).filter((w) => isPause(w.word));
  const internalReport = a.internal.map((s) => {
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      const ov = Math.min(w.end, s.end) - Math.max(w.start, s.start);
      if (ov > 0 && ov / (w.end - w.start) >= OVERLAP_RATIO) {
        wordsInSilence.push({word: w.word, index: i + 1, start: w.start, end: w.end, silence: [r3(s.start), r3(s.end)]});
      }
    }
    let nearest = null;
    for (const p of pauseWords) {
      const delta = s.start - p.end; // ধনাত্মক = সাইলেন্স JSON-এর বিরতি-শব্দের পরে শুরু
      if (nearest === null || Math.abs(delta) < Math.abs(nearest.delta)) nearest = {word: p.word, index: p.i + 1, end: p.end, delta};
    }
    // JSON-এ নিজেই ফাঁক থাকলে (সংশোধিত ফাইল): শব্দ-শেষ ≈ সাইলেন্স-শুরু এবং পরের শব্দ-শুরু ≈ সাইলেন্স-শেষ
    let gapAfter = null;
    for (let i = 0; i < words.length - 1; i++) {
      if (Math.abs(words[i].end - s.start) <= TOL && Math.abs(words[i + 1].start - s.end) <= TOL) {
        gapAfter = {word: words[i].word, index: i + 1};
        break;
      }
    }
    return {
      silence: [r3(s.start), r3(s.end)],
      duration: s.duration,
      nearestPauseWord: nearest ? nearest.word : null,
      nearestPauseWordIndex: nearest ? nearest.index : null,
      nearestPauseWordEnd: nearest ? nearest.end : null,
      delta: nearest ? r3(nearest.delta) : null,
      gapAfterWord: gapAfter ? gapAfter.word : null,
      gapAfterWordIndex: gapAfter ? gapAfter.index : null,
      aligned: gapAfter ? true : nearest ? Math.abs(nearest.delta) <= TOL : false,
    };
  });
  const misaligned = internalReport.filter((x) => !x.aligned);
  const c4Warn = wordsInSilence.length > 0 || misaligned.length > 0;
  checks.push({
    id: 'C4',
    name: 'মাঝের বিরতি',
    status: c4Warn ? 'WARN' : 'PASS',
    detail: `${a.internal.length}টি বিরতি; অমিল ${misaligned.length}টি; সাইলেন্সের ভেতরে পড়া শব্দ ${wordsInSilence.length}টি`,
  });

  // ---------- আউটপুট ----------
  console.log('━━ সাইলেন্স-ভিত্তিক সিঙ্ক যাচাই ━━');
  console.log(`অডিও: ${WAV} (${r3(duration)} সে.) | JSON: ${JSON_FILE} (${words.length} শব্দ)`);
  console.log(`সেটিং: noise ${NOISE}dB, ন্যূনতম ${MIN_DUR} সে., টলারেন্স ±${TOL} সে.\n`);
  console.log(`বলা শুরু ${r3(a.speechStart)} | বলা শেষ ${r3(a.speechEnd)} | শেষে নীরবতা ${r3(duration - a.speechEnd)} সে.\n`);
  console.table(checks.map(({id, name, status, detail}) => ({id, name, status, detail})));
  if (internalReport.length) {
    console.log('মাঝের সাইলেন্স বনাম JSON-এর নিকটতম বিরতি-শব্দ:');
    console.table(
      internalReport.map((x) => ({
        'সাইলেন্স (সে.)': `${x.silence[0]}–${x.silence[1]}`,
        'নিকটতম বিরতি-শব্দ': x.gapAfterWord ? `ফাঁক: ${x.gapAfterWord} (#${x.gapAfterWordIndex}) এর পর` : `${x.nearestPauseWord} (#${x.nearestPauseWordIndex}, শেষ ${x.nearestPauseWordEnd})`,
        'পার্থক্য': x.gapAfterWord ? 0 : x.delta,
        'মিল': x.aligned ? 'হ্যাঁ' : 'না',
      })),
    );
  }
  if (wordsInSilence.length) {
    console.log('সাইলেন্সের ভেতরে পড়া শব্দ (≥70%):');
    console.table(wordsInSilence);
  }

  const failed = checks.filter((c) => c.status === 'FAIL');
  const overall = failed.length ? 'FAIL' : checks.some((c) => c.status === 'WARN') ? 'WARN' : 'PASS';
  console.log(`ফলাফল: ${overall}${failed.length ? ` (ব্যর্থ: ${failed.map((c) => c.id).join(', ')} → sync-fix.mjs / S3.3 লাগবে)` : ''}`);

  writeFileSync(
    REPORT,
    JSON.stringify(
      {
        generatedBy: 'check-sync.mjs',
        params: {wav: WAV, json: JSON_FILE, noiseDb: NOISE, minSilence: MIN_DUR, tolerance: TOL, overlapRatio: OVERLAP_RATIO},
        audioDuration: r3(duration),
        json: {words: words.length, start: jsonStart, end: jsonEnd},
        speech: {start: r3(a.speechStart), end: r3(a.speechEnd), trailingSilence: r3(duration - a.speechEnd)},
        silences: silences.map((s) => ({start: r3(s.start), end: r3(s.end), duration: s.duration})),
        internalSilences: internalReport,
        wordsInSilence,
        checks,
        overall,
      },
      null,
      2,
    ) + '\n',
  );
  console.log(`রিপোর্ট লেখা হয়েছে: ${REPORT}`);
  return failed.length ? 1 : 0;
}

try {
  process.exit(main());
} catch (err) {
  console.error('ত্রুটি:', err.message);
  process.exit(2);
}
