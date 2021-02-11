import styled from "styled-components";
import Switch, { ReactSwitchProps } from "react-switch";

export const Container = styled.div`
    display: flex;
    align-items: center;
`;

export const ToggleLable = styled.span`
    color: ${(props) => props.theme.colors.white};
`;

export const ToggleSelector = styled(Switch).attrs<ReactSwitchProps>(
    ({ theme }) => ({
        onColor: theme.colors.info,
        offColor: theme.colors.warning,
        width: 35,
        height: 20,
        handleDiameter: 20,
    })
)<ReactSwitchProps>`
    margin: 0 7px;
`;
