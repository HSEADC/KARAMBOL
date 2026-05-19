import React, { useState } from 'react'
import testsData from '../../data/testsIndex.json'

const TAGS = [
  { label: 'Все', value: '' },
  { label: 'Лето', value: 'Лето' },
  { label: 'Ветеринария', value: 'Ветеринария' },
  { label: 'Мероприятия', value: 'Мероприятия' },
  { label: 'Life-стайл', value: 'Life-стайл' },
  { label: 'Питание', value: 'Питание' },
  { label: 'Зоомагазин', value: 'Зоомагазин' },
]

const TestCard = ({ test }) => (
  <a href={`./learning.html?test=${test.id}`} className="M_testPageCard">
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
        <img src="./images/arrowRight.svg" alt="" />
      </span>
    </div>
  </a>
)

const TestsPage = () => {
  const [activeTag, setActiveTag] = useState('')

  const filtered = activeTag
    ? testsData.filter((t) => t.categories.includes(activeTag))
    : testsData

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
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  )
}

export default TestsPage
