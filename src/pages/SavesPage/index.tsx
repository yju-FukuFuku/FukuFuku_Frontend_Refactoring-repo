import React, { useState, useEffect, useRef } from 'react'
import { styled } from 'styled-components'

const SavesPage = () => {
  // 배열 데이터 타입 지정
  type save = {
    postId: string;
    name: string;
    body: string;
    id: string;
  }

  // Data 불러오기
  const [savesData, setSaves] = useState<save[]>()

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments", {
      headers: {
        "Content-type" : "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setSaves(data)
      })
      .catch((error) => console.log(error))
    
  }

  useEffect(() => {
    getData()
  }, [])

  // 임시 글 삭제 버튼
  const handleRemoveSaves = () => {
    fetch("")
      .then((response) => response.json())
      .then((data) => {
        console.log("삭제 성공")
      })
  }

  // 임시 저장 글 출력
  const savesList = () => {
    console.log(savesData)
    return (
      <div>
        {savesData?.map((item, index) => (
        <List key={index}>
          <H3>{ item.name }</H3>
          <Body>{ item.body }</Body>
          <Section>
            <SubInfo>약 17시간 전</SubInfo>
            <Button onClick={handleRemoveSaves}>삭제</Button>
          </Section>
        </List>
        ))}
      </div>
    )
  }

  return (
    <Container>
      <Content>
        <H1>임시 글 목록</H1>
          {
            savesList()
          }
      </Content>
    </Container>
  )
}

export default SavesPage

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
  width: 768px;
`

const List = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid rgb(215, 215, 215);
`

const H1 = styled.h1`
  font-size: 3rem;
  margin: 3rem 0;
`
const H3 = styled.h3`
  font-size: 1.5rem;
  margin-top: 0px;
  margin-bottom: 1.5rem;
`

const Body = styled.p`
  margin-top: 0px;
  margin-bottom: 16px;
`

const Section = styled.section`
display: flex;
justify-content: space-between;
font-size: 0.875rem;
`

const SubInfo = styled.span`
  color: rgb(150, 150, 150);
  font-size: 14px
`

const Button = styled.button`
  text-decoration: underline;
  background: none;
  outline: none;
  border: none;
  padding: 0;

`