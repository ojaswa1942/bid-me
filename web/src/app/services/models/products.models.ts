export type UserRef = {
    uid: string;
    email: string;
};

export type BidDetails = {
    startPrice: number;
    currentPrice: number;
    currentBidder: UserRef;
    bids: number;
};

export interface Product {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    isOpen: boolean;
    bid: BidDetails;
    created: number;
    deadline: number;
    owner: UserRef;
};

export type BidProductService = {
    message: string;
    product: Product;
};

export type AddProductInput = {
    name: string;
    startPrice: number;
    deadline: number;
    description?: string;
    imageUrl?: string;
};
