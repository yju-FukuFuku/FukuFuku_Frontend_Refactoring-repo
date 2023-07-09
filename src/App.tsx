import { Routes, Route, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage/'
import MyPage from './pages/MyPage/'
import MyListPage from './pages/MyPage/WriteList'
import MyIntroPage from './pages/MyPage/MyIntro'
import Nav from './components/Nav'
import './App.css'
import SearchPage from './pages/SearchPage'
import RecentPage from './pages/RecentPage'

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
            <Route path='/myPage' element={<MyPage/>} />
            <Route path='/myList' element={<MyListPage/>} />
            {/* <Route path='/myIntro' element={<MyIntroPage/>} /> */}
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
