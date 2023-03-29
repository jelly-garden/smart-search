import React, { useCallback, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { AiOutlineLeft } from "react-icons/ai";
import { MdRoute } from "react-icons/md";
import styled from "styled-components";

import {
    GetVehicleDetailResponse,
    GetVehicleDetailResult,
    GetVehiclesResult,
} from "../../../services/api/mockup/MockupInterface";
import { StyledIconButton } from "../../../styles";
import {
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
} from "../../../styles/components/List.styles";

/**
 * component interface 정의 영역
 */
interface SearchVehicleDetailProps {
    selectedVehicle: GetVehiclesResult;
    resetSelectedVehicle: () => void;
}

export const SearchVehicleDetail = (props: SearchVehicleDetailProps) => {
    const { selectedVehicle, resetSelectedVehicle } = props;

    const [vehicleDetail, setVehicleDetail] = useState<GetVehicleDetailResult[]>([]);

    /**
     * @name getVehicleDetail
     * @async
     * @function
     * @description 차번 통합 검색 상세
     * @return {Promise<GetVehiclesResponse>}
     */
    const getVehicleDetail = useCallback(async (): Promise<GetVehicleDetailResponse> => {
        const res = (await axios.get("/getVehicleDetail.json")) as AxiosResponse;
        return new Promise((resolve, reject) => {
            if (res?.data.code === 200) {
                resolve(res.data as GetVehicleDetailResponse);
            } else {
                reject(res?.data.message);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedVehicle) {
            console.log(selectedVehicle);
            getVehicleDetail().then((getVehicleDetailResponse) => {
                console.log(getVehicleDetailResponse);
                setVehicleDetail(getVehicleDetailResponse.response.results);
            });
        }
    }, [getVehicleDetail, selectedVehicle]);

    return (
        <>
            <StyledHeader>
                <StyledIconButton size={"sm"} variant={"ghost"} onClick={resetSelectedVehicle}>
                    <AiOutlineLeft size="80%" />
                </StyledIconButton>
                {/*<StyledHeaderSvg size={"20px"} onClick={resetSelectedVehicle} />*/}
                <StyledHeaderSpan>{selectedVehicle.차량번호}</StyledHeaderSpan>
            </StyledHeader>
            <StyledWrap>
                <StyledUl>
                    {vehicleDetail.map((item) => (
                        <StyledLi key={item["cctv 아이디"]}>
                            <StyledItemWrap>
                                <StyledImageWrap>
                                    <StyledImage alt="image" src={item.thumbnail} />
                                </StyledImageWrap>
                                <StyledContentWrap>
                                    <StyledContent>
                                        <StyledLabelWrap>
                                            <StyledLabel>cctv 아이디</StyledLabel>
                                        </StyledLabelWrap>
                                        <StyledTextWrap>
                                            <StyledText>{item["cctv 아이디"]}</StyledText>
                                        </StyledTextWrap>
                                        <StyledLabelWrap>
                                            <StyledLabel>cctv 이름</StyledLabel>
                                        </StyledLabelWrap>
                                        <StyledTextWrap>
                                            <StyledText>{item["cctv 이름"]}</StyledText>
                                        </StyledTextWrap>
                                        <StyledLabelWrap>
                                            <StyledLabel>최근발생일</StyledLabel>
                                        </StyledLabelWrap>
                                        <StyledTextWrap>
                                            <StyledText>{item.최근발생일}</StyledText>
                                        </StyledTextWrap>
                                        <StyledLabelWrap>
                                            <StyledLabel>총 발생 횟수</StyledLabel>
                                        </StyledLabelWrap>
                                        <StyledTextWrap>
                                            <StyledText>{item["총 발생횟수"]}</StyledText>
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
            </StyledWrap>
        </>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div`
    height: calc(100% - 212px);
    padding: 0 8px;
`;
const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    background: ${({ theme }) => theme.contentHeaderBgColor};
    font-weight: 600;
`;
const StyledHeaderSpan = styled.span`
    margin-left: 8px;
`;
