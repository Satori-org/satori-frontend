import {fetchGet, fetchPost} from "../index";

export type IQuotation = {
    contractPairId: number
    last24hVol: string
    lastPrice: string
    marketChangeRate: string
    marketPrice: string
    symbol: string
}
/*Get Trading Pairs*/
export interface IPair {
    change: number
    id: number
    maxCount: string
    maxLever: number
    maxPosition: string
    maxWayPosition: string
    minCount: string
    minLever: number
    price: number
    settleCoin: SettleCoin
    settleCoinId: number
    symbol: string
    tradeCoin: TradeCoin
    tradeCoinId: number
    tradeFeeRate: string
}
export interface SettleCoin {
    icon: string
    id: number
    name: string
    settleDecimal: number
    symbol: string
}
export interface TradeCoin {
    icon: string
    id: number
    name: string
    settleDecimal: number
    symbol: string
    websiteUrl: string
    whitePaperUrl: string
    coinInfo: string
}
export function getContractPairList() {
    return fetchPost<IPair[]>("/contract-provider/contract/contractPairList")
}
/*withdraw*/
interface IWithdraw {
    "amount": number,
    "expireTime": string,
    "signHash": string,
    "salt": string
}
type IWithdrawReq = {
    amount: string,
    originMsg: string,
    signHash: string,
    network: string
}
export function withdraw(params: IWithdrawReq) {
    return fetchPost<IWithdraw>("/contract-provider/withdraw/ask", params)
}
interface IAddOrderParams {
    amount?: string
    contractPairId: number
    contractPositionId?: number
    isClose: boolean
    isLong: boolean
    isMarket: boolean
    price?: number | null
    quantity: number
    signHash: string
    originMsg: string
    lever: number
}
/*Contract placement*/
export async function addOrder(params: IAddOrderParams) {
    const { data } = await fetchPost<IPair>("/contract-provider/contract/order", params);
    return data;
}

export type IChangeMargin = {
    call: boolean,
    id: number,
    marginAmount: string
}
export async function changePositionMargin(params: IChangeMargin) {
    const { data } = await fetchPost<IPair>("/contract-provider/contract/callMarginAmount", params);
    return data;
}

/*Get Position List*/
export type IPositionList = {
    amount: number
    closingQuantity: number
    contractPairId: number
    createTime: string
    entrustId: number
    id: number
    isLong: boolean
    marginAmount: number
    marginCallAmount: string
    openingPrice: string
    quantity: number
    restrictPrice: number
    status: number
    symbol: string
    lever: number
    tariffAmount: string
    remainingCloseQuantity: string
    unrealizedPnl: string
    realizedPnl: string
    lossType: number
    profitType: number
    profitPrice: string
    lossPrice: string
}
export const getPositionList = "/contract-provider/contract/selectContractPositionList";
/*Get the current delegate*/
export type ICurrentEntrustList = {
    amount: number
    contractPairId: number
    contractPositionId: number
    createTime: string
    dealAmount: string
    dealQuantity: string
    id: number
    isClose: boolean
    isLong: boolean
    isMarket: boolean
    price: number
    quantity: number
    symbol: string
    lever: number
}
export const getCurrentEntrustList = "/contract-provider/contract/selectContractCurrentEntrustList";

/*Get Contract Balance*/
export type IAccount = {
    availableAmount: string
    coinId: number
    frozenAmount: string
    id: number
    userId: number
}

export type IMarket24 = {
    amount: number
    changePrice: string
    changeRate: number
    close: number
    contractPairId: number
    count: number
    hight: number
    indexPrice: number
    low: number
    open: number
    quantity: number
    tariffRate: number
}

export async function getAccountDetail(coinId: number) {
    const { data } = await fetchPost<IAccount>(`/contract-provider/contract-account/account/${coinId}`);
    return data;
}

/*Cancel current commission*/
export async function cancelEntrust(id: number) {
    return fetchGet<boolean>("/contract-provider/contract/cancelEntrust", {id})
}

/*Get Fills History*/
export type IFills = {
    amount: number
    averagePrice: number
    contractPairId: number
    contractPositionId: number
    createTime: string
    entrustId: number
    id: number
    isClose: boolean
    isLong: boolean
    isMarket: boolean
    lever: number
    isTaker: boolean
    positionFee: number
    profitLoss: number
    quantity: number
    status: number
    symbol: string
    tradeFee: number
}
export const getFillHistory = "/contract-provider/contract/selectContractMatchPairList";

export type ITransRecord = {
    accountAmount: string
    coinSymbol: string
    contractPairSymbol: string
    createTime: string
    id: number
    logType: string
    operateAmount: string
    positive: boolean
}
export const getTransRecord = "/contract-provider/contract/selectContractTransactionList";

export type IKline = {
    amount: number
    close: number
    contractPairId: number
    count: number
    hight: number
    low: number
    open: number
    period: string
    quantity: number
    time: number
}
export type IKlineParams = {
    contractPairId: number
    limit: number
    period: string
}
export type IMarketData = {
    close: number
    contractPairId: number
    hight: number
    low: number
    open: number
    period: string
    time: number
}
export type ISocketRes = {
    success: boolean
    event: string
    data: any
    contractPairId: number
};
export const selectKlinePillarList = "/contract-quotes-provider/contract-quotes/selectKlinePillarList";

export type ITrade = {
    amount: number
    contractMatchPairId: number
    contractPairId: number
    isLong: boolean
    price: number
    quantity: number
    time: string
}


export type ITransfer = {
    address: string
    amount: number
    createTime: string
    status: number
    transHash: string
    type: number
    userId: number
}
export const getTransferRecord = "/contract-provider/contract-account/transferRecords";

export type ITariff = {
    fundingTime: string
    id: number
    isLong: boolean
    openingPrice: number
    quantity: number
    settledRate: number
    symbol: string
    tariffAmount: number
}
export const getContractTariffList = "/contract-provider/contract/selectContractTariffList";

export type IPnl = {
    id: number
    lossPrice: string | null
    lossType: number
    profitPrice: string | null
    profitType: number
}
export async function updatePnlConfig(params: IPnl) {
    const { data } = await fetchPost<IPair>("/contract-provider/contract/updateStopConfig", params);
    return data;
}
