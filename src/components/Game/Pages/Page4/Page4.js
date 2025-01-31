import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SurveyQuestion from "./SurveyQuestion";
import survey from "../../../../survey1.json";
import ReactPaginate from "react-paginate";
import "./Page4.css";

import backgroundMusic from "../../../../assets/music/blank.wav";
import useAutoPlayAudio from "../../../../hooks/useAutoPlayAudio";

const audioElementId = "Page4-audio";

const ITEMS_PER_PAGE = 6;

const REDIRECT_AFTER_GAME_DELAY_SECONDS = 3;

const Page4 = ({ gameData, setActivePageIndex, }) => {
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

  
  if (hasSubmitted){
    setTimeout(() => {
      setActivePageIndex(4);
    }, REDIRECT_AFTER_GAME_DELAY_SECONDS * 1000);
  }

  return (
    <div className="Page4-container">
      <header className="Page4-header">
        感谢参与！请根据刚才的游戏回答以下问题：
      </header>

      <div className="Page4-survey-container">
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

      <div className="Page4-pagination-container">
        <ReactPaginate
          onPageChange={handlePageClick}
          pageCount={pageCount}
          nextLabel="下页 >"
          previousLabel="< 上页"
        />
      </div>

      <div className="Page4-button-container">
        <button
          className="Page4-button"
          disabled={!hasFinished}
          onClick={() => {
            responses.forEach((response, index) => {
              gameData.survey1Responses.push({ questionIndex: index, response });
            });

            setHasSubmitted(true);
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
        辛苦啦！请休息一下，{"\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000"}
        第二轮游戏马上开始。
      </Modal>
    </div>
  );
};

export default Page4;
