/**
 * 프로젝트 공용 HTTP 함수 정의
 */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const HTTP_REQUEST_TIMEOUT = 15000;

/**
 * @name buildParams
 * @function
 * @description parameter "," 단위로 변경하여 반환 하는 함수
 * @return {string}
 */
export const buildParams = (params: string[]): string => {
    return params.reduce((acc, item) => {
        return acc.length == 0 ? item : acc + "," + item;
    }, "");
};

/**
 * @name executeRequest
 * @async
 * @function
 * @description REST API 요청 실행 함수
 * @return {Promise<AxiosResponse | null>}
 */
export const executeRequest = async (path: string, config?: AxiosRequestConfig): Promise<AxiosResponse | null> => {
    try {
        return await axios(path, config);
    } catch (err) {
        const anyResult = err as AxiosError;
        if (anyResult && anyResult.response) {
            return anyResult.response;
        }
    }
    return null;
};
