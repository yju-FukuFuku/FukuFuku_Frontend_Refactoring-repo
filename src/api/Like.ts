import api from ".";
import { BoardLikeWriteType } from "../types/BoardType";

export const likeBoard = async (data: BoardLikeWriteType) => {
  console.log("like");

  return await api.post("/like", { data });
};

export const unLikeBoard = async (data: BoardLikeWriteType) => {
  console.log("unlike");
  return await api.delete("/like", { data: { data } });
};
