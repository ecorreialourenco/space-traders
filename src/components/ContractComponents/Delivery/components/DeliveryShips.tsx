import React, { useState } from "react";
import { FeedbackType } from "@/models";
import { DeliverModel } from "@/models/contract.model";
import { DeliveryTable } from "./DeliveryTable";
import { Feedback } from "@/components";

interface DeliveryShipsProps {
  contractId: string;
  deliver: DeliverModel[];
  updateContract: ({ message, type }: FeedbackType) => void;
}

export const DeliveryShips = ({
  contractId,
  deliver,
  updateContract,
}: DeliveryShipsProps) => {
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const handleUpdateContract = ({ message, type }: FeedbackType) => {
    console.log("🚀 ~ handleUpdateContract ~ message:", message);
    if (type === "error") {
      setFeedbackMessage(message);
    }
    updateContract({ message, type });
  };

  return (
    <div>
      <Feedback
        isOpen={!!feedbackMessage}
        severity="error"
        message={feedbackMessage}
        onClose={() => setFeedbackMessage("")}
      />

      <span>Required:</span>
      <ul>
        {deliver.map((item) => (
          <React.Fragment key={`${item.destinationSymbol}-${item.tradeSymbol}`}>
            <li key={item.destinationSymbol}>
              {item.tradeSymbol}: {item.unitsRequired}
            </li>

            <DeliveryTable
              deliver={item}
              contractId={contractId}
              updateContract={handleUpdateContract}
            />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
