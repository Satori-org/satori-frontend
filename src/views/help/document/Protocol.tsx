import React from 'react';
import { useTranslation } from 'react-i18next';
import Anchor from './Anchor';
import { ProtocolStyle } from './styles/Protocol.style';

export default function Protocol() {
    const {t} = useTranslation();

    return (
        <ProtocolStyle>
            <h3 className={"title"}>SATORI 合约介绍</h3>
            <div className="content">
                <h3>1.1 合约介绍</h3>
                <div>
                    逐仓模式的意思是分配给某仓位的担保资产被限制在一定数额。 如果仓位的担保资产不足以支撑浮亏，此仓位将被强制平仓。所以，在波动率较高，杠杆较大的情况下，逐仓模式很容易被强制平仓，但最终的损失仅仅是仓位担保资产，而不影响账户余额。
                    逐仓模式下，用户可双向持仓，空头仓位与多头仓位风险独立计算。
                    用户爆仓只会损失仓位保证金，也就是说，仓位保证⾦的⾦额就是⽤户的最⼤损失。
                    用户主动平仓时，空头仓位与多头仓位分别产生的亏损及盈利，会立即结算到对应仓位的仓位保证金中。
                    优点：
                    若受价格波动影响，用户所持仓位爆仓时，只会亏损该方向持仓的保证金金额，不会影响该合约账户中的其他资金。
                </div>
                <Anchor />
            </div>
        </ProtocolStyle>
    )
}
