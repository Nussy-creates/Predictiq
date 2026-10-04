import { useWallet } from "@solana/wallet-adapter-react";

function WalletInfo() {
  const { publicKey, connected } = useWallet();

  if (!connected) {
    return <p>Wallet not connected</p>;
  }

  return <p>Wallet: {publicKey.toBase58()}</p>;
}

export default WalletInfo;
