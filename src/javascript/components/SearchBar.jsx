import React, { useState, useEffect, useRef } from 'react'
import riskPoints from '../data/riskPoints.json'
import testsData from '../data/testsIndex.json'
import QuizModal from './organisms/QuizModal'

const toRoot = (p) =>
  !p || /^https?:\/\//.test(p) ? p : '/' + p.replace(/^\.?\/?/, '')

// Полные данные тестов (вопросы + результаты) по id — для открытия теста модалкой
const testsContext = require.context('../data/tests', false, /\.json$/)
const testsById = {}
testsContext.keys().forEach((key) => {
  const data = testsContext(key)
  testsById[data.id] = data
})

const articlesContext = require.context('../data/articles', false, /\.json$/)
const articlesData = articlesContext.keys().map((key) => {
  const article = articlesContext(key)
  const heroBlock = article.blocks?.find((b) => b.type === 'hero') || {}
  return {
    id: article.id,
    title: heroBlock.title || '',
    image: heroBlock.image || '',
    link: `./article/${article.id}.html`
  }
})

const ResultCard = ({ image, title, link, onClick }) => (
  <a
    href={toRoot(link)}
    className="M_searchResultCard"
    onClick={
      onClick
        ? (e) => {
            e.preventDefault()
            onClick()
          }
        : undefined
    }
  >
    <div className="W_searchResultImage">
      {image && <img src={toRoot(image)} alt={title} />}
    </div>
    <p>{title}</p>
  </a>
)

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTest, setActiveTest] = useState(null)
  const ref = useRef(null)
  const inputRef = useRef(null)
  const expandTimer = useRef(null)

  const q = query.toLowerCase().trim()

  const filteredPlaces = q
    ? riskPoints.filter((p) => p.name.toLowerCase().includes(q))
    : []

  const filteredArticles = q
    ? articlesData.filter((a) => a.title.toLowerCase().includes(q))
    : []

  const filteredTests = q
    ? testsData.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
    : []

  const hasResults =
    filteredPlaces.length > 0 ||
    filteredArticles.length > 0 ||
    filteredTests.length > 0

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setFocused(false)
        setExpanded(false)
        setMobileOpen(false)
        clearTimeout(expandTimer.current)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobile = () => {
    setMobileOpen(false)
    setOpen(false)
  }

  const openMobile = () => {
    setMobileOpen(true)
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0)
  }

  const handleInput = (e) => {
    setQuery(e.target.value)
    setOpen(true)
  }

  const openTest = (id) => {
    const data = testsById[id]
    const meta = testsData.find((t) => t.id === id)
    if (data) setActiveTest({ ...data, meta })
  }

  const goToSearchPage = () => {
    if (query.trim()) {
      window.location.href = `/search.html?q=${encodeURIComponent(query.trim())}`
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      goToSearchPage()
    } else if (e.key === 'Escape') {
      closeMobile()
    }
  }

  const renderSections = () => (
    <>
      {!hasResults && <p className="A_searchEmpty">Ничего не найдено</p>}

      {filteredPlaces.length > 0 && (
        <div className="W_searchSection">
          <h3>Места и events</h3>
          <div className="C_searchGrid">
            {filteredPlaces.map((p) => (
              <ResultCard
                key={p.id}
                image={`https://static-maps.yandex.ru/1.x/?ll=${p.coordinates[1]},${p.coordinates[0]}&z=15&size=300,300&l=map`}
                title={p.name}
                link={`./map.html`}
              />
            ))}
          </div>
        </div>
      )}

      {filteredArticles.length > 0 && (
        <div className="W_searchSection">
          <h3>Статьи</h3>
          <div className="C_searchGrid">
            {filteredArticles.map((a) => (
              <ResultCard
                key={a.id}
                image={a.image}
                title={a.title}
                link={a.link}
              />
            ))}
          </div>
        </div>
      )}

      {filteredTests.length > 0 && (
        <div className="W_searchSection">
          <h3>Тесты</h3>
          <div className="C_searchGrid">
            {filteredTests.map((t) => (
              <ResultCard
                key={t.id}
                image={t.image}
                title={t.title}
                link={`./learning.html?test=${t.id}`}
                onClick={() => openTest(t.id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )

  return (
    <div
      className={`W_searchWrapper ${mobileOpen ? 'W_searchWrapper--mobileOpen' : ''}`}
      ref={ref}
    >
      <div className="W_inputSearch">
        <img
          src="/images/Q_searchIcon.svg"
          alt="Поиск"
          className="Q_searchIcon"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Питание собакенов"
          className="M_search"
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setFocused(true)
            clearTimeout(expandTimer.current)
            expandTimer.current = setTimeout(() => {
              setOpen(true)
              setExpanded(true)
            }, 300)
          }}
          style={{ width: focused ? '50.42vw' : '' }}
        />
        <button className="A_searchButton" onClick={goToSearchPage}>
          Поиск
        </button>
      </div>

      <button
        className="A_searchTrigger"
        type="button"
        aria-label="Поиск"
        onClick={openMobile}
      >
        <img src="/images/Q_searchIcon.svg" alt="" />
      </button>

      {open && q && (
        <div
          className="W_searchResults"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMobile()
          }}
        >
          {renderSections()}
        </div>
      )}

      <QuizModal
        isOpen={!!activeTest}
        testData={activeTest}
        onClose={() => setActiveTest(null)}
      />
    </div>
  )
}

export default SearchBar
