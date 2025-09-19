export interface ZerodhaRawTradeData {
  trade_id: string;
  order_id: string;
  exchange: string;
  tradingsymbol: string;
  instrument_token: number;
  product: string;
  average_price: number;
  quantity: number;
  exchange_order_id: string;
  transaction_type: string;
  fill_timestamp: string;
  order_timestamp: string;
  exchange_timestamp: string;
}
