import {
  AVERAGE_GDP_EVOLUTION_PER_YEAR,
  DEBT_LEVEL_IN_2024,
  DEFENSE_BUDGET,
  DEFICIT_LEVEL_IN_2024,
  ECOLOGY_BUDGET,
  EDUCATION_BUDGET,
  GDP_LEVEL_IN_2024,
  RESEARCH_AND_HIGHER_EDUCATION_BUDGET,
  SOLIDARITY_AND_ALL_BUDGET,
  TAX_LOOPHOLES_IN_2024,
} from "../../shared/constants";
import { formatToGraphData } from "../../shared/formatToGraphData";
import type { TaxLevels } from "./types";

export const getGraphData = ({ taxLevels }: TaxLevels) => {
  let deficit = DEFICIT_LEVEL_IN_2024;
  let debt = DEBT_LEVEL_IN_2024;
  let gdp = GDP_LEVEL_IN_2024;

  const debtToGdpRatios: number[] = [debt / gdp];
  const deficitToGdpRatios: number[] = [deficit / gdp];

  const taxLoopholesBudget2025 =
    TAX_LOOPHOLES_IN_2024 *
    (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) *
    taxLevels.taxTaxLoopholes;
  const educationBudget2025 =
    EDUCATION_BUDGET *
    (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) *
    taxLevels.taxEducation;
  const defenseBudget2025 =
    DEFENSE_BUDGET *
    (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) *
    taxLevels.taxDefense;
  const researchBudget2025 =
    RESEARCH_AND_HIGHER_EDUCATION_BUDGET *
    (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) *
    taxLevels.taxResearch;
  const solidarityBudget2025 =
    SOLIDARITY_AND_ALL_BUDGET *
    (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) *
    taxLevels.taxSolidarity;
  const ecologyBudget2025 =
    ECOLOGY_BUDGET *
    (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) *
    taxLevels.taxEcology;

  deficit =
    deficit * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) -
    (taxLoopholesBudget2025 +
      educationBudget2025 +
      defenseBudget2025 +
      researchBudget2025 +
      solidarityBudget2025 +
      ecologyBudget2025);

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
