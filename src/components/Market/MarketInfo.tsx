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
import cn from "classnames";

import styles from "./MarketInfo.module.css";
import { formatCredits } from "@/utils";
import { TableHeaderCell } from "..";

interface MarketInfoProps {
  asteroidWaypointSymbol: string;
  short?: boolean;
}

export const MarketInfo = ({
  asteroidWaypointSymbol,
  short,
}: MarketInfoProps) => {
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
      <TableContainer
        className={cn({ [styles.table]: short })}
        component={Paper}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableHeaderCell className={cn({ [styles.shortCell]: short })}>
                Name
              </TableHeaderCell>
              {!short && (
                <TableHeaderCell className={cn({ [styles.shortCell]: short })}>
                  Description
                </TableHeaderCell>
              )}
              <TableHeaderCell className={cn({ [styles.shortCell]: short })}>
                Units
              </TableHeaderCell>
              <TableHeaderCell className={cn({ [styles.shortCell]: short })}>
                Buy
              </TableHeaderCell>
              <TableHeaderCell className={cn({ [styles.shortCell]: short })}>
                Sell
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {market?.tradeGoods?.map((items: TradeGoodModel) => {
              const marketData = getInfo({
                symbol: items.symbol,
                type: items.type,
              });

              return (
                <TableRow key={items.symbol}>
                  <TableCell className={cn({ [styles.shortCell]: short })}>
                    {marketData?.name}
                  </TableCell>
                  {!short && <TableCell>{marketData?.description}</TableCell>}
                  <TableCell className={cn({ [styles.shortCell]: short })}>
                    {items.tradeVolume}
                  </TableCell>
                  <TableCell className={cn({ [styles.shortCell]: short })}>
                    {formatCredits(items.purchasePrice)}
                  </TableCell>
                  <TableCell className={cn({ [styles.shortCell]: short })}>
                    {formatCredits(items.sellPrice)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
