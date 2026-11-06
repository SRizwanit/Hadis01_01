// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — হাদিসের টেক্সট, মেটা ও সেকশন সংজ্ঞা (S4.3)
//
// নিয়ম:
//  • শব্দ-টাইমিং আসে **hadis0101.synced.json** থেকে (S3.3-এ সাইলেন্স দিয়ে সংশোধিত) — মূল hadis0101.json নয়।
//  • সেকশন/উপ-বাক্য সংজ্ঞায়িত হয় **শব্দ-ইনডেক্স রেঞ্জে** (০-ভিত্তিক, ইনক্লুসিভ); সময় সবসময় শব্দ থেকেই বের হয়,
//    তাই টাইমিং আবার সংশোধন হলেও এই ফাইলে হাত দিতে হয় না (যতক্ষণ শব্দ-সংখ্যা/ক্রম একই থাকে)।
//  • এই ফাইলে অন্য কোনো লোকাল ফাইল (config/theme) import করা হয়নি — স্বাধীনভাবে টেস্টযোগ্য।
//  • enum/parameter-property নেই (Node type-stripping দিয়ে টেস্ট করা যায়)।
//  • আরবি: S3.1 সিদ্ধান্ত অনুযায়ী **শুধু আংশিক** (সেকশন B) — পূর্ণ আরবি পাঠ নেই।
//
// নতুন হাদিসের জন্য: JSON ফাইল বদলে নিচের "মেটা" ও "সেকশন" অংশ মিলিয়ে নিন (S8.4)।

import syncedWords from './hadis0101.synced.json';

// ---------------------------------------------------------------- টাইপ
/** JSON-এর একটি শব্দ: সময় সেকেন্ডে */
export type Word = {word: string; start: number; end: number};

export type SectionId = 'A' | 'B' | 'C' | 'D';
export type SectionKind = 'narration' | 'arabic' | 'translation' | 'lesson';
export type PhraseId = 'C1' | 'C2' | 'C3';

export type Section = {
  id: SectionId;
  kind: SectionKind;
  /** বাংলা লেবেল (UI/লগের জন্য) */
  label: string;
  /** প্রথম শব্দের ইনডেক্স (ইনক্লুসিভ) */
  first: number;
  /** শেষ শব্দের ইনডেক্স (ইনক্লুসিভ) */
  last: number;
};

export type Phrase = {id: PhraseId; sectionId: SectionId; first: number; last: number};

/** টাইমিংসহ সমৃদ্ধ শব্দ — Karaoke/buildPages এটিই ব্যবহার করবে */
export type HadisWord = Word & {
  /** পুরো হাদিসে ০-ভিত্তিক ক্রম */
  index: number;
  /** শেষ অক্ষর `। , : ? ! ;` — বিরতি-শব্দ (পেজ ভাঙার জায়গা) */
  isPause: boolean;
  sectionId: SectionId;
  sectionKind: SectionKind;
  /** সেকশন C-র উপ-বাক্য; অন্য সেকশনে null */
  phraseId: PhraseId | null;
};

// ---------------------------------------------------------------- মেটা (S3.1 সিদ্ধান্ত অনুযায়ী অপরিবর্তিত)
export const TITLE = 'আজকের হাদিস';
export const SOURCE = 'সহিহ বুখারী';
export const NUMBER = 'হাদিস নং: ০১';
export const APP_NAME = 'ইসলামী বিশ্বকোষ ও আল হাদিস';
export const SEASON = 'S2';

/** পিল-ট্যাগে দেখানো লাইন: "সহিহ বুখারী • হাদিস নং: ০১" */
export const SOURCE_LINE = `${SOURCE} • ${NUMBER}`;
/** সেকশন D-র কার্ডে লেবেল */
export const LESSON_LABEL = 'শিক্ষা';
/** (পুরনো) আউটরোর ছোট ক্যাপশন — S5.6-এ আপনার নির্দেশে আউটরোতে আর দেখানো হয় না; ভবিষ্যতের জন্য রাখা */
export const OUTRO_CAPTION = 'শেয়ার করুন, আমল করুন';
/** আউটরো লাইন ১ (S5.6): প্লে স্টোরে ডাউনলোডের আহ্বান */
export const OUTRO_DOWNLOAD_LINE = 'আজই প্লে স্টোর থেকে ডাউনলোড করুন:';
/** আউটরো লাইন ২ (S5.6): "ইসলামী বিশ্বকোষ ও আল হাদিস S2 অ্যাপ।" — অংশগুলো আলাদা, যাতে Outro "S2" চিপ হিসেবে আঁকতে পারে */
export const OUTRO_APP_SUFFIX = 'অ্যাপ।';
export const OUTRO_APP_LINE = `${APP_NAME} ${SEASON} ${OUTRO_APP_SUFFIX}`;

