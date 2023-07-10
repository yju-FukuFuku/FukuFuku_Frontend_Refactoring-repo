import React, { useState, useEffect, useRef } from 'react'
import style from './myPage.module.css'
import myImage from '../../assets/짱구.jpeg'

const MyPage = () => {
  const [userId, setId] = React.useState('');
  const [userName, setName] = useState('');
  const [reName, setReName] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getData()
  }, [userId, userName]);

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
    if(fileInputRef.current){
      fileInputRef.current.click();
    }
  }

  // 올바른 파일인지 체크 후 fetch요청
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if (file) {
      console.log(file[0])

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
        })
    } else {
      console.log("파일이 선택되지 않았습니다.");
    }
  };

  // 닉네임 변경 요청
  const checkTry = () => {
    console.log("변경 요청")
    setReName(true)
  }

  // 닉네임 수정 fetch요청
  const handleNameUpdate = () => {
    console.log("이름 변경")
    fetch("")
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data)
        console.log("변경완료")
      })
      .catch((error) => console.log(error))
    setReName(false)
  }

  // 회원탈퇴 fetch요청
  const handleUserRemove = () => {
    console.log("회원 탈퇴")
    fetch("", {
      method: "POST",
      headers : {
        "Content-type" : "application/json"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log("탈퇴 성공")
      })
      .catch((error) => console.log(error)) 
  }

  // INTRO
  const [content, setContent] = useState('')
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
    setContent(userData)
    fetch("", {
      method: "POST",
      headers: {
        "Content-type" : "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => console.log(error))
    console.log("수정 완료")
    setIntroCheck(false)
  }

  
  return (
      <div className={style.myPage}>
        <div className={style.profileBox}>
          <div className={style.profile}>
            <div className={style.myImage}>
              <img src={myImage} alt="image" className={style.myImage}/>
            </div>
            <button className={style.imgBtn} onClick={handleImageUpdate}>이미지 수정</button>
            <input type="file" className={style.file} ref={fileInputRef} onChange={handleFileChange}/>
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
                hello my name is mini nice me too. <br></br>i can't speak english
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
              <div>{userId}</div>
            </div>
            <p>회원가입 하신 ID입니다.</p>
          </div>
          <div className={style.wrapper}>
            {/* nickname 수정 */}
            {reName ? (
              <div className={style.wrapperList}>
                <label>닉네임</label>
                <input type="text" className={style.username} placeholder={userName} />
                <span className={style.updateName}>
                  <button className={style.updateBtn} onClick={handleNameUpdate}>저장</button>
                </span>
              </div>
            ) : (
              <div className={style.wrapperList}>
                <label>닉네임</label>
                <div>{userName}</div>
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
      
  )
}

export default MyPage