import { createContext, useState, useEffect, useContext } from "react";
import { ContractAddress } from "../contracts/ContractAddress";
import { ABI } from "../contracts/ABI";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(localStorage.getItem("walletAddress") || "");
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(!!localStorage.getItem("walletAddress"));
  const [error, setError] = useState("");

  // Function to Connect Wallet
  const connectWallet = async () => {
    try {
      setError("");

      if (!window.ethereum) {
        throw new Error("MetaMask not installed!");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(ContractAddress, ABI, signer);

      setAccount(accounts[0]);
      setContract(contractInstance);
      setIsConnected(true);

      // 🔥 Save account in localStorage to persist on refresh
      localStorage.setItem("walletAddress", accounts[0]);
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
    }
  };

  // Function to Disconnect Wallet
  const handleDisconnect = () => {
    setAccount("");
    setContract(null);
    setIsConnected(false);

    // Remove from localStorage
    localStorage.removeItem("walletAddress");
  };

  // 🔄 Restore account on page load
  useEffect(() => {
    const restoreWallet = async () => {
      if (!window.ethereum) return;

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);

        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          const contractInstance = new ethers.Contract(ContractAddress, ABI, signer);

          setAccount(accounts[0]);
          setContract(contractInstance);
          setIsConnected(true);

          // Store in localStorage
          localStorage.setItem("walletAddress", accounts[0]);
        }
      } catch (error) {
        console.error("Failed to restore wallet:", error);
      }
    };

    restoreWallet();
  }, []);

  // 🔄 Listen for account changes in MetaMask
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (newAccounts) => {
        if (newAccounts.length === 0) {
          handleDisconnect();
        } else {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contractInstance = new ethers.Contract(ContractAddress, ABI, signer);

          setAccount(newAccounts[0]);
          setContract(contractInstance);
          setIsConnected(true);

          // Update localStorage
          localStorage.setItem("walletAddress", newAccounts[0]);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{ account, contract, isConnected, connectWallet, handleDisconnect, error }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom Hook to Use Wallet Context
export const useWallet = () => useContext(WalletContext);
