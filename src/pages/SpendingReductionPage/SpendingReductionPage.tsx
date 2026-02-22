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
    <div className="tax-wealth-page">
      <header className="page-header">
        <h1>Spending Reduction</h1>
        <p className="subtitle">
          Simulate the effect of reducing government spending on debt reduction.
        </p>
      </header>

      <section className="simulation-section">
        <h2>Simulation</h2>

        <div className="parameter-subsection">
          <h3>Spending Reduction in %</h3>
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
              step={0.05}
              columns={2}
            />
          )}
        </div>
        <div>
          <Toggle
            label="Apply Same Spending Reduction to All Groups"
            value={applySameTaxRateToAllGroups}
            onChange={setApplySameTaxRateToAllGroups}
          />
          {applySameTaxRateToAllGroups && (
            <Slider
              title="Spending Reduction"
              value={uniformTaxRate}
              setValue={setUniformTaxRate}
              maxValue={1}
              step={0.05}
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

        <div className="assumptions-grid">
          <div className="assumption-card">
            <h3>Macroeconomic Data</h3>
            <ul>
              <li>
                <strong>GDP:</strong> €2,925.64B
              </li>
              <li>
                <strong>Public Debt:</strong> €3,305.3B
              </li>
              <li>
                <strong>Deficit:</strong> €168.9B
              </li>
            </ul>
          </div>

          <div className="assumption-card">
            <h3>Growth Hypotheses</h3>
            <ul>
              <li>
                GDP growth: <strong>3.2% / yr</strong>
              </li>
              <li>Deficit follows GDP growth</li>
              <li>No population growth</li>
            </ul>
          </div>

          <div className="assumption-card">
            <h3>Budgets in (billion €)</h3>
            <table className="households-table">
              <tbody>
                <tr>
                  <td>Tax Expenditures</td>
                  <td>{TAX_EXPENDITURES_IN_2024}</td>
                </tr>
                <tr>
                  <td>Education</td>
                  <td>{EDUCATION_BUDGET}</td>
                </tr>
                <tr>
                  <td>Defense</td>
                  <td>{DEFENSE_BUDGET}</td>
                </tr>
                <tr>
                  <td>Higher Education</td>
                  <td>{RESEARCH_AND_HIGHER_EDUCATION_BUDGET}</td>
                </tr>
                <tr>
                  <td>Solidarity</td>
                  <td>{SOLIDARITY_AND_ALL_BUDGET}</td>
                </tr>
                <tr>
                  <td>Ecology</td>
                  <td>{ECOLOGY_BUDGET}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="assumption-card">
            <h3>Other Assumptions</h3>
            <ul>
              <li>All reductions expressed as percentages of budgets</li>
              <li>Deficit adjusted according to reductions (see below)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="computation-section">
        <h2>Computation's Steps</h2>

        <div className="computation-steps">
          <div className="step-card">
            <span className="step-number">1</span>
            <p>
              <strong>
                Year 2025 - Decreasing the spending of the budget and update the
                deficit and debt
              </strong>
            </p>
            <p>
              For each budget <strong>i</strong>:
            </p>
            <p className="formula">
              Budget<sub>i</sub>(T+1) = Budget<sub>i</sub>(T) × (1 + GDP growth
              rate) x (1 - Budget Cut Group<sub>i</sub>)
            </p>
            <p>Then:</p>
            <p className="formula">
              Budget(T+1) = Σ Budget<sub>i</sub>(T+1)
            </p>
            <p className="formula">
              Deficit(T+1) = Deficit(T) × (1 + GDP growth rate) − Budget(T+1)
            </p>
            <p className="formula">Debt(T+1) = Debt(T) + Deficit(T+1)</p>
            <p className="formula">GDP(T+1) = GDP(T) × (1 + GDP growth rate)</p>
          </div>

          <div className="step-card">
            <span className="step-number">2</span>
            <p>
              <strong>
                Years 2025–2050 (both included) - Increase variables by normal
                growth rate{" "}
              </strong>
            </p>
            <ul>
              <li className="formula">
                Deficit(T+1) = Deficit(T) × (1 + GDP growth rate)
              </li>
              <li className="formula">Debt(T+1) = Debt(T) + Deficit(T+1)</li>
              <li className="formula">
                GDP(T+1) = GDP(T) × (1 + GDP growth rate)
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
