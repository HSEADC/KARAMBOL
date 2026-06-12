import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import QuizModal from './components/organisms/QuizModal'

// Динамический импорт тестов из папки tests
const testsContext = require.context('./data/tests', false, /\.json$/)
const testsData = testsContext
  .keys()
  .map((key) => {
    const test = testsContext(key)
    const cardData = test.card || {}
    return {
      id: test.id,
      title: cardData.title || '',
      readTime: cardData.readTime || '',
      questionsCount: test.questions ? test.questions.length : 0,
      factsCount: cardData.facts || test.questions ? test.questions.length : 0,
      link: `test/${test.id}.html`,
      testData: test
    }
  })
  .sort((a, b) => a.id - b.id)
  .slice(0, 2)

const HomeTestCard = ({ test, onSelect }) => (
  <a
    href={test.link}
    className="M_homeTestCard"
    onClick={(e) => {
      e.preventDefault()
      onSelect(test.testData)
    }}
  >
    <div className="W_testContent">
      <p className="A_testFacts tag">
        {test.factsCount} полезных фактов внутри
      </p>
      <h3 className="A_testTitle">{test.title}</h3>
    </div>
    <div className="W_testFooter">
      <p className="A_testMeta tag">
        {test.questionsCount} вопросов · {test.readTime}
      </p>
      <span className="A_button">
        <p>Начать</p>
        <img src="./images/arrowRight.svg" alt="" />
      </span>
    </div>
  </a>
)

const HomeTests = () => {
  const [activeTest, setActiveTest] = useState(null)

  return (
    <>
      {testsData.map((test) => (
        <HomeTestCard key={test.id} test={test} onSelect={setActiveTest} />
      ))}

      <QuizModal
        isOpen={!!activeTest}
        testData={activeTest}
        onClose={() => setActiveTest(null)}
      />
    </>
  )
}

const container = document.querySelector('.С_Tests')
if (container) {
  const root = createRoot(container)
  root.render(<TestSlider tests={testsData} />)
}
