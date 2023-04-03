import React from "react";

import styled from "styled-components";

import { GetLprDetailsResult } from "../../../../services/api/mockup/MockupInterface";
import { StyledCard, StyledCardContent, StyledCardContentImage, StyledCardHeader } from "../../../../styles";

/**
 * component interface 정의 영역
 */
interface SearchPathLatestThumbnailProps {
    carNumber?: string;
    latestLprDetail: GetLprDetailsResult;
}

export const SearchPathLatestThumbnail = (props: SearchPathLatestThumbnailProps) => {
    const { carNumber, latestLprDetail } = props;

    return (
        <StyledWrap>
            <StyledCard>
                <StyledCardHeader>
                    <span>{carNumber}</span>
                </StyledCardHeader>
                <StyledCardContent>
                    <StyledCardContentImage alt="image" src={latestLprDetail.image1}></StyledCardContentImage>
                </StyledCardContent>
            </StyledCard>
        </StyledWrap>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div`
    position: absolute;
    bottom: 0;
    padding: 8px;
    margin-bottom: 8px;
`;
