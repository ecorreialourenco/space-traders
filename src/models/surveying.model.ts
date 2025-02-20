export interface SurveyingModel {
  cooldown: {
    shipSymbol: string;
    totalSeconds: number;
    remainingSeconds: number;
    expiration: string;
  };
  surveys: SurveysModel[];
}

interface SurveysModel {
  signature: string;
  symbol: string;
  deposits: DepositsModel[];
  expiration: string;
  size: string;
}

interface DepositsModel {
  symbol: string;
}
