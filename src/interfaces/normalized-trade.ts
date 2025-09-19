// This interface represents the standardized format your application uses internally.
export interface NormalizedTrade {
    id: string;
    symbol: string;
    quantity: number;
    price: number;
    timestamp: string;
    broker: string;
    transactionType: "BUY" | "SELL"
}