import { create } from "zustand";

export const useGasStore = create((set, get) => ({
  mode: "live",

  usdPrice: 3000, 
  chains: {
    ethereum: { baseFee: 0, priorityFee: 0, history: [] },
    polygon: { baseFee: 0, priorityFee: 0, history: [] },
    arbitrum: { baseFee: 0, priorityFee: 0, history: [] },
  },

  simulationResults: null,

  setMode: (mode) => set({ mode }),

  updateChainFees: (chain, baseFee, priorityFee) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const chainData = get().chains[chain];

    const newHistory = [...chainData.history];
    const last = newHistory[newHistory.length - 1];

    if (!last || timestamp - last.timestamp > 900) {
      newHistory.push({
        timestamp,
        open: baseFee,
        high: baseFee,
        low: baseFee,
        close: baseFee,
      });
    } else {
      last.high = Math.max(last.high, baseFee);
      last.low = Math.min(last.low, baseFee);
      last.close = baseFee;
    }

    set((state) => ({
      chains: {
        ...state.chains,
        [chain]: { baseFee, priorityFee, history: newHistory },
      },
    }));
  },

  setUsdPrice: (price) => set({ usdPrice: price }),

  simulate: (amount) => {
    const { chains, usdPrice } = get();
    const results = {};

    for (const [chain, data] of Object.entries(chains)) {
      const gasLimit = 21000;
      const totalGas = (data.baseFee + data.priorityFee) * gasLimit;
      const gasCost = (totalGas * 1e-9) * usdPrice;
      const totalCost = gasCost + amount * usdPrice;

      results[chain] = {
        gasCost,
        totalCost,
      };
    }

    set({ simulationResults: results });
  },
}));
