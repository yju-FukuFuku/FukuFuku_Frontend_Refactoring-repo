import React from 'react'
import { styled } from 'styled-components'
import { themeType } from '../../theme'

const ErrorPage = () => {
  return (
    <Container>
      <H1Color>404 Error</H1Color>
      <PColor>요청하신 페이지를 찾을 수 없습니다</PColor>
    </Container>
  )
}

export default ErrorPage

const H1Color = styled.h1`
  color: ${props => props.theme.textColor1};
`

const PColor = styled.p`
  color: ${props => props.theme.textColor2};
`

const Container =  styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.bgColor1};
`
