import React, { useState } from "react";
import Toggle from "../Toggle";

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu,
} from "react-icons/md";

import logoImg from "../../assets/logo.svg";

import { useAuth } from "../../hooks/auth";
import { useTheme } from "../../hooks/theme";

import {
    Container,
    Header,
    LogImg,
    MenuContainer,
    MenuItemLink,
    Title,
    MenuItemButton,
    ToggleMenu,
    ThemeToggleFooter,
} from "./styles";

const Aside: React.FC = () => {
    const { signOut } = useAuth();
    const { toggleTheme, theme } = useTheme();

    const [toggleMenuIsOpen, setToggleMenuIsOpen] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() =>
        theme.title === "dark" ? true : false
    );

    const handleToggleMenu = () => {
        setToggleMenuIsOpen(!toggleMenuIsOpen);
    };

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    };

    return (
        <Container menuIsOpen={toggleMenuIsOpen}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    {toggleMenuIsOpen ? <MdClose /> : <MdMenu />}
                </ToggleMenu>
                <LogImg src={logoImg} alt="Logo Minha Carteira" />
                <Title menuIsOpen={toggleMenuIsOpen}>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemButton onClick={signOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>
            <ThemeToggleFooter menuIsOpen={toggleMenuIsOpen}>
                <Toggle
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </ThemeToggleFooter>
        </Container>
    );
};

export default Aside;
