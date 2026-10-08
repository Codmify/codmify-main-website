import { NextRequest, NextResponse } from "next/server";
import { getCountries, type CountryCode } from "libphonenumber-js";
export function GET(request: NextRequest) {
  // Hosting-provided country estimate; no precise location or external lookup.
  const country = process.env.VERCEL ? request.headers.get("x-vercel-ip-country") : null;
  return NextResponse.json({ country: country && getCountries().includes(country as CountryCode) ? country : null }, { headers: { "Cache-Control": "private, no-store" } });
}
