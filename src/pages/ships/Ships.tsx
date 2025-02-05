import { Layout } from "@/components";
import { ShipModel } from "@/models/ship.model";
import { myShips } from "@/utils";
import {
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
import React, { useEffect, useState } from "react";

export const Ships = () => {
  const { data } = useSession();
  const [shipsList, setShipsList] = useState<ShipModel[]>([]);

  useEffect(() => {
    const handleShips = async () => {
      const { data: shipsData } = await myShips({ token: data?.token ?? "" });
      setShipsList(shipsData);
    };

    if (data?.token) {
      handleShips();
    }
  }, [data?.token]);

  return (
    <Layout>
      <div className="flex flex-col h-full items-center">
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Ships
        </Typography>
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
              {shipsList.map((ship: ShipModel) => (
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
      </div>
    </Layout>
  );
};
