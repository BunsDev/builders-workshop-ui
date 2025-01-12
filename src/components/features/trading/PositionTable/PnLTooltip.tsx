import { Position } from "../../../../hooks/use-positions";

interface PnLTooltipProps {
  position: Position;
  rect: DOMRect;
}

export function PnLTooltip({ position, rect }: PnLTooltipProps) {
  const formatPnL = (value: string | number) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return numValue >= 0
      ? `$${numValue.toFixed(2)}`
      : `-$${Math.abs(numValue).toFixed(2)}`;
  };

  const totalFees = (
    parseFloat(position.fees.positionFee) +
    parseFloat(position.fees.borrowFee) +
    parseFloat(position.fees.fundingFee)
  ).toFixed(2);

  const pnlWithoutFees = parseFloat(position.pnl.replace(/[^0-9.-]/g, ""));
  const finalPnl = (pnlWithoutFees - parseFloat(totalFees)).toFixed(2);

  return (
    <div
      className="p-4 text-white rounded-lg shadow-lg"
      style={{
        position: "fixed",
        left: `${rect.left}px`,
        top: `${rect.top - 8}px`,
        transform: "translateY(-100%)",
        minWidth: "250px",
        pointerEvents: "none",
        backgroundColor: "#16161d",
      }}
    >
      <div className="space-y-2">
        <h4 className="mb-2 font-semibold">PnL Breakdown</h4>
        <div className="flex justify-between">
          <span>Market PnL:</span>
          <span className={pnlWithoutFees >= 0 ? "text-green-400" : "text-red-400"}>
            {formatPnL(pnlWithoutFees)}
          </span>
        </div>
        <div className="pt-2 mt-2 border-t border-gray-700">
          <div className="flex justify-between">
            <span>Position Fee:</span>
            <span className="text-red-400">-${position.fees.positionFee}</span>
          </div>
          <div className="flex justify-between">
            <span>Borrow Fee:</span>
            <span className="text-red-400">-${position.fees.borrowFee}</span>
          </div>
          <div className="flex justify-between">
            <span>Funding Fee:</span>
            <span
              className={
                position.fees.fundingFee.startsWith("-")
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {position.fees.fundingFee.startsWith("-")
                ? `-$${position.fees.fundingFee.substring(1)}`
                : `$${position.fees.fundingFee}`}
            </span>
          </div>
        </div>
        <div className="pt-2 mt-2 border-t border-gray-700">
          <div className="flex justify-between font-semibold">
            <span>Final PnL:</span>
            <span
              className={
                parseFloat(finalPnl) >= 0 ? "text-green-400" : "text-red-400"
              }
            >
              {formatPnL(finalPnl)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
