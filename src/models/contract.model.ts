export interface ContractModel {
  id: string;
  factionSymbol: string;
  type: string;
  terms: ContractTerms;
  accepted: boolean;
  fulfilled: boolean;
  expiration: Date;
  deadlineToAccept: Date;
}

export interface DeliverModel {
  tradeSymbol: string;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}

export interface ContractTerms {
  deadline: string;
  payment: {
    onAccepted: number;
    onFulfilled: number;
  };
  deliver: DeliverModel[];
}

export interface DeliverError {
  message: string;
  code: number;
  data: {
    deliveryDestination: string;
    shipLocation: string;
  };
}
