import { Container, createTheme, ThemeProvider } from "@mui/material"
import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { setCities } from "./app/citiesSlice"
import { useAppDispatch } from "./app/hooks"
import Navigation from "./components/Navigation/Navigation"
import Snackbar from "./components/Snackbar/Snackbar"
import { getStorage } from "./helpers"
const City = lazy(() => import("./pages/City/City"))
const List = lazy(() => import("./pages/List"))

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const cities = getStorage("cities")
    dispatch(setCities(cities))
  }, [])

  const theme = createTheme({
    palette: {
      primary: {
        main: "#68aaeb",
        light: "#9ce2ff",
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Navigation />
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/Codica" element={<List />}></Route>
            <Route path="/Codica/:city" element={<City />}></Route>
          </Routes>
        </Suspense>
        <Snackbar />
      </Container>
    </ThemeProvider>
  )
}

export default App
