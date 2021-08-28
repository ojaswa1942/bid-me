import ProductsService from "../services/ProductsService";
import { getDefaultContext } from "../context"; 

const handleCloseBid = async () => {
    const context = getDefaultContext();
    try {
        const serviceRes = await ProductsService.checkAndCloseBid(context);
        if (serviceRes.success) {
          return serviceRes.body;
        }
        throw new Error(String(serviceRes.error));
      } catch (error) {
        context.logger({ type: `error` }, `Error while handling schedules/closeBid controller:`, error);
        throw new Error(error);
    }
};

export default handleCloseBid;
