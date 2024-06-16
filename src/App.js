import React, { useState } from "react";
import "./App.css";
import PageContainer from "./components/Game/PageContainer";
import survey from "./survey.json";

const gameData = {
  gameBeginTimes: [],
  pauses: [],
  actionCounts: [],
  surveyResponses: [],
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

  const normalisedGameData = {
    game_begin_times: [...gameData.gameBeginTimes]
      .sort(sortByStage)
      .map((record) => record.timestamp),
    question_answers: survey.map((question, index) => ({
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
