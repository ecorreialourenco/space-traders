import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PublicIcon from "@mui/icons-material/Public";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { NavStatus, Paginator, TableHeaderCell } from "@/components";
import { NavActionStatusEnum, NavStatusEnum } from "@/enums";
import { useShips } from "@/hooks";
import { FeedbackType, MyShipModel } from "@/models";
import { TableRef } from "@/pages/ships/Ships";
import { checkMiningLocation } from "@/utils";

import {
  InfoButton,
  MarketButton,
  Navigation,
  ShipNavigationAnimation,
  ShipRefuel,
  Surveying,
} from "./components";
import { Extract } from "./components/Extract";

interface ShipTableProps {
  openModal: (val: boolean) => void;
  selectShip: (ship: MyShipModel) => void;
  setInfo: ({ message, type }: FeedbackType) => void;
}

export const ShipTable = forwardRef<TableRef, ShipTableProps>(
  function ShipTable({ openModal, selectShip, setInfo }, forwardedRef) {
    const [shipsList, setShipsList] = useState<MyShipModel[]>([]);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const { data } = useSession();
    const token = data?.token ?? "";

    const { data: shipsData, refetch } = useShips({ page });

    const handleChangePage = (page: number) => {
      if (shipsData && page + 1 > shipsData?.meta.page) {
        setPage((prevPage) => prevPage + 1);
      } else {
        setPage((prevPage) => prevPage - 1);
      }
    };

    const handleUpdateCargo = ({ message, type }: FeedbackType) => {
      setInfo({ message, type });

      refetch();
    };

    useImperativeHandle(forwardedRef, () => ({
      refetch,
    }));

    useEffect(() => {
      if (shipsData?.data && shipsData?.meta) {
        setShipsList(shipsData.data);
        setTotal(shipsData.meta.total);
      }
    }, [shipsData]);

    return (
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableHeaderCell> </TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Location</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell>Fuel</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipsList.map((ship: MyShipModel) => (
              <TableRow key={ship.registration.name}>
                <TableCell sx={{ padding: 0 }}>
                  <InfoButton ship={ship} />
                </TableCell>
                <TableCell>{ship.registration.name}</TableCell>
                <TableCell>{ship.registration.role}</TableCell>
                <TableCell>{ship.nav.waypointSymbol}</TableCell>
                <TableCell>{ship.nav.status}</TableCell>
                <TableCell>
                  {ship.cargo.units} / {ship.cargo.capacity}
                </TableCell>
                <TableCell>
                  {ship.fuel.current} / {ship.fuel.capacity}
                </TableCell>
                <TableCell>
                  {ship.nav.status === NavStatusEnum.IN_TRANSIT ? (
                    <ShipNavigationAnimation ship={ship} refetch={refetch} />
                  ) : (
                    <>
                      <ShipRefuel
                        token={token}
                        ship={ship}
                        onRefuel={handleUpdateCargo}
                      />
                      {ship.nav.status === NavStatusEnum.DOCKED ? (
                        <NavStatus
                          title="Orbit"
                          status={NavActionStatusEnum.IN_ORBIT}
                          miningShipSymbol={ship.symbol}
                          refetch={refetch}
                        >
                          <PublicIcon />
                        </NavStatus>
                      ) : (
                        <NavStatus
                          title="Dock"
                          status={NavActionStatusEnum.DOCKED}
                          miningShipSymbol={ship.symbol}
                          refetch={refetch}
                        >
                          <FlightLandIcon />
                        </NavStatus>
                      )}
                      <NavStatus
                        title="Navigate"
                        status={NavActionStatusEnum.IN_ORBIT}
                        miningShipSymbol={ship.symbol}
                        refetch={refetch}
                        onClick={() => {
                          openModal(true);
                          selectShip(ship);
                        }}
                      >
                        <FlightTakeoffIcon />
                      </NavStatus>
                      <Navigation route={ship.nav.route.destination} />
                      {ship.cargo.capacity > ship.cargo.units && (
                        <>
                          {ship.nav.status === NavStatusEnum.IN_ORBIT &&
                            ship.mounts.some(
                              (mount) => mount.symbol === "MOUNT_SURVEYOR_II"
                            ) && (
                              <Surveying
                                token={token}
                                ship={ship}
                                updateCargo={handleUpdateCargo}
                              />
                            )}
                          {ship.nav.status === NavStatusEnum.IN_ORBIT &&
                            checkMiningLocation(
                              ship.nav.route.destination.type
                            ) && (
                              <Extract
                                ship={ship}
                                updateCargo={handleUpdateCargo}
                              />
                            )}
                        </>
                      )}
                      <MarketButton
                        waypoint={ship.nav.route.destination.symbol}
                        ship={ship}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Paginator page={page} total={total} onPageChange={handleChangePage} />
      </TableContainer>
    );
  }
);
