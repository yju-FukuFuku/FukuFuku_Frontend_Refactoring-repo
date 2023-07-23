import React, {useState, useEffect, useCallback, useRef, useMemo } from "react";
import styled from "styled-components";
import Post from "./Post";
import Spinner from "./Spinner";
import { boardNumber, postState, themeState, prevThemeState } from "../../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeType } from "../../theme";

const BoardTop = styled.div`
    height: 120px;
    width: 100vw;
    background-color: ${props => props.theme.bgColor1};
`

// 게시판 중앙 정렬 및 마진
const BoardCenter = styled.div`
    background-color: ${props => props.theme.bgColor1};
    width: 100vw;
    display: flex;
    justify-content: center;
    /* margin-top: 120px; */
`

// 게시물 정렬
const BoardCase = styled.div`
    // 일반 크기
    background-color: ${props => props.theme.bgColor1};
    max-width: 1760px;
    display: flex;
    flex-wrap: wrap;

    // 4칸
    @media all and (min-width: 1441px) and (max-width: 1919px) {
        max-width: 1408px;
    }

    // 3칸
    @media all and (min-width:1057px) and (max-width:1440px) {
        max-width: 1056px;
    } 

    // 2칸
    @media all and (min-width:768px) and (max-width:1056px) {

    } 
  
    // 모바일 크기
    @media all and (max-width:767px) {

    }
`

