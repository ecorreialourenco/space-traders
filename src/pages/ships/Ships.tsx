import { BuyShipModal, Layout, NavShipModal } from "@/components";
import { MyShipModel, RouteModel } from "@/models/ship.model";
import { handleShipStatus, myShips, refuelShip } from "@/utils";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { LIMIT } from "@/constants";
import { NavActionStatusEnum, NavStatusEnum } from "@/enums";

import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import PublicIcon from "@mui/icons-material/Public";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import styles from "./Ships.module.css";
import { useDispatch } from "react-redux";
import { setCenter } from "@/store/slices/mapSlice";
import { useRouter } from "next/navigation";

export const Ships = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSession();
  const [shipsList, setShipsList] = useState<MyShipModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false);
  const [selectedShip, setSelectedShip] = useState<MyShipModel | null>(null);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const token = data?.token ?? "";

  const handleShips = useCallback(async () => {
    const { data: shipsData, meta } = await myShips({ token, page });
    setShipsList(shipsData);
    setTotal(meta.total);
  }, [token, page]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page + 1);
  };

  const handleChangeShipStatus = async ({
    miningShipSymbol,
    status,
  }: {
    miningShipSymbol: string;
    status: NavActionStatusEnum;
  }) => {
    const dockResponse = await handleShipStatus({
      token,
      miningShipSymbol,
      status,
    });

    if (dockResponse.data?.nav) {
      handleShips();
    }
  };

  const handleRefuelShip = async ({
    miningShipSymbol,
    status,
  }: {
    miningShipSymbol: string;
    status: NavStatusEnum;
  }) => {
    if (status !== NavStatusEnum.DOCKED) {
      const dockResponse = await handleShipStatus({
        token,
        miningShipSymbol,
        status: NavActionStatusEnum.DOCKED,
      });

      if (dockResponse.data?.nav) {
        handleRefuelShip({
          miningShipSymbol,
          status: dockResponse.data.nav.status,
        });
      }
    } else {
      const response = await refuelShip({ token, miningShipSymbol });

      if (response) {
        handleShips();
      }
    }
  };

  const handleLocation = (route: RouteModel) => {
    const { x, y } = route.destination;
    router.push("/");
    setTimeout(() => dispatch(setCenter({ x, y })), 500);
  };

  useEffect(() => {
    if (token) {
      handleShips();
    }
  }, [handleShips, token]);

  return (
    <Layout>
      <div className="flex flex-col h-full items-center mx-4">
        <Typography variant="h3" style={{ textAlign: "center" }}>
          My Ships
        </Typography>
        <Button onClick={() => setIsModalOpen(true)}>Buy Ship</Button>
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
                    <Tooltip title="Refuel">
                      <span>
                        <IconButton
                          onClick={() =>
                            handleRefuelShip({
                              miningShipSymbol: ship.symbol,
                              status: ship.nav.status,
                            })
                          }
                        >
                          <LocalGasStationIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    {ship.nav.status === NavStatusEnum.DOCKED ? (
                      <Tooltip title="Orbit">
                        <span>
                          <IconButton
                            onClick={() =>
                              handleChangeShipStatus({
                                miningShipSymbol: ship.symbol,
                                status: NavActionStatusEnum.IN_ORBIT,
                              })
                            }
                          >
                            <PublicIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Dock">
                        <span>
                          <IconButton
                            onClick={() =>
                              handleChangeShipStatus({
                                miningShipSymbol: ship.symbol,
                                status: NavActionStatusEnum.DOCKED,
                              })
                            }
                          >
                            <FlightLandIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}

                    <Tooltip title="Navigate">
                      <span>
                        <IconButton
                          onClick={() => {
                            handleChangeShipStatus({
                              miningShipSymbol: ship.symbol,
                              status: NavActionStatusEnum.IN_ORBIT,
                            });
                            setIsNavModalOpen(true);
                            setSelectedShip(ship);
                          }}
                        >
                          <FlightTakeoffIcon />
                        </IconButton>
                      </span>
                    </Tooltip>

                    <Tooltip title="Go to location">
                      <span>
                        <IconButton
                          onClick={() => handleLocation(ship.nav.route)}
                        >
                          <MyLocationIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
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
              onPageChange={handleChangePage}
            />
          )}
        </TableContainer>

        <BuyShipModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          updateList={handleShips}
        />

        {selectedShip && (
          <NavShipModal
            open={isNavModalOpen}
            ship={selectedShip}
            onClose={() => setIsNavModalOpen(false)}
            updateList={handleShips}
          />
        )}
      </div>
    </Layout>
  );
};
