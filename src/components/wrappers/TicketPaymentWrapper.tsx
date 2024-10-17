import React from "react";

interface TicketPaymentWrapperProps {
  paid: boolean;
  content: string;
}

const TicketPaymentWrapper = ({ paid, content }: TicketPaymentWrapperProps) => {
  return paid ? (
    <div className="bg-success text-muted p-[2px] rounded-md flex justify-center">
      {content}
    </div>
  ) : (
    <div className="bg-destructive text-muted p-1 rounded-md flex justify-center">
      {content}
    </div>
  );
};

export default TicketPaymentWrapper;
