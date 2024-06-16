import React from "react";
import "./Page5.css";
import GameBodyPage from "../Base/GameBodyPage/GameBodyPage";
import backgroundMusic from "../../../../assets/music/blank.wav";

const audioElementId = "Page5-audio";

const TIME_LIMIT_SECONDS = 90;

// 返回的概率为电脑玩家传给人类玩家的概率
const getNextTargetProbability = (remainingTime) => {
  const currentTime = TIME_LIMIT_SECONDS - remainingTime;

  return 0.2;
};

const Page5 = ({ setActivePageIndex, gameData }) => {
  return (
    <GameBodyPage
      gameStage={5}
      timeLimitSeconds={TIME_LIMIT_SECONDS}
      setActivePageIndex={setActivePageIndex}
      getNextTargetProbability={getNextTargetProbability}
      audioElementId={audioElementId}
      backgroundMusicPath={backgroundMusic}
      gameData={gameData}
    />
  );
};

export default Page5;
