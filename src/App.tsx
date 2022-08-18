import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
const City = lazy(() => import("./pages/City/City"))
const List = lazy(() => import("./pages/List/List"))

function App() {
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
