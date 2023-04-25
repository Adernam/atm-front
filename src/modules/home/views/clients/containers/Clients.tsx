import React, { useMemo } from 'react'

import {
  Box, Container, Grid, Typography,
} from '@mui/material'
import { ClientsStore } from 'modules/home/store/Clients'

import { ClientsGrid } from '../components/ClientsGrid'

export function ClientsContainer() {
  const clientsStore = useMemo(() => new ClientsStore(), [])

  return (
    <Container>
      <Box>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ marginY: 2 }}
          >
            <Typography variant="h5">Clientes</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ paddingBottom: 2 }}
          >
            <ClientsGrid store={clientsStore} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
