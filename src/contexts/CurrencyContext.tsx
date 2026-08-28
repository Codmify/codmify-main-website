"use client";

import { Currency, detectDefaultCurrency } from "@/utils/currency";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext<Currency | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("NGN");

  useEffect(() => {
    // Timezone is only knowable client-side; computing it during render would
    // mismatch the server-rendered "NGN" default and break hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrency(detectDefaultCurrency());
  }, []);

  return <CurrencyContext.Provider value={currency}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
}
