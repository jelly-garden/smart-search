import React, { ReactNode } from "react";

import styled from "styled-components";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberListProps {
    children: ReactNode;
}

export const SearchCarNumberList = (props: SearchCarNumberListProps) => {
    const { children } = props;

    return <StyledWrap>{children}</StyledWrap>;
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div``;
