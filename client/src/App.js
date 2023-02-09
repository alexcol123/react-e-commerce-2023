import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Menu from './components/Menu'

function App() {
  return (
    <BrowserRouter>
      <Menu />

      <div style={{ marginTop: '63px' }} className=''>
        <Toaster />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
