import React, { useCallback, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import moment from "moment/moment";
import { AiOutlineLeft } from "react-icons/ai";
import { MdRoute } from "react-icons/md";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import {
    GetLprCountsByDeviceParams,
    GetLprCountsByDeviceResponse,
    GetLprCountsByDeviceResult,
} from "../../../../services/api/mockup/MockupInterface";
import {
    StyledIconButton,
    StyledListActionWrap,
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
import { Device, SearchCarNumberCondition } from "../SearchCarNumber";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberDetailProps {
    searchCarNumberCondition: SearchCarNumberCondition;
    selectedCarNumber: string;
    selectedDevice?: Device;
    selectDevice: (device: Device) => void;
    onBackButtonClick: () => void;
}

export const SearchCarNumberDetail = (props: SearchCarNumberDetailProps) => {
    const { searchCarNumberCondition, selectedCarNumber, selectedDevice, selectDevice, onBackButtonClick } = props;

    const history = useHistory();

    const [lprCountsByDevice, setLprCountsByDevice] = useState<GetLprCountsByDeviceResult[]>([]);

    /**
     * @name getLprCountsByDevice
     * @async
     * @function
     * @description 차번 통합 검색 상세
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
        const params: GetLprCountsByDeviceParams = {
            car_num: selectedCarNumber,
            full_num: true,
            start_date: searchCarNumberCondition.start_date,
            end_date: searchCarNumberCondition.end_date,
        };
        getLprCountsByDevice(params).then((getLprCountsByDeviceResponse) => {
            setLprCountsByDevice(getLprCountsByDeviceResponse.results.list);
        });
    }, [getLprCountsByDevice, searchCarNumberCondition, selectedCarNumber]);

    /**
     * @name handleListItemClick
     * @function
     * @description 목록 요소 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleListItemClick = useCallback(
        (count: GetLprCountsByDeviceResult) => {
            selectDevice({
                dev_name: count.dev_name,
                location: count.location,
                dev_serial: count.dev_serial,
            });
        },
        [selectDevice]
    );

    /**
     * @name handleRouteButtonClick
     * @function
     * @description 경로검색 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleRouteButtonClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>, count: GetLprCountsByDeviceResult) => {
            e.stopPropagation();
            history.push(`/search-path?recent_date=${count.recent_date}`);
        },
        [history]
    );

    return (
        <StyledWrap>
            <StyledHeader>
                <StyledIconButton size={"sm"} variant={"ghost"} onClick={onBackButtonClick}>
                    <AiOutlineLeft size="80%" />
                </StyledIconButton>
                <span>{selectedCarNumber}</span>
            </StyledHeader>
            <StyledList>
                <StyledListUl>
                    {lprCountsByDevice.map((lprCountByDevice, index) => (
                        <StyledListLi
                            key={index}
                            onClick={() => handleListItemClick(lprCountByDevice)}
                            active={lprCountByDevice.dev_serial === selectedDevice?.dev_serial}
                        >
                            <StyledListItem>
                                <StyledListImageWrap>
                                    <StyledListImage alt="image" src={lprCountByDevice.image1} />
                                </StyledListImageWrap>
                                <StyledListContentWrap>
                                    <StyledListContent>
                                        <StyledListContentLabelWrap>
                                            <StyledListContentLabel>장비명 : </StyledListContentLabel>
                                        </StyledListContentLabelWrap>
                                        <StyledListContentTextWrap>
                                            <StyledListContentText>{lprCountByDevice.dev_name}</StyledListContentText>
                                        </StyledListContentTextWrap>
                                        <StyledListContentLabelWrap>
                                            <StyledListContentLabel>위도/경도 : </StyledListContentLabel>
                                        </StyledListContentLabelWrap>
                                        <StyledListContentTextWrap>
                                            <StyledListContentText>
                                                {lprCountByDevice.location.latitude} /{" "}
                                                {lprCountByDevice.location.longitude}
                                            </StyledListContentText>
                                        </StyledListContentTextWrap>
                                        <StyledListContentLabelWrap>
                                            <StyledListContentLabel>최근발생일 : </StyledListContentLabel>
                                        </StyledListContentLabelWrap>
                                        <StyledListContentTextWrap>
                                            <StyledListContentText>
                                                {moment(lprCountByDevice.recent_date).format("YYYY-MM-DD HH:mm")}
                                            </StyledListContentText>
                                        </StyledListContentTextWrap>
                                        <StyledListContentLabelWrap>
                                            <StyledListContentLabel>총 발생 횟수 : </StyledListContentLabel>
                                        </StyledListContentLabelWrap>
                                        <StyledListContentTextWrap>
                                            <StyledListContentText>{lprCountByDevice.count}회</StyledListContentText>
                                        </StyledListContentTextWrap>
                                    </StyledListContent>
                                </StyledListContentWrap>
                                <StyledListActionWrap>
                                    <StyledIconButton
                                        size={"sm"}
                                        variant={"ghost"}
                                        title={"경로검색"}
                                        onClick={(e) => handleRouteButtonClick(e, lprCountByDevice)}
                                    >
                                        <MdRoute size="80%" />
                                    </StyledIconButton>
                                </StyledListActionWrap>
                            </StyledListItem>
                        </StyledListLi>
                    ))}
                </StyledListUl>
            </StyledList>
        </StyledWrap>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div`
    height: 100%;
`;
const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 14px 16px;
    background: ${({ theme }) => theme.contentHeaderBgColor};
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
const StyledList = styled.div`
    height: calc(100% - 53px);
    padding: 0 8px;
    overflow-y: auto;
`;
