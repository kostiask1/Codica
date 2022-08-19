import { Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import EastIcon from "@mui/icons-material/East"
import WestIcon from "@mui/icons-material/West"

const Navigation = () => {
  const navigate = useNavigate()
  const hasBackPage = !!window.history.state.idx
  return (
    <Box mb={2}>
      <Button
        disabled={!hasBackPage}
        onClick={() => navigate(-1)}
        variant="contained"
      >
        <WestIcon />
      </Button>
      <Button
        disabled={hasBackPage}
        onClick={() => navigate(1)}
        variant="contained"
      >
        <EastIcon />
      </Button>
    </Box>
  )
}

export default Navigation