// ---------------------------------------------------------------- আরবি (শুধু আংশিক, সেকশন B)
/** শুধু অডিওতে যতটুকু উচ্চারিত — পূর্ণ পাঠ নয় (S3.1)। হারাকাতসহ। */
export const ARABIC_PARTIAL = 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ';

// ---------------------------------------------------------------- সেকশন (শব্দ-ইনডেক্স রেঞ্জ, ০-ভিত্তিক)
export const SECTIONS: readonly Section[] = [
  {id: 'A', kind: 'narration', label: 'বর্ণনা', first: 0, last: 33},
  {id: 'B', kind: 'arabic', label: 'আরবি', first: 34, last: 36},
  {id: 'C', kind: 'translation', label: 'অনুবাদ', first: 37, last: 66},
  {id: 'D', kind: 'lesson', label: LESSON_LABEL, first: 67, last: 82},
];

/** সেকশন C-র উপ-বাক্য: "প্রত্যেক কাজ … সম্পর্কিত।" / "আর মানুষ … পাবে।" / "তাই যার হিজরত … প্রাপ্য।" */
export const PHRASES: readonly Phrase[] = [
  {id: 'C1', sectionId: 'C', first: 37, last: 41},
  {id: 'C2', sectionId: 'C', first: 42, last: 48},
  {id: 'C3', sectionId: 'C', first: 49, last: 66},
];

// ---------------------------------------------------------------- শব্দ
/** বিরতি-শব্দ চেনার নিয়ম (sync-fix.mjs-এর সাথে একই: । , : ? ! ;) */
export function isPauseWord(text: string): boolean {
  return /[।,:?!;]$/.test(text.trim());
}

/** মূল (synced) শব্দ-তালিকা, অপরিবর্তিত */
export const RAW_WORDS: readonly Word[] = syncedWords as Word[];

export function sectionIndexOf(wordIndex: number): number {
  return SECTIONS.findIndex((s) => wordIndex >= s.first && wordIndex <= s.last);
}

function phraseOf(wordIndex: number): PhraseId | null {
  const p = PHRASES.find((ph) => wordIndex >= ph.first && wordIndex <= ph.last);
  return p ? p.id : null;
}

/** সমৃদ্ধ শব্দ-তালিকা: index, isPause, সেকশন, উপ-বাক্য সহ */
export const WORDS: readonly HadisWord[] = RAW_WORDS.map((w, index) => {
  const section = SECTIONS[sectionIndexOf(index)];
  return {
    word: w.word,
    start: w.start,
    end: w.end,
    index,
    isPause: isPauseWord(w.word),
    sectionId: section ? section.id : 'A',
    sectionKind: section ? section.kind : 'narration',
    phraseId: phraseOf(index),
  };
});

export const WORD_COUNT = WORDS.length;
/** শেষ শব্দের শেষ (সে.) — synced ফাইলে অডিওর দৈর্ঘ্যের সমান (38.32) */
export const SPEECH_END_SEC = WORDS[WORDS.length - 1].end;
/** প্রথম শব্দের শুরু (সে.) */
export const SPEECH_START_SEC = WORDS[0].start;

// ---------------------------------------------------------------- সেকশন/উপ-বাক্য হেলপার
export function getSection(id: SectionId): Section {
  const s = SECTIONS.find((x) => x.id === id);
  if (!s) throw new Error(`অজানা সেকশন: ${id}`);
  return s;
}

export function getSectionOfWord(wordIndex: number): Section {
  const i = sectionIndexOf(wordIndex);
  if (i < 0) throw new Error(`শব্দ #${wordIndex} কোনো সেকশনে নেই`);
  return SECTIONS[i];
}

export function wordsOfSection(id: SectionId): readonly HadisWord[] {
  const s = getSection(id);
  return WORDS.slice(s.first, s.last + 1);
}

export function wordsOfPhrase(id: PhraseId): readonly HadisWord[] {
  const p = PHRASES.find((x) => x.id === id);
  if (!p) throw new Error(`অজানা উপ-বাক্য: ${id}`);
  return WORDS.slice(p.first, p.last + 1);
}

