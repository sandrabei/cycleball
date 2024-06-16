import React from "react";
import "./PageContainer.css";
import Page1 from "./Pages/Page1/Page1";
import Page2 from "./Pages/Page2/Page2";
import Page3 from "./Pages/Page3/Page3";
import Page4 from "./Pages/Page4/Page4";
import Page5 from "./Pages/Page5/Page5";
import Page6 from "./Pages/Page6/Page6";

const pageList = [Page1, Page2, Page3, Page4, Page5, Page6];

const PageContainer = ({
  activePageIndex,
  setActivePageIndex,
  gameData,
  onFinish,
}) => {
  const ActivePage = pageList[activePageIndex];

  return (
    <div className="PageContainer">
      <ActivePage
        setActivePageIndex={setActivePageIndex}
        gameData={gameData}
        {...(activePageIndex === pageList.length - 1 ? { onFinish } : {})}
      />
    </div>
  );
};

export default PageContainer;
