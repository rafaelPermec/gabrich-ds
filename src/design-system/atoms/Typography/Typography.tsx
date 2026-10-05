"use client"
import React from "react"
import styles from "./Typography.module.css"

type TextSize = "xs" | "sm" | "base" | "md" | "lg" | "xl" | "2xl"
type TextFont = "body" | "mono" | "sub"
type TextWeight = 300 | 400 | 500 | 600 | 700
type TextColor =
  | "primary"
  | "secondary"
  | "muted"
  | "ink"
  | "paper"
  | "ochre"
  | "caramel"
  | "cocoa-matte"
  | "sand"
  | "cocoa-deep"
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingSize = "display" | "xl" | "lg" | "md" | "sm" | "xs"
type HeadingFont = "display" | "sub"

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  tag?: "p" | "span" | "div" | "li" | "label" | "figcaption"
  size?: TextSize
  font?: TextFont
  weight?: TextWeight
  color?: TextColor
  uppercase?: boolean
  children: React.ReactNode
}

export function Text({
  tag: Tag = "p",
  size = "base",
  font = "body",
  weight = 400,
  color = "primary",
  uppercase = false,
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Tag
      className={[
        styles.text,
        styles[`size-${size}`],
        styles[`font-${font}`],
        styles[`weight-${weight}`],
        styles[`color-${color}`],
        uppercase ? styles.uppercase : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  size?: HeadingSize
  font?: HeadingFont
  color?: TextColor
  children: React.ReactNode
}

export function Heading({
  level = 2,
  size = "lg",
  font = "display",
  color = "primary",
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  return (
    <Tag
      className={[
        styles.heading,
        styles[`heading-${size}`],
        styles[`heading-font-${font}`],
        styles[`color-${color}`],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  )
}
