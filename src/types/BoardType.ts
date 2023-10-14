import { UserType } from "./UserType";

export type BoardType = {
  id: number;
  title: string;
  content: string;
  u_id: number;
  createdAt: string;
  views: number;
  user: UserType;
  board_tag: {
    tag: TagType;
  }[];
  comment: CommentType[];
  images: ImagesType[];
  like: BoardLikeType[];
};

export type BoardLikeType = {
  u_id: number;
};

export type TagType = {
  id: number;
  name: string;
};

export type CommentType = {
  id: number;
  u_id: number;
  boardId: number;
  commenter: string;
  content: string;
  user: UserType;
};

export type BoardTagType = {
  id: number;
  b_id: number;
  tagId: number;
  board: BoardType;
};

export type BoardWriteType = {
  id: number | null;
  title: string;
  content: string;
  images: ImagesType[];
  tags: string[];
};

export type BoardEditType = {
  id: number | null;
  b_id: number;
  title: string;
  content: string;
  tags: string[];
  images: ImagesType[];
};

export type ImagesType = {
  url: string;
};

export type BoardLikeWriteType = {
  u_id: number;
  b_id: number;
};
