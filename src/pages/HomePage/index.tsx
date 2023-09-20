import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import Board from '../../components/board'

const MainPage = () => {
  // 타입 지정
  type Post = {
    postId: string;
    id: string;
    name: string;
    body: string;
  }
  const [count, setCount] = useState<string>(''); // test용

  // 데이터 렌더링
  useEffect(() => {
    getData()
  }, [count])

  const [posts, setPost] = useState<Post[]>();
  
  // GetData
  const getData = () => {
    console.log("데이터 렌더링")
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments", {
      headers: {
        "Content-type" : "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPost(data)
      })
  }

  return (
    <>
      <div>MainPage
        <Link to='/login'>Login</Link>
      </div>
      <Container>
        {
          posts ? (
            <Board boardType="main" posts={posts} />
          ) : (
            "none"
          )
        }
      </Container>
    </>

  )
}

export default MainPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2vw;

  @media (max-width: 767px){
    padding: 0;
  }
`