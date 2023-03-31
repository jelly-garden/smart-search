/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { FormControl, Input, Stack } from "@innodep/tms-react-ui";
import { Field, FieldProps, Form, Formik } from "formik";
import styled from "styled-components";
import * as Yup from "Yup";

import { StyledFormErrorMessage, StyledFormFieldWrap, StyledFormLabel, StyledMdButton } from "../../../styles";

/**
 * component interface 정의 영역
 */
interface SearchFormProps {
    initialValues: SearchFormValues;
    validationSchema: Yup.ObjectSchema<any>;
    onSubmit: (values: SearchFormValues) => void;
}

export interface SearchFormValues {
    car_num: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
}

export const SearchForm = (props: SearchFormProps) => {
    const { initialValues, validationSchema, onSubmit } = props;

    return (
        <StyledWrap>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
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
