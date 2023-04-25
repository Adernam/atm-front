import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { Grid } from '@mui/material'
import { PrivateRoute } from 'components/PrivateRoute'
import DrawerMenu from 'components/SideBar/DrawerMenu'

import { UsersLayout } from './views/clients'
import { OperationLayout } from './views/operations'

export function MainLayout() {
  return (
    <Grid
      id="gridHomeLayout"
      display="grid"
      container
      columns={2}
      gridRow={1}
      direction="column"
      gridTemplateColumns="240px auto"
      height="100%"
    >
      <Grid
        item
        xs={12}
      >
        <DrawerMenu />
      </Grid>
      <Grid item>
        <Routes>
          <Route
            path="/clients/*"
            element={<PrivateRoute render={<UsersLayout />} />}
          />
          <Route
            path="/operations/*"
            element={<PrivateRoute render={<OperationLayout />} />}
          />

          <Route
            path="*"
            element={<Navigate to="/operations" />}
          />
        </Routes>
      </Grid>
    </Grid>
  )
}
