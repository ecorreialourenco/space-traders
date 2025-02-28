import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";

import { Modal } from "@/components";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { DeliveryShips } from "./components";
import { DeliverModel } from "@/models/contract.model";
import { FeedbackType } from "@/models";

interface DeliveryProps {
  contractId: string;
  deliver: DeliverModel[];
  updateContract: ({ message, type }: FeedbackType) => void;
}

export const Delivery = ({
  contractId,
  deliver,
  updateContract,
}: DeliveryProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip title="Delivery goods">
        <span>
          <IconButton onClick={() => setIsOpen(true)}>
            <LocalShippingIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Modal
        open={isOpen}
        title="Delivery goods"
        onClose={() => setIsOpen(false)}
      >
        <div className="m-2">
          <DeliveryShips
            contractId={contractId}
            deliver={deliver}
            updateContract={updateContract}
          />
        </div>
      </Modal>
    </>
  );
};
