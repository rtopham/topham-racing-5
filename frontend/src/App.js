import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddRace from './pages/AddRace'
import PrivateRoute from './components/shared/PrivateRoute'
import Dashboard from './pages/Dashboard'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/add-race'
            element={
              <PrivateRoute>
                <AddRace />
              </PrivateRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
