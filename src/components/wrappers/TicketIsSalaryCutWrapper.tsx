import React from "react";

interface TicketIsSalaryCutWrapperProps {
  isSalarayCut: string;
}

const TicketIsSalaryCutWrapper = ({ isSalarayCut }: TicketIsSalaryCutWrapperProps) => {
  return isSalarayCut === "Tak" ? (
    <div className="bg-success text-muted p-[2px] rounded-md flex justify-center">
      Tak
    </div>
  ) : (
    <div className="bg-destructive text-muted p-1 rounded-md flex justify-center">
      Nie
    </div>
  );
};

export default TicketIsSalaryCutWrapper;
