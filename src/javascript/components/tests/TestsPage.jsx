import React, { useState } from 'react'
import testsData from '../../data/testsIndex.json'
import QuizModal from '../organisms/QuizModal'

// Полные данные тестов (вопросы + результаты) по id
const testsContext = require.context('../../data/tests', false, /\.json$/)
const testsById = {}
testsContext.keys().forEach((key) => {
  const data = testsContext(key)
  testsById[data.id] = data
})

const TAGS = [
  { label: 'Все', value: '' },
  { label: 'Лето', value: 'Лето' },
  { label: 'Ветеринария', value: 'Ветеринария' },
  { label: 'Мероприятия', value: 'Мероприятия' },
  { label: 'Life-стайл', value: 'Life-стайл' },
  { label: 'Питание', value: 'Питание' },
  { label: 'Зоомагазин', value: 'Зоомагазин' }
]

const TestCard = ({ test, onSelect }) => (
  <a
    href={`./learning.html?test=${test.id}`}
    className="M_testPageCard"
    onClick={(e) => {
      e.preventDefault()
      onSelect(test.id)
    }}
  >
    <div className="W_testPageImage">
      <img src={test.image} alt={test.title} />
    </div>
    <div className="W_testPageContent">
      <h3 className="A_testPageTitle">{test.title}</h3>
      <p className="A_testPageDesc">{test.description}</p>
    </div>
    <div className="W_testPageFooter">
      <span className="A_button">
        <p>Начать</p>
        <img src="/images/arrowRight.svg" alt="" />
      </span>
    </div>
  </a>
)

const TestsPage = () => {
  const [activeTag, setActiveTag] = useState('')
  const [activeTest, setActiveTest] = useState(null)

  const filtered = activeTag
    ? testsData.filter((t) => t.categories.includes(activeTag))
    : testsData

  const openTest = (id) => {
    const data = testsById[id]
    if (data) setActiveTest(data)
  }

  return (
    <div className="O_testsPage">
      <div className="С_tagsList">
        {TAGS.map((tag) => (
          <button
            key={tag.value}
            className={`A_tag ${activeTag === tag.value ? 'A_tag--active' : ''}`}
            onClick={() => setActiveTag(tag.value)}
          >
            {tag.label}
          </button>
        ))}
      </div>

      <div className="C_testsGrid">
        {filtered.map((test) => (
          <TestCard key={test.id} test={test} onSelect={openTest} />
        ))}
      </div>

      <QuizModal
        isOpen={!!activeTest}
        testData={activeTest}
        onClose={() => setActiveTest(null)}
      />
    </div>
  )
}

export default TestsPage
