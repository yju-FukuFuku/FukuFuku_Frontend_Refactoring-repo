import React, { useState, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import Board from '../../components/board'
import { PostType } from '../../components/board'
import { getBoard } from '../../api/BoardAPI'

const LikePage = () => {

  // 데이터 렌더링
  useEffect(() => {
    getData()
  }, [])

  const [posts, setPost] = useState<PostType[]>();
  
  // GetData
  const getData = () => {
    // getBoard()
    //   .then((data) => {
    //     console.log(data)
    //     setPost(data)
    //   })
  }

  return (
    <>
      {/* <H2> 좋아요 목록 </H2> */}
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

export default LikePage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2vw;

  @media (max-width: 767px){
    padding: 0;
  }
`

const H2 = styled.h2`
  font-size: 2rem;
`