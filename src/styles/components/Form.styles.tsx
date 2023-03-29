import { FormErrorMessage, FormLabel } from "@innodep/tms-react-ui";
import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
export const StyledFormLabel = styled(FormLabel)`
    display: inline-block;
    width: 60px;
    line-height: 32px;
    vertical-align: top;
    margin: 0 !important;
    font-size: 14px;
`;
export const StyledFormFieldWrap = styled.div`
    display: inline-block;
    width: calc(100% - 68px);
    line-height: 32px;
    vertical-align: top;
    margin-left: 8px;
    justify-content: space-between;
`;
export const StyledFormErrorMessage = styled(FormErrorMessage)`
    margin-top: 0;
    margin-bottom: -16px;
    font-size: 10px;
    line-height: 16px;
`;
export const StyledFormTextareaErrorMessage = styled(StyledFormErrorMessage)`
    margin-top: -2px !important;
`;