/** সেকশনের সময়সীমা — প্রথম শব্দের শুরু থেকে শেষ শব্দের শেষ (সময় শব্দ থেকেই) */
export function getSectionTiming(id: SectionId): {startSec: number; endSec: number} {
  const ws = wordsOfSection(id);
  return {startSec: ws[0].start, endSec: ws[ws.length - 1].end};
}

/** সেকশনের পূর্ণ টেক্সট (স্পেস দিয়ে জোড়া) */
export function textOfSection(id: SectionId): string {
  return wordsOfSection(id)
    .map((w) => w.word)
    .join(' ');
}

/** কোনো সময়ে (সে.) কোন সেকশন চলছে — ফাঁক/সাইলেন্সে আগের সেকশন; শুরুর আগে A; শেষের পরে D */
export function sectionAtTime(sec: number): Section {
  let current = SECTIONS[0];
  for (const s of SECTIONS) {
    if (WORDS[s.first].start <= sec) current = s;
  }
  return current;
}

// ---------------------------------------------------------------- যাচাই (লোডের সময় চলে; ভুল হলে রেন্ডার শুরুতেই থামবে)
/** ত্রুটির তালিকা ফেরত দেয়; ফাঁকা = ঠিক আছে */
export function validateHadisData(words: readonly HadisWord[] = WORDS): string[] {
  const errors: string[] = [];

  if (words.length !== 83) errors.push(`শব্দ-সংখ্যা ৮৩ হওয়ার কথা, পাওয়া গেছে ${words.length}`);

  words.forEach((w, i) => {
    if (!(w.end > w.start)) errors.push(`শব্দ #${i} "${w.word}": end ≤ start`);
    if (i > 0 && w.start < words[i - 1].end - 1e-9) errors.push(`শব্দ #${i} "${w.word}": আগের শব্দের সাথে ওভারল্যাপ`);
  });

  // সেকশন: ০ থেকে শেষ পর্যন্ত ফাঁকহীন ও ক্রমানুসারে
  let expectFirst = 0;
  for (const s of SECTIONS) {
    if (s.first !== expectFirst) errors.push(`সেকশন ${s.id}: শুরু ${s.first}, প্রত্যাশিত ${expectFirst}`);
    if (s.last < s.first) errors.push(`সেকশন ${s.id}: last < first`);
    expectFirst = s.last + 1;
    // প্রতিটি সেকশন বিরতি-শব্দে শেষ হওয়ার কথা (পেজ ভাঙার সীমানা)
    const lastWord = words[s.last];
    if (lastWord && !lastWord.isPause) errors.push(`সেকশন ${s.id}: শেষ শব্দ "${lastWord.word}" বিরতি-শব্দ নয়`);
  }
  if (expectFirst !== words.length) errors.push(`সেকশনগুলো ${expectFirst} শব্দ ঢাকে, মোট ${words.length}`);

  // উপ-বাক্য: সেকশন C-র ভেতরে, ফাঁকহীন, প্রতিটি বিরতি-শব্দে শেষ
  const c = SECTIONS.find((s) => s.id === 'C');
  if (c) {
    let exp = c.first;
    for (const p of PHRASES) {
      if (p.first !== exp) errors.push(`উপ-বাক্য ${p.id}: শুরু ${p.first}, প্রত্যাশিত ${exp}`);
      exp = p.last + 1;
      const lw = words[p.last];
      if (lw && !lw.isPause) errors.push(`উপ-বাক্য ${p.id}: শেষ শব্দ "${lw.word}" বিরতি-শব্দ নয়`);
    }
    if (exp !== c.last + 1) errors.push(`উপ-বাক্যগুলো সেকশন C পুরো ঢাকে না (শেষ ${exp - 1}, প্রত্যাশিত ${c.last})`);
  }

  // সেকশন B-র লেখা ARABIC_PARTIAL-এর সাথে মিলছে কি (বাংলা উচ্চারণ ৩ শব্দ ↔ আরবি ৩ শব্দ)
  const b = SECTIONS.find((s) => s.id === 'B');
  if (b) {
    const bCount = b.last - b.first + 1;
    const arCount = ARABIC_PARTIAL.trim().split(/\s+/).length;
    if (bCount !== arCount) errors.push(`সেকশন B-তে ${bCount} শব্দ, ARABIC_PARTIAL-এ ${arCount} শব্দ`);
  }

  return errors;
}

const _errors = validateHadisData();
if (_errors.length > 0) {
  throw new Error(`hadis-data.ts যাচাই ব্যর্থ:\n - ${_errors.join('\n - ')}`);
}
