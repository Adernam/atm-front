import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ClientsContainer, ClientContainer } from './containers'

export function UsersLayout() {
  return (
    <Routes>
      <Route
        path='/'
        element={<ClientsContainer />}
      />
      <Route
        path='/client/:id'
        element={<ClientContainer />}
      />
    </Routes>
  )
}
