import React, { useContext, useState, useEffect } from 'react';
import { Web3Context } from '../context/Web3Context';
import { Building2, Square, MapPin } from 'lucide-react';

const Dashboard = () => {
  const { account, contract } = useContext(Web3Context);
  const [properties, setProperties] = useState([]);
  const [totalRegistered, setTotalRegistered] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!contract || !account) return;
      
      try {
        const fetchedProperties = [];
        let total = 0;
        
        for (let i = 1; i <= 50; i++) {
          try {
            const prop = await contract.getProperty(i);
            if (prop[4]) {
              total++;
              if (prop[3].toLowerCase() === account.toLowerCase()) {
                fetchedProperties.push({
                  id: prop[0].toString(),
                  location: prop[1],
                  area: prop[2].toString(),
                  owner: prop[3],
                });
              }
            }
          } catch (e) {
            // Property not registered, continue
          }
        }
        
        setProperties(fetchedProperties);
        setTotalRegistered(total);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };
    
    fetchProperties();
    
    if (contract) {
       contract.on("PropertyRegistered", fetchProperties);
       contract.on("OwnershipTransferred", fetchProperties);
    }
    
    return () => {
       if (contract) {
           contract.removeAllListeners("PropertyRegistered");
           contract.removeAllListeners("OwnershipTransferred");
       }
    }
  }, [contract, account]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 flex flex-col items-center justify-center">
          <h3 className="text-slate-400 font-medium mb-2">Total Properties in System</h3>
          <p className="text-4xl font-bold text-neonCyan">{totalRegistered}</p>
        </div>
        <div className="glass-panel p-6 flex flex-col items-center justify-center">
          <h3 className="text-slate-400 font-medium mb-2">Your Owned Properties</h3>
          <p className="text-4xl font-bold text-neonPurple">{properties.length}</p>
        </div>
      </div>

      <div className="glass-panel p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="text-neonCyan" />
            My Property Portfolio
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            This dashboard displays all digital assets currently linked to your wallet address. These records are securely stored on the blockchain and cannot be tampered with.
          </p>
        </div>
        
        {properties.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            You don't own any properties yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <div key={prop.id} className="glass-panel p-6 hover:border-neonCyan hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium">
                    ID: {prop.id}
                  </span>
                  <Building2 className="text-slate-400" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-neonCyan" />
                    <span>{prop.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Square className="w-4 h-4 text-neonPurple" />
                    <span>{prop.area} sq. meters</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
