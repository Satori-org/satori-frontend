import {fetchGet, useFetchGet} from "../index";

export interface ProfitList {
    dayDate: string
    profitLoss: number
}
export interface IAccountPortfolio {
    profitList: ProfitList[]
    todayIncreaseRate: number
    todayProfitLoss: number
    totalIncreaseRate: number
    totalProfitLoss: number
}
export function useAccountPortfolio() {
    return useFetchGet<IAccountPortfolio>("/contract-provider/contract/portfolioAccount")
}
