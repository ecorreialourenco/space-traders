import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import {
  AlertColor,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  ContractActions,
  Feedback,
  NegociateContractModal,
  Paginator,
  TableHeaderCell,
  TitleButton,
} from "@/components";
import { useAcceptContract, useContracts, useFullfillContract } from "@/hooks";
import { ContractModel, FeedbackType } from "@/models";

export const Contracts = () => {
  const [contractList, setContractList] = useState<ContractModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<AlertColor>("error");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const handleUpdateContract = ({ message, type }: FeedbackType) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
    setFeedbackOpen(true);

    if (type === "success") {
      refetch();
    }
  };

  const { data: contractsData, refetch } = useContracts({ page });
  const { mutate } = useAcceptContract({
    updateContract: handleUpdateContract,
  });
  const { mutate: fullfillMutatio } = useFullfillContract({
    updateContract: handleUpdateContract,
  });

  const handleClick = async (id: string) => mutate({ contractId: id });

  const handleChangePage = (page: number) => {
    if (contractsData && page + 1 > contractsData?.meta.page) {
      setPage((prevPage) => prevPage + 1);
    } else {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleFullfill = (contract: string) => {
    fullfillMutatio({ contract });

    setTimeout(() => {
      refetch();
    }, 100);
  };

  const handleCloseFeedback = () => {
    setFeedbackMessage("");
    setFeedbackOpen(false);
  };

  const handleContractSTatus = (contract: ContractModel) => {
    if (contract.fulfilled) {
      return "Completed";
    } else if (contract.accepted) {
      return "Accepted";
    }

    return "Pending";
  };

  useEffect(() => {
    if (contractsData) {
      setContractList(contractsData.data);
      setTotal(contractsData.meta.total);
    }
  }, [contractsData]);

  return (
    <div className="flex flex-col h-full items-center mx-4">
      <TitleButton
        title=" Contracts"
        btnText="Negociate contract"
        //hideButton={contractList.length !== 0}
        onClick={() => setIsModalOpen(true)}
      />

      <Feedback
        isOpen={feedbackOpen}
        severity={feedbackType}
        message={feedbackMessage}
        onClose={handleCloseFeedback}
      />

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
                  {contract.terms.deliver.map((item) => (
                    <div key={item.tradeSymbol}>
                      <p>Destination: {item.destinationSymbol}</p>
                      <p>Material: {item.tradeSymbol}</p>
                      <p>
                        Progress: {item.unitsFulfilled} / {item.unitsRequired}
                      </p>
                    </div>
                  ))}
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
                <TableCell>{handleContractSTatus(contract)}</TableCell>
                <TableCell>
                  {!contract.fulfilled &&
                    (!contract.accepted ? (
                      <Tooltip title="Accept contract">
                        <span>
                          <IconButton onClick={() => handleClick(contract.id)}>
                            <AssignmentTurnedInIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    ) : (
                      <ContractActions
                        contract={contract}
                        updateContract={handleUpdateContract}
                        onFullfill={handleFullfill}
                      />
                    ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Paginator page={page} total={total} onPageChange={handleChangePage} />
      </TableContainer>

      <NegociateContractModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        updateList={() => refetch()}
      />
    </div>
  );
};
