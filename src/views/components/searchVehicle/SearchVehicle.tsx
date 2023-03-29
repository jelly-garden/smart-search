import React, { useState } from "react";

import { Stack } from "@innodep/tms-react-ui";
import styled from "styled-components";

import { GetVehiclesResult } from "../../../services/api/mockup/MockupInterface";

import { SearchVehicleDetail } from "./SearchVehicleDetail";
import { SearchVehicleForm } from "./SearchVehicleForm";
import { SearchVehicleList } from "./SearchVehicleList";
import { SearchVehicleMap } from "./SearchVehicleMap";

export interface SearchVehicleCondition {
    차량번호: string;
    시작날짜: string;
    종료날짜: string;
}

export const SearchVehicle = () => {
    const [searchVehicleCondition, setSearchVehicleCondition] = useState<SearchVehicleCondition>();
    const [selectedVehicle, setSelectedVehicle] = useState<GetVehiclesResult>();

    return (
        <StyledWrap gap={"0px"}>
            <StyledLeftWrap>
                {!selectedVehicle && (
                    <>
                        <SearchVehicleForm onSearch={setSearchVehicleCondition} />
                        <SearchVehicleList
                            searchVehicleCondition={searchVehicleCondition}
                            selectVehicle={setSelectedVehicle}
                        />
                    </>
                )}
                {selectedVehicle && (
                    <SearchVehicleDetail
                        selectedVehicle={selectedVehicle}
                        resetSelectedVehicle={() => setSelectedVehicle(undefined)}
                    />
                )}
            </StyledLeftWrap>
            <StyledRightWrap>
                <SearchVehicleMap />
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
`;
const StyledRightWrap = styled.div`
    position: relative;
    width: calc(100% - 500px);
`;
