import type { Request, Response } from "express";
import { performSync } from "../services/sync.service.js";

export const syncTradesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, brokerName } = req.body;

        if (!userId || !brokerName) {
            res.status(400).json({ message: 'userId and brokerName are required.' });
            return;
        }

        console.log(`[Controller] Received sync request for user: ${userId}`);
        
        await performSync(userId, brokerName);

        res.status(200).json({ message: 'Synchronization successful!' });
    } catch (error) {
        console.error('[Controller] Error during sync:', error);
        res.status(500).json({ message: 'An error occurred during synchronization.' });
    }
};
