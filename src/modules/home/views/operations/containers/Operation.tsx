import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { AlertContext } from 'components/alert/AlertContext'
import { OperationModel } from 'domain/model/operation'
import { OperationsStore } from 'modules/home/store/Operations'

import { OperationForm } from '../components/OperationForm'

export function OperationContainer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addAlert } = useContext(AlertContext)
  const operationStore = useMemo(() => new OperationsStore(), [])
  const [operation, setOperation] = useState<OperationModel | undefined>(
    undefined
  )

  const saveOperation = (operation: OperationModel) => {
    operationStore
      .save<OperationModel, OperationModel>(operation, id)
      .then((data) => {
        setOperation(data)
        addAlert({
          message: 'Operacao salva com sucesso!',
          title: 'Sucesso',
          type: 'success',
        })
        navigate('/operations')
      })
      .catch(() => {
        addAlert({
          message: 'Erro ao salvar operação!',
          title: 'Erro',
          type: 'error',
        })
      })
  }

  useEffect(() => {
    if (id) {
      operationStore.fetch<OperationModel>(id).then(setOperation)
    }
  }, [operationStore, id])

  return (
    <Container>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ marginY: 2 }}
        >
          <Typography variant='h5'>Nova operação</Typography>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <OperationForm
            data={operation}
            saveOperation={saveOperation}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
