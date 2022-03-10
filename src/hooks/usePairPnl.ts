import {useMemo} from "react";
import {IPair, IPositionList, IQuotation} from "../ajax/contract/contract";
import Decimal from "decimal.js";
import {fixedNumber, formatUSDT} from "../common/utilTools";

type IParams = {
    pairs: IPair
    quotation: IQuotation
    item: IPositionList
}
export function usePairPnl(params: IParams) {

    function formatPercent(profit: string | number) {
        let percent = fixedNumber(Decimal.div(profit, params.item.amount).mul(params.item.lever).mul(100).toFixed(), 2);
        if (Number(profit) > 0) {
            return {
                percent: `+${Math.abs(percent)}%`,
                className: "long"
            };
        } else if (Number(profit) < 0) {
            return {
                percent: `-${Math.abs(percent)}%`,
                className: "short"
            };
        } else {
            return {
                percent: `${Math.abs(percent)}%`,
                className: ""
            };
        }
    }

    return useMemo(() => {
        let obj = {
            profit: Number(formatUSDT(params.item.unrealizedPnl)),
            percent: formatPercent(params.item.unrealizedPnl).percent,
            className: formatPercent(params.item.unrealizedPnl).className
        };
        if (!params.pairs.id || !params.quotation.contractPairId) {
            return obj;
        }
        let profit = Decimal.sub(params.quotation.lastPrice, params.item.openingPrice).mul(params.item.quantity).toFixed();
        let dicProfit = params.item.isLong ? profit : Decimal.sub(0, profit);
        obj.profit = Number(formatUSDT(Decimal.add(dicProfit, params.item.tariffAmount).toFixed()));
        obj.percent = formatPercent(obj.profit).percent;
        obj.className = formatPercent(obj.profit).className;

        return obj;
    }, [params.item.openingPrice, params.item.isLong, params.pairs, params.quotation]);
}
