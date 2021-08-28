import { stripScriptTags } from "../../utils/helpers";
import { AddProductInput } from "../../types/types";
import ProductsService from "../../services/ProductsService";
import { Request, Response } from "express";

const handleAddProduct = async (req: Request, res: Response) => {
    try {
        let { name, description, imageUrl, startPrice, deadline } = req.body as AddProductInput;
        [name, description, imageUrl] = stripScriptTags(name, description, imageUrl);
        if (!name || !startPrice || !deadline) {
          return res.status(400).json('Name, start price and deadline are required');
        }

        const serviceRes = await ProductsService.add({ name, description, imageUrl, startPrice, deadline }, req.context);
        if (serviceRes.success) {
          return res.status(200).json(serviceRes.body);
        }
        return res.status(400).json(`${serviceRes.error}`);
      } catch (error) {
        req.context.logger({ type: `error` }, `Error while handling products/add controller:`, error);
        return res.status(500).json('Something went wrong!');
    }
}

export default handleAddProduct;
