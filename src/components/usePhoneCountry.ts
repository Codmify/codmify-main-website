"use client";
import { useEffect, useRef, useState } from "react";
import { getCountries, type CountryCode } from "@/lib/contact-validation";
const countries = getCountries();
export default function usePhoneCountry() {
  const [country, setCountry] = useState<CountryCode>("NG");
  const countryTouched = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    const detect = async () => {
      let detected: string | undefined;
      try {
        const response = await fetch("/api/contact-country", { signal: controller.signal });
        if (response.ok) detected = (await response.json()).country;
      } catch { /* Country selection remains available if detection fails. */ }
      if (!detected) {
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const zones: Record<string, string> = { "Africa/Lagos": "NG", "Europe/London": "GB", "Asia/Kolkata": "IN", "Asia/Calcutta": "IN", "Africa/Accra": "GH", "Africa/Nairobi": "KE", "Africa/Johannesburg": "ZA", "Asia/Dubai": "AE" };
        detected = zones[zone];
        if (!detected) {
          for (const language of navigator.languages) {
            try { detected = new Intl.Locale(language).region; } catch { /* Ignore unsupported locale. */ }
            if (detected) break;
          }
        }
      }
      if (!controller.signal.aborted && !countryTouched.current && detected && countries.includes(detected as CountryCode)) setCountry(detected as CountryCode);
    };
    void detect();
    return () => controller.abort();
  }, []);

  return { country, setCountry, markCountryTouched: () => { countryTouched.current = true; } };
}
