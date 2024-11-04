import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAdventureSpots = async (req: Request, res: Response) => {
  try {
    const spots = await prisma.animeSpot.findMany();
    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching anime spots' });
  }
};
