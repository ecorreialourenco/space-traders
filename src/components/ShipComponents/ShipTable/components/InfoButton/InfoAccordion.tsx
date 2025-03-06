import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";

interface InfoAccordionProps {
  title: string;
  children: ReactNode;
}

export const InfoAccordion = ({ title, children }: InfoAccordionProps) => {
  return (
    <Accordion className="mb-1">
      <AccordionSummary
        className="bg-yellow-600 text-white"
        expandIcon={<ArrowDownwardIcon className="text-white" />}
      >
        <Typography component="span">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
