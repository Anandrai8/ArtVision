import React, { useEffect, useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Checkbox } from 'primereact/checkbox'
import { Paginator } from 'primereact/paginator'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ArtItem } from '../types'
import { useSelection } from '../context/SelectionContext'

type ApiResponse = {
  pagination: {
    total: number
    limit: number
    offset: number
    total_pages: number
    current_page: number
  }
  data: any[]
}

const fetchPage = async (page: number) => {
  const res = await axios.get(`/api/artworks?page=${page}`)
  return res.data as ApiResponse
}

const ArtTable: React.FC = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = useQuery(['artworks', page], () => fetchPage(page), { keepPreviousData: false })
  const { selected, toggle } = useSelection()
  const [currentRows, setCurrentRows] = useState<ArtItem[]>([])

  useEffect(() => {
    if (data && data.data) {
      const items = data.data.map(d => ({
        id: d.id,
        title: d.title,
        place_of_origin: d.place_of_origin,
        artist_display: d.artist_display,
        inscriptions: d.inscriptions,
        date_start: d.date_start,
        date_end: d.date_end
      } as ArtItem))
      setCurrentRows(items)
    }
  }, [data])

  // helper to determine if a row is selected by id
  const isSelected = (id: number) => !!selected[id]

  // Toggle single row
  const onRowSelectToggle = (row: ArtItem) => {
    toggle({ id: row.id, title: row.title })
  }

  const headerCheckbox = useMemo(() => {
    const allOnPageSelected = currentRows.length > 0 && currentRows.every(r => isSelected(r.id))
    const someSelected = currentRows.some(r => isSelected(r.id))
    return (
      <Checkbox
        checked={allOnPageSelected}
        indeterminate={!allOnPageSelected && someSelected}
        onChange={() => {
          // toggle each row
          currentRows.forEach(r => {
            if (!isSelected(r.id)) toggle({ id: r.id, title: r.title })
            else toggle({ id: r.id, title: r.title })
          })
        }}
      />
    )
  }, [currentRows, selected])

  const selectionBodyTemplate = (rowData: ArtItem) => {
    return (
      <Checkbox checked={isSelected(rowData.id)} onChange={() => onRowSelectToggle(rowData)} />
    )
  }

  return (
    <div>
      <div className="table-wrapper">
        <DataTable value={currentRows} header="Artworks" className="p-datatable-gridlines">
          <Column headerStyle={{width:'3rem'}} body={selectionBodyTemplate} header={headerCheckbox} />
          <Column field="title" header="Title" />
          <Column field="place_of_origin" header="Place of Origin" />
          <Column field="artist_display" header="Artist" />
          <Column field="inscriptions" header="Inscriptions" />
          <Column field="date_start" header="Date Start" />
          <Column field="date_end" header="Date End" />
        </DataTable>
      </div>

      <div className="paginator">
        <Paginator first={(page-1)*12} rows={12} totalRecords={data?.pagination?.total ?? 0}
          onPageChange={(e) => {
            const newPage = Math.floor(e.first / e.rows) + 1
            setPage(newPage)
          }} rowsPerPageOptions={[12]} />
      </div>

      {isLoading && <div className="loading">Loading...</div>}
    </div>
  )
}

export default ArtTable
