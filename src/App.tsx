import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CapitalTaxPage } from "./pages/CapitalTaxPage";
import { HeritageTaxPage } from "./pages/HeritageTaxPage";
import { DeficitReductionPage } from "./pages/DeficitReductionPage";
import { GeneralAssumptionsPage } from "./pages/GeneralAssumptionsPage";
import { ReferencesPage } from "./pages/ReferencesPage";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/capital-tax" element={<CapitalTaxPage />} />
        <Route path="/heritage-tax" element={<HeritageTaxPage />} />
        <Route path="/deficit-reduction" element={<DeficitReductionPage />} />
        <Route
          path="/general-assumptions"
          element={<GeneralAssumptionsPage />}
        />
        <Route path="/references" element={<ReferencesPage />} />
      </Routes>
    </div>
  );
};
