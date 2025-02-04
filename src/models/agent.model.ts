export interface AgentModel {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: number;
}

export interface WaypointModel {
  orbitals: [];
  symbol: string;
  type: string;
  x: number;
  y: number;
}
