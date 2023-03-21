/**
 * 환경변수 definition type 정의 파일
 */
declare namespace NodeJS {
    export interface ProcessEnv {
        REACT_APP_TITLE: string;
        REACT_APP_URL: string;
        REACT_APP_PORT: string;
        REACT_APP_HEADER: string;
        REACT_APP_SIDE_BAR: string;
        REACT_APP_SIDE_BAR_HEADER: string;
        REACT_APP_SIDE_BAR_FOOTER: string;
        REACT_APP_COLLAPSED: string;
        REACT_APP_TRANSLATE: string;
        REACT_APP_USER_PROFILE: string;
        REACT_APP_CURRENT_DATE: string;
        REACT_APP_THEME: string;
    }
}
