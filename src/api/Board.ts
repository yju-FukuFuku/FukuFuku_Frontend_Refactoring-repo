import axios from 'axios';

type Board = {
  title: string;
  content: string;
  u_id: number | null;
  tags: string[];
}

export async function postBoard(board: Board) {

  const data = {
    title: board.title,
    content: board.content,
    u_id: board.u_id
  }

  await axios.post('/boards', data)
  .then((response) => {
    console.log(response);
    
    postTag(response.data.id, board.tags);
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

export async function postTag(boardId: number, tag: string[]) {
  const data = {
    boardId: boardId,
    tag: tag
  }

  console.log(data);

  await axios.post(`/tags`, data)
  .then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  })
}
