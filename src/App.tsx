import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { CapitalTaxPage } from "./pages/CapitalTaxPage/CapitalTaxPage";
import { HeritageTaxPage } from "./pages/HeritageTaxPage";
import { SpendingReductionPage } from "./pages/SpendingReductionPage";
import { CapitalExceptionalDebitPage } from "./pages/CapitalExceptionalDebitPage";
import { GeneralAssumptionsPage } from "./pages/GeneralAssumptionsPage";
import { ReferencesPage } from "./pages/ReferencesPage";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/capital-tax" element={<CapitalTaxPage />} />
        <Route path="/heritage-tax" element={<HeritageTaxPage />} />
        <Route path="/spending-reduction" element={<SpendingReductionPage />} />
        <Route
          path="/capital-exceptional-debit"
          element={<CapitalExceptionalDebitPage />}
        />
        <Route
          path="/general-assumptions"
          element={<GeneralAssumptionsPage />}
        />
        <Route path="/references" element={<ReferencesPage />} />
      </Routes>
    </div>
  );
};
