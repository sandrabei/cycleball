import React from "react";

const SurveyQuestion = ({ question, response, onResponse }) => {
  return (
    <div className="Page6-survey-question">
      <div className="Page6-survey-question-question">{question.question}</div>
      <div className="Page6-survey-question-answers">
        {question.options.map((option, index) => (
          <span
            key={option + index}
            className={
              response === index ? "Page6-survey-selected-response" : ""
            }
            onClick={() => {
              onResponse(index);
            }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SurveyQuestion;
