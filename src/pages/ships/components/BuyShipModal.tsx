import { RootState } from "@/store/store";
import {
  findShipyards,
  getAgent,
  handleSystemString,
  purchaseShip,
  showAvailableShips,
} from "@/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@/components/Modal/Modal";
import { ShipyardModel, ShipyardShopModel, TraitModel } from "@/models";
import { setSystems } from "@/store/slices/uiSlice";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Feedback } from "@/components";

interface BuyShipModalProps {
  onClose: () => void;
  updateList: () => void;
}

export const BuyShipModal = ({ onClose, updateList }: BuyShipModalProps) => {
  const { data } = useSession();
  const dispatch = useDispatch();
  const { systems } = useSelector((state: RootState) => state.ui);

  const [shipyardList, setShipyardList] = useState<ShipyardModel[]>([]);
  const [shipList, setShipList] = useState<ShipyardShopModel[]>([]);
  const [error, setError] = useState<string>("");

  const token = data?.token ?? "";

  const handlePurchase = async ({
    waypoint,
    shipType,
  }: {
    waypoint: string;
    shipType: string;
  }) => {
    const purchaseData = await purchaseShip({
      token,
      waypoint,
      shipType,
    });

    if (purchaseData.data) {
      updateList();
    }

    if (purchaseData.error) {
      setError(purchaseData.error.message);
    }
  };

  const validateShipyardType = (traits: TraitModel[]) => {
    return traits.some((item) => item.symbol === "SHIPYARD");
  };

  useEffect(() => {
    const listShipyards = async () => {
      const { data: shipyardsData } = await findShipyards({
        token,
        system: systems,
      });

      setShipyardList(shipyardsData);
    };

    if (token && systems) {
      listShipyards();
    }
  }, [token, systems]);

  useEffect(() => {
    const getSystems = async () => {
      const { data: agentData } = await getAgent({ token });

      const newSystem = handleSystemString(agentData.headquarters);
      dispatch(setSystems(newSystem));
    };

    if (!systems && token) {
      getSystems();
    }
  }, [token, dispatch, systems]);

  useEffect(() => {
    const handleShipList = async () => {
      shipyardList.forEach(async (shipyard) => {
        const isShipyard = validateShipyardType(shipyard.traits);

        if (isShipyard) {
          const { data: shipData } = await showAvailableShips({
            token,
            system: systems,
            waypoint: shipyard.symbol,
          });

          if (shipData?.ships) {
            setShipList((prevState) => {
              const isShipsList = prevState.some(
                (item: ShipyardShopModel) => item.symbol === shipData?.symbol
              );

              return isShipsList ? prevState : [...prevState, shipData];
            });
          }
        }
      });
    };

    handleShipList();
  }, [shipyardList, systems, token]);

  return (
    <Modal title="Shipyard" onClose={onClose}>
      {shipList.map((shop) => (
        <div key={shop.symbol}>
          {shop.symbol}
          <Feedback
            isOpen={!!error}
            severity="error"
            message={error}
            onClose={() => setError("")}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shop.ships.map((ship) => (
                  <TableRow key={ship.type}>
                    <TableCell>{ship.name}</TableCell>
                    <TableCell>{ship.description}</TableCell>
                    <TableCell>{ship.purchasePrice}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          handlePurchase({
                            waypoint: shop.symbol,
                            shipType: ship.type,
                          })
                        }
                      >
                        Purchase
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </Modal>
  );
};
