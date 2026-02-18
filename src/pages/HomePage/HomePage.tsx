import "./HomePage.css";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to this Simulator</h1>
        <p className="subtitle">
          Simulate the effects of different measures on France's debt and
          deficit.
        </p>
        <p className="subtitleDescription">
          This website is part of a "Policy Nota" written for the course From
          Social Theory to Practice at Erasmus University.
        </p>
      </header>

      <section className="measures-section">
        <h2>Explore Measures</h2>
        <div className="measures-cards">
          <Link to="/capital-tax" className="measure-card">
            <h3>Capital Tax</h3>
            <p>Simulate the impact of capital taxation on debt reduction.</p>
          </Link>
          <Link to="/spending-reduction" className="measure-card">
            <h3>Spending Reduction</h3>
            <p>Explore the effect of reducing government spending.</p>
          </Link>
          <Link to="/capital-exceptional-levy" className="measure-card">
            <h3>Exceptional Capital Levy</h3>
            <p>Test exceptional capital measures for debt management.</p>
          </Link>
        </div>
      </section>

      <section className="info-section">
        <h2>About the Simulations</h2>
        <p>Each page above:</p>
        <ul>
          <li>
            Offers to simulate the effect of a measure to reduce France's debt
            and deficit
          </li>
          <li>Explains how those simulations have been computed</li>
          <li>Describes which assumptions underlie the computation</li>
        </ul>
      </section>

      <footer className="homepage-footer">
        <p>
          Additionally, the <Link to="/references">References</Link> page
          explains where the assumptions have been sourced.<br></br>
          The source code of this project is available on{" "}
          <a href="https://github.com/simonplaye/debt-eraser">GitHub</a>.
        </p>
      </footer>
    </div>
  );
};
