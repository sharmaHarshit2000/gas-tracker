export function ethUsdFromSqrtPrice(sqrtPriceX96) {
  const sqrt = BigInt(sqrtPriceX96.toString());
  const price = (sqrt * sqrt * 10n ** 12n) / 2n ** 192n;
  return Number(price) / 1e6; 
}
