import { ThemeProvider } from "@/components/providers/theme-provider";
import Sidebar from "@/components/Sidebar";
import FlexRowWrapper from "@/components/wrappers/FlexRowWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootWrapper from "@/components/wrappers/RootWrapper";
import PageWrapper from "@/components/wrappers/PageWrapper";

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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <FlexRowWrapper>
            <RootWrapper>
              <Sidebar />
              <PageWrapper>{children}</PageWrapper>
            </RootWrapper>
          </FlexRowWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
