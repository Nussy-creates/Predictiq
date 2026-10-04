import "./Dashboard.css";

import Hero from "../components/Hero";
import TrendingMarket from "../components/TrendingMarket";

import { motion } from "motion/react";

function Dashboard() {
  return (
    <>
      <Hero />

      <TrendingMarket />

      <section className="why-predictiq">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">WHY PREDICTIQ</p>

          <h2>
            Prediction markets,
            <br />
            explained intelligently.
          </h2>
        </motion.div>

        <div className="feature-grid">
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span>01</span>

            <h3>AI Analysis</h3>

            <p>
              Understand the factors, probabilities, and uncertainties behind
              prediction markets.
            </p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span>02</span>

            <h3>Market Intelligence</h3>

            <p>
              Explore market prices and data in a clear interface designed for
              better understanding.
            </p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span>03</span>

            <h3>Panta Infrastructure</h3>

            <p>
              Interact with prediction markets through Panta's prediction market
              infrastructure.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
