# ⛽ Real-Time Gas Fee Tracker

This is a **real-time gas fee tracker** for Ethereum, Polygon, and Arbitrum using WebSockets and Zustand.

## 🚀 Features

- ⚡ Live gas fee updates via WebSockets (Alchemy)
- 🧠 Zustand for state management
- 🔐 Fallback handling for static values (like constant 30 Gwei)
- 📊 Tracks base and priority gas fees per chain
- 💡 Arbitrum’s low constant fees accounted for

## 🔧 Tech Stack

- React + Vite
- Zustand
- ethers.js
- Tailwind CSS
- Recharts + Lightweight Charts 

## 📁 Folder Structure

```
src/
├── components/           // UI Cards per chain
├── store/                // Zustand store
├── utils/                // WebSocket logic
├── App.jsx               // Entry point
└── main.jsx              // ReactDOM bootstrap
```

## 📦 Installation

```bash
git clone https://github.com/sharmaHarshit2000/gas-tracker.git
cd gas-tracker
npm install
```

### 🔐 Setup

Create a `.env` file:

```env
VITE_ETHEREUM_WSS=wss://eth-mainnet.g.alchemy.com/v2/your-key
VITE_POLYGON_WSS=wss://polygon-mainnet.g.alchemy.com/v2/your-key
VITE_ARBITRUM_WSS=wss://arb-mainnet.g.alchemy.com/v2/your-key
```

## 🧪 Development

```bash
npm run dev
```

## 🔨 Production Build

```bash
npm run build
```

## 🌐 Live Demo

🔗 [Live on Vercel](https://gas-tracker-harshit.vercel.app)

## 🧑‍💻 Author

- GitHub: [@sharmaHarshit2000](https://github.com/sharmaHarshit2000)

