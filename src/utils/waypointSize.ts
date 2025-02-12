import { TypeEnum } from "@/enums";

export const getSize = ({ type }: { type: string }) => {
  switch (type) {
    case TypeEnum.HEADQUARTER:
    case TypeEnum.JUMP_GATE:
      return 4;
    case TypeEnum.PLANET:
    case TypeEnum.ASTEROID_BASE:
      return 3;
    case TypeEnum.GAS_GIANT:
    case TypeEnum.ENGINEERED_ASTEROID:
      return 2;
    default:
      return 1;
  }
};
