import React from 'react'

import { Toolbar, Typography } from '@mui/material'

export function AppBar() {
  return (
    <Toolbar
      id="appBar"
      sx={{ backgroundColor: '#2e2e2e', height: 'auto' }}
    >
      <Typography
        variant="h6"
        noWrap
        component="div"
        color="#f2f2f2"
      >
        ATM
      </Typography>
    </Toolbar>
  )
}
