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
          <li>Capital growth rate: 6% per year</li>
          <li>No population growth</li>
          <li>Total number of French households: 31.1 million</li>
          <li>
            Number of households per wealth group:
            <ul>
              <li>€1M – €5M: 2,628,568</li>
              <li>€5M – €10M: 137,305</li>
              <li>€10M – €50M: 51,403</li>
              <li>€50M – €100M: 2,638</li>
              <li>€100M – €500M: 1,168</li>
              <li>€500M+: 82</li>
            </ul>
          </li>
          <li>
            For each group, the average wealth is assumed to be 2/3 of the lower
            bound and 1/3 of the upper bound; for the €500M+ group, the average
            wealth is assumed to be €500M.
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
                Compute the total capital for each group in 2025 by taking the
                average wealth of the group, multiplying it by the number of
                households in the group, and increasing it by the capital growth
                rate.
              </li>
              <li>
                Apply the exceptional capital levy to each group's capital.
              </li>
              <li>
                Increase the deficit by the GDP growth rate and decrease it by
                the sum of all capital levied.
              </li>
            </ul>
          </li>
          <li>
            For every year T between 2025 and 2050 included:
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
