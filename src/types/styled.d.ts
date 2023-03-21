/**
 * styled-components 테마 처리 관련 definition type 정의 파일
 */
import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        contentColor: string;
        contentBgColor: string;
        contentBorderColor: string;
        proSideBarColor: string;
        proSideBarActiveColor: string;
        proSideBarBgColor: string;
        proSideBarBorderColor: string;
        tableColor: string;
        tableHeaderBgColor: string;
        tableRowOddBgColor: string;
        tableRowEvenBgColor: string;
        layoutHeaderColor: string;
        layoutHeaderBgColor: string;
        layoutHeaderBorderColor: string;
        buttonColor: string;
        buttonBgColor: string;
        buttonBorderColor: string;
        buttonHoverColor: string;
        inputColor: string;
        inputBgColor: string;
        inputBorderColor: string;
        uploadImageBorder: string;
        disabledTextBgColor: string;
    }
}
