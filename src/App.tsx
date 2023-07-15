import { Routes, Route, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MyPage from './pages/MyPage/'
import MyListPage from './pages/MyPage/WriteList'
import Nav from './components/Nav'
import './App.css'
import SearchPage from './pages/SearchPage'
import RecentPage from './pages/RecentPage'
import BoardPage from './pages/BoardPage'
import WritePage from './pages/WritePage'
import ErrorPage from './pages/404Page'
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
            <Route path='/recent' element={<RecentPage />} />
            <Route path=':postId' element={<PostPage />} />
            <Route path='/myPage' element={<MyPage/>} />
            <Route path='/myList' element={<MyListPage/>} />
            <Route path='/saves' element={<SavesPage/>} />
            <Route path='/like' element={<LikePage/>} />
          </Route>
          
          <Route path='/write' element={<WritePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App