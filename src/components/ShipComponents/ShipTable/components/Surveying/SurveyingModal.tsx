import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

import { Button, Modal } from "@/components";
import { MyShipModel, MyShipsResponse, SurveyingModel } from "@/models";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

import { Mining } from "../Extract/Extract";
import styles from "./SurveyingModal.module.css";

interface SurveyingModalProps {
  isOpen: boolean;
  ship: MyShipModel;
  data: SurveyingModel;
  onClose: () => void;
  updateCargo: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<MyShipsResponse, Error>>;
}

export const SurveyingModal = ({
  isOpen,
  ship,
  data,
  onClose,
  updateCargo,
}: SurveyingModalProps) => (
  <Modal open={isOpen} title="Navigation" onClose={onClose}>
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={styles.headerCell}>Signature</TableCell>
              <TableCell className={styles.headerCell}>Size</TableCell>
              <TableCell className={styles.headerCell}>Deposits</TableCell>
              <TableCell className={styles.headerCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.surveys.map((survey, idx) => (
              <TableRow key={survey.signature}>
                <TableCell>{survey.signature}</TableCell>
                <TableCell>{survey.size}</TableCell>
                <TableCell>
                  <ul>
                    {survey.deposits.map((deposit, idx) => (
                      <li key={`${survey.signature}-${deposit.symbol}-${idx}`}>
                        {deposit.symbol}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                {idx === 0 && (
                  <TableCell rowSpan={data.surveys.length}>
                    <Mining
                      ship={ship}
                      survey={survey}
                      updateCargo={updateCargo}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
