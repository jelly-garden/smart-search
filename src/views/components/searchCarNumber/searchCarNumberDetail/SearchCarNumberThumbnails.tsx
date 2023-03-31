import React from "react";

import moment from "moment";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

import { GetLprDetailsResult } from "../../../../services/api/mockup/MockupInterface";
import {
    StyledCard,
    StyledCardBody,
    StyledCardHeader,
    StyledCardImage,
    StyledCardLi,
    StyledCardUl,
    StyledIconButton,
} from "../../../../styles";
import { Device } from "../SearchCarNumber";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberThumbnailsProps {
    lprDetails: GetLprDetailsResult[];
    selectedDevice: Device;
    onCloseDrawerButtonClick: () => void;
}

export const SearchCarNumberThumbnails = (props: SearchCarNumberThumbnailsProps) => {
    const { lprDetails, selectedDevice, onCloseDrawerButtonClick } = props;

    return (
        <StyledWrap>
            <StyledHeader>
                <span>{selectedDevice.dev_name}</span>
                <StyledIconButton size={"sm"} variant={"ghost"} onClick={onCloseDrawerButtonClick}>
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
