import {BigNumber, utils} from "ethers";

type swapTokenParams = {
    tokenAddress: string,
    value: BigNumber,
    token0: string,
    token1: string,
    reserves0: BigNumber,
    reserves1: BigNumber,
}

export function swapToken(param:swapTokenParams):BigNumber{
    const {tokenAddress, value, token0, token1, reserves0, reserves1} = param;
    if (tokenAddress === token0) {
        return getAmountOut(value, reserves0, reserves1);
    } else if (tokenAddress === token1) {
        return getAmountOut(value, reserves1, reserves0);
    } else {
        return BigNumber.from(0);
    }
}

// given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
export function getAmountOut(amountIn:BigNumber, reserveIn:BigNumber, reserveOut:BigNumber):BigNumber{
    if (amountIn.eq(0)) {
        return BigNumber.from(0);
    }

    if (reserveIn.eq(0) || reserveOut.eq(0)) {
        return BigNumber.from(0);
    }

    let amountInWithFee = amountIn.mul(997);
    let numerator = amountInWithFee.mul(reserveOut);
    let denominator = reserveIn.mul(1000).add(amountInWithFee);
    return numerator.div(denominator);
}