// @flow
import Box from "@mui/material/Box"
import * as React from "react"
import { AppBarHeader } from "./AppBarHeader/AppBarHeader"

export const Header = () => {
   return (
      <Box sx={{ flexGrow: 1, mb: 10 }}>
         <AppBarHeader />
      </Box>
   )
}

// TODO: Правильно ли я вынес jsx+логику в компонент AppBarHeader?
