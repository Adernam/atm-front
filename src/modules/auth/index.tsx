import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Signin } from './views/signin/containers/Signin'
import { Signup } from './views/signup/containers/Signup'

export function AuthLayout() {
  return (
    <Routes>
      <Route
        path="/signup"
        element={<Signup />}
      />
      <Route
        path="/signin"
        element={<Signin />}
      />
    </Routes>
  )
}
