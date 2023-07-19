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
import { RootState } from './store'
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector((state: RootState) => state.user)
  
  const Layout = () => {
    return (
      <>
        <Nav user={user} />
        
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
            <Route path='/myList' element={<MyListPage/>} />
            <Route path='/setting' element={<MyPage/>} />
            <Route path='@userId' element={<MyListPage/>} />
            <Route path='/saves' element={<SavesPage/>} />
            <Route path='/like' element={<LikePage/>} />
            <Route path='/:boardId' element={<BoardPage />} />
            
            <Route path='/error' element={<ErrorPage />} />
            <Route path='/*' element={<ErrorPage />} />


          </Route>
          
          <Route path='/write' element={<WritePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App