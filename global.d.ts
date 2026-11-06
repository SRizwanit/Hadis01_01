// অ্যাসেট ইম্পোর্টের টাইপ ডিক্লারেশন (Remotion/webpack ফাইলটির URL স্ট্রিং রিটার্ন করে)
// নোট: এই ফাইলে কোনো import/export রাখা যাবে না, নইলে এটি গ্লোবাল ডিক্লারেশন থাকবে না।

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.wav' {
  const src: string;
  export default src;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}
