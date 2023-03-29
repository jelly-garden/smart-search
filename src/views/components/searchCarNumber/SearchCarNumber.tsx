import React, { useState, useCallback } from "react";

import { Stack } from "@innodep/tms-react-ui";
import styled from "styled-components";

import { SearchCarNumberDetail } from "./searchCarNumberDetail/SearchCarNumberDetail";
import { SearchCarNumberImages } from "./searchCarNumberDetail/SearchCarNumberImages";
import { SearchCarNumberForm } from "./searchCarNumberList/SearchCarNumberForm";
import { SearchCarNumberList } from "./searchCarNumberList/SearchCarNumberList";
import { SearchCarNumberResults } from "./searchCarNumberList/SearchCarNumberResults";
import { SearchCarNumberMap } from "./SearchCarNumberMap";

export interface SearchCarNumberCondition {
    car_num: string;
    full_num: boolean;
    start_date: string;
    end_date: string;
}

export const SearchCarNumber = () => {
    const [searchCarNumberCondition, setSearchCarNumberCondition] = useState<SearchCarNumberCondition>();
    const [selectedCarNumber, setSelectedCarNumber] = useState<string>();
    const [selectedDeviceSerial, setSelectedDeviceSerial] = useState<number>();

    const handleBackButtonClick = useCallback(() => {
        setSelectedCarNumber(undefined);
        setSelectedDeviceSerial(undefined);
    }, []);

    const handleCloseImagesButtonClick = useCallback(() => {
        setSelectedDeviceSerial(undefined);
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
                        selectDeviceSerial={setSelectedDeviceSerial}
                        onBackButtonClick={handleBackButtonClick}
                    />
                )}
            </StyledLeftWrap>
            <StyledRightWrap>
                <SearchCarNumberMap />
            </StyledRightWrap>
            {searchCarNumberCondition && selectedCarNumber && selectedDeviceSerial && (
                <SearchCarNumberImages
                    searchCarNumberCondition={searchCarNumberCondition}
                    selectedCarNumber={selectedCarNumber}
                    selectedDeviceSerial={selectedDeviceSerial}
                    onCloseImagesButtonClick={handleCloseImagesButtonClick}
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
