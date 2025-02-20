import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useMarket } from "@/hooks";
import { MarketModel, TradeGoodModel } from "@/models";
import { MarketTypeEnum } from "@/enums";

interface MarketInfoProps {
  asteroidWaypointSymbol: string;
}

export const MarketInfo = ({ asteroidWaypointSymbol }: MarketInfoProps) => {
  const [market, setMarket] = useState<MarketModel | null>(null);
  const { data } = useMarket({ asteroidWaypointSymbol });

  const getInfo = ({
    symbol,
    type,
  }: {
    symbol: string;
    type: MarketTypeEnum;
  }) => {
    switch (type) {
      case MarketTypeEnum.EXCHANGE:
        return market?.exchange.find((item) => item.symbol === symbol);
      case MarketTypeEnum.EXPORT:
        return market?.exports.find((item) => item.symbol === symbol);
      case MarketTypeEnum.IMPORT:
        return market?.imports.find((item) => item.symbol === symbol);

      default:
        return null;
    }
  };

  useEffect(() => {
    if (data?.data) {
      setMarket(data.data);
    }
  }, [data]);

  return (
    <div>
      MarketInfo
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Purchase Price</TableCell>
              <TableCell>Sell Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {market?.tradeGoods.map((items: TradeGoodModel) => {
              const marketData = getInfo({
                symbol: items.symbol,
                type: items.type,
              });

              return (
                <TableRow key={items.symbol}>
                  <TableCell>{marketData?.name}</TableCell>
                  <TableCell>{marketData?.description}</TableCell>
                  <TableCell>{items.tradeVolume}</TableCell>
                  <TableCell>{items.purchasePrice}</TableCell>
                  <TableCell>{items.sellPrice}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
