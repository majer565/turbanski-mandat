import React from "react";

const PageWrapper = ({ children }: React.PropsWithChildren) => {
  return <div className="flex flex-col w-full sm:gap-4 sm:py-4">{children}</div>;
};

export default PageWrapper;
