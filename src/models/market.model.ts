import { MarketTypeEnum } from "@/enums";

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
