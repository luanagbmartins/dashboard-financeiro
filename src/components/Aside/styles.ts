import styled, { css } from "styled-components";

interface IContainerProps {
    menuIsOpen: boolean;
}

export const Container = styled.div<IContainerProps>`
    grid-area: AS;

    width: 250px;

    background-color: ${(props) => props.theme.colors.secondary};

    padding-left: 20px;
    border-right: 1px solid ${(props) => props.theme.colors.gray};

    position: relative;

    @media (max-width: 770px) {
        padding-left: 20px;
        position: fixed;
        z-index: ${(props) => (props.menuIsOpen ? 4 : 2)};

        height: ${(props) => (props.menuIsOpen ? "100vh" : "70px")};
        overflow: hidden;

        ${(props) =>
            !props.menuIsOpen &&
            css`
                border: none;
                border-bottom: 1px solid ${(props) => props.theme.colors.gray};
            `};
    }
`;

export const Header = styled.header`
    height: 70px;
    display: flex;
    align-items: center;
`;

export const ToggleMenu = styled.button`
    display: none;
    @media (max-width: 770px) {
        width: 40px;
        height: 40px;

        border-radius: 5px;
        font-size: 22px;

        color: white;
        background-color: ${(props) => props.theme.colors.warning};

        transition: opacity 0.3s;

        &:hover {
            opacity: 0.7;
        }

        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const LogImg = styled.img`
    height: 40px;
    width: 40px;
    @media (max-width: 770px) {
        display: none;
    }
`;

export const Title = styled.h3<IContainerProps>`
    color: ${(props) => props.theme.colors.white};
    margin-left: 10px;

    @media (max-width: 770px) {
        display: ${(props) => (props.menuIsOpen ? "flex" : "none")};
    }
`;

export const MenuContainer = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

export const MenuItemLink = styled.a`
    color: ${(props) => props.theme.colors.info};
    text-decoration: none;

    margin: 7px 0;
    display: flex;
    align-items: center;

    transition: opacity 0.3s;

    &:hover {
        opacity: 0.7;
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const MenuItemButton = styled.button`
    font-size: 16px;
    color: ${(props) => props.theme.colors.info};

    border: none;
    background: none;

    margin: 7px 0;
    display: flex;
    align-items: center;

    transition: opacity 0.3s;

    &:hover {
        opacity: 0.7;
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const ThemeToggleFooter = styled.footer<IContainerProps>`
    display: none;
    position: absolute;
    bottom: 30px;

    @media (max-width: 770px) {
        display: ${(props) => (props.menuIsOpen ? "flex" : "none")};
    }
`;
