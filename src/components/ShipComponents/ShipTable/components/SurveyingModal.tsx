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
import { SurveyingModel } from "@/models";

import styles from "./SurveyingModel.module.css";

interface SurveyingModalProps {
  isOpen: boolean;
  data: SurveyingModel;
  onClose: () => void;
}

export const SurveyingModal = ({
  isOpen,
  data,
  onClose,
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
            {data.surveys.map((survey) => (
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
                <TableCell></TableCell>
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
