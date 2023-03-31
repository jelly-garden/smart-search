/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useCallback } from "react";

import * as Yup from "Yup";

import { SearchCondition, SearchForm } from "../../common/SearchForm";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberFormProps {
    onSearch: (condition: SearchCondition) => void;
}

export interface SearchCarNumberFormValues {
    car_num: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
}

export const SearchCarNumberForm = (props: SearchCarNumberFormProps) => {
    const { onSearch } = props;

    // const initialValues = useMemo(
    //     (): SearchCarNumberFormValues => ({
    //         car_num: "",
    //         start_date: "",
    //         start_time: "",
    //         end_date: "",
    //         end_time: "",
    //     }),
    //     []
    // );
    const initialValues = useMemo(
        (): SearchCarNumberFormValues => ({
            car_num: "1234",
            start_date: "2023-03-20",
            start_time: "14:00",
            end_date: "2023-03-22",
            end_time: "16:51",
        }),
        []
    );

    const validationSchema = useMemo(
        (): Yup.ObjectSchema<any> =>
            Yup.object({
                car_num: Yup.string()
                    .matches(/^(\d{2,3}[가-힣]{1})?\d{4}$/, "올바른 차량번호를 입력하세요. (예: 12가1234, 1234)")
                    .required("필수 입력값입니다."),
                start_date: Yup.string().required("필수 입력값입니다."),
                start_time: Yup.string().required("필수 입력값입니다."),
                end_date: Yup.string().required("필수 입력값입니다."),
                end_time: Yup.string().required("필수 입력값입니다."),
            }),
        []
    );

    /**
     * @name handleSubmit
     * @function
     * @description 전송 이벤트 핸들러
     * @return {void}
     */
    const handleSubmit = useCallback(
        (values: SearchCarNumberFormValues) => {
            onSearch({
                car_num: values.car_num,
                start_date: `${values.start_date} ${values.start_time}`,
                end_date: `${values.end_date} ${values.end_time}`,
            });
        },
        [onSearch]
    );

    return <SearchForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} />;
};
