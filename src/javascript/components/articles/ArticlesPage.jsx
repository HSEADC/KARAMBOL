import React, { useState } from 'react'
import ArticleCard from './ArticleCard'
import QuizModal from '../organisms/QuizModal'
import InfiniteImageCarousel from './InfiniteImageCarousel'

// Динамический импорт статей из папки articles
const articlesContext = require.context('../../data/articles', false, /\.json$/)
const articlesData = articlesContext.keys().map((key) => {
  const article = articlesContext(key)
  const heroBlock = article.blocks?.find((b) => b.type === 'hero') || {}
  return {
    id: article.id,
    title: heroBlock.title || '',
    image: heroBlock.image || '',
    readTime: heroBlock.readTime || '',
    date: heroBlock.date || '',
    description: heroBlock.description || '',
    categories: Array.isArray(article.categories) ? article.categories : []
  }
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

const ArticlesPage = () => {
  const [activeTag, setActiveTag] = useState('')
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  const openQuiz = () => {
    setIsQuizOpen(true)
  }

  const getFilteredArticles = () => {
    if (!activeTag) return articlesData
    return articlesData.filter((article) =>
      article.categories.includes(activeTag)
    )
  }

  return (
    <div className="O_articlesPage">
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

      <div className="C_articlesGrid">
        {getFilteredArticles().map((article, index) => {
          const rowIndex = Math.floor(index / 3)
          const positionInRow = index % 3

          const isLarge =
            rowIndex % 2 === 0 ? positionInRow === 2 : positionInRow === 0

          return (
            <ArticleCard
              key={article.id}
              article={article}
              onTestClick={openQuiz}
              isLarge={isLarge}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ArticlesPage
