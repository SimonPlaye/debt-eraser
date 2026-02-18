import { useEffect, useState } from "react";
import "./ExceptionalCapitalLevyPage.css";
import { LineChart } from "../../shared/LineChart";
import { getGraphData } from "./getGraphData";
import { Toggle } from "../../shared/Toggle";
import { Slider } from "../../shared/Slider";
import type { GraphDataType } from "../../shared/types";
import { SliderGrid } from "../../shared/SliderGrid";

export const ExceptionalCapitalLevyPage = () => {
  const [capitalLevyGroup1mTo5m, setCapitalLevyGroup1mTo5m] = useState(0);
  const [capitalLevyGroup5mTo10m, setCapitalLevyGroup5mTo10m] = useState(0);
  const [capitalLevyGroup10mTo50m, setCapitalLevyGroup10mTo50m] = useState(0);
  const [capitalLevyGroup50mTo100m, setCapitalLevyGroup50mTo100m] = useState(0);
  const [capitalLevyGroup100mTo500m, setCapitalLevyGroup100mTo500m] =
    useState(0);
  const [capitalLevyGroupFrom500m, setCapitalLevyGroupFrom500m] = useState(0);
  const [uniformTaxRate, setUniformTaxRate] = useState(0);
  const [applySameTaxRateToAllGroups, setApplySameTaxRateToAllGroups] =
    useState(false);
  const [graphData, setGraphData] = useState<GraphDataType[]>([]);

  useEffect(() => {
    if (applySameTaxRateToAllGroups) {
      setCapitalLevyGroup1mTo5m(uniformTaxRate);
      setCapitalLevyGroup5mTo10m(uniformTaxRate);
      setCapitalLevyGroup10mTo50m(uniformTaxRate);
      setCapitalLevyGroup50mTo100m(uniformTaxRate);
      setCapitalLevyGroup100mTo500m(uniformTaxRate);
      setCapitalLevyGroupFrom500m(uniformTaxRate);
    }
  }, [applySameTaxRateToAllGroups, uniformTaxRate]);

  useEffect(() => {
    setGraphData(
      getGraphData({
        capitalLevyGroup1mTo5m: capitalLevyGroup1mTo5m,
        capitalLevyGroup5mTo10m: capitalLevyGroup5mTo10m,
        capitalLevyGroup10mTo50m: capitalLevyGroup10mTo50m,
        capitalLevyGroup50mTo100m: capitalLevyGroup50mTo100m,
        capitalLevyGroup100mTo500m: capitalLevyGroup100mTo500m,
        capitalLevyGroupFrom500m: capitalLevyGroupFrom500m,
      }),
    );
  }, [
    capitalLevyGroup1mTo5m,
    capitalLevyGroup5mTo10m,
    capitalLevyGroup10mTo50m,
    capitalLevyGroup50mTo100m,
    capitalLevyGroup100mTo500m,
    capitalLevyGroupFrom500m,
  ]);

  return (
    <div className="tax-capital-page">
      <header className="page-header">
        <h1>Exceptional Capital Levy</h1>
        <p className="subtitle">
          Simulate the impact of an exceptional capital levy on millionaires on
          debt reduction.
        </p>
      </header>

      <section className="simulation-section">
        <h2>Simulation</h2>

        <div className="parameter-subsection">
          <h3>Exceptional Capital Levy on Wealth Groups</h3>
          {!applySameTaxRateToAllGroups && (
            <SliderGrid
              sliders={[
                {
                  title: "€1M – €5M",
                  value: capitalLevyGroup1mTo5m,
                  setValue: setCapitalLevyGroup1mTo5m,
                },
                {
                  title: "€5M – €10M",
                  value: capitalLevyGroup5mTo10m,
                  setValue: setCapitalLevyGroup5mTo10m,
                },
                {
                  title: "€10M – €50M",
                  value: capitalLevyGroup10mTo50m,
                  setValue: setCapitalLevyGroup10mTo50m,
                },
                {
                  title: "€50M – €100M",
                  value: capitalLevyGroup50mTo100m,
                  setValue: setCapitalLevyGroup50mTo100m,
                },
                {
                  title: "€100M – €500M",
                  value: capitalLevyGroup100mTo500m,
                  setValue: setCapitalLevyGroup100mTo500m,
                },
                {
                  title: "€500M+",
                  value: capitalLevyGroupFrom500m,
                  setValue: setCapitalLevyGroupFrom500m,
                },
              ]}
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
              maxValue={0.15}
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
              <li>
                Capital growth: <strong>6% / yr</strong>
              </li>
              <li>No population growth</li>
            </ul>
          </div>

          <div className="assumption-card">
            <h3>Households</h3>
            <table className="households-table">
              <tbody>
                <tr>
                  <td>Total households</td>
                  <td>31.1M</td>
                </tr>
                <tr>
                  <td>€1M–€5M</td>
                  <td>2,628,568</td>
                </tr>
                <tr>
                  <td>€5M–€10M</td>
                  <td>137,305</td>
                </tr>
                <tr>
                  <td>€10M–€50M</td>
                  <td>51,403</td>
                </tr>
                <tr>
                  <td>€50M–€100M</td>
                  <td>2,638</td>
                </tr>
                <tr>
                  <td>€100M–€500M</td>
                  <td>1,168</td>
                </tr>
                <tr>
                  <td>€500M+</td>
                  <td>82</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="assumption-card">
            <h3>Wealth Estimation</h3>
            <p>Average wealth per group is assumed to be:</p>
            <ul>
              <li>⅔ of the lower bound</li>
              <li>⅓ of the upper bound</li>
              <li>€500M flat average for the €500M+ group</li>
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
                Year 2025 - Decreasing the deficit by the capital levy
              </strong>
            </p>
            <p>
              For each capital group <strong>i</strong>:
            </p>
            <ul>
              <li className="formula">
                Levy Revenue Group<sub>i</sub> = C<sub>i</sub>(T) x (1 + Capital
                Growth Rate) x Levy Rate Group<sub>i</sub>
              </li>
            </ul>
            <p className="formula">
              Levy Revenue = Σ Levy Revenue Group<sub>i</sub>
            </p>
            <p className="formula">
              Deficit(T+1) = Deficit(T) × (1 + GDP growth rate) − Levy Revenue
            </p>
            <p className="formula">Debt(T+1) = Debt(T) + Deficit(T+1)</p>
            <p className="formula">GDP(T+1) = GDP(T) × (1 + GDP growth rate)</p>
            <p>
              Note - An example of how C<sub>i</sub>(T) is computed (here i =
              €100M–€500M):
            </p>
            <p className="formula">
              C<sub>i</sub>(T) = 1,168 * (⅔ * €100M + ⅓ * €500M)
            </p>
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
