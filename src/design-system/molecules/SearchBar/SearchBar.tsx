"use client"
import React, { useState } from "react"
import styles from "./SearchBar.module.css"

export interface SearchBarProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  disabled?: boolean
  className?: string
}

export function SearchBar({
  value: controlledValue,
  defaultValue = "",
  placeholder = "search…",
  onChange,
  onSearch,
  disabled = false,
  className,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = controlledValue !== undefined ? controlledValue : internalValue

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value
    if (controlledValue === undefined) setInternalValue(next)
    onChange?.(next)
  }

  function handleClear() {
    if (controlledValue === undefined) setInternalValue("")
    onChange?.("")
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") onSearch?.(value)
  }

  return (
    <div
      role="search"
      className={[styles.wrapper, disabled ? styles.disabled : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.searchIcon} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
          <line
            x1="11"
            y1="11"
            x2="15"
            y2="15"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <input
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={placeholder}
      />
      {value && !disabled && (
        <button
          className={styles.clear}
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line
              x1="2"
              y1="2"
              x2="12"
              y2="12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="2"
              x2="2"
              y2="12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
