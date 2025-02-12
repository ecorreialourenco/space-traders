import { Layout } from "@/components";
import { ContractModel } from "@/models/contract.model";
import { acceptContract, getContracts } from "@/utils/handleContracts";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import styles from "./Contracts.module.css";

export const Contracts = () => {
  const { data } = useSession();
  const [contractList, setContractList] = useState<ContractModel[]>([]);

  const handleClick = async (id: string) => {
    await acceptContract({ token: data?.token ?? "", id });
  };

  useEffect(() => {
    const handleContracts = async () => {
      const { data: contractData } = await getContracts({
        token: data?.token ?? "",
      });
      setContractList(contractData);
    };

    if (data?.token) {
      handleContracts();
    }
  }, [data]);

  return (
    <Layout>
      <div className="flex flex-col h-full items-center mx-4">
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Contracts
        </Typography>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={styles.headerCell}>Type</TableCell>
                <TableCell className={styles.headerCell}>Deadline</TableCell>
                <TableCell className={styles.headerCell}>Terms</TableCell>
                <TableCell className={styles.headerCell}>Payment</TableCell>
                <TableCell className={styles.headerCell}>Status</TableCell>
                <TableCell className={styles.headerCell}>Action</TableCell>
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
                          <span>{item.tradeSymbol}</span>
                          <span>
                            {!!item.unitsFulfilled &&
                              `${item.unitsFulfilled} /`}
                            {item.unitsRequired}
                          </span>
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
        </TableContainer>
      </div>
    </Layout>
  );
};
