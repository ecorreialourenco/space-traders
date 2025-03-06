import {
  Autocomplete,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button, Modal } from "@/components";
import { FlightModeEnum } from "@/enums";
import { useFlightMode, useNavigation } from "@/hooks";
import { FeedbackType, MyShipModel } from "@/models";
import { RootState } from "@/store/store";

interface NavShipModalProps {
  open: boolean;
  ship: MyShipModel;
  onClose: () => void;
  updateList: ({ message, type }: FeedbackType) => void;
}

export const NavShipModal = ({
  open,
  ship,
  onClose,
  updateList,
}: NavShipModalProps) => {
  const [place, setPlace] = useState<string>("");
  const [speed, setSpeed] = useState<FlightModeEnum>(ship.nav.flightMode);
  const { waypoints } = useSelector((state: RootState) => state.map);

  const { mutate: flightModeMutation } = useFlightMode({
    updateShip: updateList,
  });
  const { mutate } = useNavigation({ updateShip: updateList });

  const navOptions = waypoints
    .map((item) => ({
      key: item.symbol,
      label: item.symbol,
      id: item.symbol,
    }))
    .filter((item) => item.id !== ship.nav.waypointSymbol);

  const regularText = (str: string) => {
    if (!str) {
      return str;
    }

    const firstChar = str.charAt(0).toUpperCase();
    const slicedString = str.slice(1).toLowerCase();

    return firstChar + slicedString;
  };

  const options = Object.values(FlightModeEnum).map((item) => ({
    value: item,
    name: regularText(item),
  }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      waypointSymbol: place,
      shipId: ship.symbol,
    });

    onClose();
  };

  useEffect(() => {
    if (speed !== ship.nav.flightMode) {
      setSpeed(ship.nav.flightMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ship]);

  return (
    <Modal open={open} title="Navigation" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="m-2">
          <ToggleButtonGroup
            value={speed}
            exclusive
            onChange={(e, flightMode) => {
              if (flightMode !== null) {
                flightModeMutation({ shipId: ship.symbol, flightMode });
                setSpeed(flightMode);
              }
            }}
          >
            {options.map((op) => (
              <ToggleButton key={op.value} value={op.value}>
                {op.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <div className="m-2">
          <Autocomplete
            disablePortal
            options={navOptions}
            sx={{ width: 300 }}
            onChange={(e, value) => setPlace(value?.id ?? "")}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Place"
                value={place}
              />
            )}
          />
        </div>
        <div className="flex justify-between gap-2">
          <div className="w-full">
            <Button
              label="Cancel"
              className="bg-gray-400 hover:bg-gray-600"
              onClick={onClose}
            />
          </div>
          <div className="w-full">
            <Button label="Navigate" type="submit" />
          </div>
        </div>
      </form>
    </Modal>
  );
};
