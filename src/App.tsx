import { Routes, Route, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage/'
import MyPage from './pages/MyPage/'
import MyListPage from './pages/MyPage/WriteList'
import Nav from './components/Nav'
import './App.css'
import SearchPage from './pages/SearchPage'
import RecentPage from './pages/RecentPage'
import PostPage from './pages/PostPage'
import WritePage from './pages/WritePage'
import SavesPage from './pages/SavesPage'
import LikePage from './pages/LikeListPage'

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
            <Route path='/setting' element={<MyPage/>} />
            <Route path='/myList' element={<MyListPage/>} />
            <Route path='/saves' element={<SavesPage/>} />
            <Route path='/Like' element={<LikePage/>} />
          </Route>
          
          <Route path='/write' element={<WritePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App