import { useState, useEffect, useRef, useCallback } from "react";
import style from "../MyPage/myPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
// import { getMyBoard } from '../../api/User';
import Specific from "../../components/Specific";
import { PostType } from "../../components/Specific";
import useDebounce from "../../hooks/useDebounce";

interface Tag {
  tag: { name: string };
}
[];

type BoardType = {
  id: number;
  email: string;
  picture: string;
  firstName: string;
  lastName: string;
  isAdmin: null;
  nickName: string;
  introduction: string;
  board: Array<PostType>;
};

const WriteListPage = () => {
  const { userName } = useParams(); // 받아오는 userId( 닉네임 )

  const [user, setUser] = useState<BoardType>();

  useEffect(() => {
    fetchMoreData();
  }, []);

  // ARRAY
  const [userData, setData] = useState<PostType[]>([]); // 게시판 저장
  const [searchData, setSearchData] = useState<PostType[]>([]); // 검색된 게시판 저장
  // let boardCount = 0

  const [boardPage, setBoardPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // GetData
  const fetchMoreData = useCallback(async () => {
    // fetch(`https://jsonplaceholder.typicode.com/albums?_page=${boardPage}&_limit=10`)
    if (!hasMore) return;

    try {
      const post = await getUserBoard(userName);
      setUser(post);
      setData([...userData, ...post.board]);
      if (userData.length === 0) {
        setHasMore(false);
      }
      setBoardPage(boardPage + 1);
    } catch (error) {
      console.error("Error loading more data: ", error);
    }
  }, [boardPage, hasMore, userData, userName]);

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
        fetchMoreData;
      }
    };
    console.log(userData);

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [fetchMoreData]);

  return (
    <div className={style.container}>
      <div className={style.myPage}>
        {/* PROFILE */}
        <div className={style.profileBox}>
          <div className={style.profile}>
            <div className={style.myImage}>
              <img src={user?.picture} alt="img" className={style.myImage} />
            </div>
            <h2>{userName}</h2>
          </div>
          <div className={style.introBox}>
            <h2>한 줄 소개</h2>
            <div className={style.intro}>{user?.introduction}</div>
          </div>
        </div>
        <hr />
        {/* ARRAY 출력 */}
        <div className={style.myList} ref={containerRef}>
          {userName ? (
            <Specific boardList={userData} userName={userName} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteListPage;
function getUserBoard(userName: string | undefined) {
  throw new Error("Function not implemented.");
}
