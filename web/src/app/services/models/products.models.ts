export type UserRef = {
    uid: string;
    email: string;
}

export type BidDetails = {
    startPrice: number;
    currentPrice: number;
    currentBidder: UserRef;
    bids: number;
}

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
} 