// 게시물의 개수 만큼 post 컴포넌트를 가져오는 컴포넌트
const Board = () => {

    const [prevScrollY, setPrevScrollY] = useState<number>(0);
    // 가져올 페이지 번호
    const [boardPage, setBoardPage] = useRecoilState<number>(boardNumber); 
    const [targetY, setTargetY] = useState<number>(0);
    const [scrollCheck, setScrollCheck] = useState<boolean>(true);

    const handleScroll = useCallback(() => {
        if (!scrollCheck) {
            return;
        }
        const currentScrollY = window.scrollY;
        if (currentScrollY > targetY) {
            setScrollCheck(false);
            console.log("도달", currentScrollY, targetY);
            setBoardPage(boardPage + 1);
        } else {
            console.log("실패", currentScrollY, targetY);
        }
        setPrevScrollY(currentScrollY);
    }, [prevScrollY, targetY]);

    // 스크롤 하면 높이 출력
    useEffect(() => {
        setPrevScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
    
    type postType = {
        // title: string; // 게시물 제목
        // content: string; // 게시물 내용
        // writeDate: string; // 게시물 작성 일자
        // postComment: number; // 게시물 댓글 개수
        // postWriter: string; // 게시물 작성자 이름
        // postLike: number; // 게시물 좋아요 개수
        // PostImage.url: string; // 게시물 이미지
        // UserImage.url: string; // 게시물 작성자 이미지
        // p_id: string; // 게시물 주소
        // User.u_id: string; // 게시물 작성자 프로필 주소

        // 임시값
        albumId: number;
        id: number;
        title: string;
        url: string;
        thumbnailUrl: string;
    }

    // const [post, setPost] = useState<postType[]>();

    const [post, setPost] = useRecoilState<postType[]>(postState);
    

    const boardCaseRef = useRef<HTMLDivElement>(null);

    // 게시물의 값 변경 또는 화면 넓이 변경 시 목표 높이 수정
    useEffect(() => { 
            if (boardCaseRef.current) {
            // boardCase의 높이
            const height = boardCaseRef.current.offsetHeight;
            console.log("BoardCase height:", height);
            // 사용자 화면 높이
            const userHeight = window.innerHeight;
            console.log(userHeight);
            // 목표 높이 설정
            setTargetY(height - userHeight);
            console.log("목표높이", targetY);
        }
    }, [post, window.innerWidth]);

    // boardPage가 변경되면 data 호출
    useEffect(() => {
        if ((window.scrollY > targetY && targetY != 0) || boardPage === 1) {
            console.log("boardPage", boardPage);
            console.log("window.scrollY", window.scrollY);
            console.log("targetY", targetY);
            
            getData()
        } else {
            console.log("data 로딩 실패");
            
        }
    }, [boardPage])
    
    // GetData
    const getData = async () => {
        console.log("데이터 렌더링")        
        
    await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${boardPage}`, {
      headers: {
        "Content-type" : "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
          setPost((prevPost) => prevPost ? [...prevPost, ...data] : data);
          setScrollCheck(true);
      })
    }


    return (
        <>
            <BoardTop/>
            <BoardCenter>
                <BoardCase ref={boardCaseRef}>
                    {
                        post?.map((item) => <Post postTitle={item.title} postContent="3년동안 프로그래밍과 해킹을 공부하며 느낀것들을 정리해봤다." postDate="2023년 6월 28일" postComment={11} postWriter="minmoong" postLike={item.id} postImg={item.url} postProfileImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASbSURBVHgB7Z0tTytBFIYP914BDiQ4cIADB0EhwYFE8ifq7g/hJ2CRSCQ4kOCobF3ruHk3maS5aSnbdnfPOe/7JE0oCTvTnmc+dvbMsNbr9b5M0PLLBDUSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAOX+MhPX1dTs+Prbt7W3b3d21jY2N6ndgPB7bYDCw4XBor6+v9vHxUb1nIL0Ae3t7dn5+XgV9FhABYuC1v79f/Q4SPD8/28vLi2UmrQA/Cfx34O/wwjXu7u7S9gi/z87O/loyELTr62vb2tqyZcFQcXp6Wv2MXiEb6SaBCDwEWDVFqmykEgABOjo6sqbAtbNJkEaAi4uLRoNfQBmXl5eWhRQCIChlnG6Dk5OTVstrkvACYKLXxJg/D5RZ1hEiE14ABGIVs/26IPgZeoHQAiDwbYz7s4AA0XuB0AIsusizKsrycmRCC+Dhyz84OLDIhBUAra/rHgCgDpGHgbAC7OzsmBc81aUuYQXY3Nw0L3iqS13CCtDFrd8sPNWlLsoIIkcCkBNWAE8JGpGTRcIKgPw9L3iqS13CCvD5+Wle8FSXuoQVAJm8HlK0UAfUJSqhJ4Fvb2/WNcgcjkxoAfDld936oieKhhYAwX96erKuwJ6B6Oni4dcBIEAXvQAC//j4aNEJLwCC30UgUGaGzSIpVgLRC7Q5FKCsLFvG0iwFPzw8tBIUlIGyspDqWcD9/X2jEuDaKCMT6R4GIUBNzAlwzWzBByl3ByNYaK23t7dLP6vHfT6u9/7+bhlZ6/V6X5YYpI0jebRu/mD2wBfSHxCBngAv9ASQ4PDwsErhwvvJE0JGo1EV9H6/72KFsS1SCDAZyFngnh2vVUwSUV4WQUILULZnlR06aMGYqDW1QDN56khZho6+Ghh2DoBgXF1dTZ3koZWvcqWubECdtg0NZUQ+QiakAGjxOA9gHhABj4wXeWyMHgX5/j85Zwi9AXoeD4+n6xJOAASk7nbwkjyCGT0meXg/mcWDYOMsIJwShtaO3mWRHT/odaINCaHmAIsEHyCQOP6tHAHXFKVukSQIsxK4aPDbBnWMdG5ACAHwhUYIfgHzEwwjEXAvQFdHwCzLzc1NiC1jrgXA2I31/Ijbr1HnCEfKuRagq/N/VgXuJLzPB9wKgMBnOITJu8RuBUDXnwHvQ4FLAbDkGrnr/x8MBV7vClwKEHHWPw+vn8mdANlaf8FrL+BOgIytv+Dxs7kSAC0kY+sveOwFXAnQ5bGvbdH0A6m6uBLAw8GPTePtaFk3AmTv/gtYF/A0DLgRgKH1Fzx9VjcCIBuHBU89nRsBkKrFgqfNJm5SwpBGVc7fz/CvWKZRUsk9bS1PvzVMfI+OiiVHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIOcfGjV2tEfztqEAAAAASUVORK5CYII=" postLink={item.id.toString()} postWriterLink="게시물 작성자 링크" />)
                    }
                    {scrollCheck ? null : <Spinner/>}
                </BoardCase>     
            </BoardCenter>
            
        </>
    )
}

export default Board;