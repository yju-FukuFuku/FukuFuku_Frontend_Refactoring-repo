import axios from 'axios';
import api from '.';

interface Image {
  url: string
  key: string
}

type Board = {
  title: string;
  content: string;
  id: number | null;
  tags: string[];
  images: Image[];
}

// 게시글 작성
export const postBoard = async (board: Board) => {

  const tagId: number[] = [];

  const data = {
    data: {
      title: board.title,
      content: board.content,
      id: board.id,
      images: board.images
    }
  }

  await api.post('/boards', data)
    .then((res) => {
      console.log(res);
    })

  await postTag(board.tags)
    .then((res) => {
      tagId.push(...res);
    })

}

// 태그 작성
export async function postTag(tagList: string[]) {
  const tagData = tagList.map((tag) => ({ name: tag }));

  const tagId: number[] = [];

  for (const tag of tagData) {
    const { data } = await axios.post('/tags', tag)
    tagId.push(data.id);
  }

  return tagId;
}


// 게시물 하나 가져오기
export async function getBoardById(id: number | null) {
  const { data } = await api.get(`/boards/${id}`)
  return data;
}

// 게시물 태그 연결
export async function postBoardTag(boardId: number, tag: number[]) {

  tag.forEach(async (tagId) => {
    const data = {
      boardId: boardId,
      tagId: tagId
    }

    await axios.post(`/board-tags`, data)
      .then((res) => {
        return res;
      }).catch((error) => {
        console.log(error);
      })
  })
}

// 게시글 수정
export async function fetchBoard(data: { title: string, content: string }, id: number) {
  await axios.patch(`/boards/${id}`, data)
}

// 게시물 태그 수정
export async function fetchBoardTag(tags: string[], id: number) {
  // 기존 태그 삭제
  await axios.delete(`/board-tags/${id}`)

  await postTag(tags)
    .then((res) => {
      postBoardTag(id, res);
    })
}

// 게시글 삭제
export async function deleteBoard(id: number) {
  await axios.delete(`/boards/${id}`)
}


type dateType = "오늘" | "이번 주" | "이번 달" | "올해";

// 게시판 전체 불러오기
// export const getBoards = async (option?: string, date?: dateType) => {
//   // 기본 요청 경로(date는 필수)
//   if (date) {
//     // const responseDate = getCurrentDate(date);
//     // const startDate = responseDate?.startDate;
//     // const endDate = responseDate?.endDate;

//     // console.log(startDate, endDate);

//     const { data } = await axios.get(`/boards`);
//         return data;
//     }
//     const { data } = await axios.get(`/boards?option=${option}`);
//     return data;
// } 

export const getBoard = async (page: number, pageSize: number) => {
  // 기본 요청 경로(date는 필수)
  // if (date) {
  //   const responseDate = getCurrentDate(date);
  //   const startDate = responseDate?.startDate;
  //   const endDate = responseDate?.endDate;

  //   console.log(startDate, endDate);

  //   const { data } = await axios.get(`/boards`);
  //       return data;
  //   }
  const { data } = await axios.get(`/boards`);  //?_page=${page}&_limit=${pageSize}
  console.log(page);
  return data;
}

export const getLikeBoard = async (page: string) => {
  const { data } = await axios.get(`/boards/${page}`);  //?_page=${page}&_limit=${pageSize}
  console.log(page);
  return data;
}

export const getUserBoard = async (nickName : string | undefined) => {
  const { data } = await axios.get(`/boards/author/${nickName}`)
  console.log(data)
  return data[0];
}

// 검색된 게시글
export const getSearchData = async (nickName: string, debounce: string) => {
  const { data } = await axios.get(`/boards/user/${nickName}?keyword=${debounce}`)

  return data
}

// date를 받아서 startDate와 endDate를 구해주는 함수
function getCurrentDate(date?: dateType) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dayOfWeek = now.getDay();
  const endDate = `${year}-${month}-${day}`
  if (date === "오늘") {
    const startDate = endDate;
    return { startDate, endDate };
  } else if (date === "이번 주") {
    const timestamp = Date.parse(`${year}-${month}-${day}`) - (86400000 * dayOfWeek);
    const startTimestamp = new Date(timestamp);
    const startYear = startTimestamp.getFullYear();
    const startMonth = String(startTimestamp.getMonth() + 1).padStart(2, "0");
    const startDay = String(startTimestamp.getDate()).padStart(2, "0");
    const startDate = `${startYear}-${startMonth}-${startDay}`
    return { startDate, endDate };
  } else if (date === "이번 달") {
    const startDate = `${year}-${month}-01`;
    return { startDate, endDate };
  } else if (date === "올해") {
    const startDate = `${year}-01-01`;
    return { startDate, endDate };
  }
}

