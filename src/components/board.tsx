import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

// 타입 지정
export type PostType = {
  id: number;
  u_id: string;
  content: string;
  title: string;
  like: Array<number>;
  views: number;
  createdAt: string;
  comment: Array<number>;
}

interface BoardProps {
  posts: PostType[];
}

const Board = ( { posts }: BoardProps ) => {
  // 배열에 있는 게시글 출력
  const PostList = () => {
    return (
      <PostArray>
        {
          posts?.map((item, index) => (
            <Post key={item.id}>
              <PostLink to='/'>
                <PostImgBox>
                  <PostImg src="/public/images/배경.webp" alt="image" />
                </PostImgBox>
              </PostLink>
              <Body>
                <PostLink to={`/boards/${item.id}`}>
                  <H4>
                    { item.title }
                  </H4>
                  <BodyContent>
                    { item.content } 
                  </BodyContent>
                </PostLink>
                <SubInfo>
                  <span>2023-time</span>
                  <Separator>·</Separator>
                  <span>comment</span>
                </SubInfo>
              </Body>
              <WriterBox>
                <Writer>
                  <Profile src="/public/images/짱구.jpeg" alt="profile" />
                  <span>nickname</span>
                </Writer>
                <div>like</div>
              </WriterBox>
            </Post>
          ))
        }
      </PostArray>
    )
  }

  return (
    <Container>
      <Content>
        {
          PostList()
        }
      </Content>
    </Container>
  )
}

export default Board

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem auto;
  position: relative;
  top: 100px;
  width: 1728px;

  @media all and (max-width:1919px) {
    width: 1376px;
  }

  @media all and (max-width:1440px) {
    width: 1024px;
  }

  @media all and (max-width:1056px) {
    width: calc(100% - 2rem);
  } 
`

const PostArray = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;

  @media (max-width: 767px){
      margin: 0px;
  }
`

const Post = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  margin: 1rem;
  overflow: hidden;
  box-sizing: inherit;

  @media all and (max-width:1056px) {
    width: calc(50% - 2rem);
  }
  @media (max-width: 767px){
    margin: 0;
    width: 100%;
  }
`

const PostImgBox = styled.div`
  width: 100%;
  position: relative;
  padding-top: 52.1921%;
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

const Body = styled.div`
  display: flex;
  padding: 1rem;
  flex: 1 1 0%;
  flex-direction: column;
`

const H4 = styled.h4`
  font-size: 1rem;
  margin-top: 0px;
  margin-bottom: 0.25rem;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const BodyContent = styled.div`
  height: 3.9375rem;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  word-break: break-word;
  overflow-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  box-sizing: inherit;
  line-height: 1.5;
`

const PostLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const SubInfo = styled.div`
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgb(155, 155, 155);
`

const WriterBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 1rem;
  font-size: 0.75rem;
  line-height: 1.5;
  border-top: 1px solid rgb(235, 235, 235);
`

const Writer = styled.div`
  display: flex;
  align-items:center;
`

const Separator = styled.div`
  margin: 0px 0.5rem;
`

const Profile = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  border-radius: 50%;
`