import React, { useEffect, useState } from "react";

import moment from "moment";
import styled from "styled-components";

/**
 * CurrentDate
 * @description [공통컴포넌트] 화면 우측 상단 현재 시간 표시용
 * @return {JSX.Element}
 */
export const CurrentDate = (): JSX.Element => {
    const [date, setDate] = useState<string>(moment(new Date()).format("YYYY-MM-DD"));
    const [time, setTime] = useState<string>(moment(new Date()).format("A HH:mm:ss"));

    /**
     * @private
     * @description [useEffect hooks] interval date 셋팅
     */
    useEffect(() => {
        const id = setInterval(() => {
            setDate(moment(new Date()).format("YYYY-MM-DD"));
            setTime(moment(new Date()).format("A HH:mm:ss"));
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <StyledCurrentDateWrap>
            <div>{date}</div>
            <div>{time}</div>
        </StyledCurrentDateWrap>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledCurrentDateWrap = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    width: 80px;
    font-size: 12px;
    font-weight: 400;
    gap: 4px;
    color: ${({ theme }) => theme.layoutHeaderColor};
`;
