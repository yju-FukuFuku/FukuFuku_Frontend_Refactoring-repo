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

export type BoardWriteType = {
  id: number | null;
  title: string;
  content: string;
  images: {
    url: string;
    key: string;
  }[];
  tags: string[];
};

export type BoardEditType = {
  id: number | null;
  b_id: number;
  title: string;
  content: string;
  tags: string[];
  images: {
    url: string;
    key: string;
  }[];
};
