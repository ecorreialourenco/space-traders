import { MarketInfo } from "@/components/Market";
import { Shipyard } from "@/components/Shipyard";
import { TraitModel } from "@/models";
import React, { useEffect, useState } from "react";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import StorefrontIcon from "@mui/icons-material/Storefront";

import styles from "../MapCard.module.css";
import { IconButton } from "@mui/material";
import { TraitEnum } from "@/enums";

interface MapTraitCardProps {
  traits: TraitModel[];
  selectedSymbol: string;
}

export const MapTraitCard = ({ traits, selectedSymbol }: MapTraitCardProps) => {
  const [selectedTrait, setSelectedTrait] = useState<TraitEnum | null>(null);

  useEffect(() => {
    const traitsOptions = traits
      .filter((trait) => Object.keys(TraitEnum).includes(trait.symbol))
      .map((trait) => trait.symbol as TraitEnum);

    setSelectedTrait(traitsOptions[0]);
  }, [traits]);

  return (
    <div className={styles.traitsGroup}>
      {traits.find((trait) => trait.symbol === TraitEnum.SHIPYARD) && (
        <IconButton
          color={selectedTrait === TraitEnum.SHIPYARD ? "primary" : "default"}
          onClick={() => setSelectedTrait(TraitEnum.SHIPYARD)}
        >
          <RocketLaunchIcon />
        </IconButton>
      )}
      {traits.find((trait) => trait.symbol === TraitEnum.MARKETPLACE) && (
        <IconButton
          color={
            selectedTrait === TraitEnum.MARKETPLACE ? "primary" : "default"
          }
          onClick={() => setSelectedTrait(TraitEnum.MARKETPLACE)}
        >
          <StorefrontIcon />
        </IconButton>
      )}

      {selectedTrait === TraitEnum.SHIPYARD && (
        <Shipyard asteroidWaypointSymbol={selectedSymbol} />
      )}
      {selectedTrait === TraitEnum.MARKETPLACE && (
        <MarketInfo asteroidWaypointSymbol={selectedSymbol} short />
      )}
    </div>
  );
};
