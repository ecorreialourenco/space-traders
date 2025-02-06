import { BuyShipModal, Layout } from "@/components";
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
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { LIMIT } from "@/constants";

import styles from "./Ships.module.css";

export const Ships = () => {
  const { data } = useSession();
  const [shipsList, setShipsList] = useState<MyShipModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
                <TableCell className={styles.headerCell}>Capacity</TableCell>
                <TableCell className={styles.headerCell}>Fuel</TableCell>
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
      </div>
    </Layout>
  );
};
