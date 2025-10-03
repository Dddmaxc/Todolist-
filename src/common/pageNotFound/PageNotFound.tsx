import styles from "./PageNotFound.module.css"
import Box from "@mui/material/Box"
import { Button } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

export const PageNotFound = () => (
  <Box
    sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "start", height: "100vh" }}
  >
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>

    <Button component={RouterLink} to="/" variant="contained">
      Return on main
    </Button>
  </Box>
)
