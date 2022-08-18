import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useAppDispatch } from "./app/hooks"
import { setCities } from "./app/weatherSlice"
const City = lazy(() => import("./pages/City/City"))
const List = lazy(() => import("./pages/List/List"))

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const cities = JSON.parse(localStorage.getItem("cities") || "[]")
    dispatch(setCities(cities))
  }, [])
  return (
    <div className="App">
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/:city" element={<City />}></Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
