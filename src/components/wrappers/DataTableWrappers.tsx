import React from "react";

export const DataTableHeaderWrapper = ({ children }: React.PropsWithChildren) => {
  return <div className="w-full flex justify-between">{children}</div>;
};

export const DataTableFilterWrapper = ({ children }: React.PropsWithChildren) => {
  return <div className="flex gap-4">{children}</div>;
};

export const DataTableOptionsWrapper = ({ children }: React.PropsWithChildren) => {
  return <div className="flex justify-end gap-4">{children}</div>;
};

export const DataTableWrapper = ({ children }: React.PropsWithChildren) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};
