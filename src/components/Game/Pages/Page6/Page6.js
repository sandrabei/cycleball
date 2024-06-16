import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SurveyQuestion from "./SurveyQuestion";
import survey from "../../../../survey.json";
import ReactPaginate from "react-paginate";
import "./Page6.css";

import backgroundMusic from "../../../../assets/music/background.wav";
import useAutoPlayAudio from "../../../../hooks/useAutoPlayAudio";

const audioElementId = "Page6-audio";

const ITEMS_PER_PAGE = 4;

const Page6 = ({ gameData, onFinish }) => {
  useAutoPlayAudio({ audioElementId });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [hasFinished, setHasFinished] = useState(false);

  const [responses, setResponses] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + ITEMS_PER_PAGE;
  const currentItems = survey.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(survey.length / ITEMS_PER_PAGE);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % survey.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setHasFinished(
      responses.filter((el) => typeof el === "number").length === survey.length
    );
  }, [responses]);

  return (
    <div className="Page6-container">
      <header className="Page6-header">
        感谢参与！请根据刚才的游戏回答以下问题：
      </header>

      <div className="Page6-survey-container">
        {currentItems.map((question, index) => {
          const surveyGlobalIndex = itemOffset + index;

          return (
            <SurveyQuestion
              key={question.question + surveyGlobalIndex}
              question={question}
              response={responses[surveyGlobalIndex]}
              onResponse={(response) => {
                setResponses((prevResponses) => {
                  const newResponses = [...prevResponses];
                  newResponses[surveyGlobalIndex] = response;
                  return newResponses;
                });
              }}
            />
          );
        })}
      </div>

      <div className="Page6-pagination-container">
        <ReactPaginate
          onPageChange={handlePageClick}
          pageCount={pageCount}
          nextLabel="下页 >"
          previousLabel="< 上页"
        />
      </div>

      <div className="Page6-button-container">
        <button
          className="Page6-button"
          disabled={!hasFinished}
          onClick={() => {
            responses.forEach((response, index) => {
              gameData.surveyResponses.push({ questionIndex: index, response });
            });

            setHasSubmitted(true);

            onFinish();
          }}
        >
          提交
        </button>
      </div>
      <audio autoPlay loop id={audioElementId}>
        <source src={backgroundMusic} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      <Modal className="App-modal" isOpen={hasSubmitted}>
        感谢您，请与工作人员联系
      </Modal>
    </div>
  );
};

export default Page6;
