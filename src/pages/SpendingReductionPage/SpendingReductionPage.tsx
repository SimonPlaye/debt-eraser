import { useEffect, useState } from "react";
import "./SpendingReductionPage.css";
import { LineChart } from "../../shared/LineChart";
import { Toggle } from "../../shared/Toggle";
import { Slider } from "../../shared/Slider";
import type { GraphDataType } from "../../shared/types";
import { SliderGrid } from "../../shared/SliderGrid";
import { getGraphData } from "./getGraphData";
import {
  DEFENSE_BUDGET,
  ECOLOGY_BUDGET,
  EDUCATION_BUDGET,
  RESEARCH_AND_HIGHER_EDUCATION_BUDGET,
  SOLIDARITY_AND_ALL_BUDGET,
  TAX_EXPENDITURES_IN_2024,
} from "../../shared/constants";

export const SpendingReductionPage = () => {
  const [taxTaxExpenditure, setTaxTaxExpenditure] = useState(0);
  const [taxEducation, setTaxEducation] = useState(0);
  const [taxDefense, setTaxDefense] = useState(0);
  const [taxResearch, setTaxResearch] = useState(0);
  const [taxSolidarity, setTaxSolidarity] = useState(0);
  const [taxEcology, setTaxEcology] = useState(0);
  const [uniformTaxRate, setUniformTaxRate] = useState(0);
  const [applySameTaxRateToAllGroups, setApplySameTaxRateToAllGroups] =
    useState(false);
  const [graphData, setGraphData] = useState<GraphDataType[]>([]);

  useEffect(() => {
    if (applySameTaxRateToAllGroups) {
      setTaxTaxExpenditure(uniformTaxRate);
      setTaxEducation(uniformTaxRate);
      setTaxDefense(uniformTaxRate);
      setTaxResearch(uniformTaxRate);
      setTaxSolidarity(uniformTaxRate);
      setTaxEcology(uniformTaxRate);
    }
  }, [applySameTaxRateToAllGroups, uniformTaxRate]);

  useEffect(() => {
    setGraphData(
      getGraphData({
        taxLevels: {
          taxTaxExpenditure: taxTaxExpenditure,
          taxEducation: taxEducation,
          taxDefense: taxDefense,
          taxResearch: taxResearch,
          taxSolidarity: taxSolidarity,
          taxEcology: taxEcology,
        },
      }),
    );
  }, [
    taxTaxExpenditure,
    taxEducation,
    taxDefense,
    taxResearch,
    taxSolidarity,
    taxEcology,
  ]);

  return (
    <div className="tax-capital-page">
      <header className="page-header">
        <h1>Reducing Spending</h1>
      </header>

      <section className="simulation-section">
        <h2>Simulation</h2>

        <div className="parameter-subsection">
          <h3>Reduce Spending (Budgets in 2024 are in brackets)</h3>
          {!applySameTaxRateToAllGroups && (
            <SliderGrid
              sliders={[
                {
                  title: `Tax Expenditure Reduction (${TAX_EXPENDITURES_IN_2024} billions €)`,
                  value: taxTaxExpenditure,
                  setValue: setTaxTaxExpenditure,
                },
                {
                  title: `Education Budget Reduction (${EDUCATION_BUDGET} billions €)`,
                  value: taxEducation,
                  setValue: setTaxEducation,
                },
                {
                  title: `Defense Budget Reduction (${DEFENSE_BUDGET} billions €)`,
                  value: taxDefense,
                  setValue: setTaxDefense,
                },
                {
                  title: `Higher Education Budget Reduction (${RESEARCH_AND_HIGHER_EDUCATION_BUDGET} billions €)`,
                  value: taxResearch,
                  setValue: setTaxResearch,
                },
                {
                  title: `Solidarity Budget Reduction (${SOLIDARITY_AND_ALL_BUDGET} billions €)`,
                  value: taxSolidarity,
                  setValue: setTaxSolidarity,
                },
                {
                  title: `Ecology Budget Reduction (${ECOLOGY_BUDGET} billions €)`,
                  value: taxEcology,
                  setValue: setTaxEcology,
                },
              ]}
              maxValue={1}
              step={0.01}
              columns={2}
            />
          )}
        </div>
        <div>
          <Toggle
            label="Apply Same Tax Rate to All Groups"
            value={applySameTaxRateToAllGroups}
            onChange={setApplySameTaxRateToAllGroups}
          />
          {applySameTaxRateToAllGroups && (
            <Slider
              title="Uniform Tax Rate"
              value={uniformTaxRate}
              setValue={setUniformTaxRate}
              maxValue={1}
              step={0.001}
            />
          )}
        </div>

        <div className="chart-subsection">
          <h3>Chart</h3>
          <LineChart
            series={graphData}
            title={"Debt and Deficit to GDP (%)"}
            yaxisLabel={"Ratio to GDP (%)"}
          />
        </div>
      </section>

      <section className="assumptions-section">
        <h2>Assumptions</h2>
        <p>
          The simulation is based on the following French economic and household
          data:
        </p>
        <ul>
          <li>French GDP in 2024: 2,925.64 billion €</li>
          <li>French Debt in 2024: 3,305.3 billion €</li>
          <li>French Deficit in 2024: 168.9 billion €</li>
          <li>GDP growth evolution: 3.20% per year</li>
          <li>Deficit evolution's follow GDP growth rate</li>
          <li>No population growth</li>
          <li>
            Budgets in 2024:
            <ul>
              <li>Tax Expenditures: {TAX_EXPENDITURES_IN_2024} billion €</li>
              <li>Education: {EDUCATION_BUDGET} billion €</li>
              <li>Defense: {DEFENSE_BUDGET} billion €</li>
              <li>
                Higher Education: {RESEARCH_AND_HIGHER_EDUCATION_BUDGET} billion
                €
              </li>
              <li>Solidarity: {SOLIDARITY_AND_ALL_BUDGET} billion €</li>
              <li>Ecology: {ECOLOGY_BUDGET} billion €</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="computation-section">
        <h2>How Are the Simulations Computed</h2>
        <ul>
          <li>
            In 2025 only:
            <ul>
              <li>
                Increase each budget and the deficit by the GDP growth rate.
              </li>
              <li>
                Apply the corresponding reduction percentage to the budget of
                each group.
              </li>
              <li>Decrease the deficit by the sum of all reduction applied.</li>
            </ul>
          </li>
          <li>
            For every year T between 2025 and 2050 included:{" "}
            <ul>
              <li>
                At T = t + 1: take the GDP of T = t and increase it by the GDP
                growth rate.
              </li>
              <li>
                At T = t + 1: take the deficit of T = t and increase it by the
                GDP growth rate.
              </li>
              <li>At T = t + 1: take the debt at T = t and add the deficit.</li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};
