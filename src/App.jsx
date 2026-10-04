import "./App.css";
import Navbar from "./components/Navbar";
import WalletInfo from "./components/WalletInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketDetails from "./Pages/MarketDetails";
import Portfolio from "./Pages/Portfolio";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <WalletInfo />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market/:marketId" element={<MarketDetails />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
