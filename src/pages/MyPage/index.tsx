import React, { useState, useEffect, useRef } from 'react'
import style from './myPage.module.css'
import useDebounce from '../../hooks/useDebounce';
import Swal from 'sweetalert2'  // 경고창 라이브러리
import { useSelector } from 'react-redux';
<<<<<<< HEAD
import { RootState } from '../../store';
import { getCheck, deleteUser,editName } from '../../api/User';
=======
import { RootState, store } from '../../store';
import api from '../../api';
import { setUser } from '../../store/User';
import { useNavigate } from 'react-router-dom';
>>>>>>> 88f521653fa82880e5e8c002c9d80ff82152a41c

const MyPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const token = useSelector((state: RootState) => state.token);
  const userEmail = user.email || '불러오지 못했습니다.';
  const myHeader = new Headers();
<<<<<<< HEAD
  myHeader.append( 'Content-type', 'application/json' )
  myHeader.append( 'Authorization', `Bearer ${token}` )

  const [userId, setUserId] = useState<string>('');
=======
  myHeader.append('Content-type', 'application/json')
  myHeader.append('Authorization', `Bearer ${token}`)
  
>>>>>>> 88f521653fa82880e5e8c002c9d80ff82152a41c
  const [userName, setName] = useState<string>('');
  const [file, setFile] = useState<string>('')
  const [content, setContent] = useState<string | undefined>('')    // 한 줄 소개
  const [reName, setReName] = useState<boolean>(false)  // 닉네임 수정 check
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 이미지 불러오기
  const [introCheck, setIntroCheck] = useState<boolean>(false)
  
  
  // 유저 정보 불러오기 (한 줄 소개, 닉네임, 이미지가 바뀔 떄마다)
  useEffect(() => {
    if (!user.isLogin) {
      window.alert("로그인 후에 사용하실 수 있습니다.")
      navigate('/');
    }
    getData();
  }, []);

  const getData = () => {
    setName(user.nickName ? user.nickName : (userName ? userName : userEmail));
    setFile(user.picture ? user.picture : '');
    setContent(user.introduction || `${user.nickName} 입니다.`)
  }
  
  const handleImageUpdate = () => { // 이미지 변경 요청
    console.log("이미지 변경")
    fileInputRef.current?.click();
  }
  
  const extension = ['.png', '.jpg', '.jpeg'] // 파일 확장자 제한 변수

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileCheck = (e.target.files ? e.target.files[0] : null)

    if (fileCheck) {  // 들어온 파일이 null인지 아닌지 체크
      const checkLength = fileCheck.name.lastIndexOf(".");

      if (extension.includes(fileCheck.name.substring(checkLength, fileCheck.length))) {
        console.log("올바른 확장자입니다.")
        handlePostImg(fileCheck)
      } else {
        console.log("확장자가 틀립니다.")
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: '올바르지 않은 확장자입니다. (jpg, jpeg, png)',
        })
      }
    } else {
      console.log("파일이 선택되지 않았습니다.");
    }
  };

  // 이미지 변경 Post
  const handlePostImg = (e: File) => {
    const formData = new FormData();
    formData.append('file', e);
    myHeader.append('data', userEmail);

    fetch("http://localhost:3000/user/editImage", {
      method: "PUT",
      headers: myHeader,
      body: JSON.stringify({ data: formData })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.statusCode == "200") {
          console.log(data.message)
          setFile(data.picture)
        } else if (data.statusCode == "415") {
          console.log(data.message)
        } else if (data.statusCode == "422") {
          console.log(data.message)
        } else {
          console.log("정의되지 않은 오류입니다.")
        }
      })
  }

  // 버튼 클릭시 reName 입력
  const checkTry = () => {
    setReName(true)
  }

  // 닉네임 중복 체크 - debounce
  const [inputName, setInputName] = useState<string>(userName)
  const debounceVal = useDebounce(inputName, 300) // hook 불러오기

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 띄어쓰기 막기.
    if (!e.target.value.includes(" ")) {
      setInputName(e.target.value)
    }
  }

  // debounceVal의 값이 변경되고 일정 시간이 지날때마다 함수 실행
  useEffect(() => {
    if (debounceVal != '' && debounceVal != userName) {
      handleNameOverlap()
    }
  }, [debounceVal])

  // 닉네임 중복 체크 - Get  
  const handleNameOverlap = () => {
    console.log(debounceVal)
<<<<<<< HEAD
    getCheck(debounceVal)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.statusCode == "200"){
          console.log(data.message)
        } else if(data.statusCode == "409") {
          console.log(data.message)
        } else{
=======
    fetch(`http://localhost:3000/user/check/${debounceVal}`, {
      headers: myHeader,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.statusCode == "200") {
          console.log(data.message)
        } else if (data.statusCode == "409") {
          console.log(data.message)
        } else {
>>>>>>> 88f521653fa82880e5e8c002c9d80ff82152a41c
          console.log("정의되지 않은 오류입니다.")
        }
      })
      .catch((error) => console.log(error))
  }


  // 닉네임 중복체크 후 닉네임 수정 - Put
  const handleNameUpdate = () => {
    console.log("이름 변경")
<<<<<<< HEAD
    const nameObj = {
      data: {
        where: { id: 1 },
        data: { nickName: "test" }
      }
    }

    // api 요청
    editName(nameObj)
=======
    fetch("http://localhost:3000/user/editNickname", {
      method: "PUT",
      headers: myHeader,
      body: JSON.stringify({
        "data": {
          "where": { "email": "9000248@g.yju.ac.kr" },  // 바꾸려는 유저의 이메일
          "data": { "nickName": "test" } // 바꾸려는 닉네임 값
        }
      })
    })
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data)
        if (data.statusCode == "200") {
          console.log(data.message)
          // setName(data.nickName)
          // setReName(false)
          console.log("변경완료")
        } else if (data.statusCode == "400") {
          console.log(data.message)
        } else if (data.statusCode == "409") {
          console.log(data.message)
        }
      })
      .catch((error) => console.log(error))
