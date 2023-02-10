import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Menu from './components/nav/Menu'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/routes/PrivateRoute'
import NotFoundPage from './pages/NotFoundPage'
import Secret from './pages/Secret'

function App() {
  return (
    <BrowserRouter>
      <Menu />

      <div style={{ marginTop: '55px' }} className=''>
        <Toaster />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Private Route */}
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route index  element={<Dashboard />} />
            <Route path='secret' element={ <Secret />} />
          </Route>

          <Route path='*' element={< NotFoundPage />}  replace/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
