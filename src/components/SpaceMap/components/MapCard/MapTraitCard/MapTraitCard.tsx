import { MarketInfo } from "@/components/Market";
import { Shipyard } from "@/components/Shipyard";
import { TraitModel } from "@/models";
import React, { useEffect, useState } from "react";

import InfoIcon from "@mui/icons-material/Info";
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
  const [selectedTrait, setSelectedTrait] = useState<TraitEnum | "INFO">(
    "INFO"
  );

  useEffect(() => {
    const traitsOptions = traits
      .filter((trait) => Object.keys(TraitEnum).includes(trait.symbol))
      .map((trait) => trait.symbol as TraitEnum);

    setSelectedTrait(traitsOptions[0]);
  }, [traits]);

  return (
    <div className={styles.traitsGroup}>
      <IconButton
        color={selectedTrait === "INFO" ? "primary" : "default"}
        onClick={() => setSelectedTrait("INFO")}
      >
        <InfoIcon />
      </IconButton>
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

      {selectedTrait === "INFO" && (
        <div>
          {traits.map((trait) => (
            <p key={trait.symbol}>{trait.name}</p>
          ))}
        </div>
      )}

      {selectedTrait === TraitEnum.SHIPYARD && (
        <div>
          <Shipyard asteroidWaypointSymbol={selectedSymbol} />
        </div>
      )}
      {selectedTrait === TraitEnum.MARKETPLACE && (
        <MarketInfo asteroidWaypointSymbol={selectedSymbol} short />
      )}
    </div>
  );
};
