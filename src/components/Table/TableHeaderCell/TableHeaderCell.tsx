import { TableCell } from "@mui/material";
import React, { ReactNode } from "react";

import styles from "./TableHeaderCell.module.css";

export const TableHeaderCell = ({ children }: { children: ReactNode }) => (
  <TableCell className={styles.headerCell}>{children}</TableCell>
);
