"use client"
import React, { useEffect, useRef } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { drawerVariants } from "../../utils/motionVariants"
import { useFocusTrap } from "../../utils/focusTrap"
import styles from "./Drawer.module.css"

export type DrawerSide = "left" | "right" | "top" | "bottom"
export type DrawerSize = "sm" | "md" | "lg" | "full"

export interface DrawerProps {
  open: boolean
  onClose: () => void
  side?: DrawerSide
  size?: DrawerSize
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  closeOnOverlay?: boolean
  className?: string
}

const titleId = "drawer-title"

export function Drawer({
  open,
  onClose,
  side = "right",
  size = "md",
  title,
  children,
  footer,
  closeOnOverlay = true,
  className,
}: DrawerProps) {
  const drawerRef = useRef<HTMLElement>(null)
  useFocusTrap(drawerRef, open)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  const reduce = useReducedMotion()
  const v = drawerVariants[side]

  return (
    <AnimatePresence>
      {open && (
        <div
          key="drawer"
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
            className={styles.overlay}
            onClick={closeOnOverlay ? onClose : undefined}
            aria-hidden="true"
          />
          <motion.aside
            ref={drawerRef}
            initial={reduce ? { opacity: 0 } : v.initial}
            animate={reduce ? { opacity: 1 } : v.animate}
            exit={reduce ? { opacity: 0 } : v.exit}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.28, ease: [0.32, 0, 0.15, 1] as const }
            }
            className={[
              styles.drawer,
              styles[`side-${side}`],
              styles[`size-${size}`],
              className,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <header className={styles.header}>
              {title ? (
                <p className={styles.title} id={titleId}>
                  {title}
                </p>
              ) : (
                <span />
              )}
              <button
                className={styles.close}
                onClick={onClose}
                aria-label="Fechar"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <line
                    x1="3"
                    y1="3"
                    x2="15"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <line
                    x1="15"
                    y1="3"
                    x2="3"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <div className={styles.body}>{children}</div>

            {footer && <footer className={styles.footer}>{footer}</footer>}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
