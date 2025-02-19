import { MyShipModel } from "@/models/ship.model";
import { Button, Typography } from "@mui/material";
import React, { useRef, useState } from "react";

import { BuyShipModal, NavShipModal, ShipTable } from "@/components";

export interface TableRef {
  refetch: () => void;
}

export const Ships = () => {
  const tableRef = useRef<TableRef>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false);
  const [selectedShip, setSelectedShip] = useState<MyShipModel | null>(null);

  const handleRefetch = () => {
    if (tableRef.current) {
      tableRef.current.refetch();
    }
  };

  return (
    <div className="flex flex-col h-full items-center mx-4">
      <Typography variant="h3" style={{ textAlign: "center" }}>
        My Ships
      </Typography>
      <Button onClick={() => setIsModalOpen(true)}>Buy Ship</Button>
      <ShipTable
        ref={tableRef}
        openModal={setIsNavModalOpen}
        selectShip={setSelectedShip}
      />

      <BuyShipModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        updateList={handleRefetch}
      />

      {selectedShip && (
        <NavShipModal
          open={isNavModalOpen}
          ship={selectedShip}
          onClose={() => setIsNavModalOpen(false)}
          updateList={handleRefetch}
        />
      )}
    </div>
  );
};
