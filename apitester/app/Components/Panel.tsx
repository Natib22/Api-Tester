import React from "react";
import RequestPanel from "./RequestPanel";
import ResponsePanel from "./ResponsePanel";
const Panel = ({tabId}: {tabId : string}) => {
  return <div className="h-full flex mobile:flex-col pc:flex-row   flex-grow w-full mt-2 max-pc:gap-1">
    <RequestPanel  tabId={tabId}/>
    <ResponsePanel />

  </div>;
};

export default Panel;
