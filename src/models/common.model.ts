import { TypeEnum } from "@/enums/Types.enum";

import { OrbitalModel } from "./waypoint.model";

export interface SimplePointModel {
  x: number;
  y: number;
}

export interface PointsModel {
  symbol: string;
  x: number;
  y: number;
  type: TypeEnum;
  color: string;
  size: number;
  orbitals: OrbitalModel[];
}

export interface PaginationModel {
  total: number;
  page: number;
  limit: number;
}

export interface CooldownModel {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
  expiration: string;
}

export interface InventoryModel {
  symbol: string;
  name: string;
  description: string;
  units: number;
}
