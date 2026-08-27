"use client";

import { Currency, detectDefaultCurrency } from "@/utils/currency";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext<Currency | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("NGN");

  useEffect(() => {
    setCurrency(detectDefaultCurrency());
  }, []);

  return <CurrencyContext.Provider value={currency}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
}
