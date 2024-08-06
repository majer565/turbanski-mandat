"use client";

import React from "react";

interface FlexRowProps {
  children: React.ReactNode;
  className?: string;
}

const FlexRow = ({ children, className }: FlexRowProps) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export default FlexRow;
