import { CargoModel, CooldownModel, SymbolYieldModel } from ".";

export interface ShiphonResponseModel {
  siphon: SymbolYieldModel;
  cooldown: CooldownModel;
  cargo: CargoModel;
  events: [];
}
