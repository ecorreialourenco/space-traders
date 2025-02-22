import { FlightModeEnum, NavStatusEnum, TypeEnum } from "@/enums";

import { TraitModel } from "./waypoint.model";
import { InventoryModel, PaginationModel } from ".";

export interface ShipModel {
  type: string;
  name: string;
  description: string;
  supply: string;
  activity: string;
  purchasePrice: number;
  frame: FrameModel;
  reactor: ReactorModel;
  engine: EngineModel;
  modules: ModuleModel[];
  mounts: MountModel[];
  crew: {
    required: number;
    capacity: number;
  };
}

export interface MyShipModel {
  symbol: string;
  nav: NavigationModel;
  crew: CrewModel;
  fuel: FuelModel;
  cooldown: CooldownModel;
  frame: FrameModel;
  reactor: ReactorModel;
  engine: EngineModel;
  modules: ModuleModel[];
  mounts: MountModel[];
  registration: RegistrationModel;
  cargo: CargoModel;
}

export interface ShipyardModel {
  systemSymbol: string;
  symbol: string;
  type: TypeEnum;
  x: number;
  y: number;
  orbitals: [];
  traits: TraitModel[];
  modifiers: [];
  chart: {
    submittedBy: string;
    submittedOn: string;
  };
  faction: {
    symbol: string;
  };
  orbits: string;
  isUnderConstruction: false;
}

export interface ShipyardShopModel {
  symbol: string;
  shipTypes: ShipTypeModel[];
  transactions: [];
  ships: ShipModel[];
  modificationsFee: number;
}

export interface PurchaseShipModel {
  agent: {
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
    shipCount: number;
  };
  ship: {
    symbol: string;
    nav: NavigationModel;
    crew: CrewModel;
    fuel: FuelModel;
    cooldown: CooldownModel;
    frame: FrameModel;
    reactor: ReactorModel;
    engine: EngineModel;
    modules: [];
    mounts: [];
    registration: RegistrationModel;
    cargo: CargoModel;
  };
  transaction: {
    shipSymbol: string;
    shipType: string;
    waypointSymbol: string;
    agentSymbol: string;
    price: number;
    timestamp: string;
  };
}

interface ModuleModel {
  symbol: string;
  name: string;
  description: string;
  capacity: number;
  requirements: {
    crew: number;
    power: number;
    slots: number;
  };
}

interface MountModel {
  symbol: string;
  name: string;
  description: string;
  strength: number;
  requirements: {
    crew: number;
    power: number;
  };
}

interface CrewRequirementModel {
  power: number;
  crew: number;
}

interface ShipTypeModel {
  type: string;
}

interface FrameModel {
  symbol: string;
  name: string;
  description: string;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  condition: number;
  integrity: number;
  requirements: CrewRequirementModel;
}

interface ReactorModel {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  powerOutput: number;
  requirements: {
    crew: number;
  };
}

interface EngineModel {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  speed: number;
  requirements: CrewRequirementModel;
}

export interface CargoModel {
  capacity: number;
  units: number;
  inventory: InventoryModel[];
}

interface CrewModel {
  current: number;
  capacity: number;
  required: number;
  rotation: string;
  morale: number;
  wages: number;
}

export interface FuelModel {
  current: number;
  capacity: number;
  consumed: {
    amount: number;
    timestamp: Date;
  };
}

interface RegistrationModel {
  name: string;
  factionSymbol: string;
  role: string;
}

interface CooldownModel {
  expiration: string;
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
}

export interface NavigationModel {
  systemSymbol: string;
  waypointSymbol: string;
  route: RouteModel;
  status: NavStatusEnum;
  flightMode: FlightModeEnum;
}

export interface RouteModel {
  origin: LocalModel;
  destination: LocalModel;
  arrival: string;
  departureTime: string;
}

export interface LocalModel {
  symbol: string;
  type: TypeEnum;
  systemSymbol: string;
  x: number;
  y: number;
}

export interface MyShipsResponse {
  data: MyShipModel[];
  meta: PaginationModel;
}
