import React from 'react'
import { createRoot } from 'react-dom/client'
import SearchBar from './components/SearchBar'

const container = document.getElementById('search-root')
if (container) {
  const root = createRoot(container)
  root.render(<SearchBar />)
}
