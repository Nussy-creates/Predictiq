import "./MarketCard.css";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function MarketCard({ market }) {
  const navigate = useNavigate();
  const endDate = new Date(market.endTime).toLocaleDateString();
  console.log("Market card data:", JSON.stringify(market, null, 2));
  return (
    <motion.div
      className="market-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3>{market.title}</h3>
      <p>{market.description}</p>
      <p>Volume: ${Number(market.volumeUsdc).toFixed(2)} USDC</p>
      <p>Ends: {endDate}</p>

      <div className="market-prices">
        <span>YES {Number(market.yesPrice) * 100}%</span>
        <span>NO {Number(market.noPrice) * 100}%</span>
      </div>

      <button onClick={() => navigate(`/market/${market.marketId}`)}>
        View Market
      </button>
      <div className="probability-bar">
        <div
          className="yes-bar"
          style={{ width: `${Number(market.yesPrice) * 100}%` }}
        ></div>
      </div>
    </motion.div>
  );
}
export default MarketCard;
