import { RootState } from "@/store/store";
import {
  findShipyards,
  getAgent,
  handleSystemString,
  showAvailableShips,
} from "@/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@/components/Modal/Modal";
import { ShipyardModel, ShipyardShopModel, TraitModel } from "@/models";
import { setSystem } from "@/store/slices/uiSlice";
import { BuyShipTable } from "./BuyShipTable";

interface BuyShipModalProps {
  open: boolean;
  onClose: () => void;
  updateList: () => void;
}

export const BuyShipModal = ({
  open,
  onClose,
  updateList,
}: BuyShipModalProps) => {
  const { data } = useSession();
  const dispatch = useDispatch();
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
    const getSystems = async () => {
      const { data: agentData } = await getAgent({ token });

      const newSystem = handleSystemString(agentData.headquarters);
      dispatch(setSystem(newSystem));
    };

    if (!system && token) {
      getSystems();
    }
  }, [token, dispatch, system]);

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
      <BuyShipTable
        token={token}
        waypoints={shipList}
        updateList={updateList}
      />
    </Modal>
  );
};
