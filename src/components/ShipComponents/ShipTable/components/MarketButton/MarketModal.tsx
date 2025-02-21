import React, { Suspense } from "react";
import { Loading, MarketInfo, Modal } from "@/components";

interface MarketModalProps {
  waypoint: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MarketModal = ({
  waypoint,
  isOpen,
  onClose,
}: MarketModalProps) => {
  return (
    <Modal open={isOpen} title={`Marketplace - ${waypoint}`} onClose={onClose}>
      <Suspense fallback={<Loading />}>
        <div className="m-6">
          <MarketInfo asteroidWaypointSymbol={waypoint} />
        </div>
      </Suspense>
    </Modal>
  );
};
