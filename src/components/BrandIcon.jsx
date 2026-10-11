import React from 'react';

// Renders a simple-icons entry ({ title, hex, path }) as an inline SVG
export default function BrandIcon({ icon, size = 24, color, className = '' }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color || `#${icon.hex}`}
      className={className}
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}
