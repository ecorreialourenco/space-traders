import {
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
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Feedback, TableHeaderCell } from "@/components";
import { LIMIT } from "@/constants";
import { FeedbackType, MyShipModel } from "@/models";
import { useDeliveryGoods, useShips } from "@/hooks";
import { DeliverModel } from "@/models/contract.model";

import SoapIcon from "@mui/icons-material/Soap";

interface DeliveryShipsProps {
  contractId: string;
  deliver: DeliverModel[];
  updateContract: ({ message, type }: FeedbackType) => void;
}

export const DeliveryShips = ({
  contractId,
  deliver,
  updateContract,
}: DeliveryShipsProps) => {
  const [shipsList, setShipsList] = useState<MyShipModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { data: shipsData } = useShips({ page });
  const { mutate, error } = useDeliveryGoods({ updateContract });

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

  const handleSend = ({ ship }: { ship: MyShipModel }) => {
    deliver.forEach((good) => {
      const item = ship.cargo.inventory.find(
        (inv) => inv.symbol === good.tradeSymbol
      );

      if (item) {
        mutate({
          contractId,
          shipSymbol: ship.symbol,
          tradeSymbol: item.symbol,
          units: item.units,
        });
      }
    });
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (shipsData?.data && shipsData?.meta) {
      setShipsList(shipsData.data);
      setTotal(shipsData.meta.total);
    }
  }, [shipsData]);

  return (
    <TableContainer component={Paper}>
      {errorMessage && (
        <Feedback
          isOpen={!!errorMessage}
          severity="error"
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      {deliver.map((item) => (
        <span key={item.destinationSymbol}>
          {item.tradeSymbol}: {item.unitsRequired}
        </span>
      ))}
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
            let hasGoods = false;

            return (
              <TableRow key={ship.registration.name}>
                <TableCell>{ship.registration.name}</TableCell>
                <TableCell>
                  {deliver.map((good) => {
                    const item = ship.cargo.inventory.find(
                      (inv) => inv.symbol === good.tradeSymbol
                    );

                    hasGoods = !!item;

                    return (
                      <span
                        key={`${good.destinationSymbol}-${good.tradeSymbol}`}
                      >
                        {good.tradeSymbol}: {item?.units ?? 0}
                      </span>
                    );
                  })}
                </TableCell>

                <TableCell>
                  {hasGoods && (
                    <Tooltip title="Delivery">
                      <span>
                        <IconButton onClick={() => handleSend({ ship })}>
                          <SoapIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
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
};
