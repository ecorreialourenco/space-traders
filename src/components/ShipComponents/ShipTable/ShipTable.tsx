import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useSession } from "next-auth/react";

import { MyShipModel } from "@/models/ship.model";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { LIMIT } from "@/constants";
import { NavActionStatusEnum, NavStatusEnum } from "@/enums";

import FlightLandIcon from "@mui/icons-material/FlightLand";
import PublicIcon from "@mui/icons-material/Public";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Navigation, NavStatus, ShipRefuel, Surveying } from "./components";

import styles from "./ShipTable.module.css";
import { useShips } from "@/hooks";
import { TableRef } from "@/pages/ships/Ships";

interface ShipTableProps {
  openModal: (val: boolean) => void;
  selectShip: (ship: MyShipModel) => void;
}

export const ShipTable = forwardRef<TableRef, ShipTableProps>(
  function ShipTable({ openModal, selectShip }, forwardedRef) {
    const [shipsList, setShipsList] = useState<MyShipModel[]>([]);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const { data } = useSession();
    const token = data?.token ?? "";

    const { data: shipsData, refetch } = useShips({ page });
    console.log("🚀 ~ ShipTable ~ shipsData:", shipsData);

    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      page: number
    ) => {
      if (shipsData && page + 1 > shipsData?.meta.page) {
        setPage((prevPage) => prevPage + 1);
      } else {
        setPage((prevPage) => prevPage - 1);
      }
    };

    useImperativeHandle(forwardedRef, () => ({
      refetch,
    }));

    useEffect(() => {
      if (shipsData) {
        setShipsList(shipsData.data);
        setTotal(shipsData.meta.total);
      }
    }, [shipsData]);

    return (
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={styles.headerCell}>Name</TableCell>
              <TableCell className={styles.headerCell}>Role</TableCell>
              <TableCell className={styles.headerCell}>Location</TableCell>
              <TableCell className={styles.headerCell}>Status</TableCell>
              <TableCell className={styles.headerCell}>Capacity</TableCell>
              <TableCell className={styles.headerCell}>Fuel</TableCell>
              <TableCell className={styles.headerCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipsList.map((ship: MyShipModel) => (
              <TableRow key={ship.registration.name}>
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
                  <ShipRefuel token={token} ship={ship} refetch={refetch} />
                  {ship.nav.status === NavStatusEnum.DOCKED ? (
                    <NavStatus
                      token={token}
                      title="Orbit"
                      status={NavActionStatusEnum.IN_ORBIT}
                      miningShipSymbol={ship.symbol}
                      refetch={refetch}
                    >
                      <PublicIcon />
                    </NavStatus>
                  ) : (
                    <NavStatus
                      token={token}
                      title="Dock"
                      status={NavActionStatusEnum.DOCKED}
                      miningShipSymbol={ship.symbol}
                      refetch={refetch}
                    >
                      <FlightLandIcon />
                    </NavStatus>
                  )}

                  <NavStatus
                    token={token}
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

                  <Navigation route={ship.nav.route} />
                  {ship.mounts.some(
                    (mount) => mount.symbol === "MOUNT_SURVEYOR_II"
                  ) && <Surveying token={token} ship={ship} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {total > LIMIT && (
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={total}
            rowsPerPage={LIMIT}
            page={page - 1}
            labelDisplayedRows={() => `${page} of ${Math.ceil(total / LIMIT)}`}
            onPageChange={handleChangePage}
          />
        )}
      </TableContainer>
    );
  }
);
