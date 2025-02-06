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
