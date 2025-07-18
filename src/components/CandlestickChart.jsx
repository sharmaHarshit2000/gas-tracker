import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { useGasStore } from "../store/useGasStore";

export default function CandlestickChart() {
  const chartRef = useRef(null);
  const ethereumHistory = useGasStore((s) => s.chains.ethereum.history);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 400,
      layout: { background: { color: "#fff" }, textColor: "#000" },
      grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
    });

    const candlestickSeries = chart.addCandlestickSeries();

    const candles = ethereumHistory.map((item) => ({
      time: item.timestamp,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    candlestickSeries.setData(candles);

    return () => chart.remove();
  }, [ethereumHistory]);

  return <div ref={chartRef} className="mt-4 w-full" />;
}
