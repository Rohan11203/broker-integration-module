import { createBrokerAdapter } from "../adapters/adapters-factory.js";
import type { IBrokerAdapter } from "../adapters/i-broker.adapter.js";
import { tokenManager } from "../managers/token-manager.js";
import { normalizeTrades } from "./normalization-service.js";

export const performSync = async (
  userId: string,
  brokerName: string
): Promise<void> => {
  console.log(
    `[SyncService] Starting sync for user: ${userId}, broker: ${brokerName}`
  );

  const accessToken = await tokenManager.getToken(userId);

  let adapterToUse: IBrokerAdapter;

  try {
    adapterToUse = createBrokerAdapter(brokerName);
    console.log(`[SyncService] Obtained adapter for broker: ${brokerName}.`);
  } catch (error) {
    console.error(
      `[SyncService] Error getting adapter for broker ${brokerName}:`,
      error
    );
    throw new Error(`Unsupported broker specified: ${brokerName}.`);
  }

  const rawTrades = await adapterToUse.getTrades(accessToken);

  const normalizedTrades = normalizeTrades(rawTrades, brokerName);

  console.log(normalizedTrades);

  console.log("[SyncService] Sync process completed successfully!");
};
