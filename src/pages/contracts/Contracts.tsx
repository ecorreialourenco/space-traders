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
  Typography,
  Button,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { ContractModel } from "@/models/contract.model";
import { acceptContract } from "@/utils/handleContracts";
import { NegociateContractModal, TableHeaderCell } from "@/components";
import { useContracts } from "@/hooks";
import { LIMIT } from "@/constants";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export const Contracts = () => {
  const { data } = useSession();
  const [contractList, setContractList] = useState<ContractModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: contractsData, refetch } = useContracts({ page });

  const handleClick = async (id: string) => {
    await acceptContract({ token: data?.token ?? "", id }).then(() =>
      refetch()
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    if (contractsData && page + 1 > contractsData?.meta.page) {
      setPage((prevPage) => prevPage + 1);
    } else {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    if (contractsData) {
      setContractList(contractsData.data);
      setTotal(contractsData.meta.total);
    }
  }, [contractsData]);

  return (
    <div className="flex flex-col h-full items-center mx-4">
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Contracts
      </Typography>

      {contractList.length === 0 && (
        <Button onClick={() => setIsModalOpen(true)}>Negociate contract</Button>
      )}

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Deadline</TableHeaderCell>
              <TableHeaderCell>Terms</TableHeaderCell>
              <TableHeaderCell>Payment</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractList.map((contract: ContractModel) => (
              <TableRow key={contract.id}>
                <TableCell>{contract.type}</TableCell>
                <TableCell>
                  {new Date(contract.terms.deadline).toDateString()}
                </TableCell>
                <TableCell>
                  {contract.terms.deliver.map((item) => {
                    return (
                      <div key={item.tradeSymbol}>
                        <p>{item.tradeSymbol}</p>
                        <p>
                          {item.unitsFulfilled} / {item.unitsRequired}
                        </p>
                      </div>
                    );
                  })}
                </TableCell>
                <TableCell>
                  <>
                    <p>
                      On accept:
                      {contract.terms.payment.onAccepted}
                    </p>
                    <p>
                      On full filled:
                      {contract.terms.payment.onFulfilled}
                    </p>
                  </>
                </TableCell>
                <TableCell>
                  {contract.accepted ? "Accepted" : "Pending"}
                </TableCell>
                <TableCell>
                  {!contract.accepted && (
                    <Tooltip title="Accept contract">
                      <span>
                        <IconButton onClick={() => handleClick(contract.id)}>
                          <AssignmentTurnedInIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  )}
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
            labelDisplayedRows={() => `${page} of ${Math.ceil(total / LIMIT)}`}
            onPageChange={handleChangePage}
          />
        )}
      </TableContainer>

      <NegociateContractModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        updateList={() => refetch()}
      />
    </div>
  );
};
