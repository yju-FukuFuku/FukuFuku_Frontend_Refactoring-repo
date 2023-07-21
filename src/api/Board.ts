import axios from 'axios';

type Board = {
  title: string;
  content: string;
  u_id: number | null;
  tags: string[];
}

// 게시글 작성
export const postBoard = async (board: Board) => {

  const tagId: number[] = [];

  const data = {
    title: board.title,
    content: board.content,
    u_id: board.u_id
  }

  board.tags.forEach(async (tag) => {
    await axios.post('/tags', {
      name: tag,
    }).then((res) => {
      tagId.push(res.data.id);
    }).catch((error) => {
      console.log(error);
    })
  })

  await axios.post('/boards', data)
  .then((res) => {
    postBoardTag(res.data.id, tagId);
  }).catch((error) => {
    console.log(error);
  })
  
  // await tokenAccess().then((accessToken) => {
  //   axios.post('/boards', board, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     }
  //   })
  // }).catch((error) => {
  //   console.log(error);
  // })
}

// 게시물 하나 가져오기
export async function getBoardById(id: number | null) {
  const { data } = await axios.get(`/boards/${id}`);
  return data;
}

// 게시물 태그 연결
export async function postBoardTag(boardId: number, tag: number[]) {
  console.log(boardId, tag);
  
  tag.forEach(async (tagId) => {
    const data = {
      boardId: boardId,
      tagId: tagId
    }
    await axios.post(`/board-tags`, data)
    .then((res) => {
      return res;
    }).catch((error) => {
      console.log(error);
    })
  })
}

// 게시글 수정
export async function fetchBoard(data: {title: string, content: string}, id:number ) {
  await axios.patch(`/boards/${id}`, data)
}