import axios from 'axios';
import api from '.';

axios.interceptors.request.use(
  (config) => {
    const token = /* 토큰 설정 필요 */"";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
)

// 닉네임 중복체크
export async function getCheck(nickName: string | null) {
  const { data } = await api.get(`/user/check/${nickName}`)
  return data;
}

type UserName = {
  data: {
    where: {
      id: number
    },
    data: {
      nickName: string
    }
  }
}

// 닉네임 수정
export async function editName(nickName: UserName) {
  const { data } = await api.put(`/user/editNickname`, nickName) 
  return data;
}

type Content = {
  updateData: {
    email: string;
  };
  data: {
    introduction: string;
  };
}

// 한줄 소개
// export async function introChange(content : Content) {
//   await axios.patch('/user/editIntroduction', {
//     content
//   })
//     .then(({data}) =>
//       console.log(data)
//     )
//     .catch(({response}) => {
//       alert(response.data.message)
//     })
// }

type User = {
  data: {
    where: {
      id: number;
    };
  };
}

// 회원 탈퇴
export async function deleteUser(user : User) {
  await api.get(`/user/withdraw`, user)
    .then(({data}) =>
      console.log(data)
    )
    .catch(({response}) => {
      alert(response.data.message)
    })
}