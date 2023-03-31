import React, { useCallback, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import moment from "moment";
import styled from "styled-components";

import {
    GetLprCountsParams,
    GetLprCountsResponse,
    GetLprCountsResult,
} from "../../../../services/api/mockup/MockupInterface";
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

    const [lprCounts, setLprCounts] = useState<GetLprCountsResult[]>([]);

    /**
     * @name getLprCounts
     * @async
     * @function
     * @description 차번 통합 검색
     * @return {Promise<GetLprCountsResponse>}
     */
    const getLprCounts = useCallback(async (params: GetLprCountsParams): Promise<GetLprCountsResponse> => {
        params;
        const res = (await axios.get("/getLprCounts.json")) as AxiosResponse;
        return new Promise((resolve, reject) => {
            if (res?.data.code === 200) {
                resolve(res.data as GetLprCountsResponse);
            } else {
                reject(res?.data.message);
            }
        });
    }, []);

    useEffect(() => {
        if (searchCarNumberCondition) {
            const params: GetLprCountsParams = {
                car_num: searchCarNumberCondition.car_num,
                full_num: searchCarNumberCondition.full_num,
                start_date: searchCarNumberCondition.start_date,
                end_date: searchCarNumberCondition.end_date,
            };
            getLprCounts(params).then((getLprCountsResponse) => {
                setLprCounts(getLprCountsResponse.results.list);
            });
        }
    }, [getLprCounts, searchCarNumberCondition]);

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
