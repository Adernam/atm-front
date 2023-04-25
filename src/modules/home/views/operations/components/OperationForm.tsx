import React from 'react'
import { useContext, useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { AlertContext } from 'components/alert/AlertContext'
import { OperationModel, OperationStatus } from 'domain/model/operation'
import { PackageModel } from 'domain/model/package'
import { useForm } from 'utils/hooks/useForm'

import { DialogPackage } from './Dialog'
import { Package } from './Package'

type Props = {
  saveOperation: (operation: OperationModel) => void
  data?: OperationModel
}

export function OperationForm({ data, saveOperation }: Props) {
  const { addAlert } = useContext(AlertContext)
  const [open, setOpen] = useState<boolean>(false)
  const { formState, setFormState, handleInputChange } =
    useForm<OperationModel>({
      amount: 0,
      packages: [],
      status: OperationStatus.CREATED,
    })
  const [packageToEdit, setPackageToEdit] = useState<PackageModel | undefined>(
    undefined
  )

  const handleDialog = () => {
    setOpen(!open)
  }

  const totalAmountPackages = () =>
    formState.packages.reduce(
      (prev, curr) => prev + curr.quantityNote * curr.typeNote,
      0
    )

  const savePackage = (pkg: PackageModel) => {
    setFormState((prevState) => {
      const packages = [...prevState.packages]
      const packageIndex = packages.findIndex(
        (p: PackageModel) => p.id === pkg.id
      )

      if (packageIndex < 0) {
        packages.push(pkg)
      } else {
        packages[packageIndex] = pkg
      }

      return { ...prevState, packages }
    })

    handleDialog()
    setPackageToEdit(undefined)
  }

  const handleEditPackage = (packge: PackageModel) => {
    setPackageToEdit(packge)
    handleDialog()
  }

  const removePackage = (idPackage: string) => {
    setFormState((prevState) => {
      const packages = [...prevState.packages]
      const packageIndex = packages.findIndex(
        (p: PackageModel) => p.id === idPackage
      )

      if (packageIndex >= 0) {
        packages.splice(packageIndex, 1)
      }

      return {
        ...prevState,
        packages,
      }
    })

    handleDialog()
  }

  const handleSaveOperation = () => {
    if (totalAmountPackages() !== +formState.amount) {
      return addAlert({
        message:
          'A soma total dos pacotes não corresponde ao total da operação.',
        title: 'Atenção',
        type: 'warning',
      })
    }
    saveOperation(formState)
  }

  useEffect(() => {
    if (data) {
      setFormState(data)
    }
  }, [data, setFormState])

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sx={{ width: '100%' }}
        >
          <FormControl fullWidth>
            <InputLabel htmlFor='outlined-adornment-amount'>Valor</InputLabel>
            <OutlinedInput
              type='number'
              id='outlined-adornment-amount'
              startAdornment={
                <InputAdornment position='start'>R$</InputAdornment>
              }
              inputProps={{ step: 10 }}
              label='Amount'
              value={formState.amount}
              name='amount'
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Grid
            container
            sx={{
              p: 2,
              border: '1px solid rgba(0, 0, 0, 0.24)',
              borderRadius: '4px',
            }}
            rowGap={2}
          >
            <Grid
              item
              xs={12}
            >
              <Typography
                variant='h6'
                sx={{
                  color: 'rgba(0, 0, 0, 0.54)',
                }}
              >
                Pacotes
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Grid
                container
                sx={{
                  gap: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {formState.packages.map((pkg: any) => (
                  <Package
                    data={pkg}
                    key={pkg.id}
                    handleCurrentPackage={handleEditPackage}
                  />
                ))}
                <Grid
                  item
                  xs={2}
                  display='flex'
                  justifyContent='center'
                  height={120}
                  sx={{ minWidth: 180 }}
                >
                  <Button
                    variant='outlined'
                    fullWidth
                    sx={{
                      p: 2,
                    }}
                    onClick={handleDialog}
                  >
                    <AddIcon color='action' />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Typography variant='body1'>
                Total: R$ {totalAmountPackages()}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <Button
                variant='contained'
                sx={{ float: 'right' }}
                onClick={handleSaveOperation}
              >
                salvar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {open && (
        <DialogPackage
          handleDialog={handleDialog}
          savePackage={savePackage}
          data={packageToEdit}
          removePackage={removePackage}
        />
      )}
    </>
  )
}
