import {
  AVERAGE_GDP_EVOLUTION_PER_YEAR,
  WEALTH_GROWTH_RATE,
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
import { formatToGraphData } from "../../shared/formatToGraphData";
import type { TaxLevelPerWealthGroup, TaxLevels } from "./types";

export const getGraphData = ({ taxLevels }: TaxLevels) => {
  let deficit = DEFICIT_LEVEL_IN_2024;
  let debt = DEBT_LEVEL_IN_2024;
  let gdp = GDP_LEVEL_IN_2024;
  let {
    wealth1mTo5m,
    wealth5mTo10m,
    wealth10mTo50m,
    wealth50mTo100m,
    wealth100mTo500m,
    wealthFrom500m,
  } = getInitialValues();

  const debtToGdpRatios: number[] = [debt / gdp];
  const deficitToGdpRatios: number[] = [deficit / gdp];

  for (let yearIndex = 1; yearIndex < 27; yearIndex++) {
    const yearValues = getAggregateValues({
      taxLevels,
      deficit,
      debt,
      gdp,
      wealth1mTo5m,
      wealth5mTo10m,
      wealth10mTo50m,
      wealth50mTo100m,
      wealth100mTo500m,
      wealthFrom500m,
    });

    deficit = yearValues.deficit;
    debt = yearValues.debt;
    gdp = yearValues.gdp;
    wealth1mTo5m = yearValues.newWealth1mTo5m;
    wealth5mTo10m = yearValues.newWealth5mTo10m;
    wealth10mTo50m = yearValues.newWealth10mTo50m;
    wealth50mTo100m = yearValues.newWealth50mTo100m;
    wealth100mTo500m = yearValues.newWealth100mTo500m;
    wealthFrom500m = yearValues.newWealthFrom500m;

    debtToGdpRatios.push(debt / gdp);
    deficitToGdpRatios.push(deficit / gdp);
  }

  return formatToGraphData({ debtToGdpRatios, deficitToGdpRatios });
};

const getInitialValues = () => {
  const averageWealthForGroup1mTo5m =
    1 * WEIGHT_LOWEST_BOUNDARY + 5 * WEIGHT_UPPER_BOUNDARY;
  const averageWealthForGroup5mTo10m =
    5 * WEIGHT_LOWEST_BOUNDARY + 10 * WEIGHT_UPPER_BOUNDARY;
  const averageWealthForGroup10mTo50m =
    10 * WEIGHT_LOWEST_BOUNDARY + 50 * WEIGHT_UPPER_BOUNDARY;
  const averageWealthForGroup50mTo100m =
    50 * WEIGHT_LOWEST_BOUNDARY + 100 * WEIGHT_UPPER_BOUNDARY;
  const averageWealthForGroup100mTo500m =
    100 * WEIGHT_LOWEST_BOUNDARY + 500 * WEIGHT_UPPER_BOUNDARY;
  const averageWealthForGroupFrom500m = 500;
  return {
    wealth1mTo5m:
      (averageWealthForGroup1mTo5m * HOUSEHOLD_NB_BETWEEN_1M_AND_5M) / 1000,
    wealth5mTo10m:
      (averageWealthForGroup5mTo10m * HOUSEHOLD_NB_BETWEEN_5M_AND_10M) / 1000,
    wealth10mTo50m:
      (averageWealthForGroup10mTo50m * HOUSEHOLD_NB_BETWEEN_10M_AND_50M) / 1000,
    wealth50mTo100m:
      (averageWealthForGroup50mTo100m * HOUSEHOLD_NB_BETWEEN_50M_AND_100M) /
      1000,
    wealth100mTo500m:
      (averageWealthForGroup100mTo500m * HOUSEHOLD_NB_BETWEEN_100M_AND_500M) /
      1000,
    wealthFrom500m:
      (averageWealthForGroupFrom500m * HOUSEHOLD_NB_WITH_MORE_THAN_500M) / 1e3,
  };
};

const getAggregateValues = ({
  taxLevels,
  deficit,
  debt,
  gdp,
  wealth1mTo5m,
  wealth5mTo10m,
  wealth10mTo50m,
  wealth50mTo100m,
  wealth100mTo500m,
  wealthFrom500m,
}: {
  taxLevels: TaxLevelPerWealthGroup;
  deficit: number;
  debt: number;
  gdp: number;
  wealth1mTo5m: number;
  wealth5mTo10m: number;
  wealth10mTo50m: number;
  wealth50mTo100m: number;
  wealth100mTo500m: number;
  wealthFrom500m: number;
}) => {
  const {
    newWealth1mTo5m,
    newWealth5mTo10m,
    newWealth10mTo50m,
    newWealth50mTo100m,
    newWealth100mTo500m,
    newWealthFrom500m,
    totalRevenueInBillions,
  } = getTaxedRevenueInBillions({
    taxLevels,
    wealth1mTo5m,
    wealth5mTo10m,
    wealth10mTo50m,
    wealth50mTo100m,
    wealth100mTo500m,
    wealthFrom500m,
  });

  const newDeficitLevel =
    deficit * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) - totalRevenueInBillions;

  return {
    debt: Math.max(debt + newDeficitLevel, 0),
    deficit: newDeficitLevel,
    gdp: gdp * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR),
    newWealth1mTo5m,
    newWealth5mTo10m,
    newWealth10mTo50m,
    newWealth50mTo100m,
    newWealth100mTo500m,
    newWealthFrom500m,
  };
};

