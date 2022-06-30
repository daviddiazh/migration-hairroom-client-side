import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FormDetailsOrder } from './pages/FormDetailsOrder'
import Home from './pages/Home'
import Login from './pages/Login'
import NewOrder from './pages/NewOrder'
import SignIn from './pages/SignIn'
import { Welcome } from './pages/Welcome'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/newOrder' element={ <NewOrder /> } />
          <Route path='/formDetailsOrder' element={ <FormDetailsOrder /> } />
          <Route path='/auth/login' element={ <Login /> } />
          <Route path='/auth/signIn' element={ <SignIn /> } />
          <Route path='/admin/welcome' element={ <Welcome /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
