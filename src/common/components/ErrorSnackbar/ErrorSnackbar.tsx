import { selectError, setAppError } from "@/app/app-slice"
import { Alert } from "@mui/material"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import { SyntheticEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

export const ErrorSnackbar = () => {
  const error = useSelector(selectError)
  const dispatch = useDispatch()

  const handleClose = (_event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    
    dispatch(setAppError({ error: null }))
  }

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}
