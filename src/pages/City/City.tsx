import { lazy, Suspense } from "react"
import { useParams } from "react-router-dom"

const Card = lazy(() => import("../../components/Card"))

const City = () => {
  const { city } = useParams()
  if (!city) return <></>

  return (
    <Suspense fallback={<></>}>
      <Card city={city} extended />
    </Suspense>
  )
}

export default City
