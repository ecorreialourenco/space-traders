import React from "react";

import { ContractModel, FeedbackType } from "@/models";

import { Delivery } from "../Delivery";
import { DeliveryWaypoint } from "../DeliveryWaypoint";
import { Fullfill } from "../Fullfill";

interface ContractActionsProps {
  contract: ContractModel;
  updateContract: ({ message, type }: FeedbackType) => void;
  onFullfill: (contractId: string) => void;
}

export const ContractActions = ({
  contract,
  updateContract,
  onFullfill,
}: ContractActionsProps) => {
  return (
    <>
      {contract.terms.deliver.map((deliver) => (
        <DeliveryWaypoint key={deliver.tradeSymbol} deliver={deliver} />
      ))}

      <Delivery
        contractId={contract.id}
        deliver={contract.terms.deliver}
        updateContract={updateContract}
      />

      <Fullfill
        unitsRequired={contract.terms.deliver[0].unitsRequired}
        unitsFulfilled={contract.terms.deliver[0].unitsFulfilled}
        contractId={contract.id}
        onFullfill={onFullfill}
      />
    </>
  );
};
