import React from 'react'
import { Link } from 'react-router-dom'
import Board from "../../components/Board"

const MainPage = () => {
  return (
    <>
      <div>MainPage
        <Link to='/login'>Login</Link>
        <Board />
      </div>
    </>
   
  )
}

export default MainPage