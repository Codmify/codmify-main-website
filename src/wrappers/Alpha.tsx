"use client";

import { customTheme } from "@/lib/theme";
import { ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { Provider } from "react-redux";
// import { store } from "@/store/index";
import NextTopLoader from "nextjs-toploader";

// const queryClient = new QueryClient();

export default function AlphaWrapper({ children }: { children: ReactNode }) {
  return (
    // <Provider store={store}>
    //   <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={customTheme}>
      <NextTopLoader color="#000" showSpinner={false} />
      {children}
    </ThemeProvider>
    //   </QueryClientProvider>
    // </Provider>
  );
}
