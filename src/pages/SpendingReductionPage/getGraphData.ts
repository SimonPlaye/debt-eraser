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
  TAX_EXPENDITURES_IN_2024,
} from "../../shared/constants";
import { formatToGraphData } from "../../shared/formatToGraphData";
import type { TaxLevels } from "./types";

export const getGraphData = ({ taxLevels }: TaxLevels) => {
  let deficit = DEFICIT_LEVEL_IN_2024;
  let debt = DEBT_LEVEL_IN_2024;
  let gdp = GDP_LEVEL_IN_2024;

  const debtToGdpRatios: number[] = [debt / gdp];
  const deficitToGdpRatios: number[] = [deficit / gdp];

  const expenditureBudget2025 =
    TAX_EXPENDITURES_IN_2024 * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR);
  const educationBudget2025 =
    EDUCATION_BUDGET * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR);
  const defenseBudget2025 =
    DEFENSE_BUDGET * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR);
  const researchBudget2025 =
    RESEARCH_AND_HIGHER_EDUCATION_BUDGET * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR);
  const solidarityBudget2025 =
    SOLIDARITY_AND_ALL_BUDGET * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR);
  const ecologyBudget2025 =
    ECOLOGY_BUDGET * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR);

  deficit =
    deficit * (1 + AVERAGE_GDP_EVOLUTION_PER_YEAR) -
    (expenditureBudget2025 * taxLevels.taxTaxExpenditure +
      educationBudget2025 * taxLevels.taxEducation +
      defenseBudget2025 * taxLevels.taxDefense +
      researchBudget2025 * taxLevels.taxResearch +
      solidarityBudget2025 * taxLevels.taxSolidarity +
      ecologyBudget2025 * taxLevels.taxEcology);

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
