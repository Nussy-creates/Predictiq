import "./MarketDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Transaction, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

function MarketDetails() {
  const { publicKey, connected } = useWallet();
  const { marketId } = useParams();
  const [market, setMarket] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchMarketDetails = async () => {
      try {
        const response = await fetch(`/api/markets/${marketId}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.log("Backend error:", response.status, errorText);
          throw new Error("Failed to fetch market");
        }

        const data = await response.json();

        console.log("Market details response:", data);

        setMarket(data);
      } catch (error) {
        console.error("Error fetching market:", error);
      }
    };
    fetchMarketDetails();
  }, [marketId]);
  const analyzeMarket = async () => {
    try {
      setAnalyzing(true);

      const response = await fetch("/api/analyze-market", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          market,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze market");
      }

      const data = await response.json();

      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysis("Unable to generate analysis right now.");
    } finally {
      setAnalyzing(false);
    }
  };
  const getQuote = async () => {
    try {
      if (!connected || !publicKey) {
        alert("Please connect your Phantom wallet first.");
        return;
      }

      const response = await fetch("/api/quote-buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet: publicKey.toBase58(),
          marketId: market.marketId,
          side: "yes",
          amountUsdc: "20",
        }),
      });

      const data = await response.json();

      setQuote(data);
    } catch (error) {
      console.error("Quote error:", error);
    }
  };
  console.log("Wallet status:", {
    connected,
    publicKey: publicKey?.toBase58(),
  });
  const buildOrder = async () => {
    try {
      if (!quote || !publicKey) {
        return;
      }

      const response = await fetch("/api/build-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteId: quote.quoteId,
          wallet: publicKey.toBase58(),
        }),
      });

      const data = await response.json();
      console.log("Full Panta order:", JSON.stringify(data, null, 2));

      console.log("Panta order:", data);
      console.log("Instructions:", data.instructions);

      const transaction = new Transaction();

      transaction.recentBlockhash = data.recentBlockhash;
      transaction.feePayer = publicKey;

      data.instructions.forEach((instruction) => {
        transaction.add({
          programId: new PublicKey(instruction.programId),
          keys: instruction.accounts.map((account) => ({
            pubkey: new PublicKey(account.pubkey),
            isSigner: account.isSigner,
            isWritable: account.isWritable,
          })),
          data: Buffer.from(instruction.data, "base64"),
        });
      });

      console.log("Transaction built:", transaction);
    } catch (error) {
      console.error("Build order error:", error);
    }
  };

  return (
    <div className="market-details">
      <div className="market-meta">
        <span>{market?.category}</span>
        <span>{market?.phase}</span>
      </div>

      {market && (
        <>
          <h1>{market.title}</h1>

          <p className="description">{market.description}</p>

          <div className="market-prices">
            <span>YES {Number(market.yesPrice) * 100}%</span>
            <span>NO {Number(market.noPrice) * 100}%</span>
          </div>

          <div className="probability-bar">
            <div
              className="yes-bar"
              style={{
                width: `${Number(market.yesPrice) * 100}%`,
              }}
            ></div>
          </div>

          <div className="market-info">
            <div>
              <span>Volume</span>
              <strong>${Number(market.volumeUsdc).toFixed(2)} USDC</strong>
            </div>

            <div>
              <span>Region</span>
              <strong>{market.region}</strong>
            </div>

            <div>
              <span>Ends</span>
              <strong>{new Date(market.endTime).toLocaleDateString()}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{market.status}</strong>
            </div>
          </div>

          <div className="ai-analysis">
            <div className="ai-header">
              <h2>AI Analyst</h2>
              <span>PredictIQ AI</span>
            </div>

            {!analysis && (
              <>
                <p>Get an AI-powered analysis of this prediction market.</p>

                <button onClick={analyzeMarket} disabled={analyzing}>
                  {analyzing ? "Analyzing..." : "Analyze Market"}
                </button>
              </>
            )}

            {analysis && <div className="analysis-result">{analysis}</div>}
          </div>

          <div className="trade-section">
            <div className="trade-header">
              <span>TRADE</span>
              <h2>Make your prediction.</h2>
            </div>

            <button onClick={getQuote}>Get YES Quote</button>

            {quote && (
              <div className="quote-box">
                <h3>Trade YES</h3>

                <div className="quote-row">
                  <span>Investment</span>
                  <strong>{quote.amountUsdc} USDC</strong>
                </div>

                <div className="quote-row">
                  <span>Expected shares</span>
                  <strong>{quote.shares}</strong>
                </div>

                <div className="quote-row">
                  <span>Average price</span>
                  <strong>{quote.avgPrice}</strong>
                </div>

                <div className="quote-row">
                  <span>Fee</span>
                  <strong>{quote.feeUsdc} USDC</strong>
                </div>

                <button onClick={buildOrder}>Continue with Panta</button>

                <p className="sandbox-note">Test mode — Panta sandbox order</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default MarketDetails;
