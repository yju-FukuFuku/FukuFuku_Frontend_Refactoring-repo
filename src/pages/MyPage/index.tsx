import React, { useState, useEffect, useRef } from 'react'
import style from './myPage.module.css'
import useDebounce from '../../hooks/useDebounce';

const MyPage = () => {
  const [userEmail, setId] = useState<string>('');
  const [userName, setName] = useState<string>('');
  const [file, setFile] = useState<string>('')
  const [content, setContent] = useState<string>('')    // 한 줄 소개
  const [reName, setReName] = useState<boolean>(false)  // 닉네임 수정 check
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 이미지 불러오기

  // 유저 정보 불러오기
  useEffect(() => {
    getData()
  }, [content, file]);

  // GetFetch
  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setId(data.userId)
        setName(data.id)
      })
      .catch((error) => console.log(error));
  }

  // 이미지 변경 fetch요청
  const handleImageUpdate = () => {
    console.log("이미지 변경")
    fileInputRef.current?.click();
  }

  // 올바른 파일인지 체크 후 fetch요청
  const extension = ['.img', '.png', '.jpg']

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileCheck = (e.target.files? e.target.files[0].name : null)
    // 파일이 제대로 들어왔는지 확인
    if (fileCheck) {
      handlePostImg(fileCheck)
    } else {
      console.log("파일이 선택되지 않았습니다.");
    }
  };

  // 이미지 변경 fetch
  const handlePostImg = (e:string) => {
    if (extension.includes(e.substring(e.length-4, e.length))){
      fetch("", {
        method: "POST",
        headers: {
          "Content-type" : "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          console.log("이미지 전송성공")
          setFile(e)
      })
    }
    else{
      console.log("확장자가 틀립니다.")
    }
  }

  // 이미지 삭제
  const handleImageRemove = () => {
   fetch("", {
    headers: {
      "Content-type" : "application/json"
    }
   }) 
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
  }

  // 닉네임 변경 요청
  const checkTry = () => {
    console.log("변경 요청")
    setReName(true)
  }

  // 닉네임 중복 체크 - debounce
  const debounceVal = useDebounce(userName)

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.includes(" ")) {
      console.log("띄어쓰기가 포함되어 있습니다.")
    } else {
        setName(e.target.value)
    }
    // console.log(e.target.value)
    // console.log(debounceVal)
  }

  const handleNameOverlap = () => {
    console.log(debounceVal)
    // fetch(`http://localhost:3000/check/${e.target.value}`, {
    //     headers: {
    //       "Content-type" : "application/json"
    //     }
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data)
    //       if(data.statusCode == "200"){
    //         console.log(data.message)
    //       } else if(data.statusCode == "409") {
    //         console.log(data.message)
    //       } else{
    //         console.log("정의되지 않은 오류입니다.")
    //       }
    //     })
    //     .catch((error) => console.log(error))
  }

  useEffect(() => {
    if(debounceVal != ''){
      handleNameOverlap()
    }
  }, [debounceVal])

  // 닉네임 수정 fetch요청
  const handleNameUpdate = () => {
    console.log("이름 변경")
    // fetch("http://localhost:3000/editNickname", {
    //   headers: {
    //     "Content-type" : "application/json"
    //   },
    //   body: JSON.stringify({
    //     "data": {
    //       "where": {
    //         "email": "9000248@g.yju.ac.kr" // 바꾸려는 유저의 이메일
    //       },
    //       "data": {
    //         "nickName": "test" // 바꾸려는 닉네임 값
    //       }
    //     }
    //   })
    // })
    //   .then((Response) => Response.json())
    //   .then((data) => {
    //     console.log(data)
    //     if(data.statusCode == "200"){
    //       console.log(data.message)
    //       // setName(data.nickName)
    //       console.log("변경완료")
    //     } else if(data.statusCode == "400") {
    //       console.log(data.message)
    //     } else if(data.statusCode == "409") {
    //       console.log(data.message)
    //     }
    //   })
    //   .catch((error) => console.log(error))
    // setReName(false)
  }

  // 회원탈퇴 fetch요청
  const handleUserRemove = () => {
    console.log("회원 탈퇴")
    fetch("http://localhost:5173/withdraw", {
      method: "DELETE",
      headers : {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({
        "data": {
          "where": {
            "email": userEmail
          }
        }
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.statusCode == "201"){
          console.log(data.message)
        } else if(data.statusCode == "400") {
          console.log(data.message)
        } else{
          console.log("정의되지 않은 오류입니다.")
        }

        console.log("탈퇴 성공")
      })
      .catch((error) => console.log(error)) 
  }

  // INTRO
  const [introCheck, setIntroCheck] = useState<boolean>(false)
  let userData = ''

  // intro 수정 요청
  const handleUpdateCheck = () => {
    console.log("수정 요청")
    setIntroCheck(true)
  }

  // intro 내용 수정
  const changeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    userData = e.target.value
    console.log(userData)
    console.log("값 변경")
  }
  
  // 서버로 데이터 전송
  const handleUpdateContent = () => { 
    // 한 줄 소개 수정
    fetch("http://localhost:5173/editIntroduction", {
      method: "PATCH",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({
        "updateData" : {
          "email": userEmail
        },
        "data": {
          "introduction": content
        }
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.statusCode == "422") {
          console.log(data.message)
        } else if(data.statusCode == "400"){
          console.log(data.message)
          // console.log(data.error)
        } else if(data.statusCode == "200") {
          console.log(data.message)
          // 데이터를 다시 받아서 넣어야하나?
          setContent(userData)
        } else {
          console.log("정의되지 않은 오류입니다.")
        }
      })
      .catch((error) => console.log(error))
    console.log("수정 완료")
    setIntroCheck(false)
  }

  
  return (
    <div className={style.container}>
      <div className={style.myPage}>
        <div className={style.profileBox}>
          <div className={style.profile}>
            <div className={style.myImage}>
              <img src='/public/images/짱구.jpeg' alt="image" className={style.myImage}/>
            </div>
            <button className={style.imgBtn} onClick={handleImageUpdate}>이미지 수정</button>
            <button className={style.modifyBtn} onClick={handleImageRemove}>이미지 제거</button>
            <input type="file" className={style.file} ref={fileInputRef} onChange={handleFileChange} accept='image/*'/>
          </div>
          {/* intro 수정 */}
          {introCheck ? (
            <div className={style.introBox}>
              <input type="text" defaultValue={content} onChange={changeContent}/>
              <div className={style.inputBlock}>
                <button className={style.modifyBtn} onClick={handleUpdateContent}>완료</button>
              </div>
            </div>
          ) : (
            <div className={style.introBox}>
              <h2>한 줄 소개</h2>
              <div className={style.intro}>
                { content }
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
                <input type="text" className={style.username} value={userName} onChange={handleInputName}/>
                <span className={style.updateName}>
                  <button className={style.updateBtn} onClick={handleNameUpdate}>저장</button>
                </span>
              </div>
            ) : (
              <div className={style.wrapperList}>
                <label>닉네임</label>
                <div>
                  { userName ? userName : userEmail}
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