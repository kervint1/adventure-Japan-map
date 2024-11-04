import { Router } from 'express';
import { getAdventureSpots } from './adventureSpotController';

const router = Router();

router.get('/anime-spots', getAdventureSpots);

export default router;
