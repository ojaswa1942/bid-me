import { AddProductInput, BidInput, Context, ServiceResponse, UserBidResponse, UserRef } from "../types/types";

class ProductsService {
  static add = async (args: AddProductInput, context: Context): Promise<ServiceResponse> => {
    const { logger, models, uid, userEmail } = context;
    const { Product } = models;

    const userRef = { uid, email: userEmail } as UserRef;

    if(args.deadline < Date.now()) {
      return { success: false, error: "Kindly select a future deadline." };
    }

    if(args.startPrice <= 0) {
      return { success: false, error: "Kindly emter a valid price." };
    }

    const product = await Product.create(args, userRef);
    if (!product) return { success: false, error: `Could not add product successfully` };

    logger(`[ADD_PRODUCT]`, userEmail, product.id);

    return { success: true, body: { message: 'Created new product successfully. By default, the owner has the first bid.', product } };
  };

  static bid = async (args: BidInput, context: Context): Promise<ServiceResponse> => {
    const { logger, models, uid, userEmail } = context;
    const { Product, User } = models;

    const userRef = { uid, email: userEmail } as UserRef;

    const product = await Product.findById(args.id);
    if (!product) return { success: false, error: `No such product found` };
    if ( args.price <= product.bid.currentPrice ) return { success: false, error: `Price cannot be less or equal to current bid (${product.bid.currentPrice})` };

    // for atomic increment of bids count
    const updatedProduct = await Product.updateWithTransaction(args.id, (currentValue) => {
      if(!currentValue) return product;
      return ({
        ...currentValue,
        bid: {
          ...currentValue.bid,
          currentPrice: args.price,
          currentBidder: userRef,
          bids: currentValue.bid.bids + 1
        }
      });
    });

    const updateUser = await User.addBid(userRef.uid, args);
    if(!updateUser) return { success: false, error: "Could not sync bid with user. Please try placing the bid again or contact support for more information." };

    logger(`[BID_PRODUCT]`, userRef.email, product.id);

    return { success: true, body: { message: 'Successfully placed bid!', product: updatedProduct } };
  };

  static checkAndCloseBid = async (context: Context): Promise<ServiceResponse> => {
    const { logger, models } = context;
    const { Product } = models;

    const products = await Product.getExpiredProducts();
    if (!products) return { success: false, error: `Could not fetch expired products` };

    const updateObject = Object.keys(products).reduce((updateData, key) => {
      if (products[key].isOpen) return {
        ...updateData,
        [`${key}/isOpen`]: false
      };

      return updateData;
    }, {});

    if(!(await Product.updateMany(updateObject))) return { success: false, error: "Could not close expired products" }; 

    logger(`[PRODUCTS_CLOSE_BID]`, Object.keys(updateObject));
    return { success: true, body: { message: 'Successfully closed completed bids for products' } };
  };

  static fetchAllBids = async (context: Context): Promise<ServiceResponse> => {
    const { logger, models, uid, userEmail } = context;
    const { User, Product } = models;

    const user = await User.findOneById(uid as string);
    if(!user) return { success: false, error: `No such user found` };
    
    const productsBids: UserBidResponse[] = [];

    let promises: Promise<void>[] = [];
    Object.values(user.bids).forEach(async bid => {
      promises.push(Product.findById(bid.productId).then(product => {
        if(product) {
          productsBids.push({ price: bid.price, product });
        }
      }));
    });
    await Promise.all(promises);

    logger(`[FETCH_PRODUCT_BIDS]`, userEmail);

    return { success: true, body: { message: 'Successfully fetched bid!', bids: productsBids } };
  };
}

export default ProductsService;
