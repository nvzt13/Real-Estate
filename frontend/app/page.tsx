import FillReduxStore from '@/components/FillReduxStore'
import Listings from '@/components/layout/Listings'
import React from 'react'

const page = () => {
  return (
    <div>
      <Listings />
      <FillReduxStore />
    </div>
  )
}

export default page