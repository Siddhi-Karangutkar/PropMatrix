import React, { useContext } from 'react';
import { Web3Context } from '../context/Web3Context';
import { Wallet, Globe } from 'lucide-react';

const Navbar = () => {
  const { account, connectWallet } = useContext(Web3Context);

  return (
    <nav className="glass-panel sticky top-0 z-50 px-6 py-4 mb-8 flex justify-between items-center rounded-none border-t-0 border-l-0 border-r-0">
      <div className="flex items-center gap-2">
        <Globe className="text-neonCyan w-8 h-8" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonCyan to-neonPurple">
          PropMatrix
        </h1>
      </div>
      
      <button 
        onClick={connectWallet}
        className="glass-panel px-6 py-2 flex items-center gap-2 hover:border-neonCyan transition-all duration-300 group cursor-pointer"
      >
        <Wallet className="w-5 h-5 group-hover:text-neonCyan transition-colors" />
        <span className="font-medium">
          {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
