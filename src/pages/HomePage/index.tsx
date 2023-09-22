import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import Board from '../../components/board'
import { getBoards } from '../../api/BoardAPI'
import { PostType } from '../../components/board'

const MainPage = () => {

  const [count, setCount] = useState<string>(''); // test용

  // 데이터 렌더링
  useEffect(() => {
    getData()
  }, [count])

  const [posts, setPost] = useState<PostType[]>();
  
  // GetData
  const getData = () => {
    console.log("데이터 렌더링")

    //   
    getBoards().then((data) => {
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
            <Board posts={posts} />
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