import React, { useState, useContext } from 'react';
import { Web3Context } from '../context/Web3Context';
import { FilePlus2, Loader2 } from 'lucide-react';

const RegisterLand = () => {
  const { contract } = useContext(Web3Context);
  const [formData, setFormData] = useState({ id: '', location: '', area: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!contract) return;
    
    setLoading(true);
    setMessage('');
    
    try {
      const tx = await contract.registerProperty(
        formData.id,
        formData.location,
        formData.area
      );
      
      setMessage('Transaction submitted. Waiting for confirmation...');
      await tx.wait();
      
      setMessage('Property registered successfully!');
      setFormData({ id: '', location: '', area: '' });
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
          <FilePlus2 className="text-neonCyan" />
          Register New Property
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          As a registrar, you can securely mint new property records into the blockchain ledger. Once minted, ownership is immutable.
        </p>
      </div>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Property ID</label>
          <input 
            type="number" 
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-neonCyan transition-colors"
            placeholder="e.g. 101"
          />
          <p className="text-xs text-slate-500 mt-1">Must be a unique number (Try 1 - 50)</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
          <input 
            type="text" 
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-neonCyan transition-colors"
            placeholder="e.g. 123 Blockchain Ave"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Area (sq. meters)</label>
          <input 
            type="number" 
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-neonCyan transition-colors"
            placeholder="e.g. 500"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-neonCyan/20 to-neonPurple/20 border border-neonCyan hover:bg-neonCyan/30 text-white font-medium py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register Property'}
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

export default RegisterLand;
