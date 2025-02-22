import { RootState } from "@/store/store";
import { findShipyards, showAvailableShips } from "@/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "@/components";
import {
  FeedbackType,
  ShipyardModel,
  ShipyardShopModel,
  TraitModel,
} from "@/models";
import { BuyShipTable } from "./BuyShipTable";

interface BuyShipModalProps {
  open: boolean;
  onClose: () => void;
  updateList: ({ message, type }: FeedbackType) => void;
}

export const BuyShipModal = ({
  open,
  onClose,
  updateList,
}: BuyShipModalProps) => {
  const { data } = useSession();
  const { system } = useSelector((state: RootState) => state.ui);

  const [shipyardList, setShipyardList] = useState<ShipyardModel[]>([]);
  const [shipList, setShipList] = useState<ShipyardShopModel[]>([]);

  const token = data?.token ?? "";

  const validateShipyardType = (traits: TraitModel[]) => {
    return traits.some((item) => item.symbol === "SHIPYARD");
  };

  const storeShipList = (shipData: ShipyardShopModel) => {
    setShipList((prevState) => {
      const isShipsList = prevState.some(
        (item: ShipyardShopModel) => item.symbol === shipData?.symbol
      );

      return isShipsList ? prevState : [...prevState, shipData];
    });
  };

  useEffect(() => {
    const listShipyards = async () => {
      const { data: shipyardsData } = await findShipyards({ token, system });
      setShipyardList(shipyardsData);
    };

    if (token && system) {
      listShipyards();
    }
  }, [token, system]);

  useEffect(() => {
    const handleShipList = async () => {
      shipyardList.forEach(async (shipyard) => {
        const isShipyard = validateShipyardType(shipyard.traits);

        if (isShipyard) {
          const { data: shipData } = await showAvailableShips({
            token,
            system,
            waypoint: shipyard.symbol,
          });

          if (shipData?.ships) {
            storeShipList(shipData);
          }
        }
      });
    };

    handleShipList();
  }, [shipyardList, system, token]);

  return (
    <Modal open={open} title="Shipyard" onClose={onClose}>
      <div className="m-2">
        <BuyShipTable
          token={token}
          waypoints={shipList}
          updateList={updateList}
        />
      </div>
    </Modal>
  );
};
