import type { EducationEntry } from "@/types";

// From docs/Rafi_Ahmed_Laskar_CV_OnePage.docx — no graduation year listed
// there, so none is invented here.
export const education: EducationEntry[] = [
  {
    degree: {
      en: "Bachelor of Technology — Computer Science & Engineering",
      bn: "ব্যাচেলর অফ টেকনোলজি — কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিং",
    },
    institution: "Adamas University",
    location: { en: "Kolkata, India", bn: "কলকাতা, ভারত" },
  },
];
