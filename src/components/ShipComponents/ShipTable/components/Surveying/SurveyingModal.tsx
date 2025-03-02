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

import { Button, Modal, TableHeaderCell } from "@/components";
import { FeedbackType, MyShipModel, SurveyingModel } from "@/models";

import { Extract } from "../Extract/Extract";

interface SurveyingModalProps {
  isOpen: boolean;
  ship: MyShipModel;
  data: SurveyingModel;
  onClose: () => void;
  updateCargo: ({ message, type }: FeedbackType) => void;
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
              <TableHeaderCell>Signature</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Deposits</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
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
                    <Extract
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
