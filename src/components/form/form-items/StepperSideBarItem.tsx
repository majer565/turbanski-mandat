"use client";

import { Dot } from "lucide-react";
import React from "react";

interface StepperSideBarItem {
  title: string;
  active: boolean;
  onClick: () => void;
}

const StepperSideBarItem = ({ title, active, onClick }: StepperSideBarItem) => {
  return (
    <div onClick={onClick} className={`${active && "border-r-2 border-r-primary"} w-64 h-8 items-center flex cursor-pointer hover:text-primary`}>
      <Dot className="w-12 h-12" />
      <span>{title}</span>
    </div>
  );
};

export default StepperSideBarItem;
