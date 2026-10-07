"use client"
import React, { SVGProps } from "react"
import styles from "./Icon.module.css"
import { IconSelector, IconSelectorDTO } from "@/design-system/icons/icon-selector"

const iconBase: SVGProps<SVGSVGElement> = {
  width: "100%",
  height: "100%",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
}

export type IconSize = 16 | 20 | 24 | 32
export type IconColor = "ink" | "paper" | "ochre" | "caramel" | "sand" | "current"

export interface IconProps {
  size?: IconSize
  color?: IconColor
  label?: string
  className?: string
  children: React.ReactNode
  icon?: keyof IconSelectorDTO;
}

export function Icon({
  size = 24,
  color = "current",
  label,
  className,
  children,
  icon
}: Readonly<IconProps>) {
  const CurrentIcon = icon ? IconSelector[icon] : undefined;
  return (
    <span
      className={[
        styles.icon,
        styles[`size-${size}`],
        styles[`color-${color}`],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={!label}
    >
      {CurrentIcon ? (
        <CurrentIcon
        {...iconBase}
        width={size}
        height={size}
        color={color}
        />
      ) : (
        children
      )}
    </span>
  )
}
