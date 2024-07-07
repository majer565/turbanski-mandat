import React from "react";

const RootWrapper = ({ children }: React.PropsWithChildren) => {
  return <div className="flex min-h-screen w-full flex-col bg-muted/40">{children}</div>;
};

export default RootWrapper;
