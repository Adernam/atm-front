import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Container, Grid, Typography } from '@mui/material'
import { OperationsStore } from 'modules/home/store/Operations'

import { OperationsGrid } from '../components/OperationsGrid'

export function OperationsContainer() {
  const navigate = useNavigate()
  const operationStore = useMemo(() => new OperationsStore(), [])

  return (
    <Container>
      <Grid
        container
        rowGap={2}
        sx={{ marginY: 2 }}
      >
        <Grid
          item
          xs={12}
        >
          <Typography variant='h5'>Operações</Typography>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <OperationsGrid store={operationStore} />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
            variant='contained'
            sx={{ float: 'right' }}
            onClick={() => navigate('operation')}
          >
            Novo
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
