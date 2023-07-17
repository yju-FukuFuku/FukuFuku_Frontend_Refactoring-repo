import React from 'react'
import { styled } from 'styled-components'

const ErrorPage = () => {
  return (
    <Container>
      <h1>404 Error</h1>
      <p>요청하신 페이지를 찾을 수 없습니다</p>
    </Container>
  )
}

export default ErrorPage

const Container =  styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
