import { TableCell } from "@mui/material";
import cn from "classnames";
import React, { ReactNode } from "react";

import styles from "./TableHeaderCell.module.css";

interface TableHeaderCellProps {
  className?: string;
  children: ReactNode;
}

export const TableHeaderCell = ({
  className,
  children,
}: TableHeaderCellProps) => (
  <TableCell className={cn(styles.headerCell, className)}>{children}</TableCell>
);
