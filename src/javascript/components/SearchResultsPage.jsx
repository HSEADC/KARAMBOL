import React, { useMemo, useState, useEffect } from 'react'
import riskPoints from '../data/riskPoints.json'
import testsData from '../data/testsIndex.json'
import ArticleCard from './articles/ArticleCard'

const articlesContext = require.context('../data/articles', false, /\.json$/)
const articlesData = articlesContext.keys().map((key) => {
  const article = articlesContext(key)
  const heroBlock = article.blocks?.find((b) => b.type === 'hero') || {}
  return {
    id: article.id,
    title: heroBlock.title || '',
    description: heroBlock.description || '',
    image: heroBlock.image || '',
    readTime: heroBlock.readTime || '',
    link: `./article/${article.id}.html`
  }
})

const SearchResultCard = ({
  image,
  title,
  description,
  meta,
  link,
  centered
}) => (
  <a href={link} className="M_searchPageCard">
    <div className="W_searchPageCardImage">
      {image && <img src={image} alt={title} />}
    </div>
    <div
      className={`W_searchPageCardContent${centered ? ' W_searchPageCardContent--centered' : ''}`}
    >
      <div className="W_articleMainInfoDesc">
        <h3>{title}</h3>
        {description && <p className="A_searchPageDesc">{description}</p>}
      </div>
      {meta && <p className="A_searchPageMeta">{meta}</p>}
    </div>
  </a>
)

// Карточка теста — как на странице тестов (M_testPageCard)
const TestPageCard = ({ test }) => (
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

const SearchResultsPage = () => {
  const params = new URLSearchParams(window.location.search)
  const query = params.get('q') || ''
  const q = query.toLowerCase().trim()

  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const filteredPlaces = useMemo(
    () => (q ? riskPoints.filter((p) => p.name.toLowerCase().includes(q)) : []),
    [q]
  )

  const filteredArticles = useMemo(
    () =>
      q
        ? articlesData.filter(
            (a) =>
              a.title.toLowerCase().includes(q) ||
              a.description.toLowerCase().includes(q)
          )
        : [],
    [q]
  )

  const filteredTests = useMemo(
    () =>
      q
        ? testsData.filter(
            (t) =>
              t.title.toLowerCase().includes(q) ||
              t.description.toLowerCase().includes(q)
          )
        : [],
    [q]
  )

  const totalCount =
    filteredPlaces.length + filteredArticles.length + filteredTests.length

  const pluralResult = (n) => {
    const mod10 = n % 10
    const mod100 = n % 100
    if (mod100 >= 11 && mod100 <= 19) return 'результатов'
    if (mod10 === 1) return 'результат'
    if (mod10 >= 2 && mod10 <= 4) return 'результата'
    return 'результатов'
  }

  return (
    <div className="W_searchPage">
      <div
        className="A_tag W_searchPageCount"
        style={{ background: 'var(--Sea-Green)', width: 'fit-content' }}
      >
        <p>
          Найдено {totalCount} {pluralResult(totalCount)}
        </p>
      </div>

      <div className="W_searchPageContent">
        {filteredPlaces.length > 0 && (
          <div className="W_searchPageSection">
            <h2>Events и места</h2>
            <div className="C_searchPageGrid">
              {filteredPlaces.map((p) => (
                <SearchResultCard
                  key={p.id}
                  image={`https://static-maps.yandex.ru/1.x/?ll=${p.coordinates[1]},${p.coordinates[0]}&z=15&size=300,300&l=map`}
                  title={p.name}
                  description=""
                  meta="Место"
                  link="./map.html"
                  centered
                />
              ))}
            </div>
          </div>
        )}

        {filteredArticles.length > 0 && (
          <div className="W_searchPageSection">
            <h2>Статьи</h2>
            <div className={isMobile ? 'C_articlesGrid' : 'C_searchPageGrid'}>
              {filteredArticles.map((a) =>
                isMobile ? (
                  <ArticleCard key={a.id} article={a} isLarge={false} />
                ) : (
                  <SearchResultCard
                    key={a.id}
                    image={a.image}
                    title={a.title}
                    description={a.description}
                    meta={`Статья${a.readTime ? ` · ${a.readTime}` : ''}`}
                    link={a.link}
                  />
                )
              )}
            </div>
          </div>
        )}

        {filteredTests.length > 0 && (
          <div className="W_searchPageSection">
            <h2>Тесты</h2>
            <div className={isMobile ? 'C_testsGrid' : 'C_searchPageGrid'}>
              {filteredTests.map((t) =>
                isMobile ? (
                  <TestPageCard key={t.id} test={t} />
                ) : (
                  <SearchResultCard
                    key={t.id}
                    image={t.image}
                    title={t.title}
                    description={t.description}
                    meta="Тест"
                    link={`./tests.html`}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>

      {totalCount === 0 && q && (
        <p className="A_searchEmpty">Ничего не найдено по запросу «{query}»</p>
      )}

      {!q && <p className="A_searchEmpty">Введите запрос в строку поиска</p>}
    </div>
  )
}

export default SearchResultsPage
