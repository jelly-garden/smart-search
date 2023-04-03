import React from "react";

import moment from "moment";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

import { GetLprDetailsResult } from "../../../../services/api/mockup/MockupInterface";
import {
    StyledCard,
    StyledCardContent,
    StyledCardHeader,
    StyledCardContentImage,
    StyledIconButton,
    StyledVerticalListLi,
    StyledVerticalListUl,
    StyledVerticalListWrap,
} from "../../../../styles";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberThumbnailsProps {
    deviceName: string;
    lprDetails: GetLprDetailsResult[];

    onCloseDrawerButtonClick: () => void;
}

export const SearchCarNumberThumbnails = (props: SearchCarNumberThumbnailsProps) => {
    const { deviceName, lprDetails, onCloseDrawerButtonClick } = props;

    return (
        <StyledWrap>
            <StyledHeader>
                <span>{deviceName}</span>
                <StyledIconButton size={"sm"} variant={"ghost"} onClick={onCloseDrawerButtonClick}>
                    <MdClose size="80%" />
                </StyledIconButton>
            </StyledHeader>
            <StyledContent>
                <StyledCarNumberThumbnailsListUl>
                    {lprDetails.map((detail, index) => (
                        <StyledCarNumberThumbnailsListLi key={index}>
                            <StyledCard>
                                <StyledCardHeader>
                                    <span>{moment(detail.date).format("YYYY-MM-DD HH:mm")}</span>
                                </StyledCardHeader>
                                <StyledCardContent>
                                    <StyledCardContentImage alt="image" src={detail.image1}></StyledCardContentImage>
                                </StyledCardContent>
                            </StyledCard>
                        </StyledCarNumberThumbnailsListLi>
                    ))}
                </StyledCarNumberThumbnailsListUl>
            </StyledContent>
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
const StyledContent = styled(StyledVerticalListWrap)`
    height: calc(100% - 53px);
`;
const StyledCarNumberThumbnailsListUl = styled(StyledVerticalListUl)``;
const StyledCarNumberThumbnailsListLi = styled(StyledVerticalListLi)`
    padding: 0;
    margin-bottom: 8px;
    border: none;
    cursor: default;
    &:hover {
        background: inherit;
    }
`;
