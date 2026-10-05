# 🌐 PropMatrix - Decentralized Land & Property Registry

PropMatrix is a lightweight, decentralized Land & Property Registry DApp designed to eliminate centralized database tampering by tokenizing land plots into unique digital assets governed by a Solidity smart contract. 

It features a modern, dark-mode glassmorphism UI with neon accent lighting.

## 🛠️ Technology Stack
- **Smart Contracts**: Solidity
- **Local Blockchain**: Hardhat
- **Frontend**: React (Vite) + Tailwind CSS v4 + Lucide Icons
- **Web3 Integration**: Ethers.js v6

---

## 🚀 Quick Start Guide (How to run the project)

If you have closed your computer and need to start the project again, follow these steps in order:

### 1. Start the Local Blockchain
Open a terminal in the root `PropMatrix` directory and run:
```bash
npx hardhat node
```
*Leave this terminal running! This is your local Ethereum node.*

### 2. Deploy the Smart Contract
Open a **second terminal** in the root directory and run:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
*This will deploy the contract to the blockchain and automatically send the new contract address to your frontend.*

### 3. Start the Frontend App
Open a **third terminal**, navigate into the `frontend` folder, and start the React server:
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🦊 MetaMask Setup

Since this runs on a local testing network, you need to configure MetaMask to connect to it:

1. **Add the Network**:
   - Go to Settings -> Networks -> Add Network -> Add a network manually
   - **Network Name**: Hardhat
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`

2. **Import Test Accounts**:
   - When you run `npx hardhat node`, it provides 20 accounts with 10,000 fake ETH each. 
   - Copy the **Private Key** of `Account #0` from the terminal.
   - In MetaMask, click "Add account or hardware wallet" -> "Import account" and paste the private key.
   - *Note: Account #0 is the **Registrar**. Only this account has the permission to register new properties.*

---

## 💡 Features & Usage

1. **Register a Property (Registrar Only)**
   - Connect your wallet using Account #0.
   - Enter a Property ID (e.g., `1`, `2`, `3`), Location, and Area.
   - *Note: For performance, the dashboard currently only scans for Property IDs from 1 to 20.*
2. **Transfer Ownership**
   - Enter the Property ID you own and the wallet address of the new owner.
   - Sign the transaction to permanently update the blockchain ledger.
3. **View Portfolio**
   - The dashboard instantly reflects changes in ownership, displaying all properties currently owned by the connected wallet.

---

## ⚠️ Troubleshooting

**"Nonce too high" or "Transaction stuck" error in MetaMask?**
If you restart the Hardhat node, MetaMask remembers the old transaction history and gets confused. To fix this:
1. Open MetaMask Settings.
2. Go to **Advanced**.
3. Click **Clear activity tab data** (or Reset Account). This resets the transaction counter so you can interact with the new blockchain.
