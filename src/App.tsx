import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { CapitalTaxPage } from "./pages/CapitalTaxPage/CapitalTaxPage";
import { SpendingReductionPage } from "./pages/SpendingReductionPage/SpendingReductionPage";
import { ExceptionalCapitalLevyPage } from "./pages/ExceptionalCapitalLevyPage/ExceptionalCapitalLevyPage";
import { ReferencesPage } from "./pages/ReferencesPage";
import { useEffect } from "react";
import { NavigationBar } from "./pages/NavigationBar/NavigationBar";

export const App = () => {
  return (
    <div>
      <ScrollToTop />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/capital-tax" element={<CapitalTaxPage />} />
        <Route path="/spending-reduction" element={<SpendingReductionPage />} />
        <Route
          path="/capital-exceptional-levy"
          element={<ExceptionalCapitalLevyPage />}
        />
        <Route path="/references" element={<ReferencesPage />} />
      </Routes>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
};
