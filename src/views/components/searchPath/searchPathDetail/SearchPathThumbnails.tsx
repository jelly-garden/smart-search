import React from "react";

import { GetLprDetailsResult } from "../../../../services/api/mockup/MockupInterface";

/**
 * component interface 정의 영역
 */
interface SearchPathThumbnailsProps {
    lprDetails: GetLprDetailsResult[];
}

export const SearchPathThumbnails = (props: SearchPathThumbnailsProps) => {
    const { lprDetails } = props;
    console.log(lprDetails);

    return <div></div>;
};
