import styled, { keyframes } from "styled-components";

const animate = keyframes`
    0% {
        transform: translateX(-100px);
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

    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.tertiary};

    border-radius: 10px;

    margin: 10px 0;
    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    animation: ${animate} 0.5s;

    > header img {
        width: 35px;
        margin-left: 10px;
    }

    > header p {
        font-size: 25px;
        font-weight: 500;
    }

    @media (max-width: 770px) {
        > header h1 img {
            height: 30px;
            width: 30px;
        }
    }

    @media (max-width: 760px) {
        width: 100%;
        height: 200px;

        > header h1 {
            font-size: 24px;

            > img {
                height: 20px;
                width: 20px;
            }
        }

        > header p {
            font-size: 20px;
        }

        > footer span {
            font-size: 18px;
        }
    }

    @media (max-width: 280px) {
        width: 100%;
        height: 240px;
    }
`;
