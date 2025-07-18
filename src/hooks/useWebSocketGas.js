import { ethers } from "ethers";
import { useGasStore } from "../store/useGasStore";
import { RPCS } from "../utils/constants";

export function setupGasListeners() {
  const { updateChainFees } = useGasStore.getState();

  Object.entries(RPCS).forEach(([chain, url]) => {
    const provider = new ethers.providers.WebSocketProvider(url);

    if (chain === "polygon") {
      setInterval(async () => {
        try {
          const res = await fetch("https://gasstation.polygon.technology/v2");
          const data = await res.json();

          const baseFee = data.estimatedBaseFee;
          const priorityFee = data.standard.maxPriorityFee;

         
          updateChainFees(chain, baseFee, priorityFee);
        } catch (err) {
          console.error(`[${chain}] Polygon Gas Station API error:`, err);
        }
      }, 10000);
    } else {
      provider.on("block", async (blockNumber) => {
        try {
          const block = await provider.getBlock(blockNumber);
          const feeData = await provider.getFeeData();

          let baseFee = 0;
          let priorityFee = 1.5;

          if (block?.baseFeePerGas) {
            baseFee = parseFloat(
              ethers.utils.formatUnits(block.baseFeePerGas, "gwei")
            );
          } else if (feeData?.lastBaseFeePerGas) {
            baseFee = parseFloat(
              ethers.utils.formatUnits(feeData.lastBaseFeePerGas, "gwei")
            );
          } else if (feeData?.maxFeePerGas) {
            baseFee =
              parseFloat(
                ethers.utils.formatUnits(feeData.maxFeePerGas, "gwei")
              ) - priorityFee;
          }

          if (feeData?.maxPriorityFeePerGas) {
            priorityFee = parseFloat(
              ethers.utils.formatUnits(feeData.maxPriorityFeePerGas, "gwei")
            );
          }

          if (baseFee === 0) {
            console.warn(`[${chain}] WARNING: baseFee is 0`);
          }

          updateChainFees(chain, baseFee, priorityFee);
        } catch (err) {
          console.error(`[${chain}] block error:`, err);
        }
      });
    }
  });
}
