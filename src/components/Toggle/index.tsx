import React from "react";

import { Container, ToggleLable, ToggleSelector } from "./styles";

interface IToogleProps {
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChange(): void;
}

const Toggle: React.FC<IToogleProps> = ({
    labelLeft,
    labelRight,
    checked,
    onChange,
}) => {
    return (
        <Container>
            <ToggleLable>{labelLeft}</ToggleLable>
            <ToggleSelector
                checked={checked}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={onChange}
            />
            <ToggleLable>{labelRight}</ToggleLable>
        </Container>
    );
};

export default Toggle;
