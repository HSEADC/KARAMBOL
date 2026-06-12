import React from 'react'
import { createRoot } from 'react-dom/client'
import ArticleCard from './components/articles/ArticleCard'

// Динамический импорт статей из папки articles
const articlesContext = require.context('./data/articles', false, /\.json$/)
const articlesData = articlesContext
  .keys()
  .map((key) => {
    const article = articlesContext(key)
    const heroBlock = article.blocks?.find((b) => b.type === 'hero') || {}
    return {
      id: article.id,
      title: heroBlock.title || '',
      image: heroBlock.image || '',
      readTime: heroBlock.readTime || '',
      date: heroBlock.date || '',
      description: heroBlock.description || ''
    }
  })
  .sort((a, b) => a.id - b.id)
  .slice(0, 3)

const HomeArticles = () => (
  <>
    {articlesData.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ))}
  </>
)

const container = document.querySelector('.С_Articles')
if (container) {
  const root = createRoot(container)
  root.render(<HomeArticles />)
}
