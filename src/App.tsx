import { Container, createTheme, ThemeProvider } from "@mui/material"
import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useAppDispatch } from "./app/hooks"
import { setCities } from "./app/citiesSlice"
import Snackbar from "./components/Snackbar/Snackbar"
import Navigation from "./components/Navigation/Navigation"
const City = lazy(() => import("./pages/City/City"))
const List = lazy(() => import("./pages/List"))

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const cities = JSON.parse(localStorage.getItem("cities") || "[]")
    dispatch(setCities(cities))
  }, [])

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(102, 178, 255)",
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Navigation />
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<List />}></Route>
            <Route path="/:city" element={<City />}></Route>
          </Routes>
        </Suspense>
        <Snackbar />
      </Container>
    </ThemeProvider>
  )
}

export default App
