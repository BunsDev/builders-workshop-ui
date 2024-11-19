import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Header } from "../components/shared/Header";
import { PairSelector } from "../components/features/trading/PairSelector";
import { OrderCard } from "../components/features/trading/OrderCard";
import { Chart } from "../components/features/trading/Chart";
import { PositionsTable } from "../components/features/trading/PositionsTable";
import { PairHeader } from "../components/features/trading/PairHeader";
import { useMarketData } from "../hooks/use-market-data";
import { usePrices } from "../lib/websocket-price-context";

export default function TradingInterface() {
  const [selectedPair, setSelectedPair] = useState("ETH/USD");
  const [leverage, setLeverage] = useState("20");
  const { address } = useAccount();
  const { allMarkets } = useMarketData();
  const { prices } = usePrices();

  // Find the assetId for the selected pair
  const selectedMarket = allMarkets.find(
    (market) => market.pair === selectedPair
  );
  const assetId = selectedMarket ? selectedMarket.assetId : "";

  useEffect(() => {
    const basePair = selectedPair.split("/")[0].toLowerCase();
    const price = prices[basePair]?.price;
    const formattedPrice = price 
      ? new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(price)
      : "...";
    
    document.title = `UniDex | ${selectedPair} $${formattedPrice}`;
  }, [selectedPair, prices]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex flex-col flex-1 overflow-y-auto md:flex-row">
        {/* Trading Panel */}
        <div className="w-full px-2 md:w-auto">
          <PairSelector
            selectedPair={selectedPair}
            onPairChange={setSelectedPair}
          />
          <div className="pt-0.25">
            <OrderCard
              leverage={leverage}
              onLeverageChange={setLeverage}
              assetId={assetId}
            />
          </div>
        </div>

        {/* Chart and Positions */}
        <div className="flex flex-col w-full">
          <PairHeader selectedPair={selectedPair} />
          <div className="relative h-[350px] md:h-[500px]">
            <Chart selectedPair={selectedPair} />
          </div>
          <div className="mt-2 md:mt-2">
            <PositionsTable address={address} />
          </div>
        </div>
      </main>
    </div>
  );
}
