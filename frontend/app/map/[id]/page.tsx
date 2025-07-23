import React from 'react'
import MapWrapper from './MapWrapper';

interface Params {
  id: string;
}
const page = async ({params}: {params: Promise<Params>}) => {
  const resolveParams = await params;
  const {id} = resolveParams;

  return (
    <div style={{ height: '500px', width: '100%' }}>
        <MapWrapper id={id} />
    </div>
  )
}

export default page