import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { OperationContainer } from './containers/Operation'
import { OperationsContainer } from './containers/Operations'

export function OperationLayout() {
  return (
    <Routes>
      <Route
        path='/'
        element={<OperationsContainer />}
      />
      <Route
        path='/operation/:id'
        element={<OperationContainer />}
      />
      <Route
        path='/operation'
        element={<OperationContainer />}
      />
    </Routes>
  )
}
