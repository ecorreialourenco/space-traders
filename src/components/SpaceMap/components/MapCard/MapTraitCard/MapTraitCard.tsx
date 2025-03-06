import InfoIcon from "@mui/icons-material/Info";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { IconButton } from "@mui/material";
import React, { useState } from "react";

import { MarketInfo } from "@/components/Market";
import { Shipyard } from "@/components/Shipyard";
import { TraitEnum } from "@/enums";
import { TraitModel } from "@/models";

import styles from "./MapTraitCard.module.css";

interface MapTraitCardProps {
  traits: TraitModel[];
  selectedSymbol: string;
}

export const MapTraitCard = ({ traits, selectedSymbol }: MapTraitCardProps) => {
  const [selectedTrait, setSelectedTrait] = useState<TraitEnum | "INFO">(
    "INFO"
  );

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
