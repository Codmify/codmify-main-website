import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js/max";
export { getCountries, getCountryCallingCode };
export type { CountryCode };
export type ContactData = { name: string; email: string; phone: string; message: string; consent: boolean; country: CountryCode };
export type ContactErrors = Partial<Record<keyof ContactData, string>>;
export function validateContact(input: unknown) {
  const body = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const value = (key: string) => typeof body[key] === "string" ? (body[key] as string).trim() : "";
  const country = value("country") as CountryCode;
  const data: ContactData = { name: value("name"), email: value("email"), phone: value("phone"), message: value("message"), consent: body.consent === true, country };
  const errors: ContactErrors = {};
  if (data.name.length < 2 || data.name.length > 100 || /[\r\n\x00-\x1f]/.test(data.name)) errors.name = "Enter your name (2–100 characters).";
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (!getCountries().includes(country)) errors.country = "Select your country.";
  const phone = !errors.country && data.phone.length <= 40 && /^[+\d\s().-]+$/.test(data.phone) ? parsePhoneNumberFromString(data.phone, { defaultCountry: country, extract: false }) : undefined;
  if (!phone?.isValid() || phone.ext || phone.country !== country) errors.phone = "Enter a valid phone number for the selected country.";
  else data.phone = phone.number;
  if (data.message.length < 10 || data.message.length > 5000) errors.message = "Write a message between 10 and 5,000 characters.";
  if (!data.consent) errors.consent = "Please agree to the terms and conditions.";
  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export function validateHire(input: unknown, allowedServices: string[]) {
  const body = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const checked = validateContact({ ...body, message: body.projectDescription });
  const errors: Record<string, string | undefined> = { ...checked.errors };
  if (errors.message) { errors.projectDescription = errors.message; delete errors.message; }
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const selected = category.split(", ").filter(Boolean);
  if (!selected.length || new Set(selected).size !== selected.length || selected.some(value => !allowedServices.includes(value))) errors.category = "Choose at least one available service.";
  const companyName = typeof body.companyName === "string" ? body.companyName.trim() : "";
  if (companyName.length > 150 || /[\r\n\x00-\x1f]/.test(companyName)) errors.companyName = "Enter a company name up to 150 characters.";
  return { data: { ...checked.data, category, companyName, projectDescription: checked.data.message }, errors, valid: Object.keys(errors).length === 0 };
}
