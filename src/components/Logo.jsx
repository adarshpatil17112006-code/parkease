import React from 'react';

export default function Logo({
  variant = 'default',
  layout = 'horizontal',
  size = 'default',
  className = ''
}) {
  const isDark = variant === 'dark';

  // Height mappings based on size
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    default: 'h-10 sm:h-12',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20'
  };

  const currentHeight = heightClasses[size] || heightClasses.default;

  // Select appropriate official logo asset
  const logoSrc = isDark
    ? layout === 'stacked'
      ? '/parkease-logo-dark.png'
      : '/parkease-logo-horizontal-dark.png'
    : layout === 'stacked'
      ? '/parkease-logo.png'
      : '/parkease-logo-horizontal.png';

  if (layout === 'icon-only') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/parkease-icon.png"
          alt="ParkEase Icon"
          className={`${currentHeight} w-auto object-contain drop-shadow-xs`}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="ParkEase — Parking Made Easy"
        className={`${currentHeight} w-auto object-contain drop-shadow-xs transition-opacity duration-200`}
        loading="eager"
      />
    </div>
  );
}
