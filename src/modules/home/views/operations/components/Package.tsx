import React from 'react'

import LocalMallIcon from '@mui/icons-material/LocalMall'
import {
  Grid, Button, Typography, Box, Chip,
} from '@mui/material'
import { PackageModel, PackageStatus } from 'domain/model/package'

type Props = {
  data: PackageModel
  handleCurrentPackage: (packge: PackageModel) => void
};

export function Package({ data, handleCurrentPackage }: Props) {
  const totalPackage = data.quantityNote * data.typeNote
  const statusDictionary = {
    [PackageStatus.OPENED]: 'ABERTO',
    [PackageStatus.NEW]: 'NOVO',
    [PackageStatus.CLOSED]: 'FECHADO',
  }

  return (
    <Grid
      item
      xs={2}
      display="flex"
      justifyContent="center"
      height={120}
      sx={{ minWidth: 180 }}
    >
      <Button
        variant="outlined"
        fullWidth
        sx={{
          p: 2,
          display: 'grid',
          justifyItems: 'center',
        }}
        onClick={() => handleCurrentPackage(data)}
      >
        <LocalMallIcon
          sx={{
            color: 'rgba(0, 0, 0, 0.54)',
            justifySelf: 'center',
            height: '50px',
            position: 'absolute',
            top: 10,
          }}
        />
        <Typography
          sx={{
            color: 'rgb(0, 148, 0)',
            position: 'absolute',
            top: 55,
            fontWeight: '600',
          }}
        >
          R$
          {' '}
          {totalPackage}
        </Typography>
        <Box
          sx={{
            width: '100%',
            flex: 0,
            display: 'flex',
            position: 'absolute',
            bottom: 10,
            justifyContent: 'center',
          }}
          gap={1}
        >
          <Chip
            label={`R$ ${data.typeNote}`}
            size="small"
            sx={{ fontSize: 'smaller', height: '18px' }}
          />
          <Chip
            label={statusDictionary[data.status]}
            color="default"
            size="small"
            sx={{ fontSize: 'smaller', height: '18px' }}
          />
        </Box>
      </Button>
    </Grid>
  )
}
