'use client';

/**
 * TrackingProvider
 * ─────────────────
 * Client-side wrapper that initializes the analytics tracking engine.
 * Renders nothing visible — zero impact on layout or design.
 *
 * This component is intentionally separated from the tracking engine
 * to keep the engine framework-agnostic and testable.
 */

import { useEffect } from 'react';
import { initTracking } from '@/lib/tracking';

export default function TrackingProvider() {
  useEffect(() => {
    initTracking();
  }, []);

  return null; // No DOM output — invisible to layout
}
