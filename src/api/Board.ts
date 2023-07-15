import axios from 'axios';
import { tokenAccess } from '../hooks/useTokenAccess';

type Board = {
  title: string;
  content: string;
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

