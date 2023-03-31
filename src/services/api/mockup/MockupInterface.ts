import { SORTING_CODE } from "../../interfaces";

/*******************************************************************************
 * common interface
 *******************************************************************************/
interface SuccessResponse {
    success: boolean;
    code: number;
    message: string;
}

export interface ErrorResponse {
    success: boolean;
    code: number;
    message: string;
    list: undefined;
}

/**
 * GetLprCounts API interface
 */
export interface GetLprCountsParams {
    car_num: string;
    full_num: boolean;
    start_date: string;
    end_date: string;
}

export interface GetLprCountsResult {
    car_num: string;
    recent_date: string;
    count: number;
    srv_serial: number;
    dev_serial: number;
    dch_ch: number;
    image1: string;
}

export interface GetLprCountsResponse extends SuccessResponse {
    results: {
        list: GetLprCountsResult[];
    };
}

/**
 * GetLprCountsByDevice API interface
 */
export interface GetLprCountsByDeviceParams {
    car_num: string;
    full_num: boolean;
    start_date: string;
    end_date: string;
}

export interface GetLprCountsByDeviceResult {
    dev_name: string;
    location: {
        longitude: string;
        latitude: string;
    };
    car_num: string;
    recent_date: string;
    count: number;
    srv_serial: number;
    dev_serial: number;
    dch_ch: number;
    image1: string;
}

export interface GetLprCountsByDeviceResponse extends SuccessResponse {
    results: {
        list: GetLprCountsByDeviceResult[];
    };
}

/**
 * GetLprDetails API interface
 */
export interface GetLprDetailsParams {
    car_num: string;
    dev_serial?: number;
    start_date: string;
    end_date: string;
    sorting: SORTING_CODE;
}

export interface GetLprDetailsResult {
    dev_name: string;
    location: {
        longitude: string;
        latitude: string;
    };
    date: string;
    srv_serial: number;
    dev_serial: number;
    dch_ch: number;
    image1: string;
}

export interface GetLprDetailsResponse extends SuccessResponse {
    results: {
        list: GetLprDetailsResult[];
    };
}

/**
 * GetDeviceImage API interface
 */
export interface GetDeviceImageParams {
    srv_serial: number;
    dev_serial: number;
    dch_ch: number;
    image1: string;
    image2: string;
    image3: string;
}

export interface GetDeviceImageResult {
    image1: string;
    image2: string;
    image3: string;
}

export interface GetDeviceImageResponse extends SuccessResponse {
    results: GetDeviceImageResult;
}
