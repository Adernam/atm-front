import React, { ReactNode } from 'react'

import { Box } from '@mui/material'

type Props = {
  children: ReactNode
};

export function BoxContent({ children }: Props) {
  return (
    <Box
      id="BoxContent"
      sx={{ display: 'flex' }}
      height="100%"
    >
      {children}
    </Box>
  )
}
