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

          <Route path='/admin/welcome' element={ <Welcome /> } />
          <Route path='/admin/orders' element={ <Orders /> } />

          <Route path='/*' element={ <Home /> } />

          {/* {
            isLoggedIn 
            ? (
              <>
                <Routes>
                  <Route path='/admin/welcome' element={ <Welcome /> } />
                  <Route path='/admin/orders' element={ <Orders /> } />
                </Routes>
              </>
            )
            : <Route path='/' element={ <Home /> } />
            
          } */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
