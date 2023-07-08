import React from 'react'
import { Link } from 'react-router-dom'
import Board from "../../components/Board"
import { styled } from 'styled-components'

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

const Container = styled.div`
  height: 1000vh;
`