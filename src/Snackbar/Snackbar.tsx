import { Alert } from "@mui/material"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { RootState } from "../app/store"
import Snack from "@mui/material/Snackbar"
import { setError, setSuccess } from "../app/appSlice"
const Snackbar = () => {
  const dispatch = useAppDispatch()
  const { error, success } = useAppSelector((state: RootState) => ({
    error: state.app.error,
    success: state.app.success,
  }))

  const handleClose = (type: string) => {
    if (type === "error") {
      dispatch(setError(""))
    }
    if (type === "success") {
      dispatch(setSuccess(""))
    }
  }
  return (
    <>
      <Snack
        open={!!success}
        autoHideDuration={6000}
        onClose={() => handleClose("success")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snack>
      <Snack
        open={!!error}
        autoHideDuration={6000}
        onClose={() => handleClose("error")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snack>
    </>
  )
}

export default Snackbar
