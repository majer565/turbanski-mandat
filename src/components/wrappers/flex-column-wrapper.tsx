import React from "react";

interface FlexColumnProps {
  children: React.ReactNode;
  className?: string;
}

const FlexColumn = ({ children, className }: FlexColumnProps) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

export default FlexColumn;
