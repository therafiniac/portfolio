import { NextResponse } from "next/server";

// A real, downloadable vCard — every field below is the same verified
// fact used elsewhere on the site (contact.ts's email/location, the
// GitHub/LinkedIn profile links, hero.ts's name/role), not anything
// invented for this file specifically. Folder name literally includes
// ".vcf" — a plain, documented Next.js App Router convention for giving
// a route handler a real file-extension URL instead of an extensionless
// one, which matters here since some contact-import flows key off the
// URL's own extension, not just the Content-Type header.
const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:Rafi Ahmed Laskar",
  "N:Laskar;Rafi Ahmed;;;",
  "TITLE:Full Stack Developer",
  "EMAIL;TYPE=INTERNET:therafiniac@gmail.com",
  "URL:https://rafiera.com",
  "URL:https://github.com/therafiniac",
  "URL:https://linkedin.com/in/therafiniac",
  "ADR;TYPE=WORK:;;;Kolkata;;;India",
  "END:VCARD",
].join("\r\n");

export function GET() {
  return new NextResponse(VCARD, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="rafi-ahmed-laskar.vcf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
