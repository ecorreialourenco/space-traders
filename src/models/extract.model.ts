import { CargoModel, CooldownModel } from ".";

export interface ExtractModel {
  extraction: {
    shipSymbol: string;
    yield: {
      symbol: "ALUMINUM_ORE";
      units: 8;
    };
  };
  cooldown: CooldownModel;
  cargo: CargoModel;
  events: [];
}

export interface ExtractErrorModel {
  data: {
    extraction: SymbolYieldModel;
    cooldown: CooldownModel;
    cargo: CargoModel;
    events: [];
  };
}

export interface SymbolYieldModel {
  shipSymbol: string;
  yield: {
    symbol: string;
    units: number;
  };
}
