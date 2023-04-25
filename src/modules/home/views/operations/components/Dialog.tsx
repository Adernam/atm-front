import React, { useEffect, useId } from 'react'

import {
  Dialog,
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material'
import { TypeNote } from 'domain/model/operation'
import { PackageModel, PackageStatus } from 'domain/model/package'
import { useForm } from 'utils/hooks/useForm'

type Props = {
  handleDialog: () => void
  savePackage: (newPackage: PackageModel) => void
  removePackage: (idPackage: string) => void
  data?: PackageModel
};

export function DialogPackage({
  handleDialog,
  savePackage,
  removePackage,
  data,
}: Props) {
  const id = useId()
  const { formState, setFormState, handleInputChange } = useForm<PackageModel>({
    typeNote: 10,
    quantityNote: 1,
    status: PackageStatus.NEW,
    id,
    idOperation: data?.idOperation,
  })

  const handleSelectChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleRemovePackage = () => {
    removePackage(formState.id as string)
  }

  useEffect(() => {
    if (data) {
      setFormState(data)
    }
  }, [data, setFormState])

  return (
    <Dialog
      open
      onClose={handleDialog}
      sx={{
        '.MuiDialog-paper': {
          padding: 1,
        },
      }}
    >
      <Box
        sx={{ p: 2, width: '500px' }}
        id="formDialog"
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
            <Typography variant="h6">Adicionar pacote</Typography>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo da nota
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tipo da nota"
                value={formState.typeNote}
                name="typeNote"
                onChange={(e) => handleSelectChange(e)}
              >
                <MenuItem value={TypeNote.$10}>RS 10,00</MenuItem>
                <MenuItem value={TypeNote.$50}>RS 50,00</MenuItem>
                <MenuItem value={TypeNote.$100}>RS 100,00</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TextField
              fullWidth
              type="number"
              label="Quantidade"
              InputLabelProps={{ shrink: true }}
              value={formState.quantityNote}
              inputProps={{ min: 1, max: 50, form: 'formDialog' }}
              onChange={handleInputChange}
              name="quantityNote"
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Typography>
              Total: R$
              {' '}
              {formState.typeNote * formState.quantityNote}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}
          >
            <Button onClick={handleRemovePackage}>Remover</Button>
            <Button
              variant="contained"
              onClick={() => savePackage(formState)}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
