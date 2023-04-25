import React, { useContext } from 'react'

import { Typography } from '@mui/material'
import Alert, { AlertColor } from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import styled from 'styled-components'


import { AlertContext } from './AlertContext'

const DivAlert = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
`

export type AlertType = {
  id?: number
  type: AlertColor
  message: string
  title: string
};

export function Alerts() {
  const { alerts, handleCloseAlert } = useContext(AlertContext)

  return (
    <DivAlert>
      {alerts.map(({
        id, type, title, message,
      }, index) => (
        <Alert
          severity={type}
          key={index}
          onClose={() => handleCloseAlert(id as number)}
        >
          <AlertTitle>{title}</AlertTitle>
          <Typography>{message}</Typography>
        </Alert>
      ))}
    </DivAlert>
  )
}
