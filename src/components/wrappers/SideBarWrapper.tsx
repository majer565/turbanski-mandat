"use client";

import React from "react";

const SideBarWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <aside className="h-svh left-0 w-18 flex-col border-r border-border bg-background sm:flex">
      <div className="flex h-full flex-col justify-between items-center gap-4 px-2 sm:py-5">{children}</div>
    </aside>
  );
};

export default SideBarWrapper;
