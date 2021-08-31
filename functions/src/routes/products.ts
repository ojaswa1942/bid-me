import { Request, Response } from "express";
import express from 'express';
import { handleAddProduct, handleBidProduct, handleUserBidsProduct } from "../controllers/products";

const router = express.Router();


router.get('/', (req: Request, res: Response) => res.status(200).json({ message: "Seems to be working." }));
router.post('/add', handleAddProduct);
router.post('/bid', handleBidProduct);
router.get('/bids', handleUserBidsProduct);

export default router;
