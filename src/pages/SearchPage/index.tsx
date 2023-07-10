import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components'

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const navigate = useNavigate();

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${searchValue}`)
  }

  return (
    <Container>
      <Content>
        <TextField
          onChange={handleChange}
          value={searchValue}
          id="outlined-search" 
          label="검색어를 입력하세요" 
          type="search"
          size="medium"
          sx={{minHeight: '100px'}}
        />
      </Content>

      <Wrapper>

      </Wrapper>
       
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`