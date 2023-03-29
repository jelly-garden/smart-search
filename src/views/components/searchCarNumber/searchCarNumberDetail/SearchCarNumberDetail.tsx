import React, { useCallback, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { AiOutlineLeft } from "react-icons/ai";
import { MdRoute } from "react-icons/md";
import styled from "styled-components";

import {
    GetCountsByDeviceParams,
    GetCountsByDeviceResponse,
    GetCountsByDeviceResult,
} from "../../../../services/api/mockup/MockupInterface";
import {
    StyledIconButton,
    StyledActionWrap,
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
interface SearchCarNumberDetailProps {
    searchCarNumberCondition: SearchCarNumberCondition;
    selectedCarNumber: string;
    selectDeviceSerial: (dev_serial: number) => void;
    onBackButtonClick: () => void;
}

export const SearchCarNumberDetail = (props: SearchCarNumberDetailProps) => {
    const { searchCarNumberCondition, selectedCarNumber, selectDeviceSerial, onBackButtonClick } = props;

    const [countsByDevice, setCountsByDevice] = useState<GetCountsByDeviceResult[]>([]);

    /**
     * @name getCountsByDevice
     * @async
     * @function
     * @description 차번 통합 검색 상세
     * @return {Promise<GetCountsByDeviceResponse>}
     */
    const getCountsByDevice = useCallback(
        async (params: GetCountsByDeviceParams): Promise<GetCountsByDeviceResponse> => {
            console.log(params);
            const res = (await axios.get("/getCountsByDevice.json")) as AxiosResponse;
            return new Promise((resolve, reject) => {
                if (res?.data.code === 200) {
                    resolve(res.data as GetCountsByDeviceResponse);
                } else {
                    reject(res?.data.message);
                }
            });
        },
        []
    );

    useEffect(() => {
        const params: GetCountsByDeviceParams = {
            car_num: selectedCarNumber,
            start_date: searchCarNumberCondition.start_date,
            end_date: searchCarNumberCondition.end_date,
        };
        getCountsByDevice(params).then((getCountsByDeviceResponse) => {
            setCountsByDevice(getCountsByDeviceResponse.results.list);
        });
    }, [getCountsByDevice, searchCarNumberCondition, selectedCarNumber]);

    return (
        <StyledWrap>
            <StyledHeader>
                <StyledIconButton size={"sm"} variant={"ghost"} onClick={onBackButtonClick}>
                    <AiOutlineLeft size="80%" />
                </StyledIconButton>
                <StyledHeaderSpan>{selectedCarNumber}</StyledHeaderSpan>
            </StyledHeader>
            <StyledList>
                <StyledUl>
                    {countsByDevice.map((count, index) => (
                        <StyledLi key={index} onClick={() => selectDeviceSerial(count.dev_serial)}>
                            <StyledItemWrap>
                                <StyledImageWrap>
                                    <StyledImage alt="image" src={count.image1} />
                                </StyledImageWrap>
                                <StyledContentWrap>
                                    <StyledContent>
                                        <StyledLabelWrap>
                                            <StyledLabel>cctv 아이디</StyledLabel>
                                        </StyledLabelWrap>
                                        <StyledTextWrap>
                                            <StyledText>{count.dev_serial}</StyledText>
                                        </StyledTextWrap>
                                        <StyledLabelWrap>
                                            <StyledLabel>cctv 이름</StyledLabel>
                                        </StyledLabelWrap>
                                        <StyledTextWrap>
                                            <StyledText>{count.dev_name}</StyledText>
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
                                <StyledActionWrap>
                                    <StyledIconButton size={"sm"} variant={"ghost"} title={"경로검색"}>
                                        <MdRoute size="80%" />
                                    </StyledIconButton>
                                </StyledActionWrap>
                            </StyledItemWrap>
                        </StyledLi>
                    ))}
                </StyledUl>
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
    padding: 14px 16px;
    background: ${({ theme }) => theme.contentHeaderBgColor};
    font-weight: 600;
`;
const StyledHeaderSpan = styled.span`
    margin-left: 8px;
`;
const StyledList = styled.div`
    height: calc(100% - 52px);
    padding: 0 8px;
    overflow-y: auto;
`;
