import { CardMedia } from "@mui/material"
import { FC } from "react"
import { useGetCityHourlyQuery } from "../../app/api"
import CelciusIcon from "../CelciusIcon"
import "./Chart.scss"

interface Props {
  city: string
}

const Chart: FC<Props> = ({ city }) => {
  const { data, isLoading, error } = useGetCityHourlyQuery(city)
  if (error)
    return <>Error while loading, probably you entered city name wrong</>
  if (isLoading) return <></>

  const medium = Math.round(
    data?.list?.reduce((acc: any, cur: any) => {
      return acc + cur.main.temp
    }, 0) / data.list.length
  )
  return (
    <div className="chart">
      {!!data.list.length &&
        data.list.map((item: any) => (
          <div
            className="chart__cell"
            key={item.dt}
            style={{
              transform: `translateY(${
                (medium - Math.round(item.main.temp)) * 3
              }px)`,
              backgroundColor: `hsl(${
                50 + Math.min(16, medium - Math.round(item.main.temp)) * 1.6
              }, 90% ,50%)`,
            }}
          >
            <span>{item.dt_txt.slice(5, item.dt_txt.length - 3)}</span>
            <p>
              {Math.round(item.main.temp)} <CelciusIcon />
            </p>
            <CardMedia
              component="img"
              height="60"
              image={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              style={{ aspectRatio: "1/1", width: "unset" }}
              alt={item.weather[0].main}
            />
          </div>
        ))}
    </div>
  )
}

export default Chart
