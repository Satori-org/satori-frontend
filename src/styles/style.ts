import styled from "styled-components";




export type IColors = {
    activeColor: string
    gapColor: string
    linkDefaultColor: string
    linkActiveBgColor: string
    headerButtonColor: string
    boxBgColor: string
    boxShadow: string
    baseColor: string
    backgroundColor: string
    labelColor: string
    thColor: string
    long: string
    short: string
    long2: string
    short2: string
    tabColor: string,
    tabSelectedColor: string,
    tabSelectedBColor: string,
    inputBgColor: string
    disabledButtonBgColor: string
    inputBtnBgColor: string
    inputBtnColor: string
    disconnectBgColor: string
    disconnectColor: string
    headerRightColor: string
    btnNotAllow: string
    paginationBgColor: string
    modalTitle: string
    subtitle: string
    filedColor: string
    modalBgColor: string
    modalBorderColor: string
    activeBgColor: string
    explain: string
    borderColor: string
    cancelBgColor: string,
    cancelColor: string,
    confirmBgColor: string,
    tokenBorderColor: string,
    confirmColor: string,
    borderColor2: string
    chartLineColor: string
    gridPropertiesColor: string
    tabActiveColor: string
    tabActiveBgColor2: string
    stepColor: string
    stepActiveColor: string
    stepBorderColor: string
    emptyTextColor: string
    warnBgColor: string
    menuBgColor: string
    articleColor: string
    articleHrColor: string
    pickerBgColor: string
    pickerThColor: string,
    pickerNotAllow: string,
    pickerOnSelect: string,
    pickerRangeBgColor: string,
    walletBtnBgColor: string,
    walletBtnColor: string,
    networkBgColor: string,
    lev1BgColor: string,
    lev2BgColor: string,
    lev3BgColor: string,
    lev4BgColor: string,
    lev5BgColor: string,
    levDefaultBgColor: string,
    inputBtnDisableColor: string
}
export type ITheme = {
    colors: IColors
}

export const colors = {
    backgroundColor: "#11131E",
    long: "#98E39E",
    short: "#E86B4A",
    longOpa: "rgba(152,227,158,0.19)",
    shortOpa: "rgba(232,107,74,0.19)",
    longOpa7: "rgba(152,227,158,0.7)",
    longOpa4: "rgba(152,227,158,0.49)",
    shortOpa7: "rgba(232,107,74,0.7)",
    shortOpa4: "rgba(232,107,74,0.49)",
    activeColor: "#F6F7F0",
    baseColor: "#B2B6BC",
    artContentColor: "#B2B6BC",
    labelColor: "#74777F",
    buttonTextColor: "#17181C",
    auxiBgColor: "#333A47",
    inputBgColor: "#1A1D27",
    tradeBgColor: "#202531",
    disabledFontColor: "#464953",
    pageBgColor: "#22352C",
    fail: "rgba(232,107,74,0.19)"
};

export const fonts = {
    h2: "24px",
    h3: "18px",
    h5: "14px",
    h6: "12px"
};


export const Anchor = styled.a`
    color: ${colors.baseColor};
    &.active{
        color: ${colors.activeColor};
    }
`;
