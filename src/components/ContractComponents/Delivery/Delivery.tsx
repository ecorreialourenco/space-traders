import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";

import { Modal } from "@/components";
import { FeedbackType } from "@/models";
import { DeliverModel } from "@/models/contract.model";

import { DeliveryShips } from "./components";

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
