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
          Social Theory to Practice at Erasmus University Rotterdam.<br></br>
          Note that this website should be used on a computer rather than on a
          mobile phone.
        </p>
      </header>

      <section className="measures-section">
        <h2>Explore Measures</h2>
        <div className="measures-cards">
          <Link to="/capital-tax" className="measure-card">
            <h3>Capital Taxation</h3>
            <p>Simulate the impact of capital taxation on debt reduction.</p>
          </Link>
          <Link to="/spending-reduction" className="measure-card">
            <h3>Spending Reduction</h3>
            <p>Explore the effect of reducing government spending.</p>
          </Link>
          <Link to="/capital-exceptional-levy" className="measure-card">
            <h3>Exceptional Capital Levy</h3>
            <p>Test an unique capital levy for debt reduction.</p>
          </Link>
        </div>
      </section>

      <section className="info-section">
        <h2>About the Simulations</h2>

        <p className="info-intro">Each simulation page contains this:</p>

        <ul className="info-list">
          <li>
            <strong>Policy simulation</strong> – evaluates a measure’s impact on
            France’s debt and deficit
          </li>
          <li>
            <strong>Assumptions</strong> – details the economic hypotheses used
          </li>
          <li>
            <strong>Methodology</strong> – explains how the simulation is
            computed
          </li>
        </ul>
        <p>
          Note on the <strong>Timeline</strong> - simulations start in{" "}
          <strong>2025</strong>, using <strong>2024</strong> data (effects
          visible from 2025 onward)
        </p>
      </section>

      <footer className="homepage-footer">
        <p>
          Additionally, the <Link to="/references">References</Link> page
          explains where the assumptions have been sourced.<br></br>
          The source code of this website is available on{" "}
          <a href="https://github.com/simonplaye/debt-eraser">GitHub</a>.
        </p>
      </footer>
    </div>
  );
};
