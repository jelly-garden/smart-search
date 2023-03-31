/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo } from "react";

import * as Yup from "Yup";

import { SearchForm, SearchFormValues } from "../common/SearchForm";

import { SearchPathCondition } from "./SearchPath";

/**
 * component interface 정의 영역
 */
interface SearchPathFormProps {
    onSearch: (condition: SearchPathCondition) => void;
}

export const SearchPathForm = (props: SearchPathFormProps) => {
    const { onSearch } = props;

    const initialValues = useMemo(
        (): SearchFormValues => ({
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
                car_num: Yup.string().required("필수 입력값입니다."),
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
        (values: SearchFormValues) => {
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
