"use client"
import type { CSSProperties, ReactNode } from "react"
import { themeVars, type ScopeTheme } from "../../design-system/tokens/index"
import styles from "./shared.module.css"

export const img = (id: string, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

export const PHOTOS = {
  sunglasses: "1695157712101-7336d70c373e",
  glasses: "1695157712043-6d43f7a13803",
  vase: "1695157712254-dd3d7dea5b9c",
  beach: "1695157715099-73488af6f96e",
  studio: "1763970586854-fe90924fd4fb",
  bottle: "1724749127402-7e646d794873",
}

export function brl(n: number) {
  return (
    "R$ " +
    n.toLocaleString("pt-BR", {
      minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
      maximumFractionDigits: 2,
    })
  )
}

export function SubScope({
  theme,
  className,
  children,
}: {
  theme: ScopeTheme
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={["sub-scope", className].filter(Boolean).join(" ")}
      style={themeVars(theme) as CSSProperties}
    >
      {children}
    </div>
  )
}

interface CtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "g" | "m" | "p"
}

export function Cta({ size = "m", className, children, ...rest }: CtaProps) {
  return (
    <button
      className={[styles.cta, styles["cta-" + size], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  )
}
