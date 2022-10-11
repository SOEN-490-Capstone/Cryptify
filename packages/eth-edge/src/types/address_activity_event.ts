import { AssetTransfersCategory, Network } from "alchemy-sdk";

export type AddressActivityEvent = {
    webhookId: string;
    id: string;
    createdAt: string;
    type: string;
    event: Event;
};

export type Event = {
    network: Network;
    activity: Activity[];
};

export type Activity = {
    blockNum: string;
    hash: string;
    fromAddress: string;
    toAddress: string;
    value: number;
    erc721TokenId: null;
    erc1155Metadata: null;
    asset: string;
    category: AssetTransfersCategory;
    rawContract: RawContract;
    typeTraceAddress: null;
    log: Log;
};

export type Log = {
    address: string;
    topics: string[];
    data: string;
    blockNumber: string;
    transactionHash: string;
    transactionIndex: string;
    blockHash: string;
    logIndex: string;
    removed: boolean;
};

export type RawContract = {
    rawValue: string;
    address: string;
    decimals: number;
};
