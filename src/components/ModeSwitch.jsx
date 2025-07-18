import { useGasStore } from "../store/useGasStore";

export default function ModeSwitch() {
  const mode = useGasStore((s) => s.mode);
  const setMode = useGasStore((s) => s.setMode);

  return (
    <div className="flex gap-4 p-4">
      {["live", "simulation"].map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`px-4 py-2 rounded ${
            mode === m ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {m === "live" ? "Live Mode" : "Simulation Mode"}
        </button>
      ))}
    </div>
  );
}
