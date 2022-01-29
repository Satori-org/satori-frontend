import { BigNumber } from "ethers";
import {getNumberByDecimal} from "../common/utilTools";
import Decimal from "decimal.js";

export interface ITrans {
    blockHash: any
    blockNumber: any
    chainId: number
    confirmations: number
    creates: any
    data: string
    from: string
    gasLimit: any
    gasPrice: any
    hash: string
    nonce: number
    status: number,
    type: string,
    symbol: string
}

export interface INFT {
    seqId: number
    tokenId: number
    orderId?: number,
    fee?: number,
    nftType: number,
    nftStatus: number,
    title: string,
    comment: string,
    imgUrl: string,
    author: string,
    createTime: number,
    price: number
    status: number
    nftImg: string
    ownerAddress: string
    contractAddress: string
}

export interface IBlind {
    seqId: BigNumber,
    tokenId: BigNumber,
    pTokenId: BigNumber,
    price: number,
    levelLimit: number,
    status: number,
    createTime: BigNumber
    segmentTokenIds: BigNumber[]
}

export interface IBlindReward {

}


export interface IVIP {
    level: number,
    amount: number,
    freeFee: number,
    ugcFee: number,
}

export interface IAuction {
    _aucitonId: number,
    tokenId: number,
    nftType: number,
    auctionType: number,
    price: number,
    createTime: number
    image: string,
    title: string
    endPrice: number
    status: number
    author: string
    comment: string
}

export interface IAuctionDetail {
    startPrice: number,
    startTime: number,
    endTime: number,
    myPrice: number,
    owner: string,
}
