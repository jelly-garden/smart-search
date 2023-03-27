/*******************************************************************************
 * common interface
 *******************************************************************************/
interface SuccessResponse {
    code: number;
    message: string;
    responseTime: string;
}

export interface ErrorResponse {
    code: number;
    message: string;
    responseTime: string;
    response: undefined;
}

/**
 * GetVehicles API interface
 */
export interface GetVehiclesResult {
    thumbnail: string;
    차량번호: string;
    최근발생일: string;
    data_count: number;
}

export interface GetVehiclesResponse extends SuccessResponse {
    response: {
        results: GetVehiclesResult[];
    };
}

/**
 * GetVehicles API interface
 */
export interface GetVehicleDetailResult {
    thumbnail: string;
    "cctv 아이디": string;
    "cctv 이름": string;
    최근발생일: string;
    "총 발생횟수": number;
    coordinates: number[];
}

export interface GetVehicleDetailResponse extends SuccessResponse {
    response: {
        results: GetVehicleDetailResult[];
    };
}

/**
 * GetVehicles API interface
 */
export interface GetVehicleDetailThumbnailsResult {
    thumbnail: string;
    "cctv 아이디": string;
    "cctv 이름": string;
    발생일: string;
    coordinates: number[];
}

export interface GetVehicleDetailThumbnailsResponse extends SuccessResponse {
    response: {
        results: GetVehicleDetailThumbnailsResult[];
    };
}
