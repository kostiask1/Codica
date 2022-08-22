import { Alert, AlertColor } from "@mui/material"
import SnackComponent from "@mui/material/Snackbar"
import { FC } from "react"
import { setError, setSuccess } from "../../app/appSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"

interface SnackProps {
  type: AlertColor
  msg: string
  handleClose: (type: AlertColor) => void
}

const Snack: FC<SnackProps> = ({ type, msg, handleClose }) => (
  <SnackComponent
    open={!!msg}
    autoHideDuration={6000}
    onClose={() => handleClose(type)}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <Alert severity={type} sx={{ width: "100%" }}>
      {msg}
    </Alert>
  </SnackComponent>
)

const Snackbar = () => {
  const dispatch = useAppDispatch()
  const { error, success } = useAppSelector((state: RootState) => ({
    error: state.app.error,
    success: state.app.success,
  }))

  const handleClose = (type: string) => {
    if (type === "error") dispatch(setError(""))
    if (type === "success") dispatch(setSuccess(""))
  }

  return (
    <>
      <Snack type="success" msg={success} handleClose={handleClose} />
      <Snack type="error" msg={error} handleClose={handleClose} />
    </>
  )
}

export default Snackbar
