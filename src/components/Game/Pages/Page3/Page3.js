import React from "react";
import "./Page3.css";
import GameBodyPage2 from "../Base/GameBodyPage2/GameBodyPage2";
import backgroundMusic from "../../../../assets/music/blank.wav";

const audioElementId = "Page3-audio";

const TIME_LIMIT_SECONDS = 2;

const getNextTargetProbability = () => {
  return 0.2;
};

const Page3 = ({ setActivePageIndex, gameData }) => {
  return (
    <GameBodyPage2
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
