import axios from 'axios';
import { tokenAccess } from '../hooks/useTokenAccess';

type Board = {
  title: string;
  content: string;
}

export async function postBoard(board: Board) {
  
  const accessToken = await tokenAccess();
  console.log(accessToken);

  await axios.post('/boards', board, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  })
}
