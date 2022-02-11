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
    nftType: number, //NFT类型 0:母体　1：碎片化 2:合成的NFT
    nftStatus: number,//NFT状态　0:未拆分　1：已拆分 2:未合成 3:已合成
    title: string,//标题
    comment: string,//描述
    imgUrl: string,//图片地址
    author: string,//作者
    createTime: number,//创建时间
    price: number
    status: number //状态　0:未上架　1:出售中 2:已出售 3:已取消（对已上架的商品进行下架）
    nftImg: string
    ownerAddress: string
    contractAddress: string
}

export interface IBlind {
    seqId: BigNumber,//自增的序号
    tokenId: BigNumber,//boxTokenId盲盒的tokenId
    pTokenId: BigNumber,//母体NFT的tokenId
    price: number,//价格，需要除以10的18次方
    levelLimit: number,//购买会员等级限制 0：普通　1：青铜 2:白银　3：黄金　4：钻石
    status: number,//状态 0：未上架　1：已上架(出售中) 2:已取消上架　3:已售出
    createTime: BigNumber//上架时间
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
    _aucitonId: number, //自增序号
    tokenId: number, //nft的编号
    nftType: number, //nft类型
    auctionType: number,//拍卖类型
    price: number,//当前拍价
    createTime: number//上架时间
    image: string,
    title: string
    endPrice: number
    status: number
    author: string
    comment: string
}

export interface IAuctionDetail {
    startPrice: number, //起拍价
    startTime: number, //起拍时间
    endTime: number, //结束时间
    myPrice: number,//我的有效出价
    owner: string,//拥有者
}
