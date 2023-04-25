import React from 'react'

import { Toolbar, Typography} from '@mui/material'

export function Footer() {
  return (
    <Toolbar
      id="footer"
      sx={{ backgroundColor: '#2e2e2e' }}
    >
      <Typography
        variant="h6"
        noWrap
        color="#f2f2f2"
      />
    </Toolbar>
  )
}
