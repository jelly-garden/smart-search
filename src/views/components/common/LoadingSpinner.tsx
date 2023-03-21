import React from "react";

import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

import { THEME_LIGHT } from "../../../services/interfaces";
import { CommonState } from "../../../services/store/common/common-slice";
import { useAppSelector } from "../../../services/store/hooks";
import { themeDark, themeLight } from "../../../styles";

export const LoadingSpinner = () => {
    const storedCommon = useAppSelector((state) => state.common) as CommonState;
    const { themeMode } = storedCommon;

    const override: React.CSSProperties = {
        borderWidth: 5,
    };

    return (
        <StyledLoadingSpinnerWrap>
            <ClipLoader
                color={themeMode === THEME_LIGHT ? themeLight.contentColor : themeDark.contentColor}
                cssOverride={override}
                size={60}
            />
        </StyledLoadingSpinnerWrap>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledLoadingSpinnerWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: ${({ theme }) => theme.contentBgColor};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
