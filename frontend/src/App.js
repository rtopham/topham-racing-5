import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Container from 'react-bootstrap/Container'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddRace from './pages/AddRace'
import PrivateRoute from './components/shared/PrivateRoute'
import Dashboard from './pages/Dashboard'
import EditRaces from './pages/EditRaces'
import EditRace from './pages/EditRace'
import UserRaces from './pages/UserRaces'
import Stats from './pages/Stats'
import Strava from './pages/Strava'
import Banner from './components/banners/Banner'
import SandBox from './pages/SandBox'
import ManageBanners from './pages/ManageBanners'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={null} />
            <Route path='/login' element={null} />
            <Route path='/register' element={null} />
            <Route path='/dashboard/:userId' element={null} />
            <Route path='/add-race' element={null} />
            <Route path='/edit-races' element={null} />
            <Route path='/sandbox' element={null} />
            <Route path='/banners' element={null} />
            <Route path='/:userId' element={<Banner />} />
            <Route path='/stats/:userId' element={<Banner />} />
            <Route path='/strava/:userId' element={<Banner />} />
            <Route path='/strava/:userId' element={<Banner />} />
          </Routes>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:userId' element={<UserRaces />} />
            <Route path='/stats/:userId' element={<Stats />} />
            <Route path='/strava/:userId' element={<Strava />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/sandbox' element={<SandBox />} />
            <Route
              path='/add-race'
              element={
                <PrivateRoute>
                  <AddRace />
                </PrivateRoute>
              }
            />
            <Route
              path='/dashboard/:userId'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/edit-races'
              element={
                <PrivateRoute>
                  <EditRaces />
                </PrivateRoute>
              }
            />
            <Route
              path='/banners'
              element={
                <PrivateRoute>
                  <ManageBanners />
                </PrivateRoute>
              }
            />
            <Route
              path='/race/:raceId'
              element={
                <PrivateRoute>
                  <EditRace />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
