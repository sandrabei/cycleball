import React, { useState } from "react";
import "./App.css";
import PageContainer from "./components/Game/PageContainer";
import survey1 from "./survey1.json";
import survey2 from "./survey2.json";

const gameData = {
  gameBeginTimes: [],
  toss:[],
  pauses: [],
  negpauses:[],
  actionCounts: [],
  survey1Responses: [],
  survey2Responses: [],
};

const sortByStage = (a, b) => a.stage - b.stage;

const submitGameData = () => {
  console.log(gameData);
  console.log(JSON.stringify(gameData));

  const pauseTimes = [];

  // Ensure producing one pause times array per game.
  gameData.gameBeginTimes.forEach((record) => (pauseTimes[record.stage] = []));

  gameData.pauses.forEach((record) => {
    pauseTimes[record.stage].push(record.timeFromStart);
  });

  gameData.negpauses.forEach((record) => {
    pauseTimes[record.stage].push(record.timeFromStart);
  });

  gameData.toss.forEach((record) => {
    pauseTimes[record.stage].push(record.timeFromStart);
  });

  const normalisedGameData = {
    game_begin_times: [...gameData.gameBeginTimes]
      .sort(sortByStage)
      .map((record) => record.timestamp),
    question1_answers: survey1.map((question, index) => ({
      idx: index,
      ...question,
    })),
    question2_answers: survey2.map((question, index) => ({
      idx: index,
      ...question,
    })),
    pause_times: Object.values(pauseTimes),
    game_result: [...gameData.actionCounts].sort(sortByStage).map((record) => ({
      humanActionCount: record.humanActionCount,
      aiPlayer1ActionCount: record.aiPlayer1ActionCount,
      aiPlayer2ActionCount: record.aiPlayer2ActionCount,
    })),
  };

  console.log(JSON.stringify(normalisedGameData));
  console.log(normalisedGameData);
};

const App = () => {
  const [activePageIndex, setActivePageIndex] = useState(0);

  return (
    <div className="App">
      <PageContainer
        activePageIndex={activePageIndex}
        setActivePageIndex={setActivePageIndex}
        gameData={gameData}
        onFinish={submitGameData}
      />
    </div>
  );
};

export default App;
