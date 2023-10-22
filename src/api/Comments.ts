import axios from "axios";
import api from ".";
import { CommentPost } from "../types/CommentType";

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
  const res = await axios.delete(`/comments/${commentId}`);
  return res;
};

// 댓글 수정
export const editCommentApi = async (
  commentId: number,
  data: { content: string }
) => {
  const res = await axios.patch(`/comments/${commentId}`, data);
  return res;
};

// 대댓글 생성
export const replyPost = async (reply: CommentPost) => {
  const res = await api.post("/replys", reply);
  return res.data;
};

// 대댓글 수정
export const replyEdit = async (
  commentId: number,
  data: { content: string }
) => {
  const res = await axios.patch(`/replys/${commentId}`, data);
  return res;
};

// 대댓글 삭제
export const replyDeleteApi = async (replyId: number) => {
  const res = await axios.delete(`/replys/${replyId}`);
  return res;
};

export async function getReply(c_id: number | null) {
  console.log(await axios.get(`/replys/${c_id}`));

  const { data } = await axios.get(`/replys/${c_id}`);
  return data;
}
