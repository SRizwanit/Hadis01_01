import {Config} from '@remotion/cli/config';

// ইসলামী বিশ্বকোষ ও আল হাদিস S2 — Remotion সাধারণ কনফিগ
// রেজোলিউশন/স্কেল/CRF/কনকারেন্সি এখানে নয়; সেগুলো render.yml-এর CLI ফ্ল্যাগে দেওয়া হয়।
// (setPublicDir ব্যবহার করা হয়নি — অ্যাসেট import করে নেওয়া হয়, রুটে node_modules আছে)

Config.setEntryPoint('./index.ts');

// ফ্রেম ফরম্যাট: JPEG দ্রুত ও ছোট; কোয়ালিটি ৯২ (ভিডিও এনকোডিংয়ে পার্থক্য প্রায় চোখে পড়ে না)
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);

// আউটপুট নিয়ম
Config.setCodec('h264');
Config.setPixelFormat('yuv420p'); // সব প্লেয়ার/সোশ্যাল প্ল্যাটফর্মে চলার জন্য
Config.setOverwriteOutput(true);
