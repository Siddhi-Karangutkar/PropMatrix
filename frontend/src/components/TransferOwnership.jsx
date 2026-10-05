import React, { useState, useContext } from 'react';
import { Web3Context } from '../context/Web3Context';
import { ArrowRightLeft, Loader2 } from 'lucide-react';

const TransferOwnership = () => {
  const { contract } = useContext(Web3Context);
  const [formData, setFormData] = useState({ id: '', newOwner: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!contract) return;
    
    setLoading(true);
    setMessage('');
    
    try {
      const tx = await contract.transferOwnership(
        formData.id,
        formData.newOwner
      );
      
      setMessage('Transaction submitted. Waiting for confirmation...');
      await tx.wait();
      
      setMessage('Ownership transferred successfully!');
      setFormData({ id: '', newOwner: '' });
    } catch (error) {
      console.error(error);
      setMessage(`Error: ${error.reason || error.message}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="glass-panel p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ArrowRightLeft className="text-neonPurple" />
          Transfer Ownership
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Transfer a property you own to a new wallet address. This action is permanent and verified by the smart contract.
        </p>
      </div>
      
      <form onSubmit={handleTransfer} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Property ID</label>
          <input 
            type="number" 
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-neonPurple transition-colors"
            placeholder="e.g. 101"
          />
          <p className="text-xs text-slate-500 mt-1">The ID of the property you wish to transfer.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">New Owner Address</label>
          <input 
            type="text" 
            name="newOwner"
            value={formData.newOwner}
            onChange={handleChange}
            required
            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-neonPurple transition-colors"
            placeholder="0x..."
          />
          <p className="text-xs text-slate-500 mt-1">The MetaMask address of the buyer/recipient.</p>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-neonPurple/20 to-neonCyan/20 border border-neonPurple hover:bg-neonPurple/30 text-white font-medium py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Transfer Property'}
        </button>
        
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${message.includes('Error') ? 'bg-red-500/20 text-red-200 border border-red-500/30' : 'bg-green-500/20 text-green-200 border border-green-500/30'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default TransferOwnership;
