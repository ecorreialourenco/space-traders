import { MarketTypeEnum } from "@/enums";

import { AgentModel, CargoModel } from "./";

export interface MarketModel {
  symbol: string;
  imports: DescriptionModel[];
  exports: DescriptionModel[];
  exchange: DescriptionModel[];
  transactions: [];
  tradeGoods: TradeGoodModel[];
}

interface DescriptionModel {
  symbol: string;
  name: string;
  description: string;
}

export type TradeGoodModel = {
  symbol: string;
  tradeVolume: number;
  type: MarketTypeEnum;
  supply: string;
  activity: string;
  purchasePrice: number;
  sellPrice: number;
};

export interface MarketResponse {
  data: {
    agent: AgentModel;
    cargo: CargoModel;
    transaction: MarketTransactionModel;
  };
  error: {
    message: string;
    code: number;
    data: {
      units: string[];
    };
  };
}

export interface MarketTransactionModel {
  waypointSymbol: string;
  shipSymbol: string;
  tradeSymbol: string;
  type: MarketTransactionType;
  units: number;
  pricePerUnit: number;
  totalPrice: number;
  timestamp: string;
}

type MarketTransactionType = "SELL" | "PURCHASE";
