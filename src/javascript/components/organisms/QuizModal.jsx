import React, { useState, useEffect } from 'react'
import QuestionCard from '../molecules/QuestionCard'
import ResultCard from '../molecules/ResultCard'

// Внутренние пути делаем корне-абсолютными, чтобы обложка теста грузилась
// независимо от того, с какой страницы открыт тест.
const toRoot = (p) =>
  !p || /^https?:\/\//.test(p) ? p : '/' + p.replace(/^\.?\/?/, '')

const QuizModal = ({ isOpen, onClose, testData }) => {
  const [started, setStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Сброс состояния при закрытии модалки
      setStarted(false)
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setShowResult(false)
      setScore(0)
      setIsFinished(false)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !testData) return null

  const questions = testData.questions || []
  const results = testData.results || []

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleAnswerSelect = (answerId) => {
    if (showResult) return

    setSelectedAnswer(answerId)
    setShowResult(true)

    const selectedOption = currentQuestion.options.find(
      (opt) => opt.id === answerId
    )
    if (selectedOption?.isCorrect) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (isLastQuestion) {
        setIsFinished(true)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      }
    }, 1500)
  }

  const getResult = () => {
    const totalScore = score
    const result = results.find(
      (result) => totalScore >= result.minScore && totalScore <= result.maxScore
    )

    // Добавляем случайное изображение из вопросов теста
    if (result && questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length)
      result.image = toRoot(questions[randomIndex].image)
    }

    return result
  }

  const handleClose = () => {
    onClose()
  }

  // Данные для стартового экрана: из testsIndex (meta), иначе из карточки теста.
  const intro = testData.meta || {
    title: testData.card?.title,
    description: testData.card?.description,
    image: testData.card?.image
  }

  return (
    <div className="O_quizModal" onClick={handleClose}>
      <div className="W_quizModalContent" onClick={(e) => e.stopPropagation()}>
        {!started ? (
          <div className="M_testIntro">
            <button
              className="A_quizBack"
              type="button"
              onClick={handleClose}
              aria-label="Назад"
            >
              <img src="/images/arrowRight.svg" alt="" />
            </button>

            {intro.image && (
              <div className="A_testImageContainer">
                <img
                  className="A_testQuestionImage"
                  src={toRoot(intro.image)}
                  alt={intro.title || ''}
                />
              </div>
            )}

            <h1 className="A_testIntroTitle">{intro.title}</h1>
            {intro.description && (
              <p className="A_testIntroDesc">{intro.description}</p>
            )}

            <button
              className="A_button A_testIntroStart"
              type="button"
              onClick={() => setStarted(true)}
            >
              <p>Начать тест</p>
              <img src="/images/arrowRight.svg" alt="" />
            </button>
          </div>
        ) : !isFinished ? (
          <QuestionCard
            question={currentQuestion}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
          />
        ) : (
          <ResultCard result={getResult()} onClose={handleClose} />
        )}
      </div>
    </div>
  )
}

export default QuizModal
