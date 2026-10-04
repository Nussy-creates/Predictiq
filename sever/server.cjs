require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(express.json());
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.get("/", (req, res) => {
  res.send("PredictIQ backend is running!");
});

app.get("/api/markets", async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");

    const response = await fetch(
      "https://live-api.panta.market/api/v1/markets/?limit=50",
      {
        headers: {
          "X-Api-Key": process.env.PANTA_API_KEY,
        },
      },
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch markets",
    });
  }
});

app.get("/api/markets/:marketId", async (req, res) => {
  try {
    const { marketId } = req.params;

    const response = await fetch(
      `https://live-api.panta.market/api/v1/markets/${marketId}/`,
      {
        headers: {
          "X-Api-Key": process.env.PANTA_API_KEY,
        },
      },
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch market",
    });
  }
});
app.post("/api/analyze-market", async (req, res) => {
  try {
    const { market } = req.body;

    if (!market) {
      return res.status(400).json({
        error: "Market data is required",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `
You are PredictIQ's AI market analyst.

Analyze prediction markets objectively and clearly.

Explain:
1. What the market is asking.
2. What the current YES and NO prices indicate.
3. Important factors that could affect the outcome.
4. Key uncertainties or limitations.

Do not tell the user to buy YES or NO.
Do not make guaranteed predictions.
Use the information provided by the market.
`,
        },
        {
          role: "user",
          content: JSON.stringify(market),
        },
      ],
    });

    res.json({
      analysis: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI analysis error:", error);

    res.status(500).json({
      error: "Failed to analyze market",
    });
  }
});
app.get("/api/quote-test", (req, res) => {
  res.json({
    message: "Quote route is working",
  });
});

app.post("/api/quote-buy", async (req, res) => {
  try {
    const { wallet, marketId, side, amountUsdc } = req.body;

    if (!wallet || !marketId || !side || !amountUsdc) {
      return res.status(400).json({
        error: "wallet, marketId, side and amountUsdc are required",
      });
    }

    const response = await fetch(
      "https://live-api.panta.market/api/v1/primaryorderquote/",
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.PANTA_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet,
          marketId,
          side,
          amountUsdc,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Quote error:", error);

    res.status(500).json({
      error: "Failed to get buy quote",
    });
  }
});
app.get("/api/build-test", (req, res) => {
  res.json({
    message: "Build route is working",
  });
});
app.post("/api/build-order", async (req, res) => {
  try {
    const { quoteId, wallet } = req.body;

    if (!quoteId || !wallet) {
      return res.status(400).json({
        error: "quoteId and wallet are required",
      });
    }

    const response = await fetch(
      "https://live-api.panta.market/api/v1/primaryorderbuild/",
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.PANTA_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteId,
          wallet,
          maxSlippageBps: 100,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Build order error:", error);

    res.status(500).json({
      error: "Failed to build order",
    });
  }
});
app.get("/api/positions/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;

    const response = await fetch(
      `https://live-api.panta.market/api/v1/positions/?wallet=${wallet}`,
      {
        headers: {
          "X-Api-Key": process.env.PANTA_API_KEY,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Positions error:", error);

    res.status(500).json({
      error: "Failed to fetch positions",
    });
  }
});
module.exports = app;
