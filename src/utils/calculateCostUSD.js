export function calculateCostUSD({ baseFee, priorityFee, amount, usdPrice }) {
  const gasLimit = 21000;
  const gasEth = (baseFee + priorityFee) * gasLimit * 1e-9;
  const gasCostUSD = gasEth * usdPrice;
  const totalCostUSD = gasCostUSD + (amount * usdPrice);

  return { gasCost: gasCostUSD, totalCost: totalCostUSD };
}
