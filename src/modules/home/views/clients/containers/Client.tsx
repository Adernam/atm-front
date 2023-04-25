import React, { useContext, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { AlertContext } from 'components/alert/AlertContext'
import { ClientModel } from 'domain/model/client'
import { ClientsStore } from 'modules/home/store/Clients'
import { useForm } from 'utils/hooks/useForm'

export function ClientContainer() {
  const navigate = useNavigate()
  const { id } = useParams()
  const clientsStore = useMemo(() => new ClientsStore(), [])
  const { formState, handleInputChange, setFormState, handleSwitchChange } =
    useForm<ClientModel>({
      name: '',
      address: '',
      birthDate: '',
      cpf: '',
      email: '',
      active: false,
    })
  const { addAlert } = useContext(AlertContext)

  const submitForm = () => {
    clientsStore
      .save(formState, id)
      .then(() => {
        addAlert({
          message: `Cliente ${id ? 'alterado' : 'salvo'} com sucesso`,
          type: 'success',
          title: 'Sucesso',
        })
        navigate(-1)
      })
      .catch(() => {
        addAlert({
          message: 'Erro ao alterar cliente',
          title: 'Falha',
          type: 'error',
        })
      })
  }

  useEffect(() => {
    if (id) {
      clientsStore
        .fetch<ClientModel>(id)
        .then(setFormState)
        .catch((error) => {
          addAlert({
            message: 'Falha ao carregar dados do cliente',
            title: 'Erro',
            type: 'error',
          })
          console.error(error)
        })
    }
  }, [clientsStore, id])

  return (
    <Container>
      <Box>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ marginY: 2 }}
          >
            <Typography variant='h5'>Editar cliente</Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  name='name'
                  label='Nome completo'
                  variant='outlined'
                  size='small'
                  fullWidth
                  value={formState?.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  name='address'
                  label='Endereço'
                  variant='outlined'
                  size='small'
                  fullWidth
                  value={formState?.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid
                item
                xs={5}
              >
                <TextField
                  name='birthDate'
                  label='Data de nascimento'
                  variant='outlined'
                  type='date'
                  InputLabelProps={{ shrink: true }}
                  size='small'
                  fullWidth
                  value={formState?.birthDate}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid
                item
                xs={5}
              >
                <TextField
                  name='cpf'
                  label='CPF'
                  variant='outlined'
                  size='small'
                  fullWidth
                  value={formState?.cpf}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid
                item
                xs={2}
              >
                <FormControlLabel
                  control={
                    <Switch
                      name='active'
                      checked={formState.active}
                      onChange={handleSwitchChange}
                    />
                  }
                  label='Ativo'
                  sx={{ float: 'right' }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                justifyContent='center'
              >
                <Button
                  variant='contained'
                  type='submit'
                  sx={{ float: 'right' }}
                  onClick={submitForm}
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
