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

import { LeaderboardCreditsModel } from "@/models";
import { formatSimpleCredits } from "@/utils";

import { TableHeaderCell } from "../Table";

interface LeaderboardProps {
  leaders: LeaderboardCreditsModel[];
}

export const Leaderboard = ({ leaders }: LeaderboardProps) => (
  <div className="flex px-3">
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Pos</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaders.slice(0, 5).map((leader: LeaderboardCreditsModel, idx) => (
            <TableRow key={`${leader.agentSymbol}`}>
              <TableCell className="text-center">{idx + 1}</TableCell>
              <TableCell>{leader.agentSymbol}</TableCell>
              <TableCell className="text-right">
                {formatSimpleCredits(leader.credits)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);
