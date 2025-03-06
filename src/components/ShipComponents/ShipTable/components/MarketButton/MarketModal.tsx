import React, { Suspense } from "react";

import { Loading, MarketInfo, Modal } from "@/components";
import { MyShipModel } from "@/models";

interface MarketModalProps {
  waypoint: string;
  isOpen: boolean;
  ship?: MyShipModel;
  onClose: () => void;
}

export const MarketModal = ({
  waypoint,
  isOpen,
  ship,
  onClose,
}: MarketModalProps) => {
  return (
    <Modal open={isOpen} title={`Marketplace - ${waypoint}`} onClose={onClose}>
      <Suspense fallback={<Loading />}>
        <div className="m-6">
          <MarketInfo asteroidWaypointSymbol={waypoint} ship={ship} />
        </div>
      </Suspense>
    </Modal>
  );
};
