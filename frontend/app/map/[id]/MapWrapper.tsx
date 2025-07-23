'use client';

import { useAppSelector } from '@/lib/hooks';
import dynamic from 'next/dynamic';

// Harita bileşeni dinamik ve sadece tarayıcıda yüklenecek
const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
});


export default function MapWrapper({id}: {id: string}) {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapClient id={id} />
    </div>
  );
}
