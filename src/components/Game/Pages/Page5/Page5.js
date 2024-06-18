import React from "react";
import "./Page5.css";
import RedirectPage from "../Base/RedirectPage/RedirectPage";
import backgroundMusic from "../../../../assets/music/blank.wav";

const audioElementId = "Page5-audio";

const Page5 = ({ setActivePageIndex }) => {
  return (
    <RedirectPage
      gameStage={5}
      setActivePageIndex={setActivePageIndex}
      audioElementId={audioElementId}
      backgroundMusicPath={backgroundMusic}
      headerTextKey="game.page4.guide_text"
    />
  );
};

export default Page5;
