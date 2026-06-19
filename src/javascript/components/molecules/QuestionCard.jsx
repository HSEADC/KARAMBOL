import React from 'react'
import TestOptionButton from '../atoms/TestOptionButton'

const QuestionCard = ({
  question,
  onAnswerSelect,
  selectedAnswer,
  showResult
}) => {
  return (
    <div className="M_questionCard">
      <div className="W_questionContent">
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
