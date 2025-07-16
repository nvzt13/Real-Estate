'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Harita bileşeni dinamik ve sadece tarayıcıda yüklenecek
const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
});

const listings = [
  {
    title: 'Modern Villa in Beşiktaş',
    coords: [41.0438, 29.0033],
    price: 2500000,
  },
  {
    title: 'Land in Çatalca',
    coords: [41.1376, 28.4626],
    price: 850000,
  },
];

export default function MapWrapper() {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapClient listings={listings} />
    </div>
  );
}
