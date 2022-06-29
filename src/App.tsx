import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NewOrder from './pages/NewOrder'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/newOrder' element={ <NewOrder /> } />
          {/* <Route path='/login' element={ <Login /> } />
          <Route path='/signIn' element={ <SignIn /> } /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
