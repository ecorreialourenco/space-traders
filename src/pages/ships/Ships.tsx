import { MyShipModel } from "@/models/ship.model";
import { AlertColor, Button, Typography } from "@mui/material";
import React, { Suspense, useRef, useState } from "react";

import {
  BuyShipModal,
  Feedback,
  Loading,
  NavShipModal,
  ShipTable,
} from "@/components";
import { FeedbackType } from "@/models";

export interface TableRef {
  refetch: () => void;
}

export const Ships = () => {
  const tableRef = useRef<TableRef>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false);
  const [selectedShip, setSelectedShip] = useState<MyShipModel | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<AlertColor>("error");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const handleInfo = ({ message, type }: FeedbackType) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
    setFeedbackOpen(true);
  };

  const handleRefetch = ({ message, type }: FeedbackType) => {
    handleInfo({ message, type });
    if (tableRef.current) {
      tableRef.current.refetch();
    }
  };

  const handleCloseFeedback = () => {
    setFeedbackMessage("");
    setFeedbackOpen(false);
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col h-full items-center mx-4">
        <Typography variant="h3" style={{ textAlign: "center" }}>
          My Ships
        </Typography>
        <Button onClick={() => setIsModalOpen(true)}>Buy Ship</Button>

        <Feedback
          isOpen={feedbackOpen}
          severity={feedbackType}
          message={feedbackMessage}
          onClose={handleCloseFeedback}
        />

        <ShipTable
          ref={tableRef}
          openModal={setIsNavModalOpen}
          selectShip={setSelectedShip}
          setInfo={handleInfo}
        />

        <BuyShipModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          updateList={handleRefetch}
        />

        {selectedShip && (
          <NavShipModal
            open={isNavModalOpen}
            ship={selectedShip}
            onClose={() => setIsNavModalOpen(false)}
            updateList={handleRefetch}
          />
        )}
      </div>
    </Suspense>
  );
};
