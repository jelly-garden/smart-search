/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useMemo, useEffect } from "react";

import * as Yup from "Yup";

import { SearchCondition, SearchForm, SearchFormValues } from "../common/SearchForm";

/**
 * component interface 정의 영역
 */
interface SearchPathFormProps {
    newInitialValues?: SearchFormValues;
    onSearch: (condition: SearchCondition) => void;
}

export const SearchPathForm = (props: SearchPathFormProps) => {
    const { newInitialValues, onSearch } = props;

    const [initialValues, setInitialValues] = useState<SearchFormValues>({
        car_num: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
    });

    const validationSchema = useMemo(
        (): Yup.ObjectSchema<any> =>
            Yup.object({
                car_num: Yup.string()
                    .matches(/^\d{2,3}[가-힣]{1}\d{4}$/, "올바른 전체 차량번호를 입력하세요. (예: 12가1234)")
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
        (values: SearchFormValues) => {
            onSearch({
                car_num: values.car_num,
                start_date: `${values.start_date} ${values.start_time}`,
                end_date: `${values.end_date} ${values.end_time}`,
            });
        },
        [onSearch]
    );

    useEffect(() => {
        if (newInitialValues) {
            setInitialValues(newInitialValues);
        }
    }, [newInitialValues]);

    return <SearchForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} />;
};
