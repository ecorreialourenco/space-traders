import InfoIcon from "@mui/icons-material/Info";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  AlertColor,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Feedback } from "@/components";
import { MarketInfo } from "@/components/Market";
import { Shipyard } from "@/components/Shipyard";
import { TraitEnum } from "@/enums";
import { useShips } from "@/hooks";
import { FeedbackType, MyShipModel, TraitModel } from "@/models";

import styles from "./MapTraitCard.module.css";

interface MapTraitCardProps {
  traits: TraitModel[];
  selectedSymbol: string;
}

export const MapTraitCard = ({ traits, selectedSymbol }: MapTraitCardProps) => {
  const [page, setPage] = useState<number>(1);
  const [ships, setShips] = useState<MyShipModel[]>([]);
  const [currentShip, setCurrentShip] = useState<MyShipModel | undefined>();
  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<AlertColor>("error");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const [selectedTrait, setSelectedTrait] = useState<TraitEnum | "INFO">(
    "INFO"
  );

  const { data, refetch } = useShips({ page });

  const handleCargo = ({ message, type }: FeedbackType) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
    setFeedbackOpen(true);

    setTimeout(() => {
      refetch();
    }, 500);
  };

  const handleCloseFeedback = () => {
    setFeedbackMessage("");
    setFeedbackOpen(false);
  };

  useEffect(() => {
    const shipsAtThisLocation =
      data?.data.filter(
        (ships) => ships.nav.route.destination.symbol === selectedSymbol
      ) ?? [];
    const haveMorePages = data?.meta
      ? data.meta.total > data.meta.limit * page
      : false;

    setShips((prevState) => {
      const allShips = [...prevState, ...shipsAtThisLocation];
      const uniqueShips = allShips.reduce(
        (acc: { [symbol: string]: MyShipModel }, ship: MyShipModel) => {
          acc[ship.symbol] = ship;
          return acc;
        },
        {}
      );
      return Object.values(uniqueShips);
    });

    if (haveMorePages) {
      setPage(page + 1);
    }
  }, [data, page, selectedSymbol]);

  useEffect(() => {
    if (!currentShip && ships.length) {
      setCurrentShip(ships[0]);
    } else {
      const newShipData = ships.find(
        (ship) => ship.symbol === currentShip?.symbol
      );
      const isSameData = isEqual(
        ships.find((ship) => ship.symbol === currentShip?.symbol),
        currentShip
      );
      if (!isSameData) {
        setCurrentShip(newShipData);
      }
    }
  }, [currentShip, ships]);

  return (
    <div className={styles.traitsGroup}>
      {createPortal(
        <Feedback
          isOpen={feedbackOpen}
          severity={feedbackType}
          message={feedbackMessage}
          onClose={handleCloseFeedback}
        />,
        document.body
      )}

      <IconButton
        className="mb-2"
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
        <div>
          <ToggleButtonGroup
            value={currentShip}
            exclusive
            size="small"
            className="mb-2"
            onChange={(e, op) => {
              if (op !== null) {
                setCurrentShip(op);
              }
            }}
          >
            {ships.map((ship) => (
              <ToggleButton key={ship.symbol} value={ship}>
                {ship.symbol}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <MarketInfo
            asteroidWaypointSymbol={selectedSymbol}
            short
            ship={currentShip}
            updateCargo={handleCargo}
          />
        </div>
      )}
    </div>
  );
};
