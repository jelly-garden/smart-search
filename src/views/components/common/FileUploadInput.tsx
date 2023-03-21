import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

import { Input } from "@innodep/tms-react-ui";
import { FieldMetaProps } from "formik/dist/types";
import { FaUpload } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

import { StyledFormErrorMessage } from "../../../styles";

/**
 * component interface 정의 영역
 */
interface FileUploadInputProps {
    meta: FieldMetaProps<File>;
    acceptFileFormats?: string[];
    placeholder: string;
    disabled?: boolean;
    readOnly?: boolean;
    onChange: (value: null | File) => void;
}

export const FileUploadInput = (props: FileUploadInputProps) => {
    const { meta, acceptFileFormats, placeholder, disabled, readOnly, onChange } = props;

    const fileRef = useRef<HTMLInputElement>(null);

    const [fileName, setFileName] = useState<string>("");

    /**
     * @private
     * @description [useEffect hooks] 기존 파일 정보를 필드에 표출
     */
    useEffect(() => {
        if (meta.initialValue) {
            setFileName(meta.initialValue.name);
        } else {
            setFileName("");
        }
    }, [meta.initialValue]);

    /**
     * @name handleUploadClick
     * @function
     * @description 업로드 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleUploadClick = useCallback((): void => {
        fileRef.current?.click();
    }, []);

    /**
     * @name handleResetButtonClick
     * @function
     * @description 초기화 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleResetButtonClick = useCallback((): void => {
        onChange(null);
        if (fileRef.current) {
            fileRef.current.value = "";
        }
        setFileName("");
    }, [onChange]);

    /**
     * @name handleFileInputChange
     * @function
     * @description 파일 데이터 변경 이벤트 핸들러
     * @param {ChangeEvent<HTMLInputElement>} e
     * @return {void}
     */
    const handleFileInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                onChange(file);
                setFileName(file.name);
            }
        },
        [onChange]
    );

    return (
        <>
            <div style={{ position: "relative" }}>
                <StyledInput placeholder={placeholder} value={fileName} disabled={disabled} readOnly />
                {!disabled && !readOnly && meta.value && (
                    <StyledCloseSvg size="17px" onClick={handleResetButtonClick} />
                )}
                {!disabled && !readOnly && <StyledUploadSvg size="12px" onClick={handleUploadClick} />}
                <input
                    type="file"
                    accept={acceptFileFormats?.toString()}
                    hidden={true}
                    ref={fileRef}
                    onChange={handleFileInputChange}
                />
            </div>
            <StyledFormErrorMessage>{meta.error}</StyledFormErrorMessage>
        </>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledInput = styled(Input)`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-right: 40px;
`;
const StyledUploadSvg = styled(FaUpload)`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translate(50%, -50%);
    cursor: pointer;
`;
const StyledCloseSvg = styled(MdClose)`
    position: absolute;
    right: 32px;
    top: 50%;
    transform: translate(50%, -50%);
    cursor: pointer;
`;
