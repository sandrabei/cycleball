import React from "react";
import "./Page3.css";
import GameBodyPage from "../Base/GameBodyPage/GameBodyPage";
import backgroundMusic from "../../../../assets/music/background.wav";

const audioElementId = "Page3-audio";

const TIME_LIMIT_SECONDS = 90;

const getNextTargetProbability = () => {
  return 0.5;
};

const Page3 = ({ setActivePageIndex, gameData }) => {
  return (
    <GameBodyPage
      gameStage={3}
      timeLimitSeconds={TIME_LIMIT_SECONDS}
      setActivePageIndex={setActivePageIndex}
      getNextTargetProbability={getNextTargetProbability}
      audioElementId={audioElementId}
      backgroundMusicPath={backgroundMusic}
      gameData={gameData}
    />
  );
};

export default Page3;