const getTaxedRevenueInBillions = ({
  taxLevels,
  wealth1mTo5m,
  wealth5mTo10m,
  wealth10mTo50m,
  wealth50mTo100m,
  wealth100mTo500m,
  wealthFrom500m,
}: {
  taxLevels: TaxLevelPerWealthGroup;
  wealth1mTo5m: number;
  wealth5mTo10m: number;
  wealth10mTo50m: number;
  wealth50mTo100m: number;
  wealth100mTo500m: number;
  wealthFrom500m: number;
}) => {
  const newWealth1mTo5m = getNewWealthAmount({
    oldValue: wealth1mTo5m,
    taxLevel: taxLevels.taxLevelGroup1mTo5m,
  });
  const revenueFromGroup1mTo5m = getTaxedAmount({
    oldValue: wealth1mTo5m,
    taxLevel: taxLevels.taxLevelGroup1mTo5m,
  });

  const newWealth5mTo10m = getNewWealthAmount({
    oldValue: wealth5mTo10m,
    taxLevel: taxLevels.taxLevelGroup5mTo10m,
  });
  const revenueFromGroup5mTo10m = getTaxedAmount({
    oldValue: wealth5mTo10m,
    taxLevel: taxLevels.taxLevelGroup5mTo10m,
  });

  const newWealth10mTo50m = getNewWealthAmount({
    oldValue: wealth10mTo50m,
    taxLevel: taxLevels.taxLevelGroup10mTo50m,
  });
  const revenueFromGroup10mTo50m = getTaxedAmount({
    oldValue: wealth10mTo50m,
    taxLevel: taxLevels.taxLevelGroup10mTo50m,
  });

  const newWealth50mTo100m = getNewWealthAmount({
    oldValue: wealth50mTo100m,
    taxLevel: taxLevels.taxLevelGroup50mTo100m,
  });
  const revenueFromGroup50mTo100m = getTaxedAmount({
    oldValue: wealth50mTo100m,
    taxLevel: taxLevels.taxLevelGroup50mTo100m,
  });

  const newWealth100mTo500m = getNewWealthAmount({
    oldValue: wealth100mTo500m,
    taxLevel: taxLevels.taxLevelGroup100mTo500m,
  });
  const revenueFromGroup100mTo500m = getTaxedAmount({
    oldValue: wealth100mTo500m,
    taxLevel: taxLevels.taxLevelGroup100mTo500m,
  });

  const newWealthFrom500m = getNewWealthAmount({
    oldValue: wealthFrom500m,
    taxLevel: taxLevels.taxLevelGroupFrom500m,
  });
  const revenueFromGroupFrom500m = getTaxedAmount({
    oldValue: wealthFrom500m,
    taxLevel: taxLevels.taxLevelGroupFrom500m,
  });

  const totalRevenueInBillions =
    revenueFromGroup1mTo5m +
    revenueFromGroup5mTo10m +
    revenueFromGroup10mTo50m +
    revenueFromGroup50mTo100m +
    revenueFromGroup100mTo500m +
    revenueFromGroupFrom500m;

  return {
    newWealth1mTo5m,
    newWealth5mTo10m,
    newWealth10mTo50m,
    newWealth50mTo100m,
    newWealth100mTo500m,
    newWealthFrom500m,
    totalRevenueInBillions,
  };
};

export const getNewWealthAmount = ({
  oldValue,
  taxLevel,
}: {
  oldValue: number;
  taxLevel: number;
}) => {
  const newWealthBeforeTax = oldValue * (1 + WEALTH_GROWTH_RATE);
  const taxAmount = newWealthBeforeTax * taxLevel;
  return newWealthBeforeTax - taxAmount;
};

export const getTaxedAmount = ({
  oldValue,
  taxLevel,
}: {
  oldValue: number;
  taxLevel: number;
}) => {
  const newWealthBeforeTax = oldValue * (1 + WEALTH_GROWTH_RATE);
  return newWealthBeforeTax * taxLevel;
};
