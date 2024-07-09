import React from "react";

const SideBarWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r border-border bg-background sm:flex">
      <div className="flex flex-col items-center gap-4 px-2 sm:py-5">{children}</div>
    </aside>
  );
};

export default SideBarWrapper;
