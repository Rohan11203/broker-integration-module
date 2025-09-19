import type { NormalizedTrade } from "../interfaces/normalized-trade.js";
import type { ZerodhaRawTradeData } from "../interfaces/zerodha-raw-trade.js";
import { normalizeTrades } from "../services/normalization-service.js";

describe("Normalization Service", () => {
  it("should correctly normalize Zerodha raw trade data", () => {
    const zerodhaRawData: ZerodhaRawTradeData[] = [
      {
        trade_id: "10000000",
        order_id: "200000000000000",
        exchange: "NSE",
        tradingsymbol: "SBIN",
        instrument_token: 779521,
        product: "CNC",
        average_price: 420.65,
        quantity: 1,
        exchange_order_id: "300000000000000",
        transaction_type: "BUY",
        fill_timestamp: "2021-05-31 09:16:39",
        order_timestamp: "09:16:39",
        exchange_timestamp: "2021-05-31 09:16:39",
      },
      {
        trade_id: "40000000",
        order_id: "500000000000000",
        exchange: "CDS",
        tradingsymbol: "USDINR21JUNFUT",
        instrument_token: 412675,
        product: "MIS",
        average_price: 72.755,
        quantity: 1,
        exchange_order_id: "600000000000000",
        transaction_type: "BUY",
        fill_timestamp: "2021-05-31 11:18:27",
        order_timestamp: "11:18:27",
        exchange_timestamp: "2021-05-31 11:18:27",
      },
    ];

    const expectedNormalizedData: NormalizedTrade[] = [
      {
        broker: "zerodha",
        id: "zerodha-10000000",
        symbol: "SBIN",
        price: 420.65,
        quantity: 1,
        transactionType: "BUY",
        timestamp: "2021-05-31T03:46:39.000Z",
      },
      {
        broker: "zerodha",
        id: "zerodha-40000000",
        symbol: "USDINR21JUNFUT",
        price: 72.755,
        quantity: 1,
        transactionType: "BUY",
        timestamp: "2021-05-31T05:48:27.000Z",
      },
    ];

    const result = normalizeTrades(zerodhaRawData, "zerodha");

    expect(result).toEqual(expectedNormalizedData);
  });

  it("should throw an error for an unsupported broker", () => {
    // 1. Arrange
    const rawData: any[] = []; // Data doesn't matter for this test

    // 2. Act & 3. Assert
    // We expect the function to throw an error when called with these arguments
    expect(() => normalizeTrades(rawData, "unsupported_broker")).toThrow(
      "Normalization rules not implemented for broker: unsupported_broker"
    );
  });
});
