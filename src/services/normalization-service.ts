import type { ZerodhaRawTradeData } from "../interfaces/zerodha-raw-trade.js";

type AnyRawTradeData = ZerodhaRawTradeData | any; // (note: here we can add multiple Adapter Data interface)
export const normalizeTrades = (
  rawTradeData: AnyRawTradeData[],
  brokerName: string
) => {
  console.log(
    `[NormalizationService] Normalizing ${rawTradeData.length} trades from ${brokerName}.`
  );
  switch (brokerName.toLowerCase()) {
    case "zerodha":
      return rawTradeData.map((trade) => {
        const zerodhaTrade = trade as ZerodhaRawTradeData;
        return {
          id: `${brokerName}-${zerodhaTrade.trade_id}`,
          symbol: zerodhaTrade.tradingsymbol,
          quantity: zerodhaTrade.quantity,
          price: zerodhaTrade.average_price,
          timestamp: new Date(zerodhaTrade.fill_timestamp).toISOString(),
          broker: brokerName,
          transactionType: zerodhaTrade.transaction_type.toUpperCase() as
            | "BUY"
            | "SELL",
        };
      });
    default:
      throw new Error(
        `Normalization rules not implemented for broker: ${brokerName}`
      );
  }
};
