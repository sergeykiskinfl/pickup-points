import React, { memo }  from "react";

const Badge = ({ children }) => {
    return (
        <div className="badge">{ children }</div>
    )
}

export default memo(Badge);