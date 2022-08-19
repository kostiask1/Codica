import { Container, createTheme, ThemeProvider } from "@mui/material"
import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useAppDispatch } from "./app/hooks"
import { setCities } from "./app/weatherSlice"
import Snackbar from "./Snackbar/Snackbar"
import Navigation from "./components/Navigation/Navigation"
const City = lazy(() => import("./pages/City/City"))
const List = lazy(() => import("./pages/List/List"))

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const cities = JSON.parse(localStorage.getItem("cities") || "[]")
    dispatch(setCities(cities))
  }, [])

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "rgb(102, 178, 255)",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Container>
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
