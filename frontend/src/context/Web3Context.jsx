import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [isRegistrar, setIsRegistrar] = useState(false);
  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        
        const providerInstance = new ethers.BrowserProvider(window.ethereum);
        setProvider(providerInstance);
        
        const signer = await providerInstance.getSigner();
        
        try {
            // Dynamically import to avoid errors before compile/deploy
            const LandRegistryData = await import('../contracts/LandRegistryData.json');
            if (LandRegistryData && LandRegistryData.default.address) {
                const contractInstance = new ethers.Contract(
                    LandRegistryData.default.address,
                    LandRegistryData.default.abi,
                    signer
                );
                setContract(contractInstance);
                
                const registrar = await contractInstance.registrar();
                setIsRegistrar(registrar.toLowerCase() === accounts[0].toLowerCase());
            }
        } catch(e) {
            console.error("Contract data not found or error loading it. Please deploy first.", e);
        }

      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          if (contract) {
             contract.registrar().then(registrar => {
                 setIsRegistrar(registrar.toLowerCase() === accounts[0].toLowerCase());
             });
          }
        } else {
          setAccount(null);
          setContract(null);
          setIsRegistrar(false);
        }
      });
    }
  }, [contract]);

  return (
    <Web3Context.Provider value={{ account, provider, contract, connectWallet, isRegistrar }}>
      {children}
    </Web3Context.Provider>
  );
};
