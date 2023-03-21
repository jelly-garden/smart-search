/**
 * [공통컴포넌트] 페이지의 상단 타이틀 및 설명 표출 컴포넌트
 */
import React from "react";

import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledPageTitleArea = styled.div`
    overflow: hidden;
    padding: 0;
    height: 100px;
`;

const StyledPageTitle = styled.h2`
    display: block;
    margin: 0;
    padding: 0 0 24px 0;
    font-size: 16px;
    line-height: 1.1;
    font-weight: 700;
    letter-spacing: -0.05em;
`;

const StyledBorderBottomText = styled.p`
    margin: 0 0 16px 0;
    padding: 0 0 16px 0;
    border-bottom: 1px solid ${({ theme }) => theme.contentBorderColor};
    font-size: 12px;
    letter-spacing: 0;
    line-height: 1.6;
    font-weight: normal;
`;

/**
 * @typedef PageTitleProps
 * @prop {string} title 페이지 제목
 * @prop {string} title 페이지 설명
 */
interface PageTitleProps {
    title: string;
    subscription: string;
}

export const PageTitle = (props: PageTitleProps) => {
    const { title, subscription } = props;
    return (
        <StyledPageTitleArea>
            <StyledPageTitle>{title}</StyledPageTitle>
            <StyledBorderBottomText>{subscription}</StyledBorderBottomText>
        </StyledPageTitleArea>
    );
};
