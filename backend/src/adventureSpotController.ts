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
  try {
    console.log("Received data:", req.body);  // デバッグ用ログ
    const { name, latitude, longitude, description } = req.body;  // locationではなく、latitudeとlongitudeを直接使用
    
    const newSpot = await prisma.adventureSpot.create({
      data: {
        name,
        latitude,
        longitude,
        description,
      },
    });
    
    res.json(newSpot);
  } catch (error) {
    console.error("Error creating adventure spot:", error);
    res.status(500).json({ error: 'Error adding new adventure spot' });
  }
};




