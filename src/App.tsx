import React, { useContext } from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { FormDetailsOrder } from './pages/FormDetailsOrder'
import Home from './pages/Home'
import Login from './pages/Login'
import NewOrder from './pages/NewOrder'
import SignIn from './pages/SignIn'
import { Welcome } from './pages/Welcome'
import { AuthContext } from './context/auth/AuthContext';
import Orders from './pages/Orders'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/layouts/Layout'

const App = () => {

  const { isLoggedIn } = useContext( AuthContext )

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/newOrder' element={ <NewOrder /> } />
          <Route path='/formDetailsOrder' element={ <FormDetailsOrder /> } />
          <Route path='/auth/login' element={ <Login /> } />
          <Route path='/auth/signIn' element={ <SignIn /> } />

          <Route path='/admin/welcome' element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          } />
          <Route path='/admin/orders' element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />

          <Route path='/*' element={ <Home /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
