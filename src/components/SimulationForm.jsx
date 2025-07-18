import { useState } from "react";
import { useGasStore } from "../store/useGasStore";

export default function SimulationForm() {
  const [amount, setAmount] = useState("");
  const simulate = useGasStore((s) => s.simulate);

  const handleSubmit = (e) => {
    e.preventDefault();
    simulate(parseFloat(amount));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <label className="block">
        Enter amount (ETH/MATIC):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full border px-3 py-2 rounded"
          step="0.0001"
          required
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Simulate Transaction
      </button>
    </form>
  );
}
