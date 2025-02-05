import { TypeEnum } from "@/enums";

export interface WaypointModel {
  systemSymbol: string;
  symbol: string;
  type: TypeEnum;
  x: number;
  y: number;
  orbitals: OrbitalModel[];
  traits: TraitModel[];
  modifiers: [];
  chart: {
    submittedBy: string;
    submittedOn: string;
  };
  faction: {
    symbol: string;
  };
  isUnderConstruction: false;
}

export interface TraitModel {
  symbol: string;
  name: string;
  description: string;
}

export interface OrbitalModel {
  symbol: string;
}
