import { ethers } from "ethers";
import { useEffect } from "react";
import { useGasStore } from "../store/useGasStore";
import { UNISWAP_ETH_USDC_POOL } from "../utils/constants";
import { parseSwapEvent } from "../utils/parseSwapEvent";

export function useEthUsdPricePoller() {
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_ETHEREUM_HTTPS);

    async function fetchLatestPrice() {
      try {
        const logs = await provider.getLogs({
          address: UNISWAP_ETH_USDC_POOL,
          topics: [
            "0xd78ad95fa46c994b6551d0da85fc275fe613d1f9878e5dfe6146fddf7f36d7c4",
          ],
          fromBlock: "latest",
        });

        for (let log of logs) {
          const price = parseSwapEvent(log);
          if (price) {
            useGasStore.getState().setUsdPrice(price);
            break;
          }
        }
      } catch (err) {
        console.error("ETH/USD fetch error:", err);
      }
    }

    const interval = setInterval(fetchLatestPrice, 10000);
    fetchLatestPrice();

    return () => clearInterval(interval);
  }, []);
}
