import styled from "styled-components";

export const colors = {
    backgroundColor: "#11131E",
    long: "#98E39E",
    short: "#E86B4A",
    activeColor: "#79BDEB",
    baseColor: "#E9EBF0",
    labelColor: "#74777F",
    buttonTextColor: "#17181C",
    auxiBgColor: "#333A47",
    inputBgColor: "#1A1D27",
    tradeBgColor: "#202531",
    disabledFontColor: "#464953",
    pageBgColor: "#090A10"
};

export const fonts = {
    h2: "24px",
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
