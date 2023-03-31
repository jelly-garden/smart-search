import React, { useState, useEffect } from "react";

import { Stack } from "@innodep/tms-react-ui";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { SearchPathLatestThumbnail } from "./searchPathDetail/SearchPathLatestThumbnail";
import { SearchPathThumbnails } from "./searchPathDetail/SearchPathThumbnails";
import { SearchPathForm } from "./SearchPathForm";
import { SearchPathMap } from "./SearchPathMap";

export interface SearchPathCondition {
    car_num: string;
    start_date: string;
    end_date: string;
}

export const SearchPath = () => {
    const history = useHistory();

    const [searchPathCondition, setSearchPathCondition] = useState<SearchPathCondition>();

    useEffect(() => {
        console.log(history.location);
        const recentDate = history.location.search.split("=")[1];
        console.log(recentDate);
    }, [history.location]);

    return (
        <StyledWrap gap={"0px"}>
            <StyledLeftWrap>
                <SearchPathForm onSearch={setSearchPathCondition} />
                {searchPathCondition && <SearchPathLatestThumbnail searchPathCondition={searchPathCondition} />}
            </StyledLeftWrap>
            <StyledRightWrap>
                <SearchPathMap />
                {searchPathCondition && <SearchPathThumbnails searchPathCondition={searchPathCondition} />}
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
    border-right: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
const StyledRightWrap = styled.div`
    position: relative;
    width: calc(100% - 500px);
`;
