import { useState, useEffect, useRef } from 'react'
import style from './myPage.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const MyWritePage = () => {
  const { userId } = useParams();

  interface Tag {
    tag: {
      name: string;
    }
  }[]

  const [tag, setTag] = useState<string[]>(['dori'])

  // 태그 가져오기
  const getTags = (tags: Tag[]) => {
    const tagArray = tags.map((item) => item.tag.name);
    setTag(tagArray);
  }

  type My = {
    title: string;
    body: string;
    id: string;
    userId: string;
  }

  // const [lock, setLock] = useState<boolean>(false) 부가기능 추후 추가
  const [myData, setData] = useState<My[]>()

  // Search
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate();

  // search 값 불러오기
  const inputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    
  }

  // router 반영
  const changeNavigate = (url: string) => {
    if(url != '')
      navigate(`/${userId}?q=${url}`)
    else 
      navigate(`/${userId}`)
  }

  // 함수 호출
  useEffect(() => {
    changeNavigate(search)
    
  }, [search])

  // SearchFilter 함수 
  const filterTitle = myData?.filter((p) => {
    // 대소문자 통일 후 배열에 요소가 존재하는지 확인
    return p.title?.replace(" ", "").toLocaleLowerCase().includes(search.replace(" ", "").toLocaleLowerCase())
  })

  // 배열에서 검색한 값만 불러오기
  const getSearchList = () => {
    if(filterTitle?.length !== 0){
      return (
        <div>
          {filterTitle?.map((item, index) => (
            <div key={item.id}>
              <div className={style.list} >
                <div className={style.contentImg}>
                  <img src='/public/images/배경.webp' alt="img" />
                </div>
                <h2>{ item.title }</h2>
                <p>{ item.body }</p>
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

  // 배열에서 값불러오기
  const getList = () => {
    return (
      <div>
        {myData?.map((item, index) => (
          <div key={ index }>
            <div className={style.list} >
              <div className={style.contentImg}>
                <img src='/public/images/배경.webp' alt="img" />
              </div>
              <Link to={`/${ item.id }`}></Link>
              <h2>{ item.title }</h2>
              <p>{ item.body }</p>
              <div className={style.tagWrapper}>
              {
                tag ? (
                  tag.map((item, index) => (
                    <span key={index} className={style.boardTag}>{item}</span>
                  ))
                ) : null
              }
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

  // 무한 스크롤
  const target = useRef<HTMLDivElement | null>(null); // null로 초기화
  const [boardPage, setBoardPage] = useState<number>(1);

  // GetData
  // 무한 스크롤 - 타겟이 화면에 완전히 나타날 때 더 많은 데이터 가져오기
  const fetchMoreData = () => {
    // page number 전달
    // `http://localhost:3000/boards/author/${nickName}?_page=${boardPage}&_limit=10`
    fetch(`https://jsonplaceholder.typicode.com/albums?_page=${boardPage}&_limit=10`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // 새로운 데이터가 있는 경우에만 boardPage를 증가시킵니다.
          setBoardPage((prevPage) => prevPage + 1);
          setData((prevPost) => (prevPost ? [...prevPost, ...data] : data));
          console.log(myData)
          console.log(boardPage)
        }
      })
      .catch((error) => console.log(error));
  };

  
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
      if (target.current) observer.unobserve(target.current);
    };
  }, [boardPage]); // boardPage는 의존성에 포함되어 변경될 때마다 재관측하도록 해야 합니다.

  
  

  return (
    <div className={style.container}>
      <div className={style.myPage}>
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
        <div className={style.myList}>
          {/* 목록 */}
          <div className={style.body}>
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