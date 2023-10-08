import api from '.';
import axios from 'axios';

// 닉네임 중복체크
export async function getCheck(nickName: string | null) {
  const { data } = await api.get(`/user/check/${nickName}`)
  return data;
}


// 닉네임 수정
export function editName(id: number, nickName: string) {
  const data = {
    data: {
      where: {
        id
      },
      data: {
        nickName
      },
    }
  }

  return api.put("/user/editNickname", data);
}


// 한줄 소개
export function introChange(id: number, introduction: string) {
  const data = {
    data: {
      where: {
        id
      },
      data: {
        introduction
      },
    }
  }

  return api.patch("/user/editIntroduction", data);
}

// 자기가 쓴 글 목록
export const getMyBoard = async (nickName : string | undefined) => {
  const { data } = await axios.get(`/user/${nickName}`)
  return data;
}

type User = {
  data: {
    where: {
      id: number;
    };
  };
}

// 회원 탈퇴
export async function deleteUser(data: User) {
  return api.delete("/user/withdraw", { data })
}