>>>>>>> 88f521653fa82880e5e8c002c9d80ff82152a41c
    setReName(false)
  }

  // 회원탈퇴 fetch요청
  const handleUserRemove = () => {
    console.log("회원 탈퇴")
<<<<<<< HEAD
    const deleteObj = {
      data: {
        where: {
          id: userId
        }
      }
    }

    deleteUser(deleteObj)
=======
    fetch("http://localhost:3000/user/withdraw", {
      method: "DELETE",
      headers: myHeader,
      body: JSON.stringify({
        "data": {
          "where": { "id": userEmail }
        }
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.statusCode == "201") {
          console.log(data.message)
          console.log("탈퇴 성공")
        } else if (data.statusCode == "400") {
          console.log(data.message)
        } else {
          console.log("정의되지 않은 오류입니다.")
        }
      })
      .catch((error) => console.log(error))
>>>>>>> 88f521653fa82880e5e8c002c9d80ff82152a41c
  }

  // INTRO
  let userData = ''
  // intro 수정 요청
  const handleUpdateCheck = () => {
    setIntroCheck(true)
  }

  // intro 내용 수정
  const changeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    userData = e.target.value
    setContent(userData);
  }

  // 서버로 데이터 전송
<<<<<<< HEAD
  const handleUpdateContent = () => { 
    const introContent = {
      updateData : { email: userEmail },
      data : { introduction: content }
    }

    // fetch 요청
    // introChange(introContent)
    // setContent(userData)

    console.log("수정 완료")
=======
  const handleUpdateContent = () => {
    api.patch("/user/editIntroduction", {
      data: {
        where: {
          id: user.id
        },
        data: {
          introduction: content
        },
      }
    })
      .then(({ data }) => {
        const userInfo = { ...user };
        userInfo.introduction = data.data.introduction;
        store.dispatch(setUser(userInfo));
        console.log("수정 완료")
      })
      .catch(() => {
        window.alert("문제가 생겼습니다. 나중에 다시 시도해주세요.");
        setContent(user.introduction || `${user.nickName} 입니다.`);
      })
>>>>>>> 88f521653fa82880e5e8c002c9d80ff82152a41c
    setIntroCheck(false)
  }

  return (
    <div
      className={style.container}
      style={{ display: `${user.isLogin ? "block" : "none"}` }}
    >
      <div className={style.myPage}>
        <div className={style.profileBox}>
          <div className={style.profile}>
            <div className={style.myImage}>
              <img src='/public/images/짱구.jpeg' alt="image" className={style.myImage} />
            </div>
            <button className={style.imgBtn} onClick={handleImageUpdate}>이미지 수정</button>
            {/* <button className={style.modifyBtn} onClick={handleImageRemove}>이미지 제거</button> */}
            <input type="file" className={style.file} ref={fileInputRef} onChange={handleFileChange} accept='image/*' />
          </div>

          {/* intro 수정 */}
          {introCheck ? (
            <div className={style.introBox}>
              {/* <input type="text" defaultValue={content} onChange={changeContent} maxLength={100} /> */}
              <input type="text" defaultValue={content} onChange={changeContent} maxLength={100} />
              <div className={style.inputBlock}>
                <button className={style.modifyBtn} onClick={handleUpdateContent}>완료</button>
              </div>
            </div>
          ) : (
            <div className={style.introBox}>
              <h2>한 줄 소개</h2>
              <div className={style.intro}>
                {content}
              </div>
              <button className={style.modifyBtn} onClick={handleUpdateCheck}>수정</button>
            </div>
          )}
        </div>
        <div>
          <hr />
        </div>
        <div className={style.setting}>
          <div className={style.wrapper}>
            <div className={style.wrapperList}>
              <label>아이디</label>
              <div>{userEmail}</div>
            </div>
            <p>회원가입 하신 ID입니다.</p>
          </div>
          <div className={style.wrapper}>
            {/* nickname 수정 */}
            {reName ? (
              <div className={style.wrapperList}>
                <label>닉네임</label>
                <input type="text" className={style.username} value={inputName} onChange={handleInputName} maxLength={20} />
                <span className={style.updateName}>
                  <button className={style.updateBtn} onClick={handleNameUpdate}>저장</button>
                </span>
              </div>
            ) : (
              <div className={style.wrapperList}>
                <label>닉네임</label>
                <div>
                  {userName ? userName : userEmail}
                </div>
                <span>
                  <button className={style.modifyBtn} onClick={checkTry}>수정</button>
                </span>
              </div>
            )}
            <p>페이지 내에서 사용하는 닉네임입니다.</p>
          </div>
          <div className={style.wrapper}>
            <div className={style.wrapperList}>
              <label>회원탈퇴</label>
              <button type='button' className={style.removeBtn} onClick={handleUserRemove}>회원탈퇴</button>
            </div>
            <p>탈퇴 시 작성한 게시글은 모두 삭제되며 복구되지 않습니다.</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MyPage