import axios from "axios";
import type { ZerodhaRawTradeData } from "../interfaces/zerodha-raw-trade.js";
import type { IBrokerAdapter } from "./i-broker.adapter.js";
import { ZERODHA_API_KEY } from "../config/config.js";

export class ZerodhaAdapter implements IBrokerAdapter {
  private readonly apiKey: string = ZERODHA_API_KEY;

  private readonly baseUrl: string = "https://api.kite.trade";

  public async getTrades(accessToken: string): Promise<ZerodhaRawTradeData[]> {
    console.log(`[ZerodhaAdapter] Making API call to Zerodha`);

    if (!accessToken) {
      throw new Error("Access token is required.");
    }
    // DUMMY API CALL RESPONSE

    // const responseData: ZerodhaRawTradeData[] = [
    //   {
    //     trade_id: "10000000",
    //     order_id: "200000000000000",
    //     exchange: "NSE",
    //     tradingsymbol: "SBIN",
    //     instrument_token: 779521,
    //     product: "CNC",
    //     average_price: 420.65,
    //     quantity: 1,
    //     exchange_order_id: "300000000000000",
    //     transaction_type: "BUY",
    //     fill_timestamp: "2021-05-31 09:16:39",
    //     order_timestamp: "09:16:39",
    //     exchange_timestamp: "2021-05-31 09:16:39",
    //   },
    //   {
    //     trade_id: "40000000",
    //     order_id: "500000000000000",
    //     exchange: "CDS",
    //     tradingsymbol: "USDINR21JUNFUT",
    //     instrument_token: 412675,
    //     product: "MIS",
    //     average_price: 72.755,
    //     quantity: 1,
    //     exchange_order_id: "600000000000000",
    //     transaction_type: "BUY",
    //     fill_timestamp: "2021-05-31 11:18:27",
    //     order_timestamp: "11:18:27",
    //     exchange_timestamp: "2021-05-31 11:18:27",
    //   },
    // ];
    // await new Promise((resolve) => setTimeout(resolve,1000));
    // return responseData;

    // Real API CALL
    try {
      const response = await axios.get(`${this.baseUrl}/trades`, {
        headers: {
          "X-Kite-Version": "3",
          Authorization: `token ${this.apiKey}:${accessToken}`,
        },
      });
      console.log(
        `[ZerodhaAdapter] REAL API call successful. Received ${response.data.length} trades.`
      );
      return response.data;
    } catch (error) {
      console.log(`[ZerodhaAdapter] REAL API call FAILED.`);
      if (axios.isAxiosError(error)) {
        console.error("Error details:", error.response?.data || error.message);
      }

      throw new Error("Failed to fetch trades from the external broker API.");
    }
  }
}
