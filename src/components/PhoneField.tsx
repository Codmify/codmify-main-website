"use client";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { Autocomplete, Stack, TextField, InputAdornment } from "@mui/material";
import { getCountries, getCountryCallingCode, type CountryCode } from "@/lib/contact-validation";
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const countries = getCountries().sort((a, b) => (regionNames.of(a) || a).localeCompare(regionNames.of(b) || b));
const flag = (country: string) => [...country].map(c => String.fromCodePoint(127397 + c.charCodeAt(0))).join("");

export default function PhoneField({ country, onCountryChange, value, onChange, disabled, error, countryError }: {
  country: CountryCode; onCountryChange: (country: CountryCode) => void; value: string;
  onChange: (value: string) => void; disabled: boolean; error?: string; countryError?: string;
}) {
  return <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
    <Autocomplete
      options={countries} value={country} disabled={disabled} disableClearable
      onChange={(_, selected) => {
        // A pasted international number must not retain the old country prefix
        // alongside the newly selected dial code.
        if (selected !== country && value.trim().startsWith("+")) {
          const parsed = parsePhoneNumberFromString(value, { extract: false });
          if (parsed) onChange(parsed.nationalNumber);
          else {
            const digits = value.replace(/\D/g, "");
            const previousCode = getCountryCallingCode(country);
            onChange(digits.startsWith(previousCode) ? digits.slice(previousCode.length) : "");
          }
        }
        onCountryChange(selected);
      }}
      getOptionLabel={code => `${flag(code)} ${regionNames.of(code)} (+${getCountryCallingCode(code)})`}
      noOptionsText="No matching country" autoHighlight
      sx={{ width: { xs: "100%", md: 260 }, flexShrink: 0 }}
      renderInput={params => <TextField {...params} name="country" label="Country" required error={Boolean(countryError)} helperText={countryError} slotProps={{ ...params.slotProps, htmlInput: { ...params.slotProps.htmlInput, autoComplete: "off" } }} />}
    />
    <TextField disabled={disabled} name="phone" label="Phone number" type="tel" onChange={event => onChange(event.target.value.replace(/[^\d+\s().-]/g, ""))} value={value} fullWidth required error={Boolean(error)} helperText={error || "Enter a local number or paste a full international number."} slotProps={{ htmlInput: { maxLength: 40, autoComplete: "tel-national", inputMode: "tel" }, input: { startAdornment: <InputAdornment position="start">+{getCountryCallingCode(country)}</InputAdornment> } }} />
  </Stack>;
}
