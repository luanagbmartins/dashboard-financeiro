import styled, { keyframes } from "styled-components";

interface ILegendProps {
    color: string;
}

const animate = keyframes`
    0% {
        transform: translateX(100px);
        opacity: 0;
    }
    50% {
        opacity .3;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.div`
    width: 49%;
    height: 260px;

    margin: 10px 0;

    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.tertiary};

    border-radius: 10px;

    display: flex;

    animation: ${animate} 0.5s;

    @media (max-width: 760px) {
        display: flex;
        width: 100%;
    }

    @media (max-width: 360px) {
        width: 100%;
        min-height: 450px;
        display: flex;
        flex-direction: column;
    }
`;

export const SideLeft = styled.aside`
    padding: 30px 10px;

    > h2 {
        margin-bottom: 20px;
    }

    @media (max-width: 1345px) {
        padding: 0 15px 5px;
        margin-bottom: 7px;

        > h2 {
            margin-top: 15px;
            margin-bottom: 7px;
        }
    }
    @media (max-width: 420px) {
        padding: 15px;
        margin-bottom: 7px;
    }
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

    @media (max-width: 1345px) {
        display: flex;
        flex-direction: column;
    }
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    font-size: 20px;

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

export const SideRight = styled.main`
    display: flex;
    flex: 1;
    justify-content: center;

    @media (max-width: 1345px) {
        height: 100%;
    }

    @media (max-width: 360px) {
        height: 50%;
    }
`;
