/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useCallback } from "react";

import { Stack, FormControl, Input } from "@innodep/tms-react-ui";
import { Formik, Form, Field, FieldProps } from "formik";
import styled from "styled-components";
import * as Yup from "Yup";

import { StyledFormErrorMessage, StyledFormFieldWrap, StyledFormLabel, StyledMdButton } from "../../../../styles";
import { SearchCarNumberCondition } from "../SearchCarNumber";

/**
 * component interface 정의 영역
 */
interface SearchCarNumberFormProps {
    onSearch: (condition: SearchCarNumberCondition) => void;
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
        (values: SearchCarNumberFormValues) => {
            onSearch({
                car_num: values.car_num,
                full_num: true,
                start_date: `${values.start_date} ${values.start_time}`,
                end_date: `${values.end_date} ${values.end_time}`,
            });
        },
        [onSearch]
    );

    return (
        <StyledWrap>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <Stack flexDirection={"column"} gap={"16px"}>
                            <Field name={"car_num"}>
                                {({ field, meta }: FieldProps) => (
                                    <FormControl size={"md"} invalid={meta.touched && !!meta.error}>
                                        <StyledFormLabel htmlFor={field.name}>차량번호</StyledFormLabel>
                                        <StyledFormFieldWrap>
                                            <Input id={field.name} {...field} />
                                            <StyledFormErrorMessage>{meta.error}</StyledFormErrorMessage>
                                        </StyledFormFieldWrap>
                                    </FormControl>
                                )}
                            </Field>
                            <div>
                                <StyledFormLabel>시작날짜</StyledFormLabel>
                                <StyledFormFieldWrap>
                                    <Stack>
                                        <Field name={"start_date"}>
                                            {({ field, meta }: FieldProps) => (
                                                <FormControl
                                                    size={"md"}
                                                    invalid={meta.touched && !!meta.error}
                                                    style={{ width: "100%" }}
                                                >
                                                    <Input type={"date"} id={field.name} {...field} />
                                                    <StyledFormErrorMessage>{meta.error}</StyledFormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name={"start_time"}>
                                            {({ field, meta }: FieldProps) => (
                                                <FormControl
                                                    size={"md"}
                                                    invalid={meta.touched && !!meta.error}
                                                    style={{ width: "100%" }}
                                                >
                                                    <Input type={"time"} id={field.name} {...field} />
                                                    <StyledFormErrorMessage>{meta.error}</StyledFormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                </StyledFormFieldWrap>
                            </div>
                            <div>
                                <StyledFormLabel>종료날짜</StyledFormLabel>
                                <StyledFormFieldWrap>
                                    <Stack>
                                        <Field name={"end_date"}>
                                            {({ field, meta }: FieldProps) => (
                                                <FormControl
                                                    size={"md"}
                                                    invalid={meta.touched && !!meta.error}
                                                    style={{ width: "100%" }}
                                                >
                                                    <Input type={"date"} id={field.name} {...field} />
                                                    <StyledFormErrorMessage>{meta.error}</StyledFormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name={"end_time"}>
                                            {({ field, meta }: FieldProps) => (
                                                <FormControl
                                                    size={"md"}
                                                    invalid={meta.touched && !!meta.error}
                                                    style={{ width: "100%" }}
                                                >
                                                    <Input type={"time"} id={field.name} {...field} />
                                                    <StyledFormErrorMessage>{meta.error}</StyledFormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                </StyledFormFieldWrap>
                            </div>
                        </Stack>
                        <StyledButtonWrap>
                            <StyledMdButton size={"md"} type="submit">
                                검색
                            </StyledMdButton>
                        </StyledButtonWrap>
                    </Form>
                )}
            </Formik>
        </StyledWrap>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div`
    padding: 16px;
    height: 212px;
    border-bottom: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
const StyledButtonWrap = styled(Stack)`
    justify-content: flex-end;
    padding-top: 16px;
`;
