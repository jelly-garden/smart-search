import styled from "styled-components";

export const StyledUl = styled.ul`
    padding: 8px 0;
`;
export const StyledLi = styled.li`
    padding: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.contentHoverColor};
    }
`;
export const StyledItemWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
export const StyledImageWrap = styled.div`
    flex-shrink: 0;
    width: 150px;
    background: ${({ theme }) => theme.imageBgColor};
`;
export const StyledImage = styled.img`
    width: 100%;
    height: 100%;
`;
export const StyledContentWrap = styled.div`
    flex: 1 1 auto;
    min-width: 0;
    margin-left: 8px;
    margin-bottom: 8px;
`;
export const StyledContent = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
`;
export const StyledLabelWrap = styled.div`
    padding: 8px 0 0 8px;
    flex-basis: 40%;
    flex-grow: 0;
    max-width: 40%;
`;
export const StyledLabel = styled.p`
    font-size: 14px;
    line-height: 22px;
`;
export const StyledTextWrap = styled.div`
    padding: 8px 0 0 8px;
    flex-basis: 60%;
    flex-grow: 0;
    max-width: 60%;
`;
export const StyledText = styled.p`
    font-size: 14px;
    line-height: 22px;
`;
export const StyledActionWrap = styled.div`
    align-self: flex-start;
    margin: 8px 0 0 8px;
    position: relative;
    right: auto;
    top: auto;
    transform: none;
`;
