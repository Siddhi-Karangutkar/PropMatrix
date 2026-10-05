import React, { useContext } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import RegisterLand from './components/RegisterLand';
import TransferOwnership from './components/TransferOwnership';
import { Web3Context } from './context/Web3Context';
import { ShieldCheck, Zap, Globe2, Wallet, FileKey2, ArrowRightLeft, Blocks, Fingerprint, LockKeyhole } from 'lucide-react';

function App() {
  const { account, isRegistrar } = useContext(Web3Context);

  return (
    <div className="min-h-screen pb-12 relative overflow-hidden">
      {/* Background glow effects with animation */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neonPurple/20 blur-[120px] pointer-events-none animate-pulse animate-float" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neonCyan/20 blur-[120px] pointer-events-none animate-pulse animate-float-delayed" />
      
      <Navbar />
      
      <main className="container mx-auto px-4 relative z-10">
        {!account ? (
          <div className="max-w-6xl mx-auto mt-12 space-y-16">
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                The Future of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPurple">
                  Property Registration
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mt-6">
                PropMatrix replaces outdated paper registries with a secure, decentralized ledger. 
                Experience immutable property ownership powered by smart contracts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="group glass-panel p-8 text-center hover:border-neonCyan hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-neonCyan/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8 text-neonCyan group-hover:animate-bounce" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Immutable Ledger</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Every property record is cryptographically secured on the blockchain. Once registered, ownership details cannot be tampered with or altered by malicious actors.
                </p>
              </div>

              <div className="group glass-panel p-8 text-center hover:border-neonPurple hover:shadow-[0_0_20px_rgba(189,0,255,0.15)] transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-neonPurple/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-neonPurple group-hover:animate-bounce" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Instant Transfers</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Eliminate middlemen, lawyers, and endless paperwork. Transfer ownership of a property to anyone in the world in a matter of seconds using a single transaction.
                </p>
              </div>

              <div className="group glass-panel p-8 text-center hover:border-neonCyan hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-neonCyan/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Globe2 className="w-8 h-8 text-neonCyan group-hover:animate-bounce" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Public Transparency</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The entire registry is publicly verifiable. Anyone can easily confirm who owns a piece of land by querying the smart contract, preventing fraudulent claims.
                </p>
              </div>
            </div>

            <div className="py-12 border-y border-white/5 bg-slate-900/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="flex justify-center mb-3"><Blocks className="text-slate-500 w-6 h-6" /></div>
                  <h4 className="text-2xl font-bold text-white">Smart Contract</h4>
                  <p className="text-slate-400 text-sm">Powered by Solidity on Ethereum</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center mb-3"><Fingerprint className="text-slate-500 w-6 h-6" /></div>
                  <h4 className="text-2xl font-bold text-white">Zero Trust</h4>
                  <p className="text-slate-400 text-sm">No central authority required</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center mb-3"><LockKeyhole className="text-slate-500 w-6 h-6" /></div>
                  <h4 className="text-2xl font-bold text-white">100% Secure</h4>
                  <p className="text-slate-400 text-sm">Cryptographic ownership proofs</p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto pt-8">
              <h2 className="text-3xl font-bold text-center mb-12">How PropMatrix Works</h2>
              
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row gap-6 items-start glass-panel p-6 hover-glow group transition-all duration-500">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neonCyan/20 flex items-center justify-center text-neonCyan font-bold text-xl group-hover:animate-float">1</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Wallet className="w-5 h-5 text-neonCyan group-hover:rotate-12 transition-transform" /> Connect Your Wallet</h3>
                    <p className="text-slate-400 text-sm">
                      Users authenticate securely using Web3 wallets like MetaMask. Your wallet address acts as your unique digital identity in the PropMatrix ecosystem, replacing traditional usernames and passwords.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row gap-6 items-start glass-panel p-6 border-l-2 border-l-neonPurple hover-glow group transition-all duration-500">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neonPurple/20 flex items-center justify-center text-neonPurple font-bold text-xl group-hover:animate-float-delayed">2</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><FileKey2 className="w-5 h-5 text-neonPurple group-hover:rotate-12 transition-transform" /> Property Registration</h3>
                    <p className="text-slate-400 text-sm">
                      The official Registrar mints new land properties as unique digital assets directly onto the blockchain. Each property is assigned a unique ID, physical area, and location data that cannot be erased.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row gap-6 items-start glass-panel p-6 hover-glow group transition-all duration-500">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neonCyan/20 flex items-center justify-center text-neonCyan font-bold text-xl group-hover:animate-float">3</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><ArrowRightLeft className="w-5 h-5 text-neonCyan group-hover:rotate-12 transition-transform" /> Decentralized Transfer</h3>
                    <p className="text-slate-400 text-sm">
                      Property owners have full autonomy to transfer their real estate to another wallet address. The smart contract validates the transaction, instantly updating the global ledger without requiring a middleman.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-10 text-center mt-16 bg-gradient-to-b from-slate-900/40 to-slate-900/80 border-t border-white/5">
              <h2 className="text-2xl font-bold mb-4 text-white">Ready to test the system?</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Connect your MetaMask wallet using the button in the top right corner. If you log in with the Registrar account, you can start minting new properties immediately.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="glass-panel p-6 border-l-4 border-l-neonCyan">
              <h2 className="text-2xl font-bold mb-2">
                {isRegistrar ? "Welcome, Registrar" : "Welcome, Property Owner"}
              </h2>
              <p className="text-slate-300">
                {isRegistrar 
                  ? "As the Registrar, you have the exclusive authority to register new properties on the blockchain. You can also transfer any properties you currently own." 
                  : "You are logged in as a standard user. You can view your property portfolio below and securely transfer ownership of any properties you own to another wallet address."}
              </p>
            </div>

            <Dashboard />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isRegistrar && <RegisterLand />}
              <TransferOwnership />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
