import Sidebar from "@/components/Sidebar";
import FlexRow from "@/components/wrappers/FlexRowWrapper";
import PageWrapper from "@/components/wrappers/PageWrapper";

export default function MandatyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FlexRow>
      <Sidebar />
      <PageWrapper>{children}</PageWrapper>
    </FlexRow>
  );
}
