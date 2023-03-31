import React from "react";

import { GetLprDetailsResult } from "../../../../services/api/mockup/MockupInterface";

/**
 * component interface 정의 영역
 */
interface SearchPathLatestThumbnailProps {
    latestLprDetail: GetLprDetailsResult;
}

export const SearchPathLatestThumbnail = (props: SearchPathLatestThumbnailProps) => {
    const { latestLprDetail } = props;
    console.log(latestLprDetail);

    return <div></div>;
};
