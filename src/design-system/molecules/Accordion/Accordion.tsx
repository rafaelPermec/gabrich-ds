'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({ items, multiple = false, defaultOpen = [], className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);

  function toggle(id: string) {
    if (open.includes(id)) {
      setOpen(open.filter((x) => x !== id));
    } else {
      setOpen(multiple ? [...open, id] : [id]);
    }
  }

  return (
    <div className={[styles.accordion, className].filter(Boolean).join(' ')}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id} className={[styles.item, item.disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
            <button
              className={[styles.trigger, isOpen ? styles.triggerOpen : ''].filter(Boolean).join(' ')}
              onClick={() => !item.disabled && toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              id={`accordion-btn-${item.id}`}
              disabled={item.disabled}
            >
              <span className={styles.triggerLabel}>{item.title}</span>
              <span className={[styles.chevron, isOpen ? styles.chevronOpen : ''].filter(Boolean).join(' ')} aria-hidden="true">
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                  <polyline points="1,1 7,8 13,1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.26, ease: [0.32, 0, 0.15, 1] as const }}
                style={{ overflow: 'hidden' }}
                id={`accordion-${item.id}`}
                role="region"
                aria-labelledby={`accordion-btn-${item.id}`}
              >
                <div className={styles.panel}>{item.content}</div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
