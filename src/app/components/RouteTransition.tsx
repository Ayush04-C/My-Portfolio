'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Props = { children: React.ReactNode };

export default function RouteTransition({ children }: Props) {
  const pathname = usePathname();

  // Slide-in from left: new page enters from -100% -> 0, old page exits to +100%
  // Container is positioned relative with overflow-hidden to avoid scrollbars
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ x: '100%', opacity: 1 }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{ x: '-100%', opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: 'transform' }}
        >
          <div className="min-h-screen w-full overflow-auto">{children}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}