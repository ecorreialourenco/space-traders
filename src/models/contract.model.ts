export interface ContractModel {
  id: string;
  factionSymbol: string;
  type: string;
  terms: {
    deadline: string;
    payment: {
      onAccepted: number;
      onFulfilled: number;
    };
    deliver: Deliver[];
  };
  accepted: boolean;
  fulfilled: boolean;
  expiration: Date;
  deadlineToAccept: Date;
}

interface Deliver {
  tradeSymbol: string;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}
