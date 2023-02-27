import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Menu from './components/nav/Menu'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/routes/PrivateRoute'
import NotFoundPage from './pages/NotFoundPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRoute from './components/routes/AdminRoute'
import AdminProduct from './pages/admin/AdminProduct'
import AdminCategory from './pages/admin/AdminCategory'
import UserProfile from './pages/user/UserProfile'
import UserOrders from './pages/user/UserOrders'
import AdminProductList from './pages/admin/AdminProductList'
import AdminProductUpdate from './pages/admin/AdminProductUpdate'
import Shop from './pages/Shop'
import Search from './pages/Search'
import ProductView from './pages/ProductView'
import CategoriesList from './pages/CategoriesList'
import CategoryView from './pages/CategoryView'
import Cart from './pages/Cart'
import AdminOrders from './pages/admin/AdminOrders'

function App() {
  return (
    <BrowserRouter>
      <Menu />

      <div style={{ marginTop: '55px' }} >
        <Toaster />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/search' element={<Search />} />
          <Route path='/product/:slug' element={<ProductView />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/categories' element={<CategoriesList />} />
          <Route path='/category/:slug' element={<CategoryView />} />
          <Route path='/cart' element={<Cart />} />


          {/* User Private Routes  */}
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='user' element={<Dashboard />} />
            <Route path='user/profile' element={<UserProfile />} />
            <Route path='user/orders' element={<UserOrders />} />
          </Route>

          {/* Admin Private Routes  */}
          <Route path='/dashboard' element={<AdminRoute />}>
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='admin/product' element={<AdminProduct />} />
            <Route path='admin/orders' element={<AdminOrders />} />
            <Route path='admin/category' element={<AdminCategory />} />
            <Route path='admin/products' element={<AdminProductList />} />
            <Route path='admin/product/update/:slug' element={<AdminProductUpdate />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} replace />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
