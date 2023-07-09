import { TextField } from '@mui/material'
import { styled } from 'styled-components'

const SearchPage = () => {
  return (
    <Container>
      <Content>
        <TextField 
          id="outlined-search" 
          label="검색어를 입력하세요" 
          type="search"
          size="medium"
          sx={{minHeight: '100px'}}
        />
      </Content>   
    </Container>
    
  )
}

export default SearchPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  top: 100px;
  width: 800px;
`