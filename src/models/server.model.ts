export interface ServerResponseModel {
  status: string;
  version: string;
  resetDate: string;
  description: string;
  stats: {
    accounts: number;
    agents: number;
    ships: number;
    systems: number;
    waypoints: number;
  };
  leaderboards: {
    mostCredits: LeaderboardCreditsModel[];
    mostSubmittedCharts: LeaderboardChartModel[];
  };
  serverResets: {
    next: string;
    frequency: string;
  };
  announcements: AnnouncementModel[];
  links: LinkModel[];
}

export interface LeaderboardCreditsModel {
  agentSymbol: string;
  credits: number;
}
export interface LeaderboardChartModel {
  agentSymbol: string;
  chartCount: number;
}

interface AnnouncementModel {
  title: string;
  body: string;
}

interface LinkModel {
  name: string;
  url: URL;
}
