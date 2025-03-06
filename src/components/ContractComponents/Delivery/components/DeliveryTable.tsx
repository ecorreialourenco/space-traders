import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SoapIcon from "@mui/icons-material/Soap";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { NavStatus, Paginator, TableHeaderCell } from "@/components";
import { ShipNavigationAnimation } from "@/components/ShipComponents/ShipTable/components";
import { NavActionStatusEnum, NavStatusEnum } from "@/enums";
import { useDeliveryGoods, useNavigation, useShips } from "@/hooks";
import { DeliverModel, FeedbackType, MyShipModel } from "@/models";

interface DeliveryTableProps {
  deliver: DeliverModel;
  contractId: string;
  updateContract: ({ message, type }: FeedbackType) => void;
}

export const DeliveryTable = ({
  deliver,
  contractId,
  updateContract,
}: DeliveryTableProps) => {
  const [shipsList, setShipsList] = useState<MyShipModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const { data: shipsData, refetch } = useShips({ page });
  const { mutate, error } = useDeliveryGoods({ updateContract });

  const updateShip = () => {
    refetch();
  };

  const { mutate: navigateMutation } = useNavigation({
    updateShip,
  });
  const handleChangePage = (page: number) => {
    if (shipsData && page + 1 > shipsData?.meta.page) {
      setPage((prevPage) => prevPage + 1);
    } else {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleSend = ({ ship }: { ship: MyShipModel }) => {
    const contractItem = ship.cargo.inventory.find(
      (inv) => inv.symbol === deliver.tradeSymbol
    );

    if (contractItem) {
      mutate({
        contractId,
        shipSymbol: ship.symbol,
        tradeSymbol: contractItem.symbol,
        units: contractItem.units,
      });
    }

    setTimeout(() => refetch(), 500);
  };

  const handleNavigate = async ({ ship }: { ship: MyShipModel }) => {
    navigateMutation({
      waypointSymbol: deliver.destinationSymbol,
      shipId: ship.symbol,
    });
  };

  useEffect(() => {
    if (error) {
      updateContract({ message: error.message, type: "error" });
    }
  }, [error, updateContract]);

  useEffect(() => {
    if (shipsData?.data && shipsData?.meta) {
      setShipsList(shipsData.data);
      setTotal(shipsData.meta.total);
    }
  }, [shipsData]);

  return (
    <Accordion className="mb-1">
      <AccordionSummary
        className="bg-yellow-600 text-white"
        expandIcon={<ArrowDownwardIcon className="text-white" />}
      >
        <Typography component="span">{deliver.destinationSymbol}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Goods</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipsList.map((ship: MyShipModel) => {
                const contractItem = ship.cargo.inventory.find(
                  (inv) => inv.symbol === deliver.tradeSymbol
                );

                const isInContractLocation =
                  ship.nav.waypointSymbol === deliver.destinationSymbol;

                return (
                  <TableRow key={ship.registration.name}>
                    <TableCell>{ship.registration.name}</TableCell>
                    <TableCell>
                      <span
                        key={`${deliver.destinationSymbol}-${deliver.tradeSymbol}`}
                      >
                        {deliver.tradeSymbol}: {contractItem?.units ?? 0}
                      </span>
                    </TableCell>
                    <TableCell>
                      {isInContractLocation &&
                        ship.nav.status === NavStatusEnum.DOCKED && (
                          <Tooltip title="Delivery">
                            <span>
                              <IconButton
                                disabled={
                                  !isInContractLocation || !contractItem
                                }
                                onClick={() => handleSend({ ship })}
                              >
                                <SoapIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        )}

                      {!isInContractLocation &&
                        (ship.nav.status === NavStatusEnum.IN_TRANSIT ? (
                          <ShipNavigationAnimation
                            ship={ship}
                            refetch={refetch}
                          />
                        ) : (
                          <Tooltip title="Navigate">
                            <span>
                              <IconButton
                                disabled={ship.fuel.current === 0}
                                onClick={() => handleNavigate({ ship })}
                              >
                                <FlightTakeoffIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        ))}
                      {isInContractLocation &&
                        ship.nav.status !== NavStatusEnum.DOCKED && (
                          <NavStatus
                            title="Dock"
                            status={NavActionStatusEnum.DOCKED}
                            miningShipSymbol={ship.symbol}
                            refetch={refetch}
                          >
                            <FlightLandIcon />
                          </NavStatus>
                        )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Paginator
            page={page}
            total={total}
            onPageChange={handleChangePage}
          />
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
