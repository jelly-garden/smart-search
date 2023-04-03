import React from "react";

import styled from "styled-components";

import { GetLprDetailsResult } from "../../../services/api/mockup/MockupInterface";

/**
 * component interface 정의 영역
 */
interface SearchPathMapProps {
    lprDetails: GetLprDetailsResult[];
    selectedLprDetail?: GetLprDetailsResult;
}

export const SearchPathMap = (props: SearchPathMapProps) => {
    const { lprDetails, selectedLprDetail } = props;
    console.log("lprDetails: ", lprDetails);
    console.log("selectedLprDetail: ", selectedLprDetail);

    return <StyledWrap></StyledWrap>;
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div`
    background: #a1c2f6;
    width: 100%;
    height: 100%;
`;
