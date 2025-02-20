import { TypeEnum } from "@/enums";

export const checkMiningLocation = (type: TypeEnum) => {
  const availableTyles = [
    TypeEnum.ASTEROID,
    TypeEnum.ASTEROID_FIELD,
    TypeEnum.ENGINEERED_ASTEROID,
  ];

  return availableTyles.includes(type);
};
