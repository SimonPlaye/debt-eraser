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
import type { WealthLevyPerGroup } from "./types";

export const getGraphData = ({
  wealthLevyGroup1mTo5m,
  wealthLevyGroup5mTo10m,
  wealthLevyGroup10mTo50m,
  wealthLevyGroup50mTo100m,
  wealthLevyGroup100mTo500m,
  wealthLevyGroupFrom500m,
}: WealthLevyPerGroup) => {
  let deficit = DEFICIT_LEVEL_IN_2024;
  let debt = DEBT_LEVEL_IN_2024;
  let gdp = GDP_LEVEL_IN_2024;

  const debtToGdpRatios: number[] = [debt / gdp];
  const deficitToGdpRatios: number[] = [deficit / gdp];

  const wealth1mTo5m2025 =
    ((1 * WEIGHT_LOWEST_BOUNDARY + 5 * WEIGHT_UPPER_BOUNDARY) *
      HOUSEHOLD_NB_BETWEEN_1M_AND_5M *
      (1 + WEALTH_GROWTH_RATE)) /
    1000;
  const wealth5mTo10m2025 =
    ((5 * WEIGHT_LOWEST_BOUNDARY + 10 * WEIGHT_UPPER_BOUNDARY) *
      HOUSEHOLD_NB_BETWEEN_5M_AND_10M *
      (1 + WEALTH_GROWTH_RATE)) /
    1000;
  const wealth10mTo50m2025 =
    ((10 * WEIGHT_LOWEST_BOUNDARY + 50 * WEIGHT_UPPER_BOUNDARY) *
      HOUSEHOLD_NB_BETWEEN_10M_AND_50M *
      (1 + WEALTH_GROWTH_RATE)) /
    1000;
  const wealth50mTo100m2025 =
    ((50 * WEIGHT_LOWEST_BOUNDARY + 100 * WEIGHT_UPPER_BOUNDARY) *
      HOUSEHOLD_NB_BETWEEN_50M_AND_100M *
      (1 + WEALTH_GROWTH_RATE)) /
    1000;
  const wealth100mTo500m2025 =
    ((100 * WEIGHT_LOWEST_BOUNDARY + 500 * WEIGHT_UPPER_BOUNDARY) *
      HOUSEHOLD_NB_BETWEEN_100M_AND_500M *
      (1 + WEALTH_GROWTH_RATE)) /
    1000;
  const wealthFrom500m2025 =
    (500 * HOUSEHOLD_NB_WITH_MORE_THAN_500M * (1 + WEALTH_GROWTH_RATE)) / 1000;

  deficit =
    deficit * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) -
    (wealth1mTo5m2025 * wealthLevyGroup1mTo5m +
      wealth5mTo10m2025 * wealthLevyGroup5mTo10m +
      wealth10mTo50m2025 * wealthLevyGroup10mTo50m +
      wealth50mTo100m2025 * wealthLevyGroup50mTo100m +
      wealth100mTo500m2025 * wealthLevyGroup100mTo500m +
      wealthFrom500m2025 * wealthLevyGroupFrom500m);

  debt = Math.max(debt + deficit, 0);
  gdp = gdp * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR);

  debtToGdpRatios.push(debt / gdp);
  deficitToGdpRatios.push(deficit / gdp);

  for (let yearIndex = 1; yearIndex < 26; yearIndex++) {
    deficit = deficit * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR);
    debt = Math.max(debt + deficit, 0);
    gdp = gdp * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR);

    debtToGdpRatios.push(debt / gdp);
    deficitToGdpRatios.push(deficit / gdp);
  }

  return formatToGraphData({ debtToGdpRatios, deficitToGdpRatios });
};
