import { CONNECT_PROFILE as P } from "@/lib/connect";
import { CONNECT_PHOTO_JPEG_BASE64 } from "@/lib/connect-photo";

export const dynamic = "force-static";

// vCard 3.0 is the version iOS Contacts and Android both import cleanly.
function esc(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/[,;]/g, (c) => `\\${c}`);
}

// RFC 6350 asks for lines of at most 75 octets, continued with CRLF + space.
function fold(line: string) {
  if (line.length <= 75) return line;
  const parts = [line.slice(0, 75)];
  for (let i = 75; i < line.length; i += 74) parts.push(" " + line.slice(i, i + 74));
  return parts.join("\r\n");
}

export function GET() {
  const a = P.address;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(P.lastName)};${esc(P.firstName)};;;`,
    `FN:${esc(P.name)}`,
    `ORG:${esc(P.company)}`,
    `TITLE:${esc(P.role)}`,
    `TEL;TYPE=CELL,VOICE:${P.phoneE164}`,
    `EMAIL;TYPE=INTERNET,WORK:${P.email}`,
    `URL:${P.site}`,
    `ADR;TYPE=WORK:;;${esc(a.street)};${esc(a.city)};${esc(a.region)};;${esc(a.country)}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${P.linkedin}`,
    `X-SOCIALPROFILE;TYPE=instagram:${P.instagram}`,
    `PHOTO;ENCODING=b;TYPE=JPEG:${CONNECT_PHOTO_JPEG_BASE64}`,
    "END:VCARD",
  ];

  return new Response(lines.map(fold).join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Muhammed-Shifal.vcf"',
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
