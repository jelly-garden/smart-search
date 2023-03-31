import React, { useState, useEffect, useCallback } from "react";

import { Stack } from "@innodep/tms-react-ui";
import axios, { AxiosResponse } from "axios";
import moment from "moment/moment";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import {
    GetLprDetailsParams,
    GetLprDetailsResponse,
    GetLprDetailsResult,
} from "../../../services/api/mockup/MockupInterface";
import { SORTING_ASC } from "../../../services/interfaces";
import { SearchCondition, SearchFormValues } from "../common/SearchForm";

import { SearchPathLatestThumbnail } from "./searchPathDetail/SearchPathLatestThumbnail";
import { SearchPathThumbnails } from "./searchPathDetail/SearchPathThumbnails";
import { SearchPathForm } from "./SearchPathForm";
import { SearchPathMap } from "./SearchPathMap";

export const SearchPath = () => {
    const history = useHistory();

    const [searchPathCondition, setSearchPathCondition] = useState<SearchCondition>();
    const [newInitialValues, setNewInitialValues] = useState<SearchFormValues>();

    const [latestLprDetail, setLatestLprDetail] = useState<GetLprDetailsResult>();
    const [lprDetails, setLprDetails] = useState<GetLprDetailsResult[]>([]);

    useEffect(() => {
        const queryString = history.location.search.replace("?", "");
        if (queryString) {
            const queryParams = new URLSearchParams(queryString);
            const carNumber = queryParams.get("car_num") ?? "";
            const recentDate = queryParams.get("recent_date") ?? "";
            const startDate = recentDate ? moment(recentDate).subtract(2, "day").format("YYYY-MM-DD") : "";
            const startTime = recentDate ? moment(recentDate).subtract(2, "day").format("HH:mm") : "";
            const endDate = recentDate ? moment(recentDate).format("YYYY-MM-DD") : "";
            const endTime = recentDate ? moment(recentDate).format("HH:mm") : "";

            setSearchPathCondition({
                car_num: carNumber,
                start_date: `${startDate} ${startTime}`,
                end_date: `${endDate} ${endTime}`,
            });
            setNewInitialValues({
                car_num: carNumber,
                start_date: startDate,
                start_time: startTime,
                end_date: endDate,
                end_time: endTime,
            });
        }
    }, [history.location]);

    /**
     * @name getLprDetails
     * @async
     * @function
     * @description 차번 통합 검색 상세
     * @return {Promise<GetLprDetailsResponse>}
     */
    const getLprDetails = useCallback(async (params: GetLprDetailsParams): Promise<GetLprDetailsResponse> => {
        params;
        const res = (await axios.get("/getLprDetails.json")) as AxiosResponse;
        return new Promise((resolve, reject) => {
            if (res?.data.code === 200) {
                resolve(res.data as GetLprDetailsResponse);
            } else {
                reject(res?.data.message);
            }
        });
    }, []);

    useEffect(() => {
        if (searchPathCondition) {
            const params: GetLprDetailsParams = {
                car_num: searchPathCondition.car_num,
                start_date: searchPathCondition.start_date,
                end_date: searchPathCondition.end_date,
                sorting: SORTING_ASC,
            };
            getLprDetails(params).then((getLprDetailsResponse) => {
                if (getLprDetailsResponse.results.list.length > 0) {
                    setLatestLprDetail(getLprDetailsResponse.results.list[0]);
                }
                setLprDetails(getLprDetailsResponse.results.list);
            });
        }
    }, [getLprDetails, searchPathCondition]);

    return (
        <StyledWrap gap={"0px"}>
            <StyledLeftWrap>
                <SearchPathForm newInitialValues={newInitialValues} onSearch={setSearchPathCondition} />
                {latestLprDetail && <SearchPathLatestThumbnail latestLprDetail={latestLprDetail} />}
            </StyledLeftWrap>
            <StyledRightWrap>
                <SearchPathMap />
                {lprDetails.length > 0 && <SearchPathThumbnails lprDetails={lprDetails} />}
            </StyledRightWrap>
        </StyledWrap>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled(Stack)`
    height: 100%;
`;
const StyledLeftWrap = styled.div`
    position: relative;
    width: 500px;
    border-right: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
const StyledRightWrap = styled.div`
    position: relative;
    width: calc(100% - 500px);
`;
