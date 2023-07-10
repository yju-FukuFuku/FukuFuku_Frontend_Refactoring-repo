import { Routes, Route, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage/'
import Nav from './components/Nav'
import './App.css'
import SearchPage from './pages/SearchPage'
import RecentPage from './pages/RecentPage'
import PostPage from './pages/PostPage'
import WritePage from './pages/WritePage'

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
            <Route path='/search' element={<SearchPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/recent' element={<RecentPage />} />
            <Route path=':postId' element={<PostPage />} />
          </Route>
          
          <Route path='/write' element={<WritePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
