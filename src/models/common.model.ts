export interface PointsModel {
  x: number;
  y: number;
  type: string;
  color: string;
  size: number;
  orbitals: OrbitalsModel[];
}

export interface OrbitalsModel {
  symbol: string;
}
