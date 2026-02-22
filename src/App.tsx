import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { WealthTaxPage } from "./pages/WealthTaxPage/WealthTaxPage";
import { SpendingReductionPage } from "./pages/SpendingReductionPage/SpendingReductionPage";
import { ExceptionalWealthLevyPage } from "./pages/ExceptionalWealthLevyPage/ExceptionalWealthLevyPage";
import { ReferencesPage } from "./pages/ReferencesPage/ReferencesPage";
import { useEffect } from "react";
import { NavigationBar } from "./pages/NavigationBar/NavigationBar";

export const App = () => {
  return (
    <div>
      <ScrollToTop />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Wealth-tax" element={<WealthTaxPage />} />
        <Route path="/spending-reduction" element={<SpendingReductionPage />} />
        <Route
          path="/Wealth-exceptional-levy"
          element={<ExceptionalWealthLevyPage />}
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
