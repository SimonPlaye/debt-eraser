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
import { formatToGraphData } from "../../shared/formatToGraphData";
import type { TaxLevelPerWealthGroup, TaxLevels } from "./types";

export const getGraphData = ({ taxLevels }: TaxLevels) => {
  let deficit = DEFICIT_LEVEL_IN_2024;
  let debt = DEBT_LEVEL_IN_2024;
  let gdp = GDP_LEVEL_IN_2024;
  let {
    capital1mTo5m,
    capital5mTo10m,
    capital10mTo50m,
    capital50mTo100m,
    capital100mTo500m,
    capitalFrom500m,
  } = getInitialValues();

  const debtToGdpRatios: number[] = [debt / gdp];
  const deficitToGdpRatios: number[] = [deficit / gdp];

  for (let yearIndex = 1; yearIndex < 27; yearIndex++) {
    const yearValues = getAggregateValues({
      taxLevels,
      deficit,
      debt,
      gdp,
      capital1mTo5m,
      capital5mTo10m,
      capital10mTo50m,
      capital50mTo100m,
      capital100mTo500m,
      capitalFrom500m,
    });

    deficit = yearValues.deficit;
    debt = yearValues.debt;
    gdp = yearValues.gdp;
    capital1mTo5m = yearValues.newCapital1mTo5m;
    capital5mTo10m = yearValues.newCapital5mTo10m;
    capital10mTo50m = yearValues.newCapital10mTo50m;
    capital50mTo100m = yearValues.newCapital50mTo100m;
    capital100mTo500m = yearValues.newCapital100mTo500m;
    capitalFrom500m = yearValues.newCapitalFrom500m;

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
    capital1mTo5m:
      (averageWealthForGroup1mTo5m * HOUSEHOLD_NB_BETWEEN_1M_AND_5M) / 1000,
    capital5mTo10m:
      (averageWealthForGroup5mTo10m * HOUSEHOLD_NB_BETWEEN_5M_AND_10M) / 1000,
    capital10mTo50m:
      (averageWealthForGroup10mTo50m * HOUSEHOLD_NB_BETWEEN_10M_AND_50M) / 1000,
    capital50mTo100m:
      (averageWealthForGroup50mTo100m * HOUSEHOLD_NB_BETWEEN_50M_AND_100M) /
      1000,
    capital100mTo500m:
      (averageWealthForGroup100mTo500m * HOUSEHOLD_NB_BETWEEN_100M_AND_500M) /
      1000,
    capitalFrom500m:
      (averageWealthForGroupFrom500m * HOUSEHOLD_NB_WITH_MORE_THAN_500M) / 1e3,
  };
};

const getAggregateValues = ({
  taxLevels,
  deficit,
  debt,
  gdp,
  capital1mTo5m,
  capital5mTo10m,
  capital10mTo50m,
  capital50mTo100m,
  capital100mTo500m,
  capitalFrom500m,
}: {
  taxLevels: TaxLevelPerWealthGroup;
  deficit: number;
  debt: number;
  gdp: number;
  capital1mTo5m: number;
  capital5mTo10m: number;
  capital10mTo50m: number;
  capital50mTo100m: number;
  capital100mTo500m: number;
  capitalFrom500m: number;
}) => {
  const {
    newCapital1mTo5m,
    newCapital5mTo10m,
    newCapital10mTo50m,
    newCapital50mTo100m,
    newCapital100mTo500m,
    newCapitalFrom500m,
    totalRevenueInBillions,
  } = getTaxedRevenueInBillions({
    taxLevels,
    capital1mTo5m,
    capital5mTo10m,
    capital10mTo50m,
    capital50mTo100m,
    capital100mTo500m,
    capitalFrom500m,
  });

  const newDeficitLevel =
    deficit * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) - totalRevenueInBillions;

  return {
    debt: Math.max(debt + newDeficitLevel, 0),
    deficit: newDeficitLevel,
    gdp: gdp * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR),
    newCapital1mTo5m,
    newCapital5mTo10m,
    newCapital10mTo50m,
    newCapital50mTo100m,
    newCapital100mTo500m,
    newCapitalFrom500m,
  };
};

const getTaxedRevenueInBillions = ({
  taxLevels,
  capital1mTo5m,
  capital5mTo10m,
  capital10mTo50m,
  capital50mTo100m,
  capital100mTo500m,
  capitalFrom500m,
}: {
  taxLevels: TaxLevelPerWealthGroup;
  capital1mTo5m: number;
  capital5mTo10m: number;
  capital10mTo50m: number;
  capital50mTo100m: number;
  capital100mTo500m: number;
  capitalFrom500m: number;
}) => {
  const newCapital1mTo5m = getNewCapitalAmount({
    oldValue: capital1mTo5m,
    taxLevel: taxLevels.taxLevelGroup1mTo5m,
  });
  const revenueFromGroup1mTo5m = getTaxedAmount({
    oldValue: capital1mTo5m,
    taxLevel: taxLevels.taxLevelGroup1mTo5m,
  });

  const newCapital5mTo10m = getNewCapitalAmount({
    oldValue: capital5mTo10m,
    taxLevel: taxLevels.taxLevelGroup5mTo10m,
  });
  const revenueFromGroup5mTo10m = getTaxedAmount({
    oldValue: capital5mTo10m,
    taxLevel: taxLevels.taxLevelGroup5mTo10m,
  });

  const newCapital10mTo50m = getNewCapitalAmount({
    oldValue: capital10mTo50m,
    taxLevel: taxLevels.taxLevelGroup10mTo50m,
  });
  const revenueFromGroup10mTo50m = getTaxedAmount({
    oldValue: capital10mTo50m,
    taxLevel: taxLevels.taxLevelGroup10mTo50m,
  });

  const newCapital50mTo100m = getNewCapitalAmount({
    oldValue: capital50mTo100m,
    taxLevel: taxLevels.taxLevelGroup50mTo100m,
  });
  const revenueFromGroup50mTo100m = getTaxedAmount({
    oldValue: capital50mTo100m,
    taxLevel: taxLevels.taxLevelGroup50mTo100m,
  });

  const newCapital100mTo500m = getNewCapitalAmount({
    oldValue: capital100mTo500m,
    taxLevel: taxLevels.taxLevelGroup100mTo500m,
  });
  const revenueFromGroup100mTo500m = getTaxedAmount({
    oldValue: capital100mTo500m,
    taxLevel: taxLevels.taxLevelGroup100mTo500m,
  });

  const newCapitalFrom500m = getNewCapitalAmount({
    oldValue: capitalFrom500m,
    taxLevel: taxLevels.taxLevelGroupFrom500m,
  });
  const revenueFromGroupFrom500m = getTaxedAmount({
    oldValue: capitalFrom500m,
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
    newCapital1mTo5m,
    newCapital5mTo10m,
    newCapital10mTo50m,
    newCapital50mTo100m,
    newCapital100mTo500m,
    newCapitalFrom500m,
    totalRevenueInBillions,
  };
};

export const getNewCapitalAmount = ({
  oldValue,
  taxLevel,
}: {
  oldValue: number;
  taxLevel: number;
}) => {
  const newCapitalBeforeTax = oldValue * (1 + CAPITAL_GROWTH_RATE);
  const taxAmount = newCapitalBeforeTax * taxLevel;
  return newCapitalBeforeTax - taxAmount;
};

export const getTaxedAmount = ({
  oldValue,
  taxLevel,
}: {
  oldValue: number;
  taxLevel: number;
}) => {
  const newCapitalBeforeTax = oldValue * (1 + CAPITAL_GROWTH_RATE);
  return newCapitalBeforeTax * taxLevel;
};
