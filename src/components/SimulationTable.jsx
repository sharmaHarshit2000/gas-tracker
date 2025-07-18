import { useGasStore } from "../store/useGasStore";

export default function SimulationTable() {
  const simulationData = useGasStore((s) => s.simulationResults);

  if (!simulationData) return null;

  return (
    <table className="min-w-full border mt-4 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Chain</th>
          <th className="p-2 text-right">Gas Fee (USD)</th>
          <th className="p-2 text-right">Total Cost (USD)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(simulationData).map(([chain, data]) => (
          <tr key={chain} className="border-t">
            <td className="p-2 capitalize">{chain}</td>
            <td className="p-2 text-right">${data.gasCost.toFixed(4)}</td>
            <td className="p-2 text-right">${data.totalCost.toFixed(4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
