import React from "react";

import styled from "styled-components";

import { GetLprCountsByDeviceResult } from "../../../services/api/mockup/MockupInterface";

import { Device } from "./SearchCarNumber";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberMapProps {
    lprCountsByDevice: GetLprCountsByDeviceResult[];
    selectedDevice?: Device;
}

export const SearchCarNumberMap = (props: SearchCarNumberMapProps) => {
    const { lprCountsByDevice, selectedDevice } = props;
    console.log("lprCountsByDevice: ", lprCountsByDevice);
    console.log("selectedDevice: ", selectedDevice);

    return <StyledWrap></StyledWrap>;
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div`
    background: #a1c2f6;
    width: 100%;
    height: 100%;
`;
