import ProductsService from "../../services/ProductsService";
import { Request, Response } from "express";

const handleUserBidsProduct = async (req: Request, res: Response) => {
    try {
        const serviceRes = await ProductsService.fetchAllBids(req.context);
        if (serviceRes.success) {
          return res.status(200).json(serviceRes.body);
        }
        return res.status(400).json(`${serviceRes.error}`);
      } catch (error) {
        req.context.logger({ type: `error` }, `Error while handling products/bids controller:`, error);
        return res.status(500).json('Something went wrong!');
    }
}

export default handleUserBidsProduct;
