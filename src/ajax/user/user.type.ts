import {fetchGet, useFetchGet, useFetchPost} from "../index";

export interface ProfitList {
    dayDate: string
    profitLoss: string
}
export interface IAccountPortfolio {
    profitList: ProfitList[]
    todayIncreaseRate: string
    todayProfitLoss: string
    totalIncreaseRate: string
    totalProfitLoss: string
    totalAssets: string
}
export function useAccountPortfolio(token: string) {
    return useFetchGet<IAccountPortfolio>("/contract-provider/contract/portfolioAccount", {}, [token])
}

export interface IAccountAsset {
    availableAmount: number
    coinId: number
    frozenAmount: number
    id: number
    userId: number
}
export function useAccountAsset() {
    return useFetchPost<IAccountAsset>("/contract-provider/contract-account/accounts")
}
