import styled, { css } from "styled-components";

export const StyledListUl = styled.ul`
    padding: 8px 0;
`;
export const StyledListLi = styled.li<{ active?: boolean }>`
    padding: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.contentHoverColor};
    }
    ${(props) =>
        props.active &&
        css`
            background: ${({ theme }) => theme.contentHoverColor};
        `}
`;
export const StyledListItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
export const StyledListImageWrap = styled.div`
    flex-shrink: 0;
    width: 150px;
    min-height: 84px;
    display: flex;
`;
export const StyledListImage = styled.img`
    width: 100%;
`;
export const StyledListContentWrap = styled.div`
    flex: 1 1 auto;
    min-width: 0;
    margin-left: 8px;
    margin-bottom: 8px;
`;
export const StyledListContent = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
`;
export const StyledListContentLabelWrap = styled.div`
    padding: 8px 0 0 8px;
    flex-basis: 40%;
    flex-grow: 0;
    max-width: 40%;
`;
export const StyledListContentLabel = styled.p`
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.labelColor};
`;
export const StyledListContentTextWrap = styled.div`
    padding: 8px 0 0 8px;
    flex-basis: 60%;
    flex-grow: 0;
    max-width: 60%;
`;
export const StyledListContentText = styled.p`
    font-size: 14px;
    line-height: 22px;
`;
export const StyledListActionWrap = styled.div`
    align-self: flex-start;
    margin: 8px 0 0 8px;
    position: relative;
    right: auto;
    top: auto;
    transform: none;
`;
