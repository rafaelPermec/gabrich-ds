"use client"
import React, { useState } from "react"
import styles from "./DataTable.module.css"
import { Table, TableColumn } from "../../molecules/Table/Table"
import { Pagination } from "../../molecules/Pagination/Pagination"
import { SearchBar } from "../../molecules/SearchBar/SearchBar"

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[]
  data: T[]
  pageSize?: number
  searchable?: boolean
  searchKeys?: (keyof T)[]
  striped?: boolean
  title?: string
  className?: string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 10,
  searchable = true,
  searchKeys,
  striped = true,
  title,
  className,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const filtered = search
    ? data.filter((row) => {
        const keys = searchKeys ?? (Object.keys(row) as (keyof T)[])
        return keys.some((k) =>
          String(row[k]).toLowerCase().includes(search.toLowerCase()),
        )
      })
    : data

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  function handleSearch(v: string) {
    setSearch(v)
    setPage(1)
  }

  return (
    <div className={[styles.container, className].filter(Boolean).join(" ")}>
      <div className={styles.toolbar}>
        {title && <p className={styles.title}>{title}</p>}
        {searchable && (
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="buscar…"
            className={styles.search}
          />
        )}
      </div>
      <Table columns={columns} data={paginated} striped={striped} />
      <div className={styles.footer}>
        <span className={styles.count}>
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </span>
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        )}
      </div>
    </div>
  )
}
