import React from 'react'
import { useSelection } from '../context/SelectionContext'

const SelectionPanel: React.FC = () => {
  const { selected, clearAll } = useSelection()
  const items = Object.values(selected)

  return (
    <div className="selection-panel">
      <div>
        <strong>Selected:</strong> {items.length}
      </div>
      <div className="selected-list">
        {items.slice(0,5).map(it => (
          <div key={it.id} className="selected-item">
            <small>{it.title ?? `ID ${it.id}`}</small>
          </div>
        ))}
        {items.length > 5 && <div>and {items.length - 5} more...</div>}
      </div>
      <div style={{marginTop:8}}>
        <button onClick={clearAll} className="btn btn-clear">Clear All</button>
      </div>
    </div>
  )
}

export default SelectionPanel
