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
  AlertColor,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { acceptContract } from "@/utils/handleContracts";
import {
  Delivery,
  Feedback,
  NegociateContractModal,
  TableHeaderCell,
} from "@/components";
import { useContracts } from "@/hooks";
import { LIMIT } from "@/constants";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Navigation } from "@/components/ShipComponents/ShipTable/components/Navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ContractModel, FeedbackType, LocalModel } from "@/models";

export const Contracts = () => {
  const { data } = useSession();
  const [contractList, setContractList] = useState<ContractModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<AlertColor>("error");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const { waypoints } = useSelector((state: RootState) => state.map);
  const { system } = useSelector((state: RootState) => state.ui);

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

  const handleCloseFeedback = () => {
    setFeedbackMessage("");
    setFeedbackOpen(false);
  };

  const handleUpdateContract = ({ message, type }: FeedbackType) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
    setFeedbackOpen(true);

    if (type === "success") {
      refetch();
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
                <TableCell>
                  {contract.accepted ? "Accepted" : "Pending"}
                </TableCell>
                <TableCell>
                  {!contract.accepted ? (
                    <Tooltip title="Accept contract">
                      <span>
                        <IconButton onClick={() => handleClick(contract.id)}>
                          <AssignmentTurnedInIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  ) : (
                    <>
                      {contract.terms.deliver.map((point) => {
                        const selectedWaypoint = waypoints.find(
                          (waypoint) =>
                            waypoint.symbol === point.destinationSymbol
                        );

                        if (!selectedWaypoint) {
                          return null;
                        }

                        const route: LocalModel = {
                          systemSymbol: system,
                          symbol: selectedWaypoint.symbol,
                          type: selectedWaypoint.type,
                          x: selectedWaypoint.x,
                          y: selectedWaypoint.y,
                        };

                        return <Navigation key={route.symbol} route={route} />;
                      })}

                      <Delivery
                        contractId={contract.id}
                        deliver={contract.terms.deliver}
                        updateContract={handleUpdateContract}
                      />
                    </>
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
