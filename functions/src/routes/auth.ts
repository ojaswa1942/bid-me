import { Request, Response } from "express";
import { handleLogin, handleRegister } from "../controllers/auth";

import express from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => res.status(200).json({ message: "Seems to be working." }));

router.post('/register', handleRegister);
router.post('/login', handleLogin);

export default router;
