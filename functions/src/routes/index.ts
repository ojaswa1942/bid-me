import express from 'express';
import { withAuth } from '../utils/middlewares';
import auth from "./auth";
import products from "./products";

const router = express.Router();

router.use("/auth", auth);

router.use(withAuth);
router.use("/products", products);

export default router;
