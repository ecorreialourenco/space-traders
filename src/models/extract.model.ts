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
