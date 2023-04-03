import React from "react";

import moment from "moment";
import styled from "styled-components";

import { GetLprCountsResult } from "../../../../services/api/mockup/MockupInterface";
import {
    StyledListItemContent,
    StyledListItemContentWrap,
    StyledListItemImage,
    StyledListItemImageWrap,
    StyledListItem,
    StyledListItemContentLabel,
    StyledListItemContentLabelWrap,
    StyledVerticalListLi,
    StyledListItemContentText,
    StyledListItemContentTextWrap,
    StyledVerticalListUl,
} from "../../../../styles";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberListProps {
    lprCounts: GetLprCountsResult[];
    selectCarNumber: (car_num: string | undefined) => void;
}

export const SearchCarNumberResults = (props: SearchCarNumberListProps) => {
    const { lprCounts, selectCarNumber } = props;

    return (
        <StyledWrap>
            <StyledVerticalListUl>
                {lprCounts.map((lprCount, index) => (
                    <StyledVerticalListLi key={index} onClick={() => selectCarNumber(lprCount.car_num)}>
                        <StyledListItem>
                            <StyledListItemImageWrap>
                                <StyledListItemImage alt="image" src={lprCount.image1} />
                            </StyledListItemImageWrap>
                            <StyledListItemContentWrap>
                                <StyledListItemContent>
                                    <StyledListItemContentLabelWrap>
                                        <StyledListItemContentLabel>차량번호 : </StyledListItemContentLabel>
                                    </StyledListItemContentLabelWrap>
                                    <StyledListItemContentTextWrap>
                                        <StyledListItemContentText>{lprCount.car_num}</StyledListItemContentText>
                                    </StyledListItemContentTextWrap>
                                    <StyledListItemContentLabelWrap>
                                        <StyledListItemContentLabel>데이터 수 : </StyledListItemContentLabel>
                                    </StyledListItemContentLabelWrap>
                                    <StyledListItemContentTextWrap>
                                        <StyledListItemContentText>{lprCount.count}회</StyledListItemContentText>
                                    </StyledListItemContentTextWrap>
                                    <StyledListItemContentLabelWrap>
                                        <StyledListItemContentLabel>최근발생일 : </StyledListItemContentLabel>
                                    </StyledListItemContentLabelWrap>
                                    <StyledListItemContentTextWrap>
                                        <StyledListItemContentText>
                                            {moment(lprCount.recent_date).format("YYYY-MM-DD HH:mm")}
                                        </StyledListItemContentText>
                                    </StyledListItemContentTextWrap>
                                </StyledListItemContent>
                            </StyledListItemContentWrap>
                        </StyledListItem>
                    </StyledVerticalListLi>
                ))}
            </StyledVerticalListUl>
        </StyledWrap>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div`
    height: calc(100% - 212px);
    padding: 0 8px;
    overflow-y: auto;
`;
