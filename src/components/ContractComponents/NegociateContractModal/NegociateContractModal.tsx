import FlightLandIcon from "@mui/icons-material/FlightLand";
import React, { useState } from "react";

import { Button, Dropdown, Modal, NavStatus } from "@/components";
import { NavActionStatusEnum, NavStatusEnum } from "@/enums";
import { useContractNegociation, useShips } from "@/hooks";
import { MyShipModel } from "@/models";

interface NegociateContractModalProps {
  open: boolean;
  onClose: () => void;
  updateList: () => void;
}

export const NegociateContractModal = ({
  open,
  onClose,
  updateList,
}: NegociateContractModalProps) => {
  const [shipId, setShipId] = useState<string>("");
  const { data: shipsData } = useShips({ page: 1 });

  const selectedShip = shipId
    ? shipsData.data.find((ship: MyShipModel) => ship.symbol === shipId)
    : undefined;

  const options = shipsData?.data.map((ship: MyShipModel) => ({
    name: ship.symbol,
    value: ship.symbol,
  }));

  const isDocked = shipId && selectedShip.nav.status === NavStatusEnum.DOCKED;

  const { mutate: negociateContract } = useContractNegociation({
    shipSymbol: shipId,
    updateList,
  });

  const handleNegociation = async () => {
    negociateContract();
  };

  return (
    <Modal open={open} title="Negociate Contract" onClose={onClose}>
      <div className="m-2">
        <div className="flex justify-between gap-2">
          <div className="w-full">
            <Dropdown
              label="Ship"
              value={shipId}
              options={options}
              onChange={(op) => setShipId(op.target.value)}
            />
          </div>
          {shipId && !isDocked && (
            <div className="flex items-center">
              <NavStatus
                title="Dock"
                status={NavActionStatusEnum.DOCKED}
                miningShipSymbol={shipId}
              >
                <FlightLandIcon />
              </NavStatus>
            </div>
          )}
        </div>

        <div className="flex justify-between gap-2">
          <div className="w-full">
            <Button
              label="Cancel"
              className="bg-gray-400 hover:bg-gray-600"
              onClick={onClose}
            />
          </div>
          <div className="w-full">
            <Button
              label="Negociate contract"
              disabled={!isDocked}
              onClick={handleNegociation}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
