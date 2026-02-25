import "./ReferencesPage.css";

export const ReferencesPage = () => {
  return (
    <div className="page">
      <header className="page-header">
        <h1>References</h1>
      </header>

      <section className="references-section">
        <div className="references-grid">
          <div className="reference-card">
            <h3>Macroeconomic Data</h3>
            <ul>
              <li>
                <strong>Public Debt (2024):</strong> 3,305.3 billion €
                <br />
                <a
                  href="https://www.insee.fr/fr/statistiques/8540375#consulter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  INSEE – National Accounts
                </a>
              </li>
              <li>
                <strong>GDP (2024):</strong> 2,925.64 billion €
                <br />
                <a
                  href="https://www.insee.fr/fr/statistiques/8540375#consulter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  INSEE – National Accounts
                </a>
              </li>
              <li>
                <strong>Public Deficit (2024):</strong> 169.8 billion €
                <br />
                <a
                  href="https://www.insee.fr/fr/statistiques/8540375#consulter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  INSEE – National Accounts
                </a>
              </li>
              <li>
                <strong>Average GDP Growth (2014–2024):</strong> 3.20%
                <br />
                <a
                  href="https://www.insee.fr/fr/statistiques/8540375#consulter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Computed from INSEE – Historical GDP Series
                </a>
              </li>
            </ul>
          </div>

          <div className="reference-card">
            <h3>Households & Wealth Distribution</h3>
            <ul>
              <li>
                <strong>Households in France (2024):</strong> 31.1 millions
                <br />
                <a
                  href="https://www.insee.fr/fr/statistiques/8672665#onglet-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  INSEE – Household Statistics
                </a>
              </li>
              <li>
                <strong>Millionaires by wealth bracket (2023):</strong>
                <br />
                <a
                  href="https://rev01ution.red/wp-content/uploads/2024/03/global-wealth-databook-2023-ubs.pdf#page=134"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UBS – Global Wealth Databook 2023 (p.134)
                </a>
              </li>
            </ul>
          </div>

          <div className="reference-card">
            <h3>Wealth Growth Assumptions</h3>
            <ul>
              <li>
                <strong>Wealth growth rate for millionaires:</strong> 6% per
                year
                <br />
                <a
                  href="http://piketty.pse.ens.fr/files/Piketty2013Wealth21c.pdf#page=31"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Estimated from Thomas Piketty's Presentation of Capital in the
                  21st Century (p.31)
                </a>
              </li>
            </ul>
          </div>

          <div className="reference-card">
            <h3>Public Spending</h3>
            <ul>
              <li>
                <strong>Tax Loopholes (Niches fiscales):</strong>
                <br />
                <a
                  href="https://www.ccomptes.fr/sites/default/files/2025-04/NEB-2024-Depenses-fiscales.pdf#page=10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cour des Comptes – Dépenses fiscales (p.10)
                </a>
              </li>
              <li>
                <strong>State Budget Composition:</strong>
                <br />
                <a
                  href="https://www.budget.gouv.fr/budget-etat/mission?annee=143&loi_finances=50&type_budget=43&type_donnee_budget=ae&op=Valider"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  budget.gouv.fr – Budget de l’État
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
