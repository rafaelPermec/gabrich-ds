// Motion variant presets for use with motion/react (motion.dev)
// Install: pnpm add motion
// Import: import { motion, AnimatePresence } from 'motion/react'

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const slideUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 0.22, ease: [0.32, 0, 0.15, 1] },
};

export const slideInFromRight = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { duration: 0.24, ease: [0.32, 0, 0.15, 1] },
};

export const slideInFromLeft = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
  transition: { duration: 0.24, ease: [0.32, 0, 0.15, 1] },
};

export const slideInFromTop = {
  initial: { y: '-100%' },
  animate: { y: 0 },
  exit: { y: '-100%' },
  transition: { duration: 0.24, ease: [0.32, 0, 0.15, 1] },
};

export const slideInFromBottom = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
  transition: { duration: 0.24, ease: [0.32, 0, 0.15, 1] },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.22, ease: [0.32, 0, 0.15, 1] },
};

// Drawer variants by side
export const drawerVariants = {
  right: slideInFromRight,
  left: slideInFromLeft,
  top: slideInFromTop,
  bottom: slideInFromBottom,
};
