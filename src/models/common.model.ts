import { TypeEnum } from "@/enums/Types.enum";

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
  orbitals: OrbitalsModel[];
}

export interface OrbitalsModel {
  symbol: string;
}
