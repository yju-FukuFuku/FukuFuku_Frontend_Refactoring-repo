import { useState, useEffect, useRef, useCallback } from "react";
import style from "../pages/MyPage/myPage.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { getSearchData } from "../api/BoardAPI";
import styled from "styled-components";
import { UserBoardType } from "../types/BoardType";
import { getImageSrc } from "./ImageParser";

const Specific = ({
  boardList,
  userName,
}: {
  boardList: UserBoardType[];
  userName: string;
}) => {
  // ARRAY
  const [board, setBoard] = useState<UserBoardType[]>([]); // 게시판 저장
  const [searchBoard, setSearchBoard] = useState<UserBoardType[]>([]); // 검색된 값 저장

  // 배열 데이터 저장
  useEffect(() => {
    setBoard(boardList);
  }, [boardList]);

  // SEARCH
  const [searchValue, setSearchValue] = useState<string>("");

  // 검색 값 가져오기
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // navigate(`/${userName}?q=${e.target.value}`)
  };

  const debounce = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debounce) {
      getSearchData(userName, debounce).then((res) => {
        setSearchBoard(res);
      });
      // 데이터 추가
      // changeNavigate(debounce)
    }
  }, [debounce]);

  // const changeNavigate = (url: string) => {
  //   if(url != '')
  //     navigate(`/${userName}?q=${url}`)
  //   else
  //     navigate(`/${userName}`)
  // }

  // ARRAY 값 출력
  const getList = () => {
    return (
      <div>
        {(debounce ? searchBoard : board)?.map((item) => (
          <div key={`list-${item.id}`}>
            <div className={style.list}>
              <Link to={`/boards/${item.id}`} className={style.postLink}>
                {getImageSrc(item.content) ? (
                  <div className={style.contentImg}>
                    <img src={getImageSrc(item.content)} alt="img" />
                  </div>
                ) : (
                  ""
                )}
                <h2>{item.title}</h2>
                <Content dangerouslySetInnerHTML={{ __html: item.content }} />
                <div className={style.tagWrapper}>
                  {/* { tag ? (
                    tag.map((item, index) => (
                      <span key={item.name} className={style.boardTag}>{item}</span>
                    ))
                  ) : null } */}
                </div>
              </Link>
              <div className={style.subInfo}>
                <span>{item.createdAt}</span>
                {item.board_tag
                  ? item.board_tag.map((tagItem) => (
                      <span key={tagItem.tag.id}>{tagItem.tag.name}</span>
                    ))
                  : null}
              </div>
              <hr />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* ARRAY 출력 */}
      <div className={style.myList}>
        <div className={style.body}>
          {/* SEARCH */}
          <div className={style.serBox}>
            <section className={style.serSec}>
              <div className={style.search}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  viewBox="0 -960 960 960"
                >
                  <path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z" />
                </svg>
                <input
                  type="text"
                  placeholder="검색어를 입력하세요."
                  onChange={handleChange}
                />
              </div>
            </section>
          </div>
          {/* 글 목록 */}
          {getList()}
        </div>
      </div>
    </>
  );
};

export default Specific;

const Content = styled.div`
  img {
    display: none;
  }
`;
