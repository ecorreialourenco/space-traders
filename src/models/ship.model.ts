export interface ShipModel {
  symbol: string;
  nav: {
    systemSymbol: string;
    waypointSymbol: string;
    route: {
      origin: {
        symbol: string;
        type: string;
        systemSymbol: string;
        x: number;
        y: number;
      };
      destination: {
        symbol: string;
        type: string;
        systemSymbol: string;
        x: number;
        y: number;
      };
      arrival: Date;
      departureTime: Date;
    };
    status: string;
    flightMode: string;
  };
  crew: {
    current: number;
    capacity: number;
    required: number;
    rotation: string;
    morale: number;
    wages: number;
  };
  fuel: {
    current: number;
    capacity: number;
    consumed: {
      amount: number;
      timestamp: Date;
    };
  };
  cooldown: {
    shipSymbol: string;
    totalSeconds: number;
    remainingSeconds: number;
  };
  frame: {
    symbol: string;
    name: string;
    description: string;
    moduleSlots: number;
    mountingPoints: number;
    fuelCapacity: number;
    condition: number;
    integrity: number;
    requirements: CrewRequirementModel;
  };
  reactor: {
    symbol: string;
    name: string;
    description: string;
    condition: number;
    integrity: number;
    powerOutput: number;
    requirements: {
      crew: number;
    };
  };
  engine: {
    symbol: string;
    name: string;
    description: string;
    condition: number;
    integrity: number;
    speed: number;
    requirements: CrewRequirementModel;
  };
  modules: ModuleModel[];
  mounts: MountModel[];
  registration: {
    name: string;
    factionSymbol: string;
    role: string;
  };
  cargo: {
    capacity: number;
    units: number;
    inventory: [];
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
