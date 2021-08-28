import { Request, Response } from "express";
import express from 'express';
import { handleAddProduct, handleBidProduct } from "../controllers/products";

const router = express.Router();


router.get('/', (req: Request, res: Response) => res.status(200).json({ message: "Seems to be working." }));
router.post('/add', handleAddProduct);
router.post('/bid', handleBidProduct);

export default router;
