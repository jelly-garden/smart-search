/**
 * [공통컴포넌트] 다국어 변경 토글 스위치 컴포넌트
 */
import React, { useCallback, useState } from "react";

import i18next from "i18next";
import Switch from "react-switch";
import styled from "styled-components";

import { CommonState, setStoredLocale } from "../../../services/store/common/common-slice";
import { useAppDispatch, useAppSelector } from "../../../services/store/hooks";

export const ToggleSwitch = () => {
    const storedCommon = useAppSelector((state) => state.common) as CommonState;
    const { locale } = storedCommon;

    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState<boolean>(locale === "en");

    /**
     * @name handleToggleSwitchChange
     * @function
     * @description 토글 스위치 변경 이벤트 핸들러
     * @return {void}
     */
    const handleToggleSwitchChange = useCallback(() => {
        dispatch(setStoredLocale(checked ? "ko" : "en"));
        checked ? i18next.changeLanguage("ko") : i18next.changeLanguage("en");
        setChecked(!checked);
    }, [checked, dispatch]);

    return (
        <StyledToggleSwitchWrap>
            <StyledOverrideSwitch
                onChange={handleToggleSwitchChange}
                checked={checked}
                onColor={"#0068b4"}
                offColor={"#0068b4"}
                checkedIcon={<StyledSwitchText>en</StyledSwitchText>}
                uncheckedIcon={<StyledSwitchText>ko</StyledSwitchText>}
                height={24}
                width={50}
            />
        </StyledToggleSwitchWrap>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledToggleSwitchWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const StyledOverrideSwitch = styled(Switch)`
    .react-switch-bg > div {
        display: flex;
        align-items: center;
        justify-content: center;
        > span {
            color: rgba(255, 255, 255, 1);
            z-index: 1;
        }
    }
`;

const StyledSwitchText = styled.span`
    font-size: 12px;
    font-weight: bold;
`;
