import React, { useState } from 'react'
import style from './myPage.module.css'
import myImage from '../../assets/짱구.jpeg'
import { Link } from 'react-router-dom'

const MyIntroPage = () => {
  const [content, setContent] = useState('')
  const [introCheck, setIntroCheck] = useState<boolean>(false)

  const handleUpdateCheck = () => {
    console.log("수정 요청")
    setIntroCheck(true)
  }
  const changeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
    console.log("값 변경")
  }
  const handleUpdateContent = () => { 
    console.log("수정 완료")
    setIntroCheck(false)
  }

  return (
    <div className={style.myPage}>
      <div className={style.profile}>
        <div className={style.myImage}>
          <img src={myImage} alt="image" className={style.myImage}/>
        </div>
        <h2>profile</h2>
      </div>
      <hr />
      <div className={style.myList}>
        <div className={style.head}>
          <Link to="/myList" className={style.Link}>글</Link>
          <Link to="/myIntro" className={style.Link}>소개</Link>
        </div>
        {/* 목록 */}
        <div className={style.body}>
          <div>
          { introCheck ? (
            <div className={style.intro}>
              <div className={style.inputBlock}>
                <button className={style.saveBtn} onClick={handleUpdateContent}>완료</button>
              </div>
              <input type="text" defaultValue={content} onChange={changeContent}/>
            </div>
          ) : (
            <div className={style.intro}>
              <div className={style.introView}>
                <button className={style.saveBtn} onClick={handleUpdateCheck}>수정</button>
              </div>
              <div className={style.test}></div>
              <div className={style.content}>{content}</div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
      
  )
}

export default MyIntroPage