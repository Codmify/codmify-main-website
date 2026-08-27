import { Currency, formatAmount } from "@/utils/currency";

export type WebsitePackage = {
  name: string;
  audience: string;
  startingPriceNGN?: number;
  startingPriceUSD?: number;
  customQuote?: string;
  intro: string;
  features: string[];
  timeline?: string;
  cta: string;
  sample?: { label: string; url: string };
  featured?: boolean;
};

export const whatsappNumber = "2349031874139";

export const websitePackages: WebsitePackage[] = [
  {
    name: "Starter Website",
    audience: "New businesses, restaurants, fashion brands, salons, churches, schools and SMEs.",
    startingPriceNGN: 200000,
    startingPriceUSD: 550,
    intro: "Everything you need to launch a polished online presence.",
    features: ["Up to 5 pages", "Mobile responsive", "Contact form", "WhatsApp integration", "Google Maps", "Basic SEO", "Domain setup", "SSL", "30 days support"],
    timeline: "2–5 working days",
    cta: "Get Started",
    sample: { label: "View sample", url: "https://www.eklektosapostolicnetwork.org" },
  },
  {
    name: "Business Website",
    audience: "Businesses ready to grow online.",
    startingPriceNGN: 350000,
    startingPriceUSD: 1200,
    intro: "A complete growth-ready website with the tools to keep it current.",
    features: ["CMS", "Blog", "Booking forms", "Team pages", "Portfolio", "Animations", "Google Analytics", "Performance optimization", "Email setup"],
    timeline: "1–2 weeks",
    cta: "Book a Discovery Call",
    sample: { label: "View sample", url: "https://750hrstracker.com" },
    featured: true,
  },
  {
    name: "E-commerce Store",
    audience: "Fashion, beauty, electronics, supermarkets and furniture businesses.",
    startingPriceNGN: 650000,
    startingPriceUSD: 1800,
    intro: "A store built to sell, manage orders and delight customers.",
    features: ["Unlimited products", "Online payments", "Delivery integration", "Inventory", "Coupons", "Admin dashboard", "Customer accounts", "Email notifications"],
    timeline: "2–3 weeks",
    cta: "Start Selling Online",
    sample: { label: "View sample", url: "https://ekawe.app" },
  },
  {
    name: "Custom Business System",
    audience: "Schools, hospitals, churches, logistics, hotels and companies.",
    customQuote: "Discuss with the team",
    intro: "A bespoke system designed around the way your organisation works.",
    features: ["Custom dashboards", "Roles & permissions", "Reports", "APIs", "Cloud deployment", "Documentation"],
    timeline: "Timeline scoped after discovery",
    cta: "Talk to the Team",
  },
];

const priceForCurrency = (pkg: WebsitePackage, currency: Currency) => (currency === "USD" ? pkg.startingPriceUSD : pkg.startingPriceNGN);

export const getPackageDisplayPrice = (pkg: WebsitePackage, currency: Currency): string => {
  const amount = priceForCurrency(pkg, currency);
  return amount !== undefined ? formatAmount(amount, currency) : pkg.customQuote ?? "";
};

export const getLowestStartingPrice = (currency: Currency): string => {
  const amounts = websitePackages.map((pkg) => priceForCurrency(pkg, currency)).filter((amount): amount is number => amount !== undefined);
  return formatAmount(Math.min(...amounts), currency);
};

export const getPackageWhatsAppUrl = (pkg: WebsitePackage, displayPrice: string) => {
  const message = `Hello Codmify team,\n\nI am interested in the ${pkg.name} package (${displayPrice}).\n\nBusiness name: \nIndustry: \nWhat I need help with: \nPreferred timeline: \n\nPlease share the next steps. Thank you.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};
