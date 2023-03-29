import React, { useCallback, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

import {
    GetLprDetailsParams,
    GetLprDetailsResponse,
    GetLprDetailsResult,
} from "../../../../services/api/mockup/MockupInterface";
import { StyledIconButton } from "../../../../styles";
import { SearchCarNumberCondition } from "../SearchCarNumber";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberImagesProps {
    searchCarNumberCondition: SearchCarNumberCondition;
    selectedCarNumber: string;
    selectedDeviceSerial: number;
    onCloseImagesButtonClick: () => void;
}

export const SearchCarNumberImages = (props: SearchCarNumberImagesProps) => {
    const { searchCarNumberCondition, selectedCarNumber, selectedDeviceSerial, onCloseImagesButtonClick } = props;

    const [lprDetails, setLprDetails] = useState<GetLprDetailsResult[]>([]);

    /**
     * @name getLprDetails
     * @async
     * @function
     * @description 차번 통합 검색 상세
     * @return {Promise<GetLprDetailsResponse>}
     */
    const getLprDetails = useCallback(async (params: GetLprDetailsParams): Promise<GetLprDetailsResponse> => {
        console.log(params);
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
        const params: GetLprDetailsParams = {
            car_num: selectedCarNumber,
            dev_serial: selectedDeviceSerial,
            start_date: searchCarNumberCondition.start_date,
            end_date: searchCarNumberCondition.end_date,
            sorting: "desc",
        };
        getLprDetails(params).then((getLprDetailsResponse) => {
            setLprDetails(getLprDetailsResponse.results.list);
        });
    }, [
        getLprDetails,
        searchCarNumberCondition,
        searchCarNumberCondition.end_date,
        searchCarNumberCondition.start_date,
        selectedCarNumber,
        selectedDeviceSerial,
    ]);
    console.log(lprDetails);

    return (
        <StyledWrap>
            <StyledHeader>
                <StyledHeaderSpan>{selectedDeviceSerial}</StyledHeaderSpan>
                <StyledIconButton size={"sm"} variant={"ghost"} onClick={onCloseImagesButtonClick}>
                    <MdClose size="80%" />
                </StyledIconButton>
            </StyledHeader>
            <StyledList></StyledList>
        </StyledWrap>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div`
    width: 340px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    border-left: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
    background: ${({ theme }) => theme.contentBgColor};
`;
const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
const StyledHeaderSpan = styled.span``;
const StyledList = styled.div`
    height: calc(100% - 52px);
    padding: 0 8px;
    overflow-y: auto;
`;
