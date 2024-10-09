import React from "react";
import RequestPanel from "./RequestPanel";
import ResponsePanel from "./ResponsePanel";
const Panel = () => {
  return <div className="flex mobile:flex-col pc:flex-row bg-lightgrey  flex-grow w-full mt-2">
    <RequestPanel />
    <ResponsePanel />

  </div>;
};

export default Panel;
