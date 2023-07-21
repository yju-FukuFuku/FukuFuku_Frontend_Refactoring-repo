import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';

interface Board {
  board: {
    id: number;
    title: string;
    content: string;
    view: number;
    createdAt: string;
  }
}[]

const TagPage = () => {

  const { tagId } = useParams()

  // 태그 아이디를 가지고있는 게시글 가져오기
  const getBoardByTag = async () => {
    await axios.get(`http://localhost:3000/tags/${tagId}/boards`)
    .then((res) => {
      getBoard(res.data.board_tag)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getBoard = (board: Board[]) => { 
    board.map((item) => {
      console.log(item);
    })
  }
  
  useEffect(() => {
    getBoardByTag()
  }, [])
  
  return (
    <>
    </>
  )
}

export default TagPage