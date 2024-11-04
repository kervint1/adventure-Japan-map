// backend/src/adventureSpotRoutes.ts
import { Router } from 'express';
import { getAdventureSpots, addAdventureSpot } from './adventureSpotController';

const router = Router();

// ルートを "/adventure-spots" に修正
router.get('/adventure-spots', getAdventureSpots);
router.post('/adventure-spots', addAdventureSpot);

export default router;
