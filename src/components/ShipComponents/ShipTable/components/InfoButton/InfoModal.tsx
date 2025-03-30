import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
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
import React from "react";

import { Button, Modal } from "@/components";
import { useJettison } from "@/hooks";
import { FeedbackType, MyShipModel } from "@/models";

import { InfoAccordion } from "./InfoAccordion";

interface InfoModalProps {
  isOpen: boolean;
  ship: MyShipModel;
  onClose: () => void;
  updateCargo: ({ message, type }: FeedbackType) => void;
}

export const InfoModal = ({
  isOpen,
  ship,
  onClose,
  updateCargo,
}: InfoModalProps) => {
  const { mutate } = useJettison({ shipId: ship.symbol, updateCargo });

  const handleDeleteCargo = ({
    symbol,
    units,
  }: {
    symbol: string;
    units: number;
  }) => {
    mutate({ symbol, units });
  };

  return (
    <Modal open={isOpen} title={ship.symbol} onClose={onClose}>
      <div className="m-6">
        <InfoAccordion title="Frame">
          <Typography>{ship.frame.name}</Typography>
          <Typography>{ship.frame.description}</Typography>
        </InfoAccordion>

        <InfoAccordion title="Engine">
          <Typography>{ship.engine.name}</Typography>
          <Typography>{ship.engine.description}</Typography>
        </InfoAccordion>

        <InfoAccordion title="Modules">
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ship.modules.map((module, idx) => (
                  <TableRow key={`${module.symbol}-${idx}`}>
                    <TableCell>{module.name}</TableCell>
                    <TableCell>{module.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </InfoAccordion>

        <InfoAccordion title="Mounts">
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ship.mounts.map((mount, idx) => (
                  <TableRow key={`${mount.symbol}-${idx}`}>
                    <TableCell>{mount.name}</TableCell>
                    <TableCell>{mount.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </InfoAccordion>

        <InfoAccordion
          title={`Cargo - ${ship.cargo.units}/${ship.cargo.capacity}`}
        >
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Units</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ship.cargo.inventory.map((items, idx) => (
                  <TableRow key={`${items.symbol}-${idx}`}>
                    <TableCell>{items.name}</TableCell>
                    <TableCell>{items.description}</TableCell>
                    <TableCell>{items.units}</TableCell>
                    <TableCell>
                      <Tooltip title="Delete cargo">
                        <IconButton
                          onClick={() =>
                            handleDeleteCargo({
                              symbol: items.symbol,
                              units: items.units,
                            })
                          }
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </InfoAccordion>

        <div className="w-full">
          <Button
            label="Close"
            className="bg-gray-400 hover:bg-gray-600"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};
