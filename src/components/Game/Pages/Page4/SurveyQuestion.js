import React from "react";

const SurveyQuestion1 = ({ question, response, onResponse }) => {
  return (
    <div className="Page4-survey-question">
      <div className="Page4-survey-question-question">{question.question}</div>
      <div className="Page4-survey-question-answers">
        {question.options.map((option, index) => (
          <span
            key={option + index}
            className={
              response === index ? "Page4-survey-selected-response" : ""
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

export default SurveyQuestion1;
