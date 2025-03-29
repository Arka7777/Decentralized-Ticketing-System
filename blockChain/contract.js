import React, { useState } from "react";
import { getContract } from "./contract";

function App() {
  const [account, setAccount] = useState("");

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      alert("MetaMask not detected!");
    }
  };

  // Call Smart Contract Function
  const callContractFunction = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;

      const tx = await contract.someFunction(); // Replace with actual function
      await tx.wait();
      alert("Transaction Successful!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button onClick={connectWallet} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        {account ? `Connected: ${account.substring(0, 6)}...` : "Connect Wallet"}
      </button>

      <button onClick={callContractFunction} className="px-4 py-2 bg-green-500 text-white rounded-lg mt-4">
        Call Smart Contract
      </button>
    </div>
  );
}

export default App;
