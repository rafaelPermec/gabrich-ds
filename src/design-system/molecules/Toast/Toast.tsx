"use client"
import React, { createContext, useContext, useState, useCallback } from "react"
import { AnimatePresence, motion } from "motion/react"
import styles from "./Toast.module.css"

export type ToastVariant = "info" | "success" | "warning" | "error"
export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left"

export interface ToastItem {
  id: string
  variant?: ToastVariant
  title: string
  description?: string
  duration?: number
}

interface ToastContextValue {
  addToast: (toast: Omit<ToastItem, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}

export interface ToastProviderProps {
  position?: ToastPosition
  children: React.ReactNode
}

export function ToastProvider({
  position = "top-right",
  children,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (toast: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).slice(2, 9)
      setToasts((prev) => [...prev, { ...toast, id }])
      const duration = toast.duration ?? 4000
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration)
      }
    },
    [removeToast],
  )

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div
        className={[styles.container, styles[`position-${position}`]].join(" ")}
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <ToastMessage
              key={toast.id}
              toast={toast}
              onDismiss={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

const ToastMessage = React.forwardRef<HTMLDivElement, {
  toast: ToastItem
  onDismiss: () => void
}>(function ToastMessage({ toast, onDismiss }, ref) {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, transition: { duration: 0.16 } }}
      transition={{ duration: 0.24, ease: [0.32, 0, 0.15, 1] as const }}
      className={[
        styles.toast,
        styles[`variant-${toast.variant ?? "info"}`],
      ].join(" ")}
      role="status"
    >
      <div className={styles.toastContent}>
        <p className={styles.toastTitle}>{toast.title}</p>
        {toast.description && (
          <p className={styles.toastDesc}>{toast.description}</p>
        )}
      </div>
      <button
        className={styles.toastDismiss}
        onClick={onDismiss}
        aria-label="Dismiss"
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
    </motion.div>
  )
})
