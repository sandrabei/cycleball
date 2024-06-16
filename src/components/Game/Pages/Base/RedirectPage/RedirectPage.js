import React, { useState, useEffect, useRef } from "react";
import strings from "../../../../../strings.json";
import "./RedirectPage.css";
import useAutoPlayAudio from "../../../../../hooks/useAutoPlayAudio";

const COUNTDOWN_SECONDS = 3;

const RedirectPage = ({
  gameStage,
  setActivePageIndex,
  audioElementId,
  backgroundMusicPath,
  headerTextKey,
}) => {
  useAutoPlayAudio({ audioElementId });

  const intervalRef = useRef(null);

  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (intervalRef.current) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setActivePageIndex(gameStage);
    }
  }, [setActivePageIndex, gameStage, countdown]);

  return (
    <div className="RedirectPage-container">
      <header className="RedirectPage-header">{strings[headerTextKey]}</header>
      <div className="RedirectPage-countdown">{countdown}</div>
      <audio autoPlay loop id={audioElementId}>
        <source src={backgroundMusicPath} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default RedirectPage;
