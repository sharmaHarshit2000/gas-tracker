import { useEffect } from "react";
import { setupGasListeners } from "./hooks/useWebSocketGas";
import { useEthUsdPricePoller } from "./hooks/useEthUsdPricePoller";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ModeSwitch from "./components/ModeSwitch";
import ChainStatusCard from "./components/ChainStatusCard";
import SimulationForm from "./components/SimulationForm";
import SimulationTable from "./components/SimulationTable";
import CandlestickChart from "./components/CandlestickChart";

export default function App() {
  
  useEffect(() => {
    setupGasListeners();
  }, []);

  useEthUsdPricePoller();

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Header />
      <ModeSwitch />
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <ChainStatusCard chain="ethereum" />
        <ChainStatusCard chain="polygon" />
        <ChainStatusCard chain="arbitrum" />
      </div>
      <div className="max-w-3xl mx-auto mt-6">
        <SimulationForm />
        <SimulationTable />
        <CandlestickChart />
      </div>
      <Footer />
    </div>
  );
}
