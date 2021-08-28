import express from 'express';
import { withAuth } from '../utils/middlewares';
import auth from "./auth";
import products from "./products";

// schedule test
import handleCloseBid from '../schedules/closeBid';

const router = express.Router();

router.use("/auth", auth);

// schedule test
router.get("/schedule", async (req, res) => {
    const msg = await handleCloseBid();
    res.status(200).json(msg);
});

router.use(withAuth);
router.use("/products", products);

export default router;
