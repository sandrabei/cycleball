import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import strings from "../../../../../strings.json";
import "./GameBodyPage.css";
import useAutoPlayAudio from "../../../../../hooks/useAutoPlayAudio";

const AI_PLAYER_ACTION_DELAY_SECONDS = 1;

const MAX_PAUSES = 3;

const PAUSE_INTERVAL_SECONDS = 10;

const PAUSE_COOL_DOWN_SECONDS = 10 + PAUSE_INTERVAL_SECONDS;

const AUTOTOSS_INTERVAL_SECONDS = 5;

const REDIRECT_AFTER_GAME_DELAY_SECONDS = 3;

const PLAYER_INDEX = {
  HUMAN: 0,
  AI_1: 1,
  AI_2: 2,
};

const ballActivePlayerIndexClassNameMap = {
  [PLAYER_INDEX.HUMAN]: "GameBodyPage-ball-human",
  [PLAYER_INDEX.AI_1]: "GameBodyPage-ball-ai-1",
  [PLAYER_INDEX.AI_2]: "GameBodyPage-ball-ai-2",
};

Modal.setAppElement("#root");

const GameBodyPage = ({
  gameStage,
  timeLimitSeconds,
  setActivePageIndex,
  getNextTargetProbability,
  audioElementId,
  backgroundMusicPath,
  gameData,
}) => {
  useAutoPlayAudio({ audioElementId });

  const gameCountdownIntervalRef = useRef(null);
  const pauseCountdownTimeoutRef = useRef(null);
  const pauseCoolDownTimeoutRef = useRef(null);
  const passToAiTimeoutRef = useRef(null);
  const autotosstimeoutref = useRef(null);

  const [remainingTime, setRemainingTime] = useState(timeLimitSeconds);

  const [actionCounts, setActionCounts] = useState([0, 0, 0]);

  const [activePlayerIndex, setActivePlayerIndex] = useState(
    PLAYER_INDEX.HUMAN
  );

  const [pauseCount, setPauseCount] = useState(0);

  const [autotossref, setautotossref] = useState(true);

  const [isPaused, setIsPaused] = useState(false);

  const [isPauseCoolDown, setIsPauseCoolDown] = useState(false);

  
  const executeActionByAiPlayer = (activePlayerIndex) => {
    setActionCounts((prevActionCounts) => {
      const newActionCounts = [...prevActionCounts];
      newActionCounts[activePlayerIndex] += 1;
      return newActionCounts;
    });
    const targetBySign =
      Math.random() - getNextTargetProbability(remainingTime);
    if (targetBySign < 0) {
      passTohumanplayer();
    } else {
      passToAiPlayer(PLAYER_INDEX.AI_1 + PLAYER_INDEX.AI_2 - activePlayerIndex);
    }
  };


  const passToAiPlayer = (aiPlayerIndex) => {
    if (remainingTime <= 0) {
      return;
    }
    setActivePlayerIndex(aiPlayerIndex);

    passToAiTimeoutRef.current = setTimeout(() => {
      passToAiTimeoutRef.current = null;
      executeActionByAiPlayer(aiPlayerIndex);
    }, AI_PLAYER_ACTION_DELAY_SECONDS * 1000);
  };

  const passToAiPlayerByHuman = (aiPlayerIndex) => {
    setautotossref(false);
    console.log("bbbbbbbbb");
    console.log(autotossref);
    if (
      isPaused ||
      activePlayerIndex !== PLAYER_INDEX.HUMAN ||
      remainingTime <= 0
    ) {
      return;
    }
      setActionCounts((prevActionCounts) => {
      const newActionCounts = [...prevActionCounts];
      newActionCounts[PLAYER_INDEX.HUMAN] += 1;
      return newActionCounts;
    });
    passToAiPlayer(aiPlayerIndex);
  };

  const passTohumanplayer = () =>{
    setActivePlayerIndex(PLAYER_INDEX.HUMAN);
    console.log("cccccc");
    console.log(autotossref);
    autotosstimeoutref.current = setTimeout(() => {
      autotosstimeoutref.current = null;
      if (autotossref != false) {
        const uniformrandom = Math.round(Math.random())+1
        passToAiPlayerByHuman(uniformrandom);
        console.log("dddddddd");
        console.log(autotossref);
      }
    }, AUTOTOSS_INTERVAL_SECONDS * 1000);
  }

  const pause = () => {
    if (pauseCount >= MAX_PAUSES) {
      return;
    }

    setIsPaused(true);
    setIsPauseCoolDown(true);
    setPauseCount((prevPauseCount) => (prevPauseCount += 1));
    gameData.pauses.push({
      stage: gameStage,
      timeFromStart: timeLimitSeconds - remainingTime,
    });

    if (passToAiTimeoutRef.current) {
      clearTimeout(passToAiTimeoutRef.current);
      passToAiTimeoutRef.current = null;
    }

    pauseCountdownTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      pauseCountdownTimeoutRef.current = null;

      if (activePlayerIndex !== PLAYER_INDEX.HUMAN) {
        executeActionByAiPlayer(activePlayerIndex);
      } 
      
    }, PAUSE_INTERVAL_SECONDS * 1000);

    pauseCoolDownTimeoutRef.current = setTimeout(() => {
      setIsPauseCoolDown(false);
      pauseCoolDownTimeoutRef.current = null;
    }, PAUSE_COOL_DOWN_SECONDS * 1000);
  };

  useEffect(() => {
    if (gameCountdownIntervalRef.current) {
      return;
    }

    gameCountdownIntervalRef.current = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
    }, 1000);

    if (
      !gameData.gameBeginTimes.some(
        (timeRecord) => timeRecord.stage === gameStage
      )
    ) {
      gameData.gameBeginTimes.push({
        stage: gameStage,
        timestamp: Date.now(),
      });
    }
    return () => {
      if (passToAiTimeoutRef.current) {
        clearTimeout(passToAiTimeoutRef.current);
      }
      if (pauseCountdownTimeoutRef.current) {
        clearTimeout(pauseCountdownTimeoutRef.current);
      }
      if (pauseCoolDownTimeoutRef.current) {
        clearTimeout(pauseCoolDownTimeoutRef.current);
      }
      clearInterval(gameCountdownIntervalRef.current);
      gameCountdownIntervalRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (remainingTime % 60 === 59) {
      setPauseCount(0);
    }
  }, [remainingTime]);

  if (remainingTime <= 0) {
    if (gameCountdownIntervalRef.current) {
      gameData.actionCounts.push({
        stage: gameStage,
        humanActionCount: actionCounts[PLAYER_INDEX.HUMAN],
        aiPlayer1ActionCount: actionCounts[PLAYER_INDEX.AI_1],
        aiPlayer2ActionCount: actionCounts[PLAYER_INDEX.AI_2],
      });
    }

    clearInterval(gameCountdownIntervalRef.current);
    gameCountdownIntervalRef.current = null;

    if (passToAiTimeoutRef.current) {
      clearTimeout(passToAiTimeoutRef.current);
    }

    setTimeout(() => {
      setActivePageIndex(gameStage);
    }, REDIRECT_AFTER_GAME_DELAY_SECONDS * 1000);
  }
  
  return (
    <>
      <div
        className={`GameBodyPage-ball ${ballActivePlayerIndexClassNameMap[activePlayerIndex]}`}
      />
      <div className="GameBodyPage-container">
        <header className="GameBodyPage-header">
          <p className="GameBodyPage-header-text">
            还剩
            {Math.floor(remainingTime / 60)}分{remainingTime % 60}秒
            {isPaused && "（已暂停）"}
          </p>
        </header>

        <div className="GameBodyPage-top-row">
          <div className="GameBodyPage-player-box">

            <div
              className="GameBodyPage-ai-name-box"
              onClick={() => passToAiPlayerByHuman(PLAYER_INDEX.AI_1) }             
            >
              {strings["game.players.ai.1.name"]}
            </div>

            <div className="GameBodyPage-action-count-box">
              {actionCounts[PLAYER_INDEX.AI_1]}
            </div>

          </div>
          <div className="GameBodyPage-player-box">
            
            <div
              className="GameBodyPage-ai-name-box"
              onClick={() => passToAiPlayerByHuman(PLAYER_INDEX.AI_2)}
            >
              {strings["game.players.ai.2.name"]}
            </div>

            <div className="GameBodyPage-action-count-box">
              {actionCounts[PLAYER_INDEX.AI_2]}
            </div>

          </div>
        </div>

        <div className="GameBodyPage-bottom-row">
          <div className="GameBodyPage-player-box">
           
            <div className="GameBodyPage-action-count-box">
              {actionCounts[PLAYER_INDEX.HUMAN]}
            </div>

            <div className="GameBodyPage-human-name-box">
              {strings["game.players.human.name"]}
            </div>
            
          </div>
        </div>

        <div className="GameBodyPage-button-container">
          <button
            onClick={pause}
            disabled={
              isPauseCoolDown || remainingTime <= 0 || pauseCount >= MAX_PAUSES
            }
            className="GameBodyPage-pause-button"
          >
            暂停游戏
          </button>
        </div>

        <audio autoPlay loop id={audioElementId}>
          <source src={backgroundMusicPath} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>

        <Modal className="App-modal" isOpen={isPaused == 1}>
        暂停中
        </Modal>

        <Modal className="App-modal" isOpen={remainingTime <= 0}>
          游戏结束，请休息一下。{"\u3000\u3000\u3000\u3000\u3000\u3000"}                
          您的得分是:{actionCounts[PLAYER_INDEX.HUMAN]}  {"\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000"}           
          豆豆的得分是：{actionCounts[PLAYER_INDEX.AI_1]}  {"\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000"}                        
          乐乐的得分是：{actionCounts[PLAYER_INDEX.AI_2]}                                
          </Modal>
      </div>
    </>
  );
};

export default GameBodyPage;
