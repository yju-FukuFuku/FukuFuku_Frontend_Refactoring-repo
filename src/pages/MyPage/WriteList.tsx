import { useState, useEffect, useRef, useCallback } from "react";
import style from "./myPage.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getMyBoard } from "../../api/User";
import Specific from "../../components/Specific";
import { UserBoardType } from "../../types/BoardType";

const MyWritePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const [content, setContent] = useState<string | undefined>(""); // 한 줄 소개
  const [userName, setName] = useState<string>("");

  useEffect(() => {
    setContent(user.introduction || `${user.nickName} 입니다.`);
    setName(user.nickName ? user.nickName : userName ? userName : "");
    fetchMoreData();
  }, [userName]);

  // ARRAY
  const [myData, setData] = useState<UserBoardType[]>([]); // 게시판 저장
  // let boardCount = 0

  const [boardPage, setBoardPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // GetData
  const fetchMoreData = useCallback(async () => {
    // fetch(`https://jsonplaceholder.typicode.com/albums?_page=${boardPage}&_limit=10`)
    if (!hasMore) return;
    if (!userName) return;

    try {
      const post = await getMyBoard(userName);
      setData([...myData, ...post]);
      console.log(post);
      if (myData.length === 0) {
        setHasMore(false);
      }
      setBoardPage(boardPage + 1);
    } catch (error) {
      console.error("Error loading more data: ", error);
    }
  }, [boardPage, hasMore, myData, userName]);

  // INFINITY SCROLL - 스크롤 값을 불러와 배열 나눠서 가져오기.
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 스크롤 체크
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollHeight - container.clientHeight <=
        container.scrollTop + 100
      ) {
        fetchMoreData();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [fetchMoreData]);

  // // 검색된 값 GET ARRAY
  // const getSearchList = () => {
  //   if(filterTitle?.length !== 0){
  //     return (
  //       <div>
  //         {filterTitle?.map((item) => (
  //           <div key={item.id}>
  //             <div className={style.list} >
  //               <div className={style.contentImg}>
  //                 <img src={ item.boardImage[0] ? item.boardImage[0] : 'https://yju-fukufuku.s3.amazonaws.com/logo.svg'} alt="img" />
  //               </div>
  //               <h2>{ item.title }</h2>
  //               <p>{ item.content }</p>
  //               <div className={style.subInfo}>
  //                 <span>약 17시간 전</span>
  //                 <span>{ item.id }</span>
  //               </div>
  //               <hr />
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div className={style.notFound}>
  //         <p>일치하는 게시글이 없습니다.</p>
  //       </div>
  //     )
  //   }
  // }

  return (
    <div className={style.container}>
      <div className={style.myPage}>
        {/* PROFILE */}
        <div className={style.profileBox}>
          <div className={style.profile}>
            <div className={style.myImage}>
              {user.picture ? (
                <img
                  src={user?.picture}
                  alt="image"
                  className={style.myImage}
                />
              ) : null}
            </div>
            <h2>{userName}</h2>
          </div>
          <div className={style.introBox}>
            <h2>한 줄 소개</h2>
            <div className={style.intro}>{content}</div>
          </div>
        </div>
        <hr />
        {/* ARRAY 출력 */}
        <div className={style.myList} ref={containerRef}>
          {userName && myData ? (
            <Specific boardList={myData} userName={userName} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default MyWritePage;
