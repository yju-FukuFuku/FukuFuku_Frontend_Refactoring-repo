import axios from "axios";

type Comment = {
  content: string;
  boardId: number;
  commenter: string;
  img: string;
  u_id: number;
}

// 게시물의 댓글 가져오기
export const getComment = async (boardId: number) => {
  const { data } = await axios.get(`/comments/${boardId}`);
  return data;
}

// 댓글 생성
export const postComment = async (comment: Comment) => {
  await axios.post('/comments', comment)
    .then((res) => {
      console.log(res.status)
      const { data } = res;
      return data;
    }
  )
    .catch((error) => console.log(error)
  );
}

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  await axios.delete(`/comments/${commentId}`)
    .then((res) => console.log(res.status)
  )
}

// 댓글 수정
export const editComment = async (commentId:number, content: string) => {
  await axios.patch(`/comments/${commentId}`, content)
    .then
}

export async function getReply(c_id: number | null) {
  console.log(await axios.get(`/replys/${c_id}`));
  
  const { data } = await axios.get(`/replys/${c_id}`);
  return data;
}