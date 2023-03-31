import React, { useCallback, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

import {
    GetLprDetailsParams,
    GetLprDetailsResponse,
    GetLprDetailsResult,
} from "../../../../services/api/mockup/MockupInterface";
import { SORTING_DESC } from "../../../../services/interfaces";
import {
    StyledCard,
    StyledCardBody,
    StyledCardHeader,
    StyledCardImage,
    StyledCardLi,
    StyledCardUl,
    StyledIconButton,
} from "../../../../styles";
import { Device, SearchCarNumberCondition } from "../SearchCarNumber";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberThumbnailsProps {
    searchCarNumberCondition: SearchCarNumberCondition;
    selectedCarNumber: string;
    selectedDevice: Device;
    onCloseThumbnailsDrawerButtonClick: () => void;
}

export const SearchCarNumberThumbnails = (props: SearchCarNumberThumbnailsProps) => {
    const { searchCarNumberCondition, selectedCarNumber, selectedDevice, onCloseThumbnailsDrawerButtonClick } = props;

    const [lprDetails, setLprDetails] = useState<GetLprDetailsResult[]>([]);

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
    }, [
        getLprDetails,
        searchCarNumberCondition,
        searchCarNumberCondition.end_date,
        searchCarNumberCondition.start_date,
        selectedCarNumber,
        selectedDevice,
    ]);

    return (
        <StyledWrap>
            <StyledHeader>
                <span>{selectedDevice.dev_name}</span>
                <StyledIconButton size={"sm"} variant={"ghost"} onClick={onCloseThumbnailsDrawerButtonClick}>
                    <MdClose size="80%" />
                </StyledIconButton>
            </StyledHeader>
            <StyledList>
                <StyledCardUl>
                    {lprDetails.map((detail, index) => (
                        <StyledCardLi key={index} style={{ pointerEvents: "none" }}>
                            <StyledCard>
                                <StyledCardHeader>
                                    <span>{moment(detail.date).format("YYYY-MM-DD HH:mm")}</span>
                                </StyledCardHeader>
                                <StyledCardBody>
                                    <StyledCardImage alt="image" src={detail.image1}></StyledCardImage>
                                </StyledCardBody>
                            </StyledCard>
                        </StyledCardLi>
                    ))}
                </StyledCardUl>
            </StyledList>
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
const StyledList = styled.div`
    height: calc(100% - 53px);
    padding: 0 8px;
    overflow-y: auto;
`;
