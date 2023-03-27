import React, { useCallback, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";

import { GetVehiclesResponse, GetVehiclesResult } from "../../../services/api/mockup/MockupInterface";

import { SearchVehicleCondition } from "./SearchVehicle";

/**
 * component interface 정의 영역
 */
interface SearchVehicleListProps {
    searchVehicleCondition?: SearchVehicleCondition;
    selectVehicle: (vehicle: GetVehiclesResult) => void;
}

export const SearchVehicleList = (props: SearchVehicleListProps) => {
    const { searchVehicleCondition, selectVehicle } = props;

    const [vehicles, setVehicles] = useState<GetVehiclesResult[]>([]);

    /**
     * @name getVehicles
     * @async
     * @function
     * @description 차번 통합 검색
     * @return {Promise<GetVehiclesResponse>}
     */
    const getVehicles = useCallback(async (): Promise<GetVehiclesResponse> => {
        const res = (await axios.get("/getVehicles.json")) as AxiosResponse;
        return new Promise((resolve, reject) => {
            if (res?.data.code === 200) {
                resolve(res.data as GetVehiclesResponse);
            } else {
                reject(res?.data.message);
            }
        });
    }, []);

    useEffect(() => {
        if (searchVehicleCondition) {
            console.log(searchVehicleCondition);
            getVehicles().then((getVehiclesResponse) => {
                console.log(getVehiclesResponse);
                setVehicles(getVehiclesResponse.response.results);
            });
        }
    }, [getVehicles, searchVehicleCondition]);

    return (
        <div>
            <ul>
                {vehicles.map((vehicle) => (
                    <li onClick={() => selectVehicle(vehicle)}>{vehicle.차량번호}</li>
                ))}
            </ul>
        </div>
    );
};
