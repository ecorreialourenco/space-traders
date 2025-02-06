import { Layout } from "@/components";
import { MyShipModel } from "@/models/ship.model";
import { myShips } from "@/utils";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { BuyShipModal } from "./components/BuyShipModal";

export const Ships = () => {
  const { data } = useSession();
  const [shipsList, setShipsList] = useState<MyShipModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const token = data?.token ?? "";

  const handleShips = useCallback(async () => {
    const { data: shipsData } = await myShips({ token });
    setShipsList(shipsData);
  }, [token]);

  useEffect(() => {
    if (token) {
      handleShips();
    }
  }, [handleShips, token]);

  return (
    <Layout>
      <div className="flex flex-col h-full items-center">
        <Typography variant="h3" style={{ textAlign: "center" }}>
          My Ships
        </Typography>
        <Button onClick={() => setIsModalOpen(true)}>Buy Ship</Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Fuel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipsList.map((ship: MyShipModel) => (
                <TableRow key={ship.registration.name}>
                  <TableCell>{ship.registration.name}</TableCell>
                  <TableCell>{ship.registration.role}</TableCell>
                  <TableCell>{ship.cargo.capacity}</TableCell>
                  <TableCell>
                    {ship.fuel.current} / {ship.fuel.capacity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {isModalOpen && (
          <BuyShipModal
            onClose={() => setIsModalOpen(false)}
            updateList={handleShips}
          />
        )}
      </div>
    </Layout>
  );
};
