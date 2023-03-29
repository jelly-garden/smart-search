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
 * GetCountsByCarNumber API interface
 */
export interface GetCountsByCarNumberParams {
    car_num: string;
    full_num: boolean;
    start_date: string;
    end_date: string;
    start_pos: number;
    count: number;
}

export interface GetCountsByCarNumberResult {
    car_num: string;
    recent_date: string;
    count: number;
    srv_serial: number;
    dev_serial: number;
    dch_ch: number;
    image1: string;
}

export interface GetCountsByCarNumberResponse extends SuccessResponse {
    results: {
        list: GetCountsByCarNumberResult[];
    };
}

/**
 * GetDeviceLocations API interface
 */
export interface GetDeviceLocationsParams {
    car_num: string;
    full_num: boolean;
    start_date: string;
    end_date: string;
}

export interface GetDeviceLocationsResult {
    dev_name: string;
    location: {
        longitude: string;
        latitude: string;
    };
    dev_serial: number;
}

export interface GetDeviceLocationsResponse extends SuccessResponse {
    results: {
        list: GetDeviceLocationsResult[];
    };
}

/**
 * GetCountsByDevice API interface
 */
export interface GetCountsByDeviceParams {
    car_num: string;
    start_date: string;
    end_date: string;
}

export interface GetCountsByDeviceResult {
    dev_name: string;
    location: {
        longitude: string;
        latitude: string;
    };
    recent_date: string;
    count: number;
    srv_serial: number;
    dev_serial: number;
    dch_ch: number;
    image1: string;
}

export interface GetCountsByDeviceResponse extends SuccessResponse {
    results: {
        list: GetCountsByDeviceResult[];
    };
}

/**
 * GetLprDetails API interface
 */
export interface GetLprDetailsParams {
    car_num: string;
    dev_serial: number;
    start_date: string;
    end_date: string;
    sorting: "asc" | "desc";
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
