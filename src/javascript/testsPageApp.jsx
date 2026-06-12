import React from 'react'
import { createRoot } from 'react-dom/client'
import TestsPage from './components/tests/TestsPage'

const container = document.getElementById('tests-page-root')
if (container) {
  const root = createRoot(container)
  root.render(<TestsPage />)
}
