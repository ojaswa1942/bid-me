import { Request, Response } from "express";
import { handleLogin, handleRegister } from "../controllers/auth";

import express from 'express';
// const {
//   auth,
//   signup,
//   createAccount,
//   findAccount,
//   getAccount,
//   transferFunds,
// } = require('../controllers');
// const { withAuth, withPrivilege } = require('../utils/middlewares');

const router = express.Router();

// router.post('/auth', auth);

// router.use(withAuth);

router.get('/', (req: Request, res: Response) => res.status(200).json({ message: "Seems to be working." }));

router.post('/register', handleRegister);
router.post('/login', handleLogin);

export default router;
