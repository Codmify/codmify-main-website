export type Currency = "NGN" | "USD";

// Manually updated approximate rate, not a live feed. Last checked 2026-08-27.
export const NGN_PER_USD = 1550;

export function formatPrice(amountNGN: number, currency: Currency): string {
  if (currency === "NGN") {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amountNGN);
  }
  const usd = Math.round(amountNGN / NGN_PER_USD / 5) * 5;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(usd);
}

export function detectDefaultCurrency(): Currency {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === "Africa/Lagos" ? "NGN" : "USD";
  } catch {
    return "NGN";
  }
}
