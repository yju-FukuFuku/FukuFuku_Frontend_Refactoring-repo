import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const MainPage = () => {
  return (
    <Container>
      <div>MainPage
        <Link to='/login'>Login</Link>
      </div>
    </Container>

  )
}

export default MainPage

const Container = styled.div`

`