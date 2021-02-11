import styled from "styled-components";

interface ILegendProps {
    color: string;
}

export const Container = styled.div`
    width: 100%;

    margin: 10px 0;
    padding: 30px 20px;
    border-radius: 10px;

    display: flex;
    flex-direction: column;

    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.tertiary};

    @media (max-width: 280px) {
        padding: 30px 10px;
    }
`;

export const Header = styled.header`
    width: 100%;

    display: flex;
    justify-content: space-between;

    > h2 {
        margin-bottom: 20px;
        padding-left: 16px;
    }

    @media (max-width: 1280px) {
        flex-direction: column;
    }
`;

export const LegendContainer = styled.ul`
    list-style: none;
    display: flex;

    @media (max-width: 360px) {
        flex-direction: column;
    }
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    margin-left: 16px;
    padding-right: 16px;

    font-size: 20px;

    > div {
        background-color: ${(props) => props.color};

        width: 30px;
        height: 30px;
        border-radius: 5px;

        font-size: 18px;
        line-height: 30px;
        text-align: center;
        font-weight: 700;
    }

    > span {
        margin-left: 5px;
    }

    @media (max-width: 420px) {
        > div {
            font-size: 15px;
            width: 20px;
            height: 20px;
            line-height: 20px;
        }
    }
`;

export const ChartContainer = styled.div`
    flex: 1;
    height: 300px;

    @media (max-width: 420px) {
        height: 200px;
    }

    @media (max-width: 360px) {
        height: 200px;
    }

    @media (max-width: 280px) {
        height: 180px;
    }
`;
