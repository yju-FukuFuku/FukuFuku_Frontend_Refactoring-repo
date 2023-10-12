import axios from "axios";
import api from ".";

type Comment = {
  content: string;
  boardId: number;
  commenter: string | null;
  img: string | null;
  u_id: number;
};

// 게시물의 댓글 가져오기
export const getComment = async (boardId: number) => {
  const res = await axios.get(`/comments/${boardId}`);
  return res.data;
};

// 댓글 생성
export const postComment = async (comment: Comment) => {
  const res = await api.post("/comments", comment);
  return res.data;
};

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  await axios
    .delete(`/comments/${commentId}`)
    .then((res) => console.log(res.status));
};

// 댓글 수정
export const editComment = async (commentId: number, content: string) => {
  const res = await axios.patch(`/comments/${commentId}`, content);
  return res;
};

export async function getReply(c_id: number | null) {
  console.log(await axios.get(`/replys/${c_id}`));

  const { data } = await axios.get(`/replys/${c_id}`);
  return data;
}
