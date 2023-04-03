import React, { useCallback } from "react";

import moment from "moment/moment";
import styled from "styled-components";

import { GetLprDetailsResult } from "../../../../services/api/mockup/MockupInterface";
import {
    StyledCard,
    StyledCardContent,
    StyledCardFooter,
    StyledHorizontalListLi,
    StyledHorizontalListUl,
    StyledHorizontalListWrap,
    StyledListItem,
    StyledListItemContent,
    StyledListItemContentLabel,
    StyledListItemContentLabelWrap,
    StyledListItemContentText,
    StyledListItemContentTextWrap,
    StyledListItemContentWrap,
    StyledCardContentImage,
} from "../../../../styles";

/**
 * component interface 정의 영역
 */
interface SearchPathThumbnailsProps {
    lprDetails: GetLprDetailsResult[];
    selectedLprDetail?: GetLprDetailsResult;
    selectLprDetail: (lprDetail: GetLprDetailsResult | undefined) => void;
}

export const SearchPathThumbnails = (props: SearchPathThumbnailsProps) => {
    const { lprDetails, selectedLprDetail, selectLprDetail } = props;

    /**
     * @name handleListItemClick
     * @function
     * @description 목록 요소 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleListItemClick = useCallback(
        (lprDetail: GetLprDetailsResult) => {
            if (lprDetail.date === selectedLprDetail?.date) {
                selectLprDetail(undefined);
            } else {
                selectLprDetail(lprDetail);
            }
        },
        [selectLprDetail, selectedLprDetail?.date]
    );

    return (
        <StyledWrap>
            <StyledContent>
                <StyledPathThumbnailsListUl>
                    {lprDetails.map((lprDetail, index) => (
                        <StyledPathThumbnailsListLi
                            key={index}
                            onClick={() => handleListItemClick(lprDetail)}
                            active={lprDetail.date === selectedLprDetail?.date}
                        >
                            <StyledPathThumbnailsCard>
                                <StyledCardContent>
                                    <StyledCardContentImage alt="image" src={lprDetail.image1}></StyledCardContentImage>
                                </StyledCardContent>
                                <StyledCardFooter>
                                    <StyledListItem>
                                        <StyledPathThumbnailsIconWrap>
                                            <StyledPathThumbnailsIconDiv>{index + 1}</StyledPathThumbnailsIconDiv>
                                        </StyledPathThumbnailsIconWrap>
                                        <StyledPathThumbnailsContentWrap>
                                            <StyledListItemContent>
                                                <StyledListItemContentLabelWrap>
                                                    <StyledListItemContentLabel>장비명 : </StyledListItemContentLabel>
                                                </StyledListItemContentLabelWrap>
                                                <StyledListItemContentTextWrap>
                                                    <StyledListItemContentText>
                                                        {lprDetail.dev_name}
                                                    </StyledListItemContentText>
                                                </StyledListItemContentTextWrap>
                                                <StyledListItemContentLabelWrap>
                                                    <StyledListItemContentLabel>
                                                        위도/경도 :{" "}
                                                    </StyledListItemContentLabel>
                                                </StyledListItemContentLabelWrap>
                                                <StyledListItemContentTextWrap>
                                                    <StyledListItemContentText>
                                                        {lprDetail.location.latitude} / {lprDetail.location.longitude}
                                                    </StyledListItemContentText>
                                                </StyledListItemContentTextWrap>
                                                <StyledListItemContentLabelWrap>
                                                    <StyledListItemContentLabel>발생일 : </StyledListItemContentLabel>
                                                </StyledListItemContentLabelWrap>
                                                <StyledListItemContentTextWrap>
                                                    <StyledListItemContentText>
                                                        {moment(lprDetail.date).format("YYYY-MM-DD HH:mm")}
                                                    </StyledListItemContentText>
                                                </StyledListItemContentTextWrap>
                                            </StyledListItemContent>
                                        </StyledPathThumbnailsContentWrap>
                                    </StyledListItem>
                                </StyledCardFooter>
                            </StyledPathThumbnailsCard>
                        </StyledPathThumbnailsListLi>
                    ))}
                </StyledPathThumbnailsListUl>
            </StyledContent>
        </StyledWrap>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
    background: ${({ theme }) => theme.contentBgColor};
`;
const StyledContent = styled(StyledHorizontalListWrap)``;
const StyledPathThumbnailsListUl = styled(StyledHorizontalListUl)``;
const StyledPathThumbnailsListLi = styled(StyledHorizontalListLi)`
    padding: 0;
    margin-right: 8px;
    border: none;
`;
const StyledPathThumbnailsCard = styled(StyledCard)`
    width: 260px;
`;
const StyledPathThumbnailsIconWrap = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
`;
const StyledPathThumbnailsIconDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    color: rgb(255, 255, 255);
    background-color: rgb(235, 0, 20);
    font-size: 12px;
    font-weight: 600;
`;
const StyledPathThumbnailsContentWrap = styled(StyledListItemContentWrap)`
    margin-left: 0;
`;
