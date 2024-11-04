// backend/src/adventureSpotController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAdventureSpots = async (req: Request, res: Response) => {
  try {
    const spots = await prisma.adventureSpot.findMany();
    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching adventure spots' });
  }
};

export const addAdventureSpot = async (req: Request, res: Response) => {
  const { name, location, rating } = req.body;
  try {
    const newSpot = await prisma.adventureSpot.create({
      data: {
        name,
        location,
        rating: parseFloat(rating),
      },
    });
    res.status(201).json(newSpot);
  } catch (error) {
    res.status(500).json({ error: 'Error adding adventure spot' });
  }
};