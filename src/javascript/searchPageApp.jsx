import React from 'react'
import { createRoot } from 'react-dom/client'
import SearchResultsPage from './components/SearchResultsPage'

const container = document.getElementById('search-page-root')
if (container) {
  const root = createRoot(container)
  root.render(<SearchResultsPage />)
}
