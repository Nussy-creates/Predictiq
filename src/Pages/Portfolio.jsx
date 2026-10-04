import { motion } from "motion/react";
import { useWallet } from "@solana/wallet-adapter-react";
import "./Portfolio.css";

function Portfolio() {
  const { publicKey, connected } = useWallet();

  return (
    <main className="portfolio">
      <motion.div
        className="portfolio-header"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span>YOUR PORTFOLIO</span>

        <h1>
          Track your
          <br />
          predictions.
        </h1>

        <p>View your prediction-market activity and connected wallet.</p>
      </motion.div>

      <motion.section
        className="wallet-card"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div>
          <span>WALLET</span>

          <h3>{connected ? publicKey.toBase58() : "No wallet connected"}</h3>
        </div>

        <div className="wallet-status">
          {connected ? "Connected" : "Connect wallet"}
        </div>
      </motion.section>

      <section className="portfolio-grid">
        <motion.div
          className="portfolio-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>OPEN POSITIONS</span>
          <strong>0</strong>
        </motion.div>

        <motion.div
          className="portfolio-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span>TOTAL INVESTED</span>
          <strong>0 USDC</strong>
        </motion.div>

        <motion.div
          className="portfolio-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span>CLAIMABLE</span>
          <strong>0 USDC</strong>
        </motion.div>
      </section>

      <motion.section
        className="positions-section"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Your positions</h2>

        <div className="empty-positions">
          <div className="empty-line"></div>

          <h3>No positions yet</h3>

          <p>Your prediction positions will appear here after you trade.</p>
        </div>
      </motion.section>
    </main>
  );
}

export default Portfolio;
