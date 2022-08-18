import { FC } from "react"

interface Props {
  data: any
}

const Chart: FC<Props> = ({ data }) => {
  console.log("data:", data)
  return (
    <>
      <div />
    </>
  )
}

export default Chart
