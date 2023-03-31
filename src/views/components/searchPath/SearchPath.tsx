import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

export const SearchPath = () => {
    const history = useHistory();

    useEffect(() => {
        console.log(history.location);
        const recentDate = history.location.search.split("=")[1];
        console.log(recentDate);
    }, [history.location]);

    return <div>경로 검색...</div>;
};
