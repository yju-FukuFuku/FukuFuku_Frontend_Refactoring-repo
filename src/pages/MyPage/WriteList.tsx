import { useState, useEffect, useRef, useCallback } from 'react'
import style from './myPage.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import axios from 'axios';
import { getUserBoard } from '../../api/BoardAPI';

interface Tag { 
  tag: { name: string; }
}[]

type PostType = {
  id: number;
  u_id: string;
  content: string;
  title: string;
  like: Array<number>;
  views: number;
  createdAt: string;
  comment: Array<number>;
}

const MyWritePage = () => {
  const { userName } = useParams(); // 받아오는 userId( 닉네임 )
  const [tag, setTag] = useState<string[]>([''])  // 태그 불러오기

  const user = useSelector((state: RootState) => state.user);
  const [content, setContent] = useState<string | undefined>('')    // 한 줄 소개

  // TAG - ??
  const getTags = (tags: Tag[]) => {
    const tagArray = tags.map((item) => item.tag.name);
    setTag(tagArray);
  }

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
  // ROUTER 변경
  useEffect(() => {
    changeNavigate(search)
  }, [changeNavigate, search])

  useEffect(() => {
    fetchMoreData()
    setContent(user.introduction || `${user.nickName} 입니다.`)
  }, [])

  // ARRAY
  const [myData, setData] = useState<PostType[]>([])  // 게시판 저장
  // let boardCount = 0

  const [boardPage, setBoardPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // GetData
  const fetchMoreData = useCallback(async () => {
    // fetch(`https://jsonplaceholder.typicode.com/albums?_page=${boardPage}&_limit=10`)
    if(!hasMore) return;

    try {
      const post = await getUserBoard(userName)
      setData([...myData, ...post ]);
      if (myData.length === 0){
        setHasMore(false);
      }
      setBoardPage(boardPage + 1)
    } catch(error) {
      console.error('Error loading more data: ', error);
    } 
  }, [boardPage, hasMore, myData, userName])

  // SearchFilter 함수 - 검색 값을 통해 배열 색출
  const filterTitle = myData?.filter((p) => {
    return p.title?.replace(" ", "").toLocaleLowerCase().includes(search.replace(" ", "").toLocaleLowerCase())
  })

  // INFINITY SCROLL - 스크롤 값을 불러와 배열 나눠서 가져오기.
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
     // 스크롤 체크  
     const container = containerRef.current;
     if(!container) return;
     
     const handleScroll = () => {
      if (container.scrollHeight - container.clientHeight <= container.scrollTop + 100) {
        fetchMoreData();
      }
     };
     console.log(myData)

     container.addEventListener('scroll', handleScroll);
     return () => {
       container.removeEventListener('scroll', handleScroll);
     };
  }, [fetchMoreData]); 

  // 검색된 값 GET ARRAY
  const getSearchList = () => {
    if(filterTitle?.length !== 0){
      return (
        <div>
          {filterTitle?.map((item) => (
            <div key={item.id}>
              <div className={style.list} >
                <div className={style.contentImg}>
                  <img src='/public/images/배경.webp' alt="img" />
                </div>
                <h2>{ item.title }</h2>
                <p>{ item.content }</p>
                <div className={style.subInfo}>
                  <span>약 17시간 전</span>
                  <span>{ item.id }</span>
                </div>
                <hr />
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div className={style.notFound}>
          <p>일치하는 게시글이 없습니다.</p>
        </div>
      )
    }
  }


  // ARRAY 값 출력
  const getList = () => {
    return (
      <div>
        {myData?.map((item) => (
          <div key={`list-${item.id}`}>
            <div className={style.list} >
              <div className={style.contentImg}>
                <img src='/public/images/배경.webp' alt="img" />
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
                <span>댓글 수</span>
                <span>좋아요 수</span>
              </div>
              <hr />
            </div>
          </div>
        ))}
      </div>
    )
  }



  return (
    <div className={style.container} ref={containerRef}>
      <div className={style.myPage}>
        {/* PROFILE */}
        <div className={style.profileBox}>
          <div className={style.profile}>
            <div className={style.myImage}>
              <img src='/public/images/짱구.jpeg' alt="image" className={style.myImage}/>
            </div>
            <h2>profile</h2>
          </div>
          <div className={style.introBox}>
            <h2>한 줄 소개</h2>
            <div className={style.intro}>
              { content }
            </div>
          </div>
        </div>
        <hr />
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
            { search ? getSearchList() : getList() }
          </div>
        </div>
      </div>
    </div>
  )


}

export default MyWritePage