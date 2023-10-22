import { useState, useEffect, useRef, useCallback } from "react";
import { styled } from "styled-components";
import Board from "../../components/board";
import { getBoard } from "../../api/BoardAPI";
import { PostType } from "../../components/board";
import { debounce } from "@mui/material";
import { matchPath, useLocation } from "react-router-dom";

const MainPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [lastId, setLastId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [request, setRequest] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const [option, setOption] = useState<"trendy" | "recent">("trendy");

  useEffect(() => {
    if (pathname == "/") {
      setOption("trendy");
    } else if (pathname == "/recent") {
      setOption("recent");
    }
  }, []);

  useEffect(() => {
    if (pathname == "/") {
      setOption("trendy");
      setPosts([]);
      setLastId(0);
      setLoading(false);
      setHasMore(true);
      setRequest(false);
      console.log("trendy");
    } else if (pathname == "/recent") {
      setOption("recent");
      setPosts([]);
      setLastId(0);
      setLoading(false);
      setHasMore(true);
      setRequest(false);
      console.log("recent");
      // window.location.reload();
    }
  }, [pathname]);

  // 데이터 렌더링
  useEffect(() => {
    loadMoreData();
  }, [option]);

  useEffect(() => {
    if (request && hasMore) {
      loadMoreData();
    }
  }, [request]);

  // 데이터 불러오기
  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newData = await getBoard(lastId, option);
      console.log(newData);
      if (JSON.stringify(posts) === JSON.stringify(newData)) {
        console.log("같음");
        return;
      }
      setPosts((prev) => [...prev, ...newData]);
      // console.log("new Data");
      // console.log(posts);

      if (newData.length <= 9) {
        setHasMore(false);
        // console.log("more end");
      }
      const newLastId = newData[newData.length - 1]?.id;
      setLastId(newLastId);
      // console.log("lastId up");
    } catch (error) {
      console.error("Error loading more data: ", error);
    } finally {
      setLoading(false);
      setRequest(false);
    }
  }, [loading, hasMore, lastId, posts, option]);

  // 스크롤
  useEffect(() => {
    // 스크롤 체크
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // console.log("scrollHeight  " + container.scrollHeight);
      // console.log("clientHeight  " + container.clientHeight);
      // console.log("scrollTop  " + window.scrollY);

      if (
        container.scrollHeight - container.clientHeight + 100 <=
        window.scrollY
      ) {
        // console.log("loadMore");
        setRequest(true);
      }
    };
    window.addEventListener("scroll", debounce(handleScroll));

    return () => {
      window.removeEventListener("scroll", debounce(handleScroll));
      setRequest(false);
    };
  }, []);

  useEffect(() => {
    // console.log("lastId 변경");
    console.log(`lastId: ${lastId}`);
  }, [lastId]);

  return (
    <>
      {/* <div>MainPage
          <Link to='/login'>Login</Link>
        </div> */}
      <Container ref={containerRef}>
        {posts ? <Board posts={posts} /> : "none"}
      </Container>
    </>
  );
};

export default MainPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2vw;
  /* overflow: scroll; */

  @media (max-width: 767px) {
    padding: 0;
  }
`;
