import React, { Suspense } from "react";

import { Loading, MarketInfo, Modal } from "@/components";
import { FeedbackType, MyShipModel } from "@/models";

interface MarketModalProps {
  waypoint: string;
  isOpen: boolean;
  ship?: MyShipModel;
  onClose: () => void;
  updateCargo: ({ message, type }: FeedbackType) => void;
}

export const MarketModal = ({
  waypoint,
  isOpen,
  ship,
  onClose,
  updateCargo,
}: MarketModalProps) => (
  <Modal open={isOpen} title={`Marketplace - ${waypoint}`} onClose={onClose}>
    <Suspense fallback={<Loading />}>
      <div className="m-6">
        <MarketInfo
          asteroidWaypointSymbol={waypoint}
          ship={ship}
          updateCargo={updateCargo}
        />
      </div>
    </Suspense>
  </Modal>
);
