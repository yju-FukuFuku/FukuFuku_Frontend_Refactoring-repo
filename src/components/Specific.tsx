import { useState, useEffect, useRef, useCallback } from 'react'
import style from '../pages/MyPage/myPage.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
interface Tag { 
  tag: { name: string; }
}[]

export type PostType = {
  id: number;
  u_id: string;
  content: string;
  title: string;
  views: number,
  createdAt: string,
  boardImage: Array<string>,
  like: Array<string>,
  board_tag: Array<Tag>,
}

type Props = {
  boardList: Array<PostType>
  userName: string | undefined
}

const Specific = ( { boardList, userName } : Props ) => {

  const [tag, setTag] = useState<string[]>([''])  // 태그 불러오기
    
  // ARRAY
  const [board, setBoard] = useState<PostType[]>([])  // 게시판 저장
  
  // TAG - ??
  const getTags = (tags: Tag[]) => {
    const tagArray = tags.map((item) => item.tag.name);
    setTag(tagArray);
  }

  // 배열 데이터 저장
  useEffect(() => {
    setBoard(boardList)
  }, [boardList])

  // SEARCH
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate();
  // search 값 불러오기
  const inputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value) 
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeNavigate = (url: string) => {
    if(url != '')
      navigate(`/${userName}?q=${url}`)
    else 
      navigate(`/${userName}`)
  }

  // // ROUTER 변경
  // useEffect(() => {
  //   changeNavigate(search)
  // }, [search])


  // ARRAY 값 출력
  const getList = () => {
    return (
      <div>
        {board?.map((item) => (
          <div key={`list-${item.id}`}>
            <div className={style.list} >
              <div className={style.contentImg}>
              <img src={ item.boardImage.length != 0 ? item.boardImage[0] : 'https://yju-fukufuku.s3.amazonaws.com/logo.svg'} alt="img" />
              </div>
              <Link to={`/${ item.id }`}></Link>
              <h2>{ item.title }</h2>
              <p>{ item.content }</p>
              <div className={style.tagWrapper}>
              {/* { tag ? (
                  tag.map((item, index) => (
                    <span key={item.name} className={style.boardTag}>{item}</span>
                  ))
                ) : null } */}
              </div>
              <div className={style.subInfo}>
                <span>약 17시간 전</span>
              </div>
              <hr />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* ARRAY 출력 */}
      <div className={style.myList}>
        <div className={style.body}>
          {/* SEARCH */}
          <div className={style.serBox}>
            <section className={style.serSec}>
              <div className={style.search}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 -960 960 960"><path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/></svg>
                <input type="text" placeholder='검색어를 입력하세요.' onChange={ inputSearch }/>
              </div>
            </section>
          </div>
          {/* 글 목록 */}
          { getList() }
        </div>
      </div>
    </>
  )
}

export default Specific