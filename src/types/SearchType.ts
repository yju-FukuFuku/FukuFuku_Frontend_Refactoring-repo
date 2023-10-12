import { BoardTagType } from "./BoardType";

export type SearchByTagType = {
  id: number;
  name: string;
  board_tag: BoardTagType[];
};
