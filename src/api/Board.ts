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

  await postTag(board.tags)
  .then((res) => {
    tagId.push(...res);
  })


  await axios.post('/boards', data)
  .then((res) => {
    console.log(res);
    
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

// 태그 작성
export async function postTag(tagList: string[]) {
  const tagData = tagList.map((tag) => ({ name: tag }));

  const tagId: number[] = [];

  for (const tag of tagData) {
    const { data } = await axios.post('/tags', tag)
    tagId.push(data.id);
  }

  return tagId;
}

// 게시물 하나 가져오기
export async function getBoardById(id: number | null) {
  const { data } = await axios.get(`/boards/${id}`);
  console.log(await axios.get(`/boards/${id}`));
  
  return data;
}

// 게시물 태그 연결
export async function postBoardTag(boardId: number, tag: number[]) {

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

// 게시물 태그 수정
export async function fetchBoardTag(tags: string[], id: number) {
  // 기존 태그 삭제
  await axios.delete(`/board-tags/${id}`)

  await postTag(tags)
  .then((res) => {
    postBoardTag(id, res);
  })
}

// 게시글 삭제
export async function deleteBoard(id: number) {
  await axios.delete(`/boards/${id}`)
}