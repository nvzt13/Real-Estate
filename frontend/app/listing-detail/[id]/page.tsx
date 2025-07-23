import ListingDetailClient from './ListingDetailClient'

interface Params {
  id: string;
}
const page = async ({params}: {params: Promise<Params>}) => {
  const resolveParams = await params;
  const {id} = resolveParams;
  return (
    <div style={{backgroundColor: '#F8FAFC', width: '100%', minHeight: '100vh'}}>
        <ListingDetailClient id={id} />
    </div>
  )
}

export default page
