import React, { Suspense, lazy } from 'react';

// three.js lives in a separate chunk, fetched only when a glass object is actually shown
const GlassScene = lazy(() => import('./GlassScene'));

// Desktop-only decoration (hidden below lg): phones never download or start WebGL for it
export default function GlassObject(props) {
  if (!window.matchMedia('(min-width: 1024px)').matches) return null;
  return (
    <Suspense fallback={null}>
      <GlassScene {...props} />
    </Suspense>
  );
}
