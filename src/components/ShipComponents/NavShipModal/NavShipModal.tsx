import { AlertColor, Autocomplete, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button, Dropdown, Feedback, Modal } from "@/components";
import { FlightModeEnum, NavStatusEnum } from "@/enums";
import { FeedbackType, MyShipModel } from "@/models";
import { RootState } from "@/store/store";
import { navigateToWaypoint } from "@/utils/handleNavigation";

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
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<AlertColor>("error");
  const { waypoints } = useSelector((state: RootState) => state.map);
  const { data } = useSession();
  const token = data?.token ?? "";

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
    const navData = await navigateToWaypoint({
      token,
      flightMode: speed,
      waypointSymbol: place,
      shipId: ship.symbol,
    });

    if (navData.data?.nav.status === NavStatusEnum.IN_TRANSIT) {
      updateList({
        message: `Your ship is now going to ${navData.data.nav.route.destination.symbol}`,
        type: "success",
      });

      setTimeout(() => onClose(), 500);
    } else {
      setFeedbackType("error");
      setFeedbackMessage("Navigation fail");
    }
  };

  useEffect(() => {
    if (speed !== ship.nav.flightMode) {
      setSpeed(ship.nav.flightMode);
    }
  }, [ship.nav.flightMode, speed]);

  return (
    <Modal open={open} title="Navigation" onClose={onClose}>
      <div>
        <Feedback
          isOpen={!!feedbackMessage}
          severity={feedbackType}
          message={feedbackMessage}
          onClose={() => setFeedbackMessage("")}
        />
        <form onSubmit={handleSubmit}>
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
          <Dropdown
            label="Speed"
            value={speed}
            options={options}
            onChange={(op) => setSpeed(op.target.value as FlightModeEnum)}
          />
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
      </div>
    </Modal>
  );
};
