import { useGasStore } from "../store/useGasStore";

const ChainStatusCard = ({ chain }) => {
  const chainData = useGasStore((s) => s.chains[chain]);
  return (
    <div className="bg-white shadow p-4 rounded-xl w-64">
      <h3 className="text-lg font-semibold capitalize">{chain}</h3>
      <p>Base Fee: {chainData.baseFee.toFixed(2)} Gwei</p>
      <p>Priority Fee: {chainData.priorityFee.toFixed(2)} Gwei</p>
    </div>
  );
};

export default ChainStatusCard;
