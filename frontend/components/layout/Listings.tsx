"use client"
import { useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'
import React from 'react'

const Listings = () => {
    const listings = useAppSelector((state: RootState) => state.listings.listings)
    console.log('Listings:', listings)
  return (
    <div>Listings</div>
  )
}

export default Listings