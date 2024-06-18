import React from "react";

const SurveyQuestion2 = ({ question, response, onResponse }) => {
  return (
    <div className="Page7-survey-question">
      <div className="Page7-survey-question-question">{question.question}</div>
      <div className="Page7-survey-question-answers">
        {question.options.map((option, index) => (
          <span
            key={option + index}
            className={
              response === index ? "Page7-survey-selected-response" : ""
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

export default SurveyQuestion2;
