import MarketCard from "./MarketCard";
import "./TendingMarket.css";
import { useEffect, useState } from "react";

function TrendingMarkets() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/markets?refresh=true")
      .then((response) => response.json())
      .then((data) => {
        console.log("Panta data:", data);
        setMarkets(data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching markets:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading markets...</p>;
  }

  return (
    <section id="markets" className="trending-markets">
      <h2>Trending Markets</h2>

      <div className="markets-grid">
        {markets.map((market) => (
          <MarketCard key={market.marketId} market={market} />
        ))}
      </div>
    </section>
  );
}

export default TrendingMarkets;
