import { useState, useEffect, useRef, useCallback } from 'react'
import style from './myPage.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface Tag { 
  tag: {
    name: string;
  }
}[]

type My = {
  title: string;
  content: string;
  id: number;
  userId: string;
  views: 0,
  createdAt: string,
  u_id: 6,
  boardImage: [],
  like: [],
  board_tag: []
}

const MyWritePage = () => {
  const { userId } = useParams(); // 받아오는 userId( 닉네임 )
  console.log(userId)
  const [tag, setTag] = useState<string[]>(['']) 

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
      navigate(`/${userId}?q=${url}`)
    else 
      navigate(`/${userId}`)
  }
  // ROUTER 변경
  // useEffect(() => {
  //   changeNavigate(search)
  // }, [changeNavigate, search])

  // ARRAY
  const [myData, setData] = useState<My[]>()  // 게시판 저장
  let boardCount = 0

  // GetData
  const fetchMoreData = useCallback(() => {
    // page number 전달
    // fetch(`https://jsonplaceholder.typicode.com/albums?_page=${boardPage}&_limit=10`)
    fetch(`http://localhost:3000/boards/author/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          return;
        }
        if (data.length > boardCount) {
          const board = data[0].board
          console.log(data.length)
          boardCount = data.length
          // 새로운 데이터가 있는 경우에만 boardPage를 증가시킵니다.
          setBoardPage((prevPage) => prevPage + 1);
          setData((prevPost) => (prevPost ? [...prevPost, ...board] : board));
          // console.log(boardPage)
        }
      })
      .catch((error) => console.log(error));
  }, [userId])

  console.log(myData)

  // SearchFilter 함수 - 검색 값을 통해 배열 색출
  const filterTitle = myData?.filter((p) => {
    return p.title?.replace(" ", "").toLocaleLowerCase().includes(search.replace(" ", "").toLocaleLowerCase())
  })
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

  // INFINITY SCROLL - 스크롤 값을 불러와 배열 나눠서 가져오기.
  const target = useRef<HTMLDivElement | null>(null); // null로 초기화
  const [boardPage, setBoardPage] = useState<number>(1);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        console.log("도달")
        if (target.isIntersecting) { 
          fetchMoreData(); 
        }
      },
      { threshold: 1.0 }
    );
    // 타겟 엘리먼트를 관측하기 시작합니다.
    if (target.current) observer.observe(target.current);
    // 컴포넌트가 언마운트될 때 옵저버를 연결 해제합니다.
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (target.current) observer.unobserve(target.current);
    };
  }, [fetchMoreData, myData]); // boardPage는 의존성에 포함되어 변경될 때마다 재관측하도록 해야 합니다.


  return (
    <div className={style.container}>
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
              hello my name is mini nice me too. <br></br>i can't speak english
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
                  <input type="text" placeholder='검색어를 입력하세요.' onChange={inputSearch}/>
                </div>
              </section>
            </div>
            {/* 글 목록 */}
            { search ? getSearchList()
              :getList()
            }
            <div ref={target}>관측</div>
          </div>
        </div>
      </div>
    </div>
  )


}

export default MyWritePage