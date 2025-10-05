import React, { createContext, useContext, useEffect, useState } from 'react'

type SelectedItem = {
  id: number
  title?: string
}

type SelectionContextType = {
  selected: Record<number, SelectedItem>
  toggle: (item: SelectedItem) => void
  clearAll: () => void
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined)

export const SelectionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [selected, setSelected] = useState<Record<number, SelectedItem>>({})

  useEffect(() => {
    const raw = localStorage.getItem('selected_art_items')
    if (raw) setSelected(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('selected_art_items', JSON.stringify(selected))
  }, [selected])

  const toggle = (item: SelectedItem) => {
    setSelected(prev => {
      const copy = { ...prev }
      if (copy[item.id]) {
        delete copy[item.id]
      } else {
        copy[item.id] = item
      }
      return copy
    })
  }

  const clearAll = () => {
    setSelected({})
  }

  return (
    <SelectionContext.Provider value={{ selected, toggle, clearAll }}>
      {children}
    </SelectionContext.Provider>
  )
}

export const useSelection = () => {
  const ctx = useContext(SelectionContext)
  if (!ctx) throw new Error('useSelection must be used within SelectionProvider')
  return ctx
}
