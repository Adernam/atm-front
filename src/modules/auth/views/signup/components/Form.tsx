import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Grid, Button, TextField, Box } from '@mui/material'
import { ClientDTO } from 'modules/auth/dto'
import { getDataFromForm } from 'utils/getDataFormForm'

type Props = {
  submit: (data: ClientDTO) => Promise<void>
}

export function FormSignup({ submit }: Props) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit(getDataFromForm(event.target as HTMLFormElement))
  }

  const navigate = useNavigate()

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
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
            required
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
            required
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <TextField
            name='birthDate'
            label='Data de nascimento'
            variant='outlined'
            type='date'
            InputLabelProps={{ shrink: true }}
            size='small'
            fullWidth
            required
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <TextField
            label='CPF'
            variant='outlined'
            size='small'
            name='cpf'
            fullWidth
            required
            inputProps={{ maxLength: 14 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextField
            name='email'
            label='Email'
            variant='outlined'
            type='email'
            size='small'
            fullWidth
            required
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <TextField
            name='password'
            label='Senha'
            variant='outlined'
            type='password'
            size='small'
            fullWidth
            required
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <TextField
            name='confirmPassword'
            label='Confirmar senha'
            variant='outlined'
            type='password'
            size='small'
            fullWidth
            required
          />
        </Grid>
        <Grid
          item
          xs={12}
          justifyContent='center'
          display='flex'
          columnGap={2}
        >
          <Button
            variant='outlined'
            onClick={() => navigate('/auth/signin')}
          >
            Fazer login
          </Button>
          <Button
            variant='contained'
            type='submit'
          >
            Criar conta
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
