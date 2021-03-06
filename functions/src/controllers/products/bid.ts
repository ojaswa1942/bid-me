import { stripScriptTags } from "../../utils/helpers";
import ProductsService from "../../services/ProductsService";
import { Request, Response } from "express";
import { BidInput } from "../../types/types";

const handleBidProduct = async (req: Request, res: Response) => {
    try {
        let { id, price } = req.body as BidInput;
        [id] = stripScriptTags(id);
        if (!id || !price) {
          return res.status(400).json('Product Id and price are required to place bid');
        }

        const serviceRes = await ProductsService.bid({ id, price }, req.context);
        if (serviceRes.success) {
          return res.status(200).json(serviceRes.body);
        }
        return res.status(400).json(`${serviceRes.error}`);
      } catch (error) {
        req.context.logger({ type: `error` }, `Error while handling products/bid controller:`, error);
        return res.status(500).json('Something went wrong!');
    }
}

export default handleBidProduct;
