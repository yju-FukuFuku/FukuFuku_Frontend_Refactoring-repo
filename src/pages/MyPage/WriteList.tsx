import { useState, useEffect } from 'react'
import style from './myPage.module.css'
import { Link } from 'react-router-dom'

type MyData = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const MyWritePage = () => {
  // const [lock, setLock] = useState<boolean>(false) 부가기능 추후 추가
  const [myData, setData] = useState<MyData[]>([])


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        console.log(myData)
      })
      .catch((error) => console.log(error));
  }, [myData]);

  const getList = () => {
    return (
      <div>
        {myData.map((item) => (
          // <div key={index}>{ item.name }</div>
          <div className={style.list} >
            <div className={style.contentImg}>
              <img src="/assets/배경.webp" alt="img" />
            </div>
            <h2>{ item.name }</h2>
            <p>{ item.body }</p>
            <div className={style.subInfo}>
              <span>약 17시간 전</span>
              <span>{ item.id }</span>
              {/* 공개&비공개 여부 확인 / 추후 추가 확인
              { lock ? (
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M220-80q-24.75 0-42.375-17.625T160-140v-434q0-24.75 17.625-42.375T220-634h70v-96q0-78.85 55.606-134.425Q401.212-920 480.106-920T614.5-864.425Q670-808.85 670-730v96h70q24.75 0 42.375 17.625T800-574v434q0 24.75-17.625 42.375T740-80H220Zm0-60h520v-434H220v434Zm260.168-140Q512-280 534.5-302.031T557-355q0-30-22.668-54.5t-54.5-24.5Q448-434 425.5-409.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350-634h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426-860 388-822.083 350-784.167 350-730v96ZM220-140v-434 434Z"/></svg>
                  <span>비공개</span>
                </p>
              ) : (
                <span>공개</span>
              )} */}
              
            </div>
            <hr />
          </div>
        ))}

      </div>
    )
  }

  return (
    <div className={style.myPage}>
      <div className={style.profileBox}>
        <div className={style.profile}>
          <div className={style.myImage}>
            <img src="/assets/짱구.jpeg" alt="image" className={style.myImage}/>
          </div>
          <h2>profile</h2>
        </div>
        <div className={style.introBox}>
          <h2>한 줄 소개</h2>
          <div className={style.intro}>
            hello my name is mini nice me too. <br></br>i can't speak english
          </div>
          <button className={style.saveBtn}>수정</button>
        </div>
      </div>
      <hr />
      <div className={style.myList}>
        <div className={style.head}>
          <Link to="/myList" className={style.Link}>글</Link>
        </div>
        {/* 목록 */}
        <div className={style.body}>
          {/* 글 목록 */}
          {
            getList()
          }
        </div>
      </div>
    </div>
  )


}

export default MyWritePage