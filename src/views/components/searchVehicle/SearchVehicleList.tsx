import React, { useCallback, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import styled from "styled-components";

import { GetVehiclesResponse, GetVehiclesResult } from "../../../services/api/mockup/MockupInterface";
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
} from "../../../styles/components/List.styles";

import { SearchVehicleCondition } from "./SearchVehicle";

/**
 * component interface 정의 영역
 */
interface SearchVehicleListProps {
    searchVehicleCondition?: SearchVehicleCondition;
    selectVehicle: (vehicle: GetVehiclesResult) => void;
}

export const SearchVehicleList = (props: SearchVehicleListProps) => {
    const { searchVehicleCondition, selectVehicle } = props;

    const [vehicles, setVehicles] = useState<GetVehiclesResult[]>([]);

    /**
     * @name getVehicles
     * @async
     * @function
     * @description 차번 통합 검색
     * @return {Promise<GetVehiclesResponse>}
     */
    const getVehicles = useCallback(async (): Promise<GetVehiclesResponse> => {
        const res = (await axios.get("/getVehicles.json")) as AxiosResponse;
        return new Promise((resolve, reject) => {
            if (res?.data.code === 200) {
                resolve(res.data as GetVehiclesResponse);
            } else {
                reject(res?.data.message);
            }
        });
    }, []);

    useEffect(() => {
        if (searchVehicleCondition) {
            console.log(searchVehicleCondition);
            getVehicles().then((getVehiclesResponse) => {
                console.log(getVehiclesResponse);
                setVehicles(getVehiclesResponse.response.results);
            });
        }
    }, [getVehicles, searchVehicleCondition]);

    return (
        <StyledWrap>
            <StyledUl>
                {vehicles.map((vehicle) => (
                    <StyledLi key={vehicle.차량번호} onClick={() => selectVehicle(vehicle)}>
                        <StyledItemWrap>
                            <StyledImageWrap>
                                <StyledImage alt="image" src={vehicle.thumbnail} />
                            </StyledImageWrap>
                            <StyledContentWrap>
                                <StyledContent>
                                    <StyledLabelWrap>
                                        <StyledLabel>차량번호</StyledLabel>
                                    </StyledLabelWrap>
                                    <StyledTextWrap>
                                        <StyledText>{vehicle.차량번호}</StyledText>
                                    </StyledTextWrap>
                                    <StyledLabelWrap>
                                        <StyledLabel>최근발생일</StyledLabel>
                                    </StyledLabelWrap>
                                    <StyledTextWrap>
                                        <StyledText>{vehicle.최근발생일}</StyledText>
                                    </StyledTextWrap>
                                    <StyledLabelWrap>
                                        <StyledLabel>총 발생 횟수</StyledLabel>
                                    </StyledLabelWrap>
                                    <StyledTextWrap>
                                        <StyledText>{vehicle.data_count}</StyledText>
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
`;
