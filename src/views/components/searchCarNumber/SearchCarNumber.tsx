import React, { useState, useCallback } from "react";

import { Stack } from "@innodep/tms-react-ui";
import styled from "styled-components";

import { SearchCarNumberDetail } from "./searchCarNumberDetail/SearchCarNumberDetail";
import { SearchCarNumberThumbnails } from "./searchCarNumberDetail/SearchCarNumberThumbnails";
import { SearchCarNumberForm } from "./searchCarNumberList/SearchCarNumberForm";
import { SearchCarNumberList } from "./searchCarNumberList/SearchCarNumberList";
import { SearchCarNumberResults } from "./searchCarNumberList/SearchCarNumberResults";
import { SearchCarNumberMap } from "./SearchCarNumberMap";

export interface SearchCarNumberCondition {
    car_num: string;
    start_date: string;
    end_date: string;
}

export interface Device {
    dev_name: string;
    location: {
        longitude: string;
        latitude: string;
    };
    dev_serial: number;
}

export const SearchCarNumber = () => {
    const [searchCarNumberCondition, setSearchCarNumberCondition] = useState<SearchCarNumberCondition>();
    const [selectedCarNumber, setSelectedCarNumber] = useState<string>();
    const [selectedDevice, setSelectedDevice] = useState<Device>();

    /**
     * @name handleBackButtonClick
     * @function
     * @description 뒤로가기 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleBackButtonClick = useCallback(() => {
        setSelectedCarNumber(undefined);
        setSelectedDevice(undefined);
    }, []);

    /**
     * @name handleCloseThumbnailsDrawerButtonClick
     * @function
     * @description 썸네일 사이드바 닫기 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleCloseThumbnailsDrawerButtonClick = useCallback(() => {
        setSelectedDevice(undefined);
    }, []);

    return (
        <StyledWrap gap={"0px"}>
            <StyledLeftWrap>
                {!selectedCarNumber && (
                    <SearchCarNumberList>
                        <SearchCarNumberForm onSearch={setSearchCarNumberCondition} />
                        <SearchCarNumberResults
                            searchCarNumberCondition={searchCarNumberCondition}
                            selectCarNumber={setSelectedCarNumber}
                        />
                    </SearchCarNumberList>
                )}
                {searchCarNumberCondition && selectedCarNumber && (
                    <SearchCarNumberDetail
                        searchCarNumberCondition={searchCarNumberCondition}
                        selectedCarNumber={selectedCarNumber}
                        selectedDevice={selectedDevice}
                        selectDevice={setSelectedDevice}
                        onBackButtonClick={handleBackButtonClick}
                    />
                )}
            </StyledLeftWrap>
            <StyledRightWrap>
                <SearchCarNumberMap />
            </StyledRightWrap>
            {searchCarNumberCondition && selectedCarNumber && selectedDevice && (
                <SearchCarNumberThumbnails
                    searchCarNumberCondition={searchCarNumberCondition}
                    selectedCarNumber={selectedCarNumber}
                    selectedDevice={selectedDevice}
                    onCloseThumbnailsDrawerButtonClick={handleCloseThumbnailsDrawerButtonClick}
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
    width: 500px;
    border-right: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
const StyledRightWrap = styled.div`
    position: relative;
    width: calc(100% - 500px);
`;
