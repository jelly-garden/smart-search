/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useCallback } from "react";

import { Stack, FormControl, Input } from "@innodep/tms-react-ui";
import { Formik, Form, Field, FieldProps } from "formik";
import styled from "styled-components";
import * as Yup from "Yup";

import { StyledFormErrorMessage, StyledFormFieldWrap, StyledFormLabel, StyledMdButton } from "../../../styles";

import { SearchVehicleCondition } from "./SearchVehicle";

/**
 * component interface 정의 영역
 */
interface SearchVehicleFormProps {
    onSearch: (condition: SearchVehicleCondition) => void;
}

export interface SearchVehicleFormValues {
    차량번호: string;
    시작날짜: string;
    시작시간: string;
    종료날짜: string;
    종료시간: string;
}

export const SearchVehicleForm = (props: SearchVehicleFormProps) => {
    const { onSearch } = props;

    const initialValues = useMemo(
        (): SearchVehicleFormValues => ({
            차량번호: "1234",
            시작날짜: "2023-03-20",
            시작시간: "14:00",
            종료날짜: "2023-03-22",
            종료시간: "16:51",
        }),
        []
    );

    const validationSchema = useMemo(
        (): Yup.ObjectSchema<any> =>
            Yup.object({
                차량번호: Yup.string().required("필수 입력값입니다."),
                시작날짜: Yup.string().required("필수 입력값입니다."),
                시작시간: Yup.string().required("필수 입력값입니다."),
                종료날짜: Yup.string().required("필수 입력값입니다."),
                종료시간: Yup.string().required("필수 입력값입니다."),
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
        (values: SearchVehicleFormValues) => {
            console.log(values);
            onSearch({
                차량번호: values.차량번호,
                시작날짜: `${values.시작날짜} ${values.시작시간}`,
                종료날짜: `${values.종료날짜} ${values.종료시간}`,
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
                            <Field name={"차량번호"}>
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
                                        <Field name={"시작날짜"}>
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
                                        <Field name={"시작시간"}>
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
                                        <Field name={"종료날짜"}>
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
                                        <Field name={"종료시간"}>
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
