import React from "react";

import { Modal } from "@/components";
import { FeedbackType } from "@/models";

import { PurchaseShipTable } from "./PurchaseShipTable";

interface PurchaseShipProps {
  open: boolean;
  onClose: () => void;
  updateList: ({ message, type }: FeedbackType) => void;
}

export const PurchaseShip = ({
  open,
  onClose,
  updateList,
}: PurchaseShipProps) => {
  return (
    <Modal open={open} title="Shipyard" onClose={onClose}>
      <div className="m-2">
        <PurchaseShipTable updateList={updateList} />
      </div>
    </Modal>
  );
};
