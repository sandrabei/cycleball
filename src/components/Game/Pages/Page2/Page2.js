import React from "react";
import "./Page2.css";
import RedirectPage from "../Base/RedirectPage/RedirectPage";
import backgroundMusic from "../../../../assets/music/background.wav";

const audioElementId = "Page2-audio";

const Page2 = ({ setActivePageIndex }) => {
  return (
    <RedirectPage
      gameStage={2}
      setActivePageIndex={setActivePageIndex}
      audioElementId={audioElementId}
      backgroundMusicPath={backgroundMusic}
      headerTextKey="game.page2.guide_text"
    />
  );
};

export default Page2;
