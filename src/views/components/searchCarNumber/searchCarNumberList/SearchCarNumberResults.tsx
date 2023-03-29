import React, { useCallback, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import styled from "styled-components";

import {
    GetCountsByCarNumberParams,
    GetCountsByCarNumberResponse,
    GetCountsByCarNumberResult,
} from "../../../../services/api/mockup/MockupInterface";
import {
    StyledContent,
    StyledContentWrap,
    StyledImage,
    StyledImageWrap,
    StyledItemWrap,
    StyledLabel,
    StyledLabelWrap,
    StyledLi,
    StyledText,
    StyledTextWrap,
    StyledUl,
} from "../../../../styles";
import { SearchCarNumberCondition } from "../SearchCarNumber";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberListProps {
    searchCarNumberCondition?: SearchCarNumberCondition;
    selectCarNumber: (car_num: string) => void;
}

export const SearchCarNumberResults = (props: SearchCarNumberListProps) => {
    const { searchCarNumberCondition, selectCarNumber } = props;

    const [countsByCarNumber, setCountsByCarNumber] = useState<GetCountsByCarNumberResult[]>([]);

    /**
     * @name getCountsByCarNumber
     * @async
     * @function
     * @description 차번 통합 검색
     * @return {Promise<GetCountsByCarNumberResponse>}
     */
    const getCountsByCarNumber = useCallback(
        async (params: GetCountsByCarNumberParams): Promise<GetCountsByCarNumberResponse> => {
            console.log(params);
            const res = (await axios.get("/getCountsByCarNumber.json")) as AxiosResponse;
            return new Promise((resolve, reject) => {
                if (res?.data.code === 200) {
                    resolve(res.data as GetCountsByCarNumberResponse);
                } else {
                    reject(res?.data.message);
                }
            });
        },
        []
    );

    useEffect(() => {
        if (searchCarNumberCondition) {
            const params: GetCountsByCarNumberParams = {
                car_num: searchCarNumberCondition.car_num,
                full_num: searchCarNumberCondition.full_num,
                start_date: searchCarNumberCondition.start_date,
                end_date: searchCarNumberCondition.end_date,
                start_pos: 0,
                count: 10,
            };
            getCountsByCarNumber(params).then((getCountsByCarNumberResponse) => {
                setCountsByCarNumber(getCountsByCarNumberResponse.results.list);
            });
        }
    }, [getCountsByCarNumber, searchCarNumberCondition]);

    return (
        <StyledWrap>
            <StyledUl>
                {countsByCarNumber.map((count, index) => (
                    <StyledLi key={index} onClick={() => selectCarNumber(count.car_num)}>
                        <StyledItemWrap>
                            <StyledImageWrap>
                                <StyledImage alt="image" src={count.image1} />
                            </StyledImageWrap>
                            <StyledContentWrap>
                                <StyledContent>
                                    <StyledLabelWrap>
                                        <StyledLabel>차량번호</StyledLabel>
                                    </StyledLabelWrap>
                                    <StyledTextWrap>
                                        <StyledText>{count.car_num}</StyledText>
                                    </StyledTextWrap>
                                    <StyledLabelWrap>
                                        <StyledLabel>최근발생일</StyledLabel>
                                    </StyledLabelWrap>
                                    <StyledTextWrap>
                                        <StyledText>{count.recent_date}</StyledText>
                                    </StyledTextWrap>
                                    <StyledLabelWrap>
                                        <StyledLabel>총 발생 횟수</StyledLabel>
                                    </StyledLabelWrap>
                                    <StyledTextWrap>
                                        <StyledText>{count.count}</StyledText>
                                    </StyledTextWrap>
                                </StyledContent>
                            </StyledContentWrap>
                        </StyledItemWrap>
                    </StyledLi>
                ))}
            </StyledUl>
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
