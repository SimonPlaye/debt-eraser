import { useEffect, useState } from "react";
import "./CapitalTaxPage.css";
import { LineChart } from "../../shared/LineChart";
import { getGraphData } from "./getGraphData";
import { Toggle } from "../../shared/Toggle";
import { Slider } from "../../shared/Slider";
import type { GraphDataType } from "../../shared/types";
import { SliderGrid } from "../../shared/SliderGrid";

export const CapitalTaxPage = () => {
  const [taxLevelGroup1mTo5m, setTaxLevelGroup1mTo5m] = useState(0);
  const [taxLevelGroup5mTo10m, setTaxLevelGroup5mTo10m] = useState(0);
  const [taxLevelGroup10mTo50m, setTaxLevelGroup10mTo50m] = useState(0);
  const [taxLevelGroup50mTo100m, setTaxLevelGroup50mTo100m] = useState(0);
  const [taxLevelGroup100mTo500m, setTaxLevelGroup100mTo500m] = useState(0);
  const [taxLevelGroupFrom500m, setTaxLevelGroupFrom500m] = useState(0);
  const [uniformTaxRate, setUniformTaxRate] = useState(0);
  const [applySameTaxRateToAllGroups, setApplySameTaxRateToAllGroups] =
    useState(false);
  const [graphData, setGraphData] = useState<GraphDataType[]>([]);

  useEffect(() => {
    if (applySameTaxRateToAllGroups) {
      setTaxLevelGroup1mTo5m(uniformTaxRate);
      setTaxLevelGroup5mTo10m(uniformTaxRate);
      setTaxLevelGroup10mTo50m(uniformTaxRate);
      setTaxLevelGroup50mTo100m(uniformTaxRate);
      setTaxLevelGroup100mTo500m(uniformTaxRate);
      setTaxLevelGroupFrom500m(uniformTaxRate);
    }
  }, [applySameTaxRateToAllGroups, uniformTaxRate]);

  useEffect(() => {
    setGraphData(
      getGraphData({
        taxLevels: {
          taxLevelGroup1mTo5m: taxLevelGroup1mTo5m,
          taxLevelGroup5mTo10m: taxLevelGroup5mTo10m,
          taxLevelGroup10mTo50m: taxLevelGroup10mTo50m,
          taxLevelGroup50mTo100m: taxLevelGroup50mTo100m,
          taxLevelGroup100mTo500m: taxLevelGroup100mTo500m,
          taxLevelGroupFrom500m: taxLevelGroupFrom500m,
        },
      }),
    );
  }, [
    taxLevelGroup1mTo5m,
    taxLevelGroup5mTo10m,
    taxLevelGroup10mTo50m,
    taxLevelGroup50mTo100m,
    taxLevelGroup100mTo500m,
    taxLevelGroupFrom500m,
  ]);

  return (
    <div className="tax-capital-page">
      <header className="page-header">
        <h1>Taxing Capital</h1>
      </header>

      <section className="simulation-section">
        <h2>Simulation</h2>

        <div className="parameter-subsection">
          <h3>Capital Tax on Wealth Groups</h3>
          {!applySameTaxRateToAllGroups && (
            <SliderGrid
              sliders={[
                {
                  title: "€1M – €5M",
                  value: taxLevelGroup1mTo5m,
                  setValue: setTaxLevelGroup1mTo5m,
                },
                {
                  title: "€5M – €10M",
                  value: taxLevelGroup5mTo10m,
                  setValue: setTaxLevelGroup5mTo10m,
                },
                {
                  title: "€10M – €50M",
                  value: taxLevelGroup10mTo50m,
                  setValue: setTaxLevelGroup10mTo50m,
                },
                {
                  title: "€50M – €100M",
                  value: taxLevelGroup50mTo100m,
                  setValue: setTaxLevelGroup50mTo100m,
                },
                {
                  title: "€100M – €500M",
                  value: taxLevelGroup100mTo500m,
                  setValue: setTaxLevelGroup100mTo500m,
                },
                {
                  title: "€500M+",
                  value: taxLevelGroupFrom500m,
                  setValue: setTaxLevelGroupFrom500m,
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
            At T = t + 1: take the GDP of T = t and increase it by the GDP
            growth rate.
          </li>
          <li>
            At T = t + 1:
            <ul>
              <li>Compute the capital of each group at T = t.</li>
              <li>Increase it by the capital growth rate.</li>
              <li>Apply the corresponding tax to the capital of each group.</li>
              <li>Sum to get the overall revenue.</li>
            </ul>
          </li>

          <li>
            At T = t + 1: take the deficit of T = t and increase it by the
            deficit growth rate.
          </li>
          <li>
            At T = t + 1: take the debt at T = t, add the deficit and the
            revenue from the tax.
          </li>
        </ul>
      </section>
    </div>
  );
};
