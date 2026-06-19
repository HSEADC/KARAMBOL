import React from 'react'

const ResultCard = ({ result, onClose }) => {
  if (!result) return null

  return (
    <div className="M_resultCard">
      <button
        className="A_quizBack"
        type="button"
        onClick={onClose}
        aria-label="Назад"
      >
        <img src="/images/arrowRight.svg" alt="" />
      </button>

      {result.image && (
        <div className="A_testImageContainer">
          <img
            src={result.image}
            alt={result.title}
            className="A_testQuestionImage"
          />
        </div>
      )}

      <h3 className="A_resultTitle">{result.title}</h3>
      <p className="A_resultDescription">{result.description}</p>

      <button
        className="A_button A_testIntroFinish"
        type="button"
        onClick={onClose}
      >
        <p>Супер</p>
      </button>
    </div>
  )
}

export default ResultCard
