/**
 * Global 스타일 관리 파일
 */
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset};
    ${normalize};
    * {
        box-sizing: border-box;
        font-family: "Noto Sans CJK KR";
        font-weight: 400;
        letter-spacing: -0.5px;
    }

    body {
        padding:0;
        margin:0;
        overflow: hidden;
    }

    h1 {
        font-size: 16px !important;
        font-weight: bold !important;
    }

    a {
        text-decoration: none;
    }

    form {
        width: 100%;
    }

    path:hover {
        fill: inherit !important;
    }
`;
