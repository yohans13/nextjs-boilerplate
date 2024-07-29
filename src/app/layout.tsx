import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { GlobalStoreProvider } from "@/providers/global-store.provider";
import { ThemeProviderHOC } from "@/components/theme-provider-hoc";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "New Wesbsite",
  description: "New Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStoreProvider>
          <AppRouterCacheProvider options={{ key: "css" }}>
            <ThemeProviderHOC children={children} />
          </AppRouterCacheProvider>
        </GlobalStoreProvider>
      </body>
    </html>
  );
}
