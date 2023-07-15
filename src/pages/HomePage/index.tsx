import { Link } from 'react-router-dom'
import Board from "../../components/Board/Board"
import { styled } from 'styled-components'

const MainPage = () => {
  return (
    <Container>
      <div>MainPage
        <Link to='/login'>Login</Link>
        <Board />
      </div>
    </Container>
   
  )
}

export default MainPage

const Container = styled.div`

`