import React from "react";
import "./Page6.css";
import GameBodyPage from "../Base/GameBodyPage/GameBodyPage";
import backgroundMusic from "../../../../assets/music/blank.wav";

const audioElementId = "Page6-audio";

const TIME_LIMIT_SECONDS = 9;

// 返回的概率为电脑玩家传给人类玩家的概率
const getNextTargetProbability = (remainingTime) => {
  const currentTime = TIME_LIMIT_SECONDS - remainingTime;

  return 0.2;
};

const Page6 = ({ setActivePageIndex, gameData }) => {
  return (
    <GameBodyPage
      gameStage={6}
      timeLimitSeconds={TIME_LIMIT_SECONDS}
      setActivePageIndex={setActivePageIndex}
      getNextTargetProbability={getNextTargetProbability}
      audioElementId={audioElementId}
      backgroundMusicPath={backgroundMusic}
      gameData={gameData}
    />
  );
};

export default Page6;
