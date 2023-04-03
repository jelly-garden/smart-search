import React, { useState, useCallback, useEffect } from "react";

import { Stack } from "@innodep/tms-react-ui";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components";

import {
    GetLprCountsByDeviceParams,
    GetLprCountsByDeviceResponse,
    GetLprCountsByDeviceResult,
    GetLprCountsParams,
    GetLprCountsResponse,
    GetLprCountsResult,
    GetLprDetailsParams,
    GetLprDetailsResponse,
    GetLprDetailsResult,
} from "../../../services/api/mockup/MockupInterface";
import { SORTING_DESC } from "../../../services/interfaces";
import { SearchCondition } from "../common/SearchForm";

import { SearchCarNumberDetail } from "./searchCarNumberDetail/SearchCarNumberDetail";
import { SearchCarNumberThumbnails } from "./searchCarNumberDetail/SearchCarNumberThumbnails";
import { SearchCarNumberForm } from "./searchCarNumberList/SearchCarNumberForm";
import { SearchCarNumberList } from "./searchCarNumberList/SearchCarNumberList";
import { SearchCarNumberResults } from "./searchCarNumberList/SearchCarNumberResults";
import { SearchCarNumberMap } from "./SearchCarNumberMap";

export interface Device {
    dev_name: string;
    location: {
        longitude: string;
        latitude: string;
    };
    dev_serial: number;
}

export const SearchCarNumber = () => {
    const [searchCarNumberCondition, setSearchCarNumberCondition] = useState<SearchCondition>();
    const [selectedCarNumber, setSelectedCarNumber] = useState<string>();
    const [selectedDevice, setSelectedDevice] = useState<Device>();

    const [lprCounts, setLprCounts] = useState<GetLprCountsResult[]>([]);
    const [lprCountsByDevice, setLprCountsByDevice] = useState<GetLprCountsByDeviceResult[]>([]);
    const [lprDetails, setLprDetails] = useState<GetLprDetailsResult[]>([]);

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
            const regex = new RegExp(/^(\d){4}$/);
            const onlyNumber = regex.test(searchCarNumberCondition.car_num);
            const params: GetLprCountsParams = {
                car_num: searchCarNumberCondition.car_num,
                full_num: onlyNumber,
                start_date: searchCarNumberCondition.start_date,
                end_date: searchCarNumberCondition.end_date,
            };
            getLprCounts(params).then((getLprCountsResponse) => {
                setLprCounts(getLprCountsResponse.results.list);
            });
        }
    }, [getLprCounts, searchCarNumberCondition]);

    /**
     * @name getLprCountsByDevice
     * @async
     * @function
     * @description 장비별 차번 통합 검색
     * @return {Promise<GetLprCountsByDeviceResponse>}
     */
    const getLprCountsByDevice = useCallback(
        async (params: GetLprCountsByDeviceParams): Promise<GetLprCountsByDeviceResponse> => {
            params;
            const res = (await axios.get("/getLprCountsByDevice.json")) as AxiosResponse;
            return new Promise((resolve, reject) => {
                if (res?.data.code === 200) {
                    resolve(res.data as GetLprCountsByDeviceResponse);
                } else {
                    reject(res?.data.message);
                }
            });
        },
        []
    );

    useEffect(() => {
        if (searchCarNumberCondition && selectedCarNumber) {
            const params: GetLprCountsByDeviceParams = {
                car_num: selectedCarNumber,
                full_num: true,
                start_date: searchCarNumberCondition.start_date,
                end_date: searchCarNumberCondition.end_date,
            };
            getLprCountsByDevice(params).then((getLprCountsByDeviceResponse) => {
                setLprCountsByDevice(getLprCountsByDeviceResponse.results.list);
            });
        }
    }, [getLprCountsByDevice, searchCarNumberCondition, selectedCarNumber]);

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
        if (searchCarNumberCondition && selectedCarNumber && selectedDevice) {
            const params: GetLprDetailsParams = {
                car_num: selectedCarNumber,
                dev_serial: selectedDevice.dev_serial,
                start_date: searchCarNumberCondition.start_date,
                end_date: searchCarNumberCondition.end_date,
                sorting: SORTING_DESC,
            };
            getLprDetails(params).then((getLprDetailsResponse) => {
                setLprDetails(getLprDetailsResponse.results.list);
            });
        }
    }, [getLprDetails, searchCarNumberCondition, selectedCarNumber, selectedDevice]);

    /**
     * @name handleBackButtonClick
     * @function
     * @description 뒤로가기 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleBackButtonClick = useCallback(() => {
        setSelectedCarNumber(undefined);
        setLprCountsByDevice([]);
        setSelectedDevice(undefined);
        setLprDetails([]);
    }, []);

    /**
     * @name handleCloseDrawerButtonClick
     * @function
     * @description 썸네일 사이드바 닫기 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleCloseDrawerButtonClick = useCallback(() => {
        setSelectedDevice(undefined);
        setLprDetails([]);
    }, []);

    return (
        <StyledWrap gap={"0px"}>
            <StyledLeftWrap>
                {!selectedCarNumber && (
                    <SearchCarNumberList>
                        <SearchCarNumberForm onSearch={setSearchCarNumberCondition} />
                        <SearchCarNumberResults lprCounts={lprCounts} selectCarNumber={setSelectedCarNumber} />
                    </SearchCarNumberList>
                )}
                {selectedCarNumber && (
                    <SearchCarNumberDetail
                        lprCountsByDevice={lprCountsByDevice}
                        selectedCarNumber={selectedCarNumber}
                        selectedDevice={selectedDevice}
                        selectDevice={setSelectedDevice}
                        onBackButtonClick={handleBackButtonClick}
                    />
                )}
            </StyledLeftWrap>
            <StyledRightWrap>
                <SearchCarNumberMap lprCountsByDevice={lprCountsByDevice} selectedDevice={selectedDevice} />
            </StyledRightWrap>
            {selectedDevice && (
                <SearchCarNumberThumbnails
                    deviceName={selectedDevice.dev_name}
                    lprDetails={lprDetails}
                    onCloseDrawerButtonClick={handleCloseDrawerButtonClick}
                />
            )}
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
    width: 450px;
    border-right: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
const StyledRightWrap = styled.div`
    position: relative;
    width: calc(100% - 450px);
`;
