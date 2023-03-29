import { Button } from "@innodep/tms-react-ui";
import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
export const StyledSmButton = styled(Button)`
    min-width: 50px;
    padding: 0 8px;
`;
export const StyledMdButton = styled(Button)`
    min-width: 60px;
    padding: 0 16px;
`;
export const StyledIconButton = styled(Button)`
    padding: 0;
    color: ${({ theme }) => theme.iconButtonColor};
    &:hover,
    &:focus {
        color: ${({ theme }) => theme.iconButtonColor};
        background: ${({ theme }) => theme.iconButtonHoverBgColor};
    }
`;
