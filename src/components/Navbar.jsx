import "./Navbar.css";
import { Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <h1>PredictIQ</h1>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
          </ul>
        </nav>
        <WalletMultiButton />
      </div>
    </div>
  );
};

export default Navbar;
