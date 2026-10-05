'use client';
import React, { createContext, useContext, useState } from 'react';
import type { DGVertical } from '../tokens/index';

interface VerticalContextValue {
  vertical: DGVertical;
  setVertical: (v: DGVertical) => void;
}

const VerticalContext = createContext<VerticalContextValue | null>(null);

export function useVertical() {
  const ctx = useContext(VerticalContext);
  if (!ctx) throw new Error('useVertical must be used within VerticalProvider');
  return ctx;
}

export function VerticalProvider({ children, defaultVertical = 'document' }: {
  children: React.ReactNode;
  defaultVertical?: DGVertical;
}) {
  const [vertical, setVertical] = useState<DGVertical>(defaultVertical);

  return (
    <VerticalContext.Provider value={{ vertical, setVertical }}>
      {children}
    </VerticalContext.Provider>
  );
}
