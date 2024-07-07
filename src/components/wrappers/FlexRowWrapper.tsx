import React from "react";

const FlexRow = ({ children }: React.PropsWithChildren) => {
  return <div className="flex">{children}</div>;
};

export default FlexRow;
