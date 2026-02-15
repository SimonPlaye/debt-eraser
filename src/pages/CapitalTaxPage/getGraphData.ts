import {
  AVERAGE_GDP_EVOLUTION_PER_YEAR,
  CAPITAL_GROWTH_RATE,
  DEBT_LEVEL_IN_2024,
  DEFICIT_LEVEL_IN_2024,
  GDP_LEVEL_IN_2024,
  HOUSEHOLD_NB_BETWEEN_100M_AND_500M,
  HOUSEHOLD_NB_BETWEEN_10M_AND_50M,
  HOUSEHOLD_NB_BETWEEN_1M_AND_5M,
  HOUSEHOLD_NB_BETWEEN_50M_AND_100M,
  HOUSEHOLD_NB_BETWEEN_5M_AND_10M,
  HOUSEHOLD_NB_WITH_MORE_THAN_500M,
  WEIGHT_LOWEST_BOUNDARY,
  WEIGHT_UPPER_BOUNDARY,
} from "../../shared/constants";
import type { TaxLevelPerWealthGroup, TaxLevels } from "./types";

export const getGraphData = ({ taxLevels }: TaxLevels) => {
  let deficit = DEFICIT_LEVEL_IN_2024;
  let debt = DEBT_LEVEL_IN_2024;
  let gdp = GDP_LEVEL_IN_2024;

  const debtToGdpRatios: number[] = [debt / gdp];
  const deficitToGdpRatios: number[] = [deficit / gdp];

  for (let yearIndex = 1; yearIndex < 27; yearIndex++) {
    const yearValues = getAggregateValues({
      taxLevels,
      deficit,
      debt,
      gdp,
    });

    deficit = yearValues.deficit;
    debt = yearValues.debt;
    gdp = yearValues.gdp;

    debtToGdpRatios.push(debt / gdp);
    deficitToGdpRatios.push(deficit / gdp);
  }

  return formatToGraphData({ debtToGdpRatios, deficitToGdpRatios });
};

const getAggregateValues = ({
  taxLevels,
  deficit,
  debt,
  gdp,
}: {
  taxLevels: TaxLevelPerWealthGroup;
  deficit: number;
  debt: number;
  gdp: number;
}) => {
  const taxedRevenueInBillions = getTaxedRevenueInBillions({
    taxLevels,
  });

  const newDeficitLevel =
    deficit * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) - taxedRevenueInBillions;

  return {
    debt: Math.max(debt + newDeficitLevel, 0),
    deficit: newDeficitLevel,
    gdp: gdp * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR),
  };
};

const getTaxedRevenueInBillions = ({ taxLevels }: TaxLevels): number => {
  const averageWealthForGroup1mTo5m =
    1 * WEIGHT_LOWEST_BOUNDARY + 5 * WEIGHT_UPPER_BOUNDARY;
  const revenueFromGroup1mTo5m =
    taxLevels.taxLevelGroup1mTo5m *
    averageWealthForGroup1mTo5m *
    HOUSEHOLD_NB_BETWEEN_1M_AND_5M;

  const averageWealthForGroup5mTo10m =
    5 * WEIGHT_LOWEST_BOUNDARY + 10 * WEIGHT_UPPER_BOUNDARY;
  const revenueFromGroup5mTo10m =
    taxLevels.taxLevelGroup5mTo10m *
    averageWealthForGroup5mTo10m *
    HOUSEHOLD_NB_BETWEEN_5M_AND_10M;

  const averageWealthForGroup10mTo50m =
    10 * WEIGHT_LOWEST_BOUNDARY + 50 * WEIGHT_UPPER_BOUNDARY;
  const revenueFromGroup10mTo50m =
    taxLevels.taxLevelGroup10mTo50m *
    averageWealthForGroup10mTo50m *
    HOUSEHOLD_NB_BETWEEN_10M_AND_50M;

  const averageWealthForGroup50mTo100m =
    50 * WEIGHT_LOWEST_BOUNDARY + 100 * WEIGHT_UPPER_BOUNDARY;
  const revenueFromGroup50mTo100m =
    taxLevels.taxLevelGroup50mTo100m *
    averageWealthForGroup50mTo100m *
    HOUSEHOLD_NB_BETWEEN_50M_AND_100M;

  const averageWealthForGroup100mTo500m =
    100 * WEIGHT_LOWEST_BOUNDARY + 500 * WEIGHT_UPPER_BOUNDARY;
  const revenueFromGroup100mTo500m =
    taxLevels.taxLevelGroup100mTo500m *
    averageWealthForGroup100mTo500m *
    HOUSEHOLD_NB_BETWEEN_100M_AND_500M;

  const averageWealthForGroupFrom500m = 500;
  const revenueFromGroupFrom500m =
    taxLevels.taxLevelGroupFrom500m *
    averageWealthForGroupFrom500m *
    HOUSEHOLD_NB_WITH_MORE_THAN_500M;

  return (
    ((revenueFromGroup1mTo5m +
      revenueFromGroup5mTo10m +
      revenueFromGroup10mTo50m +
      revenueFromGroup50mTo100m +
      revenueFromGroup100mTo500m +
      revenueFromGroupFrom500m) *
      (1 + CAPITAL_GROWTH_RATE)) /
    1000
  );
};

const formatToGraphData = ({
  debtToGdpRatios,
  deficitToGdpRatios,
}: {
  debtToGdpRatios: number[];
  deficitToGdpRatios: number[];
}) => {
  return [
    {
      name: "Debt to GDP Ratio",
      data: debtToGdpRatios,
      color: "#1a4d8f",
    },
    {
      name: "Deficit to GDP Ratio",
      data: deficitToGdpRatios,
      color: "#ed2939",
    },
  ];
};
