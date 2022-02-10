import styled from "styled-components";




export type IColors = {
    activeColor: string
    gapColor: string
    linkDefaultColor: string
    boxBgColor: string
    baseColor: string
    backgroundColor: string
    labelColor: string
    long: string
    short: string
    modalTitle: string
    subtitle: string
    filedColor: string
    modalBgColor: string
    activeBgColor: string
    explain: string
    borderColor: string
    tabActiveColor: string
    stepColor: string
    stepActiveColor: string
    stepBorderColor: string
    emptyTextColor: string
    warnBgColor: string
    menuBgColor: string
    articleColor: string
    articleHrColor: string
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
    font-size: ${fonts.h5};
    color: ${colors.baseColor};
    &.active{
        color: ${colors.activeColor};
    }
`;
