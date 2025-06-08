import Banner from '@/components/Banner'
import FeaturedSection from '@/components/FeaturedSection'
import VideoSection from '@/components/VideoSection'
import StatsSection from '@/components/StatsSection'
import BestDealSection from '@/components/BestDealSection'
import PropertiesSection from '@/components/PropertiesSection'
import ContactSection from '@/components/ContactSection'
import React from 'react'
import Header from '@/components/Header'

export default function Home() {
  return (
    <div className="home container">
      <Header />
      <Banner />
      <FeaturedSection />
      <VideoSection />
      <StatsSection />
      <BestDealSection />
      <PropertiesSection />
      <ContactSection />
    </div>
  )
}