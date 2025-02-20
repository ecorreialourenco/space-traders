import { CooldownModel } from ".";

export interface SurveyingModel {
  cooldown: CooldownModel;
  surveys: SurveysModel[];
}

export interface SurveysModel {
  signature: string;
  symbol: string;
  deposits: DepositsModel[];
  expiration: string;
  size: string;
}

interface DepositsModel {
  symbol: string;
}
