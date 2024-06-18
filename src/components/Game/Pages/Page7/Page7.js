import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SurveyQuestion from "./SurveyQuestion";
import survey from "../../../../survey2.json";
import ReactPaginate from "react-paginate";
import "./Page7.css";

import backgroundMusic from "../../../../assets/music/blank.wav";
import useAutoPlayAudio from "../../../../hooks/useAutoPlayAudio";

const audioElementId = "Page7-audio";

const ITEMS_PER_PAGE = 6;

const Page7 = ({ gameData, onFinish }) => {
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
    <div className="Page7-container">
      <header className="Page7-header">
        感谢参与！请根据刚才的游戏回答以下问题：
      </header>

      <div className="Page7-survey-container">
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

      <div className="Page7-pagination-container">
        <ReactPaginate
          onPageChange={handlePageClick}
          pageCount={pageCount}
          nextLabel="下页 >"
          previousLabel="< 上页"
        />
      </div>

      <div className="Page7-button-container">
        <button
          className="Page7-button"
          disabled={!hasFinished}
          onClick={() => {
            responses.forEach((response, index) => {
              gameData.survey2Responses.push({ questionIndex: index, response });
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

export default Page7;
