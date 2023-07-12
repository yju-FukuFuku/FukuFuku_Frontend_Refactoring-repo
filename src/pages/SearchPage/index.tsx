import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'


const SearchPage = () => {
  type postType = {
    id: string;
    name: string;
    body: string;
  }

  // data 불러오기
  const [postData, setPostData] = useState<postType[]>()

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments", {
      headers: {
        "Content-type" : "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPostData(data)
      })
  }

  useEffect(() => {
    getData()
  }, [])


  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

  // 검색 값 가져오기
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  // router 반영
  const changeNavigate = (url: string) => {
      navigate(`/search?q=${url}`)
  }

  // 함수 호출
  useEffect(() => {
    changeNavigate(searchValue)
  }, [searchValue])

  // SearchFilter 함수 
  const filterTitle = postData?.filter((p) => {
    // 대소문자 통일 후 배열에 요소가 존재하는지 확인
    return p.name.replace(" ", "").toLocaleLowerCase().includes(searchValue.replace(" ", "").toLocaleLowerCase())
  })

  // 배열에서 검색한 값만 불러오기
  const getSearchList = () => {
    if(filterTitle?.length !== 0 && searchValue != ""){
      return (
        <Wrapper>
            <SearchLength>총 <Length>{ filterTitle?.length }</Length> 개의 포스터를 찾았습니다.</SearchLength>
          {filterTitle?.map((item, index) => (
            <SearchPost key={item.id}>
              {/* 게시판 만들기 */}
              <Profile>
                <ProfileImg src="/public/images/짱구.jpeg" alt="profile" />
                <ProfileName>nickname</ProfileName>
              </Profile>
              <PostLink to='/'>
                <PostImgBox>
                  <PostImg src='/public/images/배경.webp' />
                </PostImgBox>
              </PostLink>
              <PostLink to='/'>
                <H3>{ item.name }</H3>
              </PostLink>
              <PostContent>{ item.body }</PostContent>
              <SubInFo>
                <span>time</span>
                <Separator>·</Separator>
                <span>comment</span>
                <Separator>·</Separator>
                <span>like</span>
              </SubInFo>
            </SearchPost>
          ))}
        </Wrapper>
      )
    } else {
      return (
        <NotFind>
          <p>일치하는 게시글이 없습니다.</p>
        </NotFind>
      )
    }
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
          sx={{minHeight: '80px'}}
        />

          { getSearchList() }
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
  margin: 3.5rem auto;
  position: relative;
  top: 100px;
  width: 768px;
`

const Wrapper = styled.div`
  box-sizing: inherit
`

const SearchPost = styled.div`
  padding: 2rem 0;
  line-height: 1.5;
`

const Profile = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 1.5rem;
`

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;  
  border-radius: 1.5rem;
  margin-right: 1rem;
`

const ProfileName = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
`

const PostImgBox = styled.div`
  width:100%;
  padding-top: 52.356%;
  margin-bottom: 1rem;
  position: relative;
`

const PostImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`

const H3 = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`

const PostContent = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  word-break: keep-all;
  overflow-wrap: break-word;
`

const SubInFo = styled.div`
  display: flex;
  align-item: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: rgb(155, 155, 155);
`

const Separator = styled.div`
  margin: 0px 0.5rem;
`

const NotFind = styled.div`
  display: flex;
  justify-content: center;
`

const SearchLength = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.125rem;
  line-height: 1.5;
  color: rgb(55, 55, 55);
  font-weight: 300;
`

const Length = styled.b`
  color: black;
  box-sizing: inherit;
  margin-left: 0.25rem;
`

const PostLink = styled(Link)`
color: inherit;
text-decoration: none;
`