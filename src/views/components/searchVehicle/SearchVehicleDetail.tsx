import React, { useCallback, useEffect } from "react";

import axios, { AxiosResponse } from "axios";

import { GetVehicleDetailResponse, GetVehiclesResult } from "../../../services/api/mockup/MockupInterface";

/**
 * component interface 정의 영역
 */
interface SearchVehicleDetailProps {
    selectedVehicle: GetVehiclesResult;
}

export const SearchVehicleDetail = (props: SearchVehicleDetailProps) => {
    const { selectedVehicle } = props;

    /**
     * @name getVehicleDetail
     * @async
     * @function
     * @description 차번 통합 검색 상세
     * @return {Promise<GetVehiclesResponse>}
     */
    const getVehicleDetail = useCallback(async (): Promise<GetVehicleDetailResponse> => {
        const res = (await axios.get("/getVehicleDetail.json")) as AxiosResponse;
        return new Promise((resolve, reject) => {
            if (res?.data.code === 200) {
                resolve(res.data as GetVehicleDetailResponse);
            } else {
                reject(res?.data.message);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedVehicle) {
            console.log(selectedVehicle);
            getVehicleDetail().then((getVehicleDetailResponse) => {
                console.log(getVehicleDetailResponse);
            });
        }
    }, [getVehicleDetail, selectedVehicle]);

    return <div></div>;
};
