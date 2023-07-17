import axios from 'axios';

type Board = {
  title: string;
  content: string;
  u_id: number | null;
}

export async function postBoard(board: Board) {

  await axios.post('/boards', board).then((response) => {
    console.log(response);
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

