import React from "react";

import moment from "moment";
import styled from "styled-components";

import { GetLprCountsResult } from "../../../../services/api/mockup/MockupInterface";
import {
    StyledListContent,
    StyledListContentWrap,
    StyledListImage,
    StyledListImageWrap,
    StyledListItem,
    StyledListContentLabel,
    StyledListContentLabelWrap,
    StyledListLi,
    StyledListContentText,
    StyledListContentTextWrap,
    StyledListUl,
} from "../../../../styles";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberListProps {
    lprCounts: GetLprCountsResult[];
    selectCarNumber: (car_num: string) => void;
}

export const SearchCarNumberResults = (props: SearchCarNumberListProps) => {
    const { lprCounts, selectCarNumber } = props;

    return (
        <StyledWrap>
            <StyledListUl>
                {lprCounts.map((lprCount, index) => (
                    <StyledListLi key={index} onClick={() => selectCarNumber(lprCount.car_num)}>
                        <StyledListItem>
                            <StyledListImageWrap>
                                <StyledListImage alt="image" src={lprCount.image1} />
                            </StyledListImageWrap>
                            <StyledListContentWrap>
                                <StyledListContent>
                                    <StyledListContentLabelWrap>
                                        <StyledListContentLabel>차량번호 : </StyledListContentLabel>
                                    </StyledListContentLabelWrap>
                                    <StyledListContentTextWrap>
                                        <StyledListContentText>{lprCount.car_num}</StyledListContentText>
                                    </StyledListContentTextWrap>
                                    <StyledListContentLabelWrap>
                                        <StyledListContentLabel>데이터 수 : </StyledListContentLabel>
                                    </StyledListContentLabelWrap>
                                    <StyledListContentTextWrap>
                                        <StyledListContentText>{lprCount.count}회</StyledListContentText>
                                    </StyledListContentTextWrap>
                                    <StyledListContentLabelWrap>
                                        <StyledListContentLabel>최근발생일 : </StyledListContentLabel>
                                    </StyledListContentLabelWrap>
                                    <StyledListContentTextWrap>
                                        <StyledListContentText>
                                            {moment(lprCount.recent_date).format("YYYY-MM-DD HH:mm")}
                                        </StyledListContentText>
                                    </StyledListContentTextWrap>
                                </StyledListContent>
                            </StyledListContentWrap>
                        </StyledListItem>
                    </StyledListLi>
                ))}
            </StyledListUl>
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
