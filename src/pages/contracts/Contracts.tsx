import { Layout } from "@/components";
import { ContractModel } from "@/models/contract.model";
import { acceptContract, getContracts } from "@/utils/handleContracts";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

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
      <div className="flex flex-col h-full items-center">
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Contracts
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Terms</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
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
                      <Button onClick={() => handleClick(contract.id)}>
                        Accept
                      </Button>
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
