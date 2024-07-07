import React from "react";

const PageWrapper = ({ children }: React.PropsWithChildren) => {
  return <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">{children}</div>;
};

export default PageWrapper;
