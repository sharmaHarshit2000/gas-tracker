import { Interface } from "ethers/lib/utils";
import { ethUsdFromSqrtPrice } from "./ethUsdFromSqrtPrice";


const abi = [
  "event Swap(address indexed sender,address indexed recipient,int256 amount0,int256 amount1,uint160 sqrtPriceX96,uint128 liquidity,int24 tick)",
];

const iface = new Interface(abi);

export function parseSwapEvent(log) {
  try {
    const parsed = iface.parseLog(log);
    return ethUsdFromSqrtPrice(parsed.args.sqrtPriceX96);
  } catch (err) {
    console.error("Failed to parse swap log", err);
    return null;
  }
}
