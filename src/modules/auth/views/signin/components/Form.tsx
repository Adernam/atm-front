import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Grid, Button, TextField, Box } from '@mui/material'
import { ClientDTO } from 'modules/auth/dto'
import { getDataFromForm } from 'utils/getDataFormForm'

export function FormSignin({
  submit,
}: {
  submit: (data: ClientDTO) => Promise<void>
}) {
  const navigate = useNavigate()
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit(getDataFromForm(event.target as HTMLFormElement))
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
    >
      <Grid
        container
        rowGap={2}
      >
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
          xs={12}
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
          xs={12}
          justifyContent='center'
          display='flex'
          columnGap={2}
        >
          <Button
            variant='outlined'
            onClick={() => navigate('/auth/signup')}
          >
            Criar conta
          </Button>
          <Button
            variant='contained'
            type='submit'
          >
            Entrar
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
