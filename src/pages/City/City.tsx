import { lazy, Suspense } from "react"
import { useParams } from "react-router-dom"
import { useGetCityHourlyQuery } from "../../app/api"

const Card = lazy(() => import("../../components/Card"))
const Chart = lazy(() => import("../../components/Chart"))

const City = () => {
  const { city } = useParams()
  if (!city) return null

  const { data, isLoading } = useGetCityHourlyQuery(city)

  if (isLoading) return <></>
  console.log("data:", data)
  return (
    <Suspense fallback={<></>}>
      <Card city={city} extended />
      <Chart data={data} />
    </Suspense>
  )
}

export default City
