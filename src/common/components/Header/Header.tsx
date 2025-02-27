import Box from "@mui/material/Box"
import * as React from "react"
import { AppBarHeader } from "common/components/Header/AppBarHeader"

export const Header = () => {
   return (
      <Box sx={{ flexGrow: 1, mb: 10 }}>
         <AppBarHeader />
      </Box>
   )
}
