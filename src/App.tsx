import { Routes, Route, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage/'
import Nav from './components/Nav'
import './App.css'

function App() {

  const Layout = () => {
    return (
      <>
        <Nav />
        
        <Outlet />
      </>
    )
  }

  return (
    <>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
