import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Grid } from '@mui/material'
import { Alerts } from 'components/alert/Alert'
import { AppBar } from 'components/AppBar'
import { BoxContent } from 'components/Display'
import { Footer } from 'components/Footer'

import { AuthLayout, MainLayout } from './modules'

function App() {
  return (
    <Grid
      container
      gridTemplateRows="64px auto 64px"
      display="grid"
      minHeight="100vh"
      padding={0}
    >
      <Grid
        item
        xs={12}
      >
        <AppBar />
        <Alerts />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <BoxContent>
          <BrowserRouter>
            <Routes>
              <Route
                path="/*"
                element={<MainLayout />}
              />
              <Route
                path="/auth/*"
                element={<AuthLayout />}
              />
            </Routes>
          </BrowserRouter>
        </BoxContent>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Footer />
      </Grid>
    </Grid>
  )
}

export default App
