import { ThemeProvider } from "@/components/providers/theme-provider";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import FlexRow from "@/components/wrappers/FlexRowWrapper";
import PageWrapper from "@/components/wrappers/PageWrapper";
import RootWrapper from "@/components/wrappers/RootWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryClientProvider } from "../components/providers/react-query-client-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turbanski",
  description: "Turbański system zarządzania mandatami",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <RootWrapper>
              <FlexRow>
                <Sidebar />
                <PageWrapper>{children}</PageWrapper>
              </FlexRow>
              <Toaster />
            </RootWrapper>
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
