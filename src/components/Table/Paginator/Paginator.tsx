import React from "react";
import { LIMIT } from "@/constants";
import { TablePagination } from "@mui/material";

interface PaginatorProps {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Paginator = ({ page, total, onPageChange }: PaginatorProps) => {
  if (total < LIMIT) {
    return null;
  }
  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[]}
      count={total}
      rowsPerPage={LIMIT}
      page={page - 1}
      labelDisplayedRows={() => `${page} of ${Math.ceil(total / LIMIT)}`}
      onPageChange={(e, page) => onPageChange(page)}
    />
  );
};
