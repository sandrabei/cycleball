import React from "react";
import "./Page4.css";
import RedirectPage from "../Base/RedirectPage/RedirectPage";
import backgroundMusic from "../../../../assets/music/background.wav";

const audioElementId = "Page4-audio";

const Page4 = ({ setActivePageIndex }) => {
  return (
    <RedirectPage
      gameStage={4}
      setActivePageIndex={setActivePageIndex}
      audioElementId={audioElementId}
      backgroundMusicPath={backgroundMusic}
      headerTextKey="game.page4.guide_text"
    />
  );
};

export default Page4;
