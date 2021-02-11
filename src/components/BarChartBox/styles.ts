import styled from "styled-components";

interface ILegendProps {
    color: string;
}

export const Container = styled.div`
    width: 49%;
    min-height: 260px;

    margin: 10px 0;

    background-color: ${(props) => props.theme.colors.tertiary};
    color: ${(props) => props.theme.colors.white};
    border-radius: 10px;

    display: flex;

    @media (max-width: 760px) {
        width: 100%;
        min-height: 200px;
    }

    @media (max-width: 380px) {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
        height: auto;
    }
`;

export const SideLeft = styled.aside`
    flex: 1;
    padding: 30px 20px;

    > h2 {
        padding-left: 16px;
        margin-bottom: 10px;
    }
`;

export const SideRight = styled.main`
    flex: 1;
    min-height: 150px;
    width: 48%;

    display: flex;
    justify-content: center;

    padding-top: 35px;
`;

export const LegendContainer = styled.ul`
    list-style: none;
    max-height: 170px;
    padding-right: 15px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.colors.secondary};
        border-radius: 12px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${(props) => props.theme.colors.tertiary};
        border-radius: 12px;
    }
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    font-size: 20px;
    padding-left: 16px;

    > div {
        color: white;
        background-color: ${(props) => props.color};

        width: 55px;
        height: 55px;
        border-radius: 5px;

        font-size: 18px;
        line-height: 55px;
        text-align: center;
        font-weight: 700;
    }

    > span {
        margin-left: 5px;
    }

    @media (max-width: 770px) {
        font-size: 17px;
        margin: 3px 0;

        > div {
            height: 45px;
            width: 45px;
            line-height: 45px;
            font-size: 14px;
        }

        > span {
            margin-left: 7px;
        }
    }

    @media (max-width: 360px) {
        font-size: 20px;
        margin: 3px 0;

        > div {
            height: 50px;
            width: 50px;
            line-height: 50px;
            font-size: 17px;
        }
    }
`;
