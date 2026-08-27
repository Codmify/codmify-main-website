export type Currency = "NGN" | "USD";

export function formatAmount(amount: number, currency: Currency): string {
  if (currency === "NGN") {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

export function detectDefaultCurrency(): Currency {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === "Africa/Lagos" ? "NGN" : "USD";
  } catch {
    return "NGN";
  }
}
