import type { IBrokerAdapter } from "./i-broker.adapter.js";
import { ZerodhaAdapter } from "./zerodha-adapter.js";

export const createBrokerAdapter = (brokerName: string): IBrokerAdapter => {
  switch (brokerName.toLowerCase()) {
    case "zerodha":
      return new ZerodhaAdapter();
    default:
      throw new Error(`Unsupported broker: ${brokerName}.`);
  }
};
