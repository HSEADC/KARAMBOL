import React from 'react'
import TestOptionButton from '../atoms/TestOptionButton'

const toRoot = (p) =>
  !p || /^https?:\/\//.test(p) ? p : '/' + p.replace(/^\.?\/?/, '')

const QuestionCard = ({
  question,
  onAnswerSelect,
  selectedAnswer,
  showResult
}) => {
  return (
    <div className="M_questionCard">
      <div className="W_questionContent">
        {question.image && (
          <div className="A_testImageContainer">
            <img
              className="A_testQuestionImage"
              src={toRoot(question.image)}
              alt={question.question}
            />
          </div>
        )}

        <h3 className="A_questionText">{question.question}</h3>

        <div className="W_optionsGrid">
          {question.options.map((option) => (
            <TestOptionButton
              key={option.id}
              text={option.text}
              onClick={() => !showResult && onAnswerSelect(option.id)}
              isSelected={selectedAnswer === option.id}
              isCorrect={showResult && option.isCorrect}
              isWrong={
                showResult && selectedAnswer === option.id && !option.isCorrect
              }
              showResult={showResult}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
