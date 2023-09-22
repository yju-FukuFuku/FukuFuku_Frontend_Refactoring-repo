import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import Board from '../../components/board'
import { PostType } from '../../components/board'

const LikePage = () => {

  // 데이터 렌더링
  useEffect(() => {
    getData()
  }, [])

  const [posts, setPost] = useState<PostType[]>();
  
  // GetData
  const getData = () => {
    console.log("데이터 렌더링")
    fetch("http://localhost:3000/posts/1/comments", {
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
    <Container>
        <H2>좋아요 목록</H2>
        {
          posts ? (
            <Board posts={posts} />
          ) : (
            "none"
          )
        }
    </Container>
  )
}

export default LikePage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
`

const H2 = styled.h2`
  font-size: 2rem;
  margin: 1rem 0;
`