import React from 'react'
import ArtTable from './components/ArtTable'
import SelectionPanel from './components/SelectionPanel'
import { SelectionProvider } from './context/SelectionContext'

const App: React.FC = () => {
  return (
    <SelectionProvider>
      <div className="app">
        <header className="app-header">
          <h1>Art Institute - Artworks</h1>
        </header>
        <main className="app-main">
          <div className="left">
            <ArtTable />
          </div>
          <aside className="right">
            <SelectionPanel />
          </aside>
        </main>
        <footer className="app-footer">
          <small>Assignment build — follow rules: server-side pagination & selection persistence</small>
        </footer>
      </div>
    </SelectionProvider>
  )
}

export default App
