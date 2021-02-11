import styled, { keyframes } from "styled-components";

interface IContainerProps {
    color: string;
}

const animate = keyframes`
    0% {
        transform: translateY(-100px);
        opacity: 0;
    }
    50% {
        opacity .3;
    }
    100% {
        transform: translateY(0px);
        opacity: 1;
    }
`;

export const Container = styled.div<IContainerProps>`
    width: 32%;
    height: 150px;

    margin: 10px 0;

    color: white;
    background-color: ${(props) => props.color};

    border-radius: 10px;
    padding: 10px 20px;

    position: relative;
    overflow: hidden;

    animation: ${animate} 0.5s;

    > img {
        height: 110%;

        position: absolute;
        top: -10px;
        right: -20px;

        opacity: 0.3;
    }

    > span {
        font-size: 20px;
        font-weight: 500;
    }

    > small {
        font-size: 12px;
        position: absolute;
        bottom: 10px;
    }

    @media (max-width: 760px) {
        width: 100%;

        > span {
            font-size: 18px;
        }

        > h1 {
            word-wrap: break-word;
            font-size: 25px;
        }
    }
`;